/**
 * Seed historical data spanning the last 3 months.
 * Populates:
 *  - Core vehicles (upserted)
 *  - 10 mock users
 *  - 60 bookings spread across the last 90 days (active, completed, cancelled, upcoming) with accurate pricing
 *  - 12 contact queries (some replied, some pending)
 * Run via: npx tsx src/seed_history.ts
 */
import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import { Vehicle } from './models/Vehicle.js';
import { User } from './models/User.js';
import { Booking } from './models/Booking.js';
import { Query } from './models/Query.js';

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

const mockUserData = [
  { name: 'John Doe', email: 'john@drivenepal.com', phone: '9841234567', city: 'Kathmandu', license: '01-02-123456' },
  { name: 'Alice Smith', email: 'alice@drivenepal.com', phone: '9851122334', city: 'Pokhara', license: '03-05-987654' },
  { name: 'Rohan Shrestha', email: 'rohan@drivenepal.com', phone: '9801122334', city: 'Lalitpur', license: '05-01-246810' },
  { name: 'Sita Thapa', email: 'sita@drivenepal.com', phone: '9811122334', city: 'Bhaktapur', license: '04-02-135791' },
  { name: 'David Miller', email: 'david@drivenepal.com', phone: '9861122334', city: 'Kathmandu', license: '02-09-998877' },
  { name: 'Pranisha Gurung', email: 'pranisha@drivenepal.com', phone: '9845122334', city: 'Pokhara', license: '06-03-334455' },
  { name: 'Bijay Adhikari', email: 'bijay@drivenepal.com', phone: '9808122334', city: 'Kathmandu', license: '01-08-445566' },
  { name: 'Kiran KC', email: 'kiran@drivenepal.com', phone: '9818122334', city: 'Lalitpur', license: '05-04-112233' },
  { name: 'Sophie Watson', email: 'sophie@drivenepal.com', phone: '9854122334', city: 'Kathmandu', license: '02-03-667788' },
  { name: 'Aarav Pandey', email: 'aarav@drivenepal.com', phone: '9863122334', city: 'Kathmandu', license: '01-12-887766' },
];

const querySubjects = [
  { subject: 'Snow Chains Availability', message: 'Do your SUVs come with snow chains for mountain travel in winter?' },
  { subject: 'Airport Pickup details', message: 'Is it possible to drop off the Fortuner directly at Tribhuvan International Airport?' },
  { subject: 'Insurance coverage query', message: 'What does the maximum insurance cover in case of dent or scratches on gravel roads?' },
  { subject: 'Rent with driver option', message: 'Do you offer a driver along with the rental option? If yes, what is the daily rate?' },
  { subject: 'Kilometer limitations', message: 'Are there any daily kilometer limits, or is it unlimited driving within Nepal?' },
  { subject: 'Off-road bike preparation', message: 'Are the Himalayan bikes equipped with panniers and crash guards before delivery?' },
  { subject: 'Booking cancellation refund', message: 'If I cancel my booking 24 hours in advance, do I get a full refund to my eSewa wallet?' },
  { subject: 'License requirements for foreigners', message: 'Is an international driving permit required for foreign citizens to rent a car here?' },
  { subject: 'Extended rental request', message: 'I need a vehicle for 3 months. Do you offer long-term corporate rates?' },
  { subject: 'Payment confirmation issue', message: 'I initiated an eSewa payment but the page got disconnected. How can I verify my booking status?' },
];

const locations = ['Kathmandu', 'Pokhara', 'Lalitpur', 'Bhaktapur'];
const paymentMethods: Array<'Khalti' | 'eSewa' | 'Cash'> = ['eSewa', 'Khalti', 'Cash'];
const insurances = ['basic', 'plus', 'max'];
const coreAddons = ['driver', 'gps', 'child', 'helmet'];

