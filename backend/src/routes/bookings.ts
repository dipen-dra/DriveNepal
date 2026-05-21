import { Router, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { Booking } from '../models/Booking.js';
import { Vehicle } from '../models/Vehicle.js';
import { Notification } from '../models/Notification.js';
import { protect, AuthRequest } from '../middleware/auth.js';
import { adminOnly } from '../middleware/admin.js';
import { sendEmail } from '../utils/email.js';

const router = Router();

/* ── GET /api/bookings  (current user's bookings) ───────── */
router.get('/', protect, async (req: AuthRequest, res: Response): Promise<void> => {
  const { status } = req.query as { status?: string };
  const filter: Record<string, unknown> = { user: req.user!._id };
  if (status && status !== 'all') filter.status = status;

  const bookings = await Booking.find(filter).sort({ createdAt: -1 }).lean();
  res.json({ success: true, data: bookings });
});

/* ── POST /api/bookings  (create booking) ───────────────── */
router.post(
  '/',
  protect,
  [
    body('vehicleSlug').notEmpty().withMessage('Vehicle slug required'),
    body('startDate').notEmpty().withMessage('Start date required'),
    body('endDate').notEmpty().withMessage('End date required'),
    body('pickup').notEmpty().withMessage('Pickup location required'),
    body('payment').isIn(['Khalti', 'eSewa', 'Cash']).withMessage('Invalid payment method'),
    body('customerName').notEmpty().withMessage('Name required'),
    body('customerEmail').isEmail().withMessage('Valid email required'),
    body('customerPhone').notEmpty().withMessage('Phone required'),
    body('license').notEmpty().withMessage('License number required'),
  ],
  async (req: AuthRequest, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ success: false, errors: errors.array() });
      return;
    }

    const {
      vehicleSlug, startDate, endDate, pickup, dropoff,
      payment, customerName, customerEmail, customerPhone,
      license, couponCode,
    } = req.body as {
      vehicleSlug: string; startDate: string; endDate: string;
      pickup: string; dropoff?: string; payment: 'Khalti' | 'eSewa' | 'Cash';
      customerName: string; customerEmail: string; customerPhone: string;
      license: string; couponCode?: string;
    };

    const vehicle = await Vehicle.findOne({ slug: vehicleSlug });
    if (!vehicle) {
      res.status(404).json({ success: false, message: 'Vehicle not found.' });
      return;
    }

    // Calculate pricing
    const msPerDay = 86400000;
    const days = Math.max(1, Math.ceil((+new Date(endDate) - +new Date(startDate)) / msPerDay));
    const subtotal = vehicle.pricePerDay * days;
    const serviceFee = Math.round(subtotal * 0.05);
    const vat = Math.round(subtotal * 0.13);
    const discount = couponCode === 'DRIVE10' ? Math.round(subtotal * 0.1) : 0;
    const total = subtotal + serviceFee + vat - discount;

    const booking = await Booking.create({
      user: req.user!._id,
      vehicle: vehicle._id,
      vehicleName: vehicle.name,
      vehicleImage: vehicle.image,
      vehicleSlug: vehicle.slug,
      pickup,
      dropoff: dropoff || pickup,
      startDate,
      endDate,
      days,
      subtotal,
      serviceFee,
      vat,
      discount,
      total,
      status: 'upcoming',
      payment,
      customerName,
      customerEmail,
      customerPhone,
      license,
      couponCode,
    });

    // Fire & forget notification creation
    Notification.create({
      user: req.user!._id,
      type: 'booking',
      title: 'Booking Confirmed!',
      body: `Your booking for ${vehicle.name} has been reserved with Cash payment.`,
      href: '/dashboard',
    }).catch(console.error);

    // Send confirmation email
    sendEmail({
      to: customerEmail,
      subject: `Booking Confirmed: ${vehicle.name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Booking Confirmed!</h2>
          <p>Hi ${customerName},</p>
          <p>Your booking for the <strong>${vehicle.name}</strong> has been successfully reserved with <strong>Cash on Delivery/Pickup</strong>.</p>
          <p><strong>Pickup:</strong> ${new Date(startDate).toLocaleDateString()} at ${pickup}</p>
          <p><strong>Total Due:</strong> NPR ${total.toLocaleString()}</p>
          <p>Please have the exact amount ready upon pickup.</p>
          <p>Thank you for choosing DriveNepal!</p>
        </div>
      `,
    }).catch(console.error);

    res.status(201).json({ success: true, data: booking });
  },
);

/* ── PATCH /api/bookings/:id/cancel ─────────────────────── */
router.patch('/:id/cancel', protect, async (req: AuthRequest, res: Response): Promise<void> => {
  const booking = await Booking.findOne({ _id: req.params.id, user: req.user!._id });
  if (!booking) {
    res.status(404).json({ success: false, message: 'Booking not found.' });
    return;
  }
  if (booking.status !== 'upcoming') {
    res.status(400).json({ success: false, message: 'Only upcoming bookings can be cancelled.' });
    return;
  }
  booking.status = 'cancelled';
  await booking.save();

  Notification.create({
    user: req.user!._id,
    type: 'alert',
    title: 'Booking Cancelled',
    body: `Your booking for ${booking.vehicleName} has been cancelled successfully.`,
    href: '/dashboard',
  }).catch(console.error);

  res.json({ success: true, data: booking });
});

/* ── GET /api/admin/bookings (admin) ─────────────────────── */
router.get('/admin/all', protect, adminOnly, async (_req: AuthRequest, res: Response): Promise<void> => {
  const bookings = await Booking.find()
    .populate('user', 'name email')
    .sort({ createdAt: -1 })
    .lean();
  res.json({ success: true, data: bookings });
});

/* ── PATCH /api/admin/bookings/:id/status (admin) ─────────── */
router.patch(
  '/admin/:id/status',
  protect,
  adminOnly,
  async (req: AuthRequest, res: Response): Promise<void> => {
    const { status } = req.body as { status: string };
    const validStatuses = ['upcoming', 'active', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      res.status(400).json({ success: false, message: 'Invalid status.' });
      return;
    }
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );
    if (!booking) {
      res.status(404).json({ success: false, message: 'Booking not found.' });
      return;
    }

    // Notify user of status change
    Notification.create({
      user: booking.user,
      type: status === 'completed' ? 'payment' : 'message',
      title: `Booking ${status}`,
      body: `The status of your booking for ${booking.vehicleName} has been updated to ${status}.`,
      href: '/dashboard',
    }).catch(console.error);

    res.json({ success: true, data: booking });
  },
);

/* ── DELETE /api/admin/bookings/:id (admin) ─────────────── */
router.delete('/admin/:id', protect, adminOnly, async (req: AuthRequest, res: Response): Promise<void> => {
  const booking = await Booking.findByIdAndDelete(req.params.id);
  if (!booking) {
    res.status(404).json({ success: false, message: 'Booking not found.' });
    return;
  }
  res.json({ success: true, message: 'Booking deleted.' });
});

export default router;
