import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { Vehicle } from '../models/Vehicle.js';
import { protect, AuthRequest } from '../middleware/auth.js';
import { adminOnly } from '../middleware/admin.js';

const router = Router();

/* ── GET /api/vehicles ──────────────────────────────────── */
router.get('/', async (req: Request, res: Response): Promise<void> => {
  const { type, category, location, maxPrice, sort, q } = req.query as Record<string, string>;

  const filter: Record<string, unknown> = { isAvailable: true };

  if (type) filter.type = type;
  if (category && category !== 'All') filter.category = category;
  if (location) filter.location = location;
  if (maxPrice) filter.pricePerDay = { $lte: Number(maxPrice) };
  if (q) filter.$or = [
    { name: { $regex: q, $options: 'i' } },
    { brand: { $regex: q, $options: 'i' } },
  ];

  let query = Vehicle.find(filter);

  if (sort === 'price-asc') query = query.sort({ pricePerDay: 1 });
  else if (sort === 'price-desc') query = query.sort({ pricePerDay: -1 });
  else if (sort === 'rating') query = query.sort({ rating: -1 });
  else query = query.sort({ reviews: -1 }); // default: popular

  const vehicles = await query.lean();
  res.json({ success: true, data: vehicles });
});

/* ── GET /api/vehicles/:slug ────────────────────────────── */
router.get('/:slug', async (req: Request, res: Response): Promise<void> => {
  const vehicle = await Vehicle.findOne({ slug: req.params.slug }).lean();
  if (!vehicle) {
    res.status(404).json({ success: false, message: 'Vehicle not found.' });
    return;
  }
  res.json({ success: true, data: vehicle });
});

/* ── POST /api/vehicles (admin) ─────────────────────────── */
router.post(
  '/',
  protect,
  adminOnly,
  [
    body('slug').notEmpty().withMessage('Slug required'),
    body('name').notEmpty().withMessage('Name required'),
    body('brand').notEmpty().withMessage('Brand required'),
    body('type').isIn(['car', 'bike']).withMessage('Type must be car or bike'),
    body('pricePerDay').isNumeric().withMessage('Price must be a number'),
    body('fuel').isIn(['Petrol', 'Diesel', 'Electric', 'Hybrid']),
    body('transmission').isIn(['Automatic', 'Manual']),
    body('image').notEmpty().withMessage('Image URL required'),
    body('location').notEmpty().withMessage('Location required'),
  ],
  async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ success: false, errors: errors.array() });
      return;
    }

    const existing = await Vehicle.findOne({ slug: req.body.slug });
    if (existing) {
      res.status(409).json({ success: false, message: 'Vehicle with this slug already exists.' });
      return;
    }

    const vehicle = await Vehicle.create(req.body);
    res.status(201).json({ success: true, data: vehicle });
  },
);

/* ── PUT /api/vehicles/:id (admin) ─────────────────────── */
router.put(
  '/:id',
  protect,
  adminOnly,
  async (req: AuthRequest, res: Response): Promise<void> => {
    const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!vehicle) {
      res.status(404).json({ success: false, message: 'Vehicle not found.' });
      return;
    }
    res.json({ success: true, data: vehicle });
  },
);

/* ── DELETE /api/vehicles/:id (admin) ───────────────────── */
router.delete(
  '/:id',
  protect,
  adminOnly,
  async (req: AuthRequest, res: Response): Promise<void> => {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
    if (!vehicle) {
      res.status(404).json({ success: false, message: 'Vehicle not found.' });
      return;
    }
    res.json({ success: true, message: 'Vehicle deleted.' });
  },
);

export default router;