async function seedHistory() {
  await connectDB();
  console.log('🌱 Starting Historical Database Seeding...');

  // 1. Seed Vehicles
  const seededVehicles: any[] = [];
  for (const v of vehicleData) {
    const doc = await Vehicle.findOneAndUpdate({ slug: v.slug }, v, { upsert: true, new: true });
    seededVehicles.push(doc);
  }
  console.log(`✅ Upserted ${seededVehicles.length} vehicles.`);

  // 2. Seed Admin User
  const adminExists = await User.findOne({ role: 'admin' });
  let adminId: mongoose.Types.ObjectId;
  if (!adminExists) {
    const admin = await User.create({
      name: 'DriveNepal Admin',
      email: 'admin@drivenepal.com',
      password: 'Admin@1234',
      role: 'admin',
      isActive: true,
    });
    adminId = admin._id;
    console.log('✅ Admin created: admin@drivenepal.com / Admin@1234');
  } else {
    adminId = adminExists._id;
    console.log('ℹ️ Admin already exists.');
  }

  // 3. Clear existing historical data to prevent duplicate bloat (Safe target matching)
  await User.deleteMany({ email: { $regex: /@drivenepal\.com$/ }, role: 'user' });
  await Booking.deleteMany({});
  await Query.deleteMany({});
  console.log('🧹 Cleaned up old mock users, bookings, and queries.');

  // 4. Create Mock Users
  const seededUsers: any[] = [];
  for (const u of mockUserData) {
    const userDoc = await User.create({
      ...u,
      password: 'Password123!',
      role: 'user',
      isActive: true,
      authProvider: 'local',
    });
    seededUsers.push(userDoc);
  }
  console.log(`✅ Seeded ${seededUsers.length} mock users.`);

  // 5. Generate Bookings Over Last 90 Days
  console.log('🕒 Generating 60 historical bookings...');
  const now = new Date();
  
  for (let i = 0; i < 60; i++) {
    const user = seededUsers[Math.floor(Math.random() * seededUsers.length)];
    const vehicle = seededVehicles[Math.floor(Math.random() * seededVehicles.length)];
    
    // Distribute bookings across the last 90 days
    const daysOffset = Math.floor(Math.random() * 90);
    const bookingDate = new Date();
    bookingDate.setDate(now.getDate() - daysOffset);

    // Duration of rental (1 to 7 days)
    const rentalDays = Math.floor(Math.random() * 6) + 1;
    
    const startDateObj = new Date(bookingDate);
    const endDateObj = new Date(bookingDate);
    endDateObj.setDate(startDateObj.getDate() + rentalDays);

    const startDateStr = startDateObj.toISOString().split('T')[0];
    const endDateStr = endDateObj.toISOString().split('T')[0];

    const pickup = locations[Math.floor(Math.random() * locations.length)];
    const dropoff = Math.random() > 0.7 ? locations[Math.floor(Math.random() * locations.length)] : pickup;
    
    // Choose status
    let status: 'upcoming' | 'active' | 'completed' | 'cancelled' = 'completed';
    if (startDateObj > now) {
      status = 'upcoming';
    } else if (startDateObj <= now && endDateObj >= now) {
      status = 'active';
    } else {
      status = Math.random() > 0.85 ? 'cancelled' : 'completed';
    }

    const payment = paymentMethods[Math.floor(Math.random() * paymentMethods.length)];
    const insurance = insurances[Math.floor(Math.random() * insurances.length)];
    
    // Select dynamic addons
    const selectedAddons: string[] = [];
    if (Math.random() > 0.4) {
      selectedAddons.push(coreAddons[Math.floor(Math.random() * coreAddons.length)]);
    }

    // Pricing calculation
    const insurancePrices: Record<string, number> = { basic: 0, plus: 450, max: 850 };
    const addonPrices: Record<string, number> = { driver: 1800, gps: 200, child: 250, helmet: 100 };

    const insurancePrice = insurancePrices[insurance] ?? 0;
    const addonsPrice = selectedAddons.reduce((sum, id) => sum + (addonPrices[id] ?? 0), 0);

    const subtotal = vehicle.pricePerDay * rentalDays + (insurancePrice + addonsPrice) * rentalDays;
    const serviceFee = Math.round(subtotal * 0.05);
    const dropOffFee = (dropoff !== pickup) ? 800 : 0;
    const vat = Math.round((subtotal + dropOffFee) * 0.13);
    const discount = Math.random() > 0.7 ? Math.round(subtotal * 0.1) : 0; // 10% coupon
    const total = subtotal + serviceFee + vat + dropOffFee - discount;

    const booking = await Booking.create({
      user: user._id,
      vehicle: vehicle._id,
      vehicleName: vehicle.name,
      vehicleImage: vehicle.image,
      vehicleSlug: vehicle.slug,
      pickup,
      dropoff,
      startDate: startDateStr,
      endDate: endDateStr,
      days: rentalDays,
      subtotal,
      serviceFee,
      vat,
      discount,
      total,
      status,
      payment,
      customerName: user.name,
      customerEmail: user.email,
      customerPhone: user.phone,
      license: user.license,
      couponCode: discount > 0 ? 'DRIVE10' : undefined,
      insurance,
      addons: selectedAddons,
      serverValidated: true,
    });

    // Manually force DB timestamps to the historical date
    await Booking.updateOne(
      { _id: booking._id },
      { $set: { createdAt: bookingDate, updatedAt: bookingDate } }
    );
  }
  console.log('✅ Generated 60 bookings with accurate timestamps and stats.');

  // 6. Seed Contact Queries
  console.log('✉️ Generating 12 support queries...');
  for (let i = 0; i < 12; i++) {
    const user = seededUsers[Math.floor(Math.random() * seededUsers.length)];
    const qData = querySubjects[Math.floor(Math.random() * querySubjects.length)];
    
    const daysOffset = Math.floor(Math.random() * 90);
    const queryDate = new Date();
    queryDate.setDate(now.getDate() - daysOffset);

    const isReplied = Math.random() > 0.4;
    let reply: string | undefined;
    let repliedAt: Date | undefined;

    if (isReplied) {
      reply = `Hello ${user.name}, thank you for reaching out. Regarding your inquiry on '${qData.subject}': Yes, we fully support this. Let us know if you need any additional assistance. Best, DriveNepal Team.`;
      repliedAt = new Date(queryDate);
      repliedAt.setHours(repliedAt.getHours() + Math.floor(Math.random() * 24) + 1);
    }

    const query = await Query.create({
      user: Math.random() > 0.2 ? user._id : undefined, // Some guest queries, some authenticated
      name: user.name,
      email: user.email,
      subject: qData.subject,
      message: qData.message,
      reply,
      isReplied,
      repliedAt,
    });

    await Query.updateOne(
      { _id: query._id },
      { $set: { createdAt: queryDate, updatedAt: queryDate } }
    );
  }
  console.log('✅ Generated 12 customer support tickets.');

  console.log('🏁 Database Seeding Successful!');
  await mongoose.disconnect();
}

seedHistory().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
