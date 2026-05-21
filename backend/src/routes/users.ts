import { Router, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { User } from '../models/User.js';
import { Booking } from '../models/Booking.js';
import { protect, AuthRequest } from '../middleware/auth.js';
import { adminOnly } from '../middleware/admin.js';
import { Booking } from '../models/Booking.js';
import { upload } from '../middleware/upload.js';

const router = Router();

/* ── GET /api/users/me ───────────────────────────────────── */
router.get('/me', protect, async (req: AuthRequest, res: Response): Promise<void> => {
  const user = await User.findById(req.user!._id);
  if (!user) {
    res.status(404).json({ success: false, message: 'User not found.' });
    return;
  }
  res.json({
    success: true,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      license: user.license,
      city: user.city,
      avatar: user.avatar,
      role: user.role,
      createdAt: user.createdAt,
    },
  });
});

/* ── PUT /api/users/me ───────────────────────────────────── */
router.put(
  '/me',
  protect,
  [
    body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
    body('email').optional().isEmail().withMessage('Valid email required'),
    body('phone').optional(),
    body('license').optional(),
    body('city').optional(),
  ],
  async (req: AuthRequest, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ success: false, errors: errors.array() });
      return;
    }

    // Don't allow role change through this endpoint
    const { name, email, phone, license, city, avatar } = req.body as {
      name?: string; email?: string; phone?: string;
      license?: string; city?: string; avatar?: string;
    };

    const user = await User.findByIdAndUpdate(
      req.user!._id,
      { name, email, phone, license, city, avatar },
      { new: true, runValidators: true },
    );

    res.json({
      success: true,
      data: {
        _id: user!._id,
        name: user!.name,
        email: user!.email,
        phone: user!.phone,
        license: user!.license,
        city: user!.city,
        avatar: user!.avatar,
        role: user!.role,
      },
    });
  },
);

/* ── PATCH /api/users/profile/avatar ─────────────────────── */
router.patch(
  '/profile/avatar',
  protect,
  upload.single('image'),
  async (req: AuthRequest, res: Response): Promise<void> => {
    if (!req.file) {
      res.status(400).json({ success: false, message: 'No image uploaded' });
      return;
    }

    const user = await User.findByIdAndUpdate(
      req.user!._id,
      { avatar: req.file.path }, // Cloudinary returns the URL in req.file.path
      { new: true },
    );

    res.json({ success: true, data: user });
  },
);

/* ── PUT /api/users/me/password ─────────────────────────── */
router.put(
  '/me/password',
  protect,
  [
    body('currentPassword').notEmpty(),
    body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters'),
  ],
  async (req: AuthRequest, res: Response): Promise<void> => {
    const { currentPassword, newPassword } = req.body as {
      currentPassword: string; newPassword: string;
    };

    const user = await User.findById(req.user!._id).select('+password');
    if (!user || !(await user.comparePassword(currentPassword))) {
      res.status(401).json({ success: false, message: 'Current password is incorrect.' });
      return;
    }

    user.password = newPassword;
    await user.save();
    res.json({ success: true, message: 'Password updated successfully.' });
  },
);

/* ── GET /api/users/admin/all (admin) ────────────────────── */
router.get('/admin/all', protect, adminOnly, async (_req: AuthRequest, res: Response): Promise<void> => {
  const users = await User.find().sort({ createdAt: -1 }).lean();

  // Attach booking count to each user
  const usersWithBookings = await Promise.all(
    users.map(async (u) => {
      const bookingsCount = await Booking.countDocuments({ user: u._id });
      return { ...u, bookingsCount };
    }),
  );

  res.json({ success: true, data: usersWithBookings });
});

/* ── PATCH /api/users/admin/:id/status (admin) ───────────── */
router.patch(
  '/admin/:id/status',
  protect,
  adminOnly,
  async (req: AuthRequest, res: Response): Promise<void> => {
    const { isActive } = req.body as { isActive: boolean };
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isActive },
      { new: true },
    );
    if (!user) {
      res.status(404).json({ success: false, message: 'User not found.' });
      return;
    }
    res.json({ success: true, data: user });
  },
);

/* ── PATCH /api/users/admin/:id/role (admin) ────────────── */
router.patch(
  '/admin/:id/role',
  protect,
  adminOnly,
  async (req: AuthRequest, res: Response): Promise<void> => {
    const { role } = req.body as { role: 'user' | 'admin' };
    if (!['user', 'admin'].includes(role)) {
      res.status(400).json({ success: false, message: 'Invalid role.' });
      return;
    }
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
    if (!user) {
      res.status(404).json({ success: false, message: 'User not found.' });
      return;
    }
    res.json({ success: true, data: user });
  },
);

/* ── DELETE /api/users/admin/:id (admin) ────────────────── */
router.delete(
  '/admin/:id',
  protect,
  adminOnly,
  async (req: AuthRequest, res: Response): Promise<void> => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'User deleted.' });
  },
);

export default router;
