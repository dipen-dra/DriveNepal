/**
 * Seed script — populates vehicles from mock data and creates a default admin.
 * Run: npm run seed
 * Safe to re-run: upserts vehicles, won't duplicate admin if email exists.
 */
import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import { Vehicle } from './models/Vehicle.js';
import { User } from './models/User.js';

const img = (q: string, w = 1200) =>
  `https://images.unsplash.com/${q}?auto=format&fit=crop&w=${w}&q=80`;

const vehicleData = [
  {
    slug: 'tesla-model-3', name: 'Tesla Model 3', brand: 'Tesla',
    type: 'car', category: 'Electric', pricePerDay: 12500, fuel: 'Electric',
    transmission: 'Automatic', seats: 5, rating: 4.9, reviews: 184,
    image: img('photo-1560958089-b8a1929cea89'),
    gallery: [img('photo-1560958089-b8a1929cea89'), img('photo-1554744512-d6c603f27c54'), img('photo-1617788138017-80ad40651399')],
    features: ['Autopilot', 'Panoramic Roof', 'Premium Audio', 'Fast Charging'],
    location: 'Kathmandu',
    description: 'Silent, swift, and Tesla-clean. Perfect for premium city drives across the valley.',
  },
  {
    slug: 'toyota-fortuner', name: 'Toyota Fortuner', brand: 'Toyota',
    type: 'car', category: 'SUV', pricePerDay: 9800, fuel: 'Diesel',
    transmission: 'Automatic', seats: 7, rating: 4.7, reviews: 221,
    image: img('photo-1606664515524-ed2f786a0bd6'),
    gallery: [img('photo-1606664515524-ed2f786a0bd6'), img('photo-1583121274602-3e2820c69888')],
    features: ['4WD', 'Cruise Control', 'Roof Rack', 'Hill Descent'],
    location: 'Pokhara',
    description: "A commanding SUV built for Nepal's mountain roads and family expeditions.",
  },
  {
    slug: 'bmw-3-series', name: 'BMW 3 Series', brand: 'BMW',
    type: 'car', category: 'Luxury', pricePerDay: 14500, fuel: 'Petrol',
    transmission: 'Automatic', seats: 5, rating: 4.8, reviews: 96,
    image: img('photo-1555215695-3004980ad54e'),
    gallery: [img('photo-1555215695-3004980ad54e'), img('photo-1503376780353-7e6692767b70')],
    features: ['Leather Interior', 'Navigation', 'Sport Mode', 'Heated Seats'],
    location: 'Kathmandu',
    description: 'The ultimate driving machine — refined, fast, and unmistakably German.',
  },
  {
    slug: 'hyundai-i20', name: 'Hyundai i20', brand: 'Hyundai',
    type: 'car', category: 'Economy', pricePerDay: 4200, fuel: 'Petrol',
    transmission: 'Manual', seats: 5, rating: 4.5, reviews: 312,
    image: img('photo-1549924231-f129b911e442'),
    gallery: [img('photo-1549924231-f129b911e442')],
    features: ['Bluetooth', 'USB Charging', 'AC', 'Fuel Efficient'],
    location: 'Kathmandu',
    description: 'Compact, efficient, and easy to park — your dependable everyday ride.',
  },
  {
    slug: 'porsche-911', name: 'Porsche 911', brand: 'Porsche',
    type: 'car', category: 'Sports', pricePerDay: 28000, fuel: 'Petrol',
    transmission: 'Automatic', seats: 4, rating: 5.0, reviews: 42,
    image: img('photo-1503376780353-7e6692767b70'),
    gallery: [img('photo-1503376780353-7e6692767b70'), img('photo-1555215695-3004980ad54e')],
    features: ['Launch Control', 'Sport Chrono', 'Carbon Trim', 'Premium Sound'],
    location: 'Kathmandu',
    description: 'An icon. Pure sports DNA wrapped in timeless silhouette.',
  },
  {
    slug: 'royal-enfield-himalayan', name: 'Royal Enfield Himalayan',
    brand: 'Royal Enfield', type: 'bike', category: 'Adventure',
    pricePerDay: 2800, fuel: 'Petrol', transmission: 'Manual', seats: 2,
    rating: 4.8, reviews: 410,
    image: img('photo-1568772585407-9361f9bf3a87'),
    gallery: [img('photo-1568772585407-9361f9bf3a87'), img('photo-1558981806-ec527fa84c39')],
    features: ['Off-road Tyres', 'Crash Guard', 'Pannier Mounts', 'Long Range Tank'],
    location: 'Pokhara',
    description: 'Built for the Himalayas. Conquer Mustang, Manang, and beyond.',
  },
  {
    slug: 'yamaha-r15', name: 'Yamaha R15 V4', brand: 'Yamaha',
    type: 'bike', category: 'Sports', pricePerDay: 2200, fuel: 'Petrol',
    transmission: 'Manual', seats: 2, rating: 4.7, reviews: 256,
    image: img('photo-1558981806-ec527fa84c39'),
    gallery: [img('photo-1558981806-ec527fa84c39')],
    features: ['Quick Shifter', 'Dual Channel ABS', 'Track Mode', 'LED Headlamp'],
    location: 'Kathmandu',
    description: 'Razor-sharp sports DNA in a featherweight chassis.',
  },
  {
    slug: 'honda-dio', name: 'Honda Dio', brand: 'Honda',
    type: 'bike', category: 'Scooter', pricePerDay: 900, fuel: 'Petrol',
    transmission: 'Automatic', seats: 2, rating: 4.6, reviews: 530,
    image: img('photo-1611241893603-3c359704e0ee'),
    gallery: [img('photo-1611241893603-3c359704e0ee')],
    features: ['Mobile Charger', 'Under-seat Storage', 'LED DRL', 'Eco Mode'],
    location: 'Kathmandu',
    description: 'Zip across the city. Stylish, light, and fuel-friendly.',
  },
  {
    slug: 'harley-iron-883', name: 'Harley-Davidson Iron 883',
    brand: 'Harley-Davidson', type: 'bike', category: 'Cruiser',
    pricePerDay: 5800, fuel: 'Petrol', transmission: 'Manual', seats: 2,
    rating: 4.9, reviews: 88,
    image: img('photo-1558981403-c5f9899a28bc'),
    gallery: [img('photo-1558981403-c5f9899a28bc')],
    features: ['V-Twin Engine', 'Classic Cruiser', 'Saddle Bags', 'Custom Pipes'],
    location: 'Kathmandu',
    description: 'The sound, the silhouette, the soul. An American legend.',
  },
];

async function seed() {
  await connectDB();
  console.log('🌱 Seeding database...');

  // Upsert vehicles
  for (const v of vehicleData) {
    await Vehicle.findOneAndUpdate({ slug: v.slug }, v, { upsert: true, new: true });
    console.log(`  ✅ Vehicle: ${v.name}`);
  }

  // Create default admin (only if no admin exists)
  const adminExists = await User.findOne({ role: 'admin' });
  if (!adminExists) {
    await User.create({
      name: 'DriveNepal Admin',
      email: 'admin@drivenepal.com',
      password: 'Admin@1234',
      role: 'admin',
      isActive: true,
    });
    console.log('  ✅ Admin created: admin@drivenepal.com / Admin@1234');
  } else {
    console.log('  ℹ️  Admin already exists, skipping.');
  }

  console.log('✅ Seeding complete!');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
