export type VehicleType = "car" | "bike";
export type Vehicle = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  type: VehicleType;
  category: string;
  pricePerDay: number; // NPR
  fuel: "Petrol" | "Diesel" | "Electric" | "Hybrid";
  transmission: "Automatic" | "Manual";
  seats: number;
  rating: number;
  reviews: number;
  image: string;
  gallery: string[];
  features: string[];
  location: string;
  description: string;
};

const img = (q: string, w = 1200) =>
  `https://images.unsplash.com/${q}?auto=format&fit=crop&w=${w}&q=80`;

export const vehicles: Vehicle[] = [
  {
    id: "v1", slug: "tesla-model-3", name: "Tesla Model 3", brand: "Tesla",
    type: "car", category: "Electric", pricePerDay: 12500, fuel: "Electric",
    transmission: "Automatic", seats: 5, rating: 4.9, reviews: 184,
    image: img("photo-1560958089-b8a1929cea89"),
    gallery: [img("photo-1560958089-b8a1929cea89"), img("photo-1554744512-d6c603f27c54"), img("photo-1617788138017-80ad40651399")],
    features: ["Autopilot", "Panoramic Roof", "Premium Audio", "Fast Charging"],
    location: "Kathmandu", description: "Silent, swift, and Tesla-clean. Perfect for premium city drives across the valley.",
  },
  {
    id: "v2", slug: "toyota-fortuner", name: "Toyota Fortuner", brand: "Toyota",
    type: "car", category: "SUV", pricePerDay: 9800, fuel: "Diesel",
    transmission: "Automatic", seats: 7, rating: 4.7, reviews: 221,
    image: img("photo-1606664515524-ed2f786a0bd6"),
    gallery: [img("photo-1606664515524-ed2f786a0bd6"), img("photo-1583121274602-3e2820c69888")],
    features: ["4WD", "Cruise Control", "Roof Rack", "Hill Descent"],
    location: "Pokhara", description: "A commanding SUV built for Nepal's mountain roads and family expeditions.",
  },
  {
    id: "v3", slug: "bmw-3-series", name: "BMW 3 Series", brand: "BMW",
    type: "car", category: "Luxury", pricePerDay: 14500, fuel: "Petrol",
    transmission: "Automatic", seats: 5, rating: 4.8, reviews: 96,
    image: img("photo-1555215695-3004980ad54e"),
    gallery: [img("photo-1555215695-3004980ad54e"), img("photo-1503376780353-7e6692767b70")],
    features: ["Leather Interior", "Navigation", "Sport Mode", "Heated Seats"],
    location: "Kathmandu", description: "The ultimate driving machine — refined, fast, and unmistakably German.",
  },
  {
    id: "v4", slug: "hyundai-i20", name: "Hyundai i20", brand: "Hyundai",
    type: "car", category: "Economy", pricePerDay: 4200, fuel: "Petrol",
    transmission: "Manual", seats: 5, rating: 4.5, reviews: 312,
    image: img("photo-1549924231-f129b911e442"),
    gallery: [img("photo-1549924231-f129b911e442")],
    features: ["Bluetooth", "USB Charging", "AC", "Fuel Efficient"],
    location: "Kathmandu", description: "Compact, efficient, and easy to park — your dependable everyday ride.",
  },
  {
    id: "v5", slug: "porsche-911", name: "Porsche 911", brand: "Porsche",
    type: "car", category: "Sports", pricePerDay: 28000, fuel: "Petrol",
    transmission: "Automatic", seats: 4, rating: 5.0, reviews: 42,
    image: img("photo-1503376780353-7e6692767b70"),
    gallery: [img("photo-1503376780353-7e6692767b70"), img("photo-1555215695-3004980ad54e")],
    features: ["Launch Control", "Sport Chrono", "Carbon Trim", "Premium Sound"],
    location: "Kathmandu", description: "An icon. Pure sports DNA wrapped in timeless silhouette.",
  },
  {
    id: "v6", slug: "royal-enfield-himalayan", name: "Royal Enfield Himalayan",
    brand: "Royal Enfield", type: "bike", category: "Adventure",
    pricePerDay: 2800, fuel: "Petrol", transmission: "Manual", seats: 2,
    rating: 4.8, reviews: 410, image: img("photo-1568772585407-9361f9bf3a87"),
    gallery: [img("photo-1568772585407-9361f9bf3a87"), img("photo-1558981806-ec527fa84c39")],
    features: ["Off-road Tyres", "Crash Guard", "Pannier Mounts", "Long Range Tank"],
    location: "Pokhara", description: "Built for the Himalayas. Conquer Mustang, Manang, and beyond.",
  },
  {
    id: "v7", slug: "yamaha-r15", name: "Yamaha R15 V4", brand: "Yamaha",
    type: "bike", category: "Sports", pricePerDay: 2200, fuel: "Petrol",
    transmission: "Manual", seats: 2, rating: 4.7, reviews: 256,
    image: img("photo-1558981806-ec527fa84c39"),
    gallery: [img("photo-1558981806-ec527fa84c39")],
    features: ["Quick Shifter", "Dual Channel ABS", "Track Mode", "LED Headlamp"],
    location: "Kathmandu", description: "Razor-sharp sports DNA in a featherweight chassis.",
  },
  {
    id: "v8", slug: "honda-dio", name: "Honda Dio", brand: "Honda",
    type: "bike", category: "Scooter", pricePerDay: 900, fuel: "Petrol",
    transmission: "Automatic", seats: 2, rating: 4.6, reviews: 530,
    image: img("photo-1611241893603-3c359704e0ee"),
    gallery: [img("photo-1611241893603-3c359704e0ee")],
    features: ["Mobile Charger", "Under-seat Storage", "LED DRL", "Eco Mode"],
    location: "Kathmandu", description: "Zip across the city. Stylish, light, and fuel-friendly.",
  },
  {
    id: "v9", slug: "harley-iron-883", name: "Harley-Davidson Iron 883",
    brand: "Harley-Davidson", type: "bike", category: "Cruiser",
    pricePerDay: 5800, fuel: "Petrol", transmission: "Manual", seats: 2,
    rating: 4.9, reviews: 88, image: img("photo-1558981403-c5f9899a28bc"),
    gallery: [img("photo-1558981403-c5f9899a28bc")],
    features: ["V-Twin Engine", "Classic Cruiser", "Saddle Bags", "Custom Pipes"],
    location: "Kathmandu", description: "The sound, the silhouette, the soul. An American legend.",
  },
];

export const locations = [
  { id: "ktm", name: "Kathmandu", count: 42 },
  { id: "pkr", name: "Pokhara", count: 28 },
  { id: "ctw", name: "Chitwan", count: 14 },
  { id: "ltn", name: "Lumbini", count: 9 },
  { id: "btl", name: "Butwal", count: 11 },
  { id: "drn", name: "Dharan", count: 7 },
];

export const testimonials = [
  { name: "Aayush Karki", role: "Traveler, Kathmandu", text: "Booked a Himalayan for a Mustang trip — flawless from start to finish. The bike was spotless.", rating: 5 },
  { name: "Sneha Maharjan", role: "Designer, Pokhara", text: "Rented a Tesla for a weekend. The handover was 5 minutes. Felt like Apple-level service.", rating: 5 },
  { name: "Bikash Thapa", role: "Founder, Lalitpur", text: "Used DriveNepal twice for client visits. Professional, on-time, and the pricing is honest.", rating: 5 },
  { name: "Priya Shrestha", role: "Photographer", text: "Loved the booking flow. Picked the SUV, paid via Khalti, done. Zero friction.", rating: 5 },
];

export const faqs = [
  { q: "What documents do I need to rent?", a: "A valid driving license, citizenship or passport, and one of: Khalti, eSewa, or cash deposit at pickup." },
  { q: "Is there a security deposit?", a: "Yes. Refundable deposits range from NPR 5,000 to 25,000 depending on the vehicle category, returned within 24 hours of drop-off." },
  { q: "Can I cancel my booking?", a: "Free cancellation up to 24 hours before pickup. After that, a 20% fee applies." },
  { q: "Do you offer delivery?", a: "Inside Kathmandu Valley and Pokhara, we deliver free for bookings of 3+ days." },
  { q: "What if the vehicle breaks down?", a: "Our 24/7 roadside team will reach you within 90 minutes anywhere on a paved highway in Nepal." },
];

export const getVehicleBySlug = (slug: string) => vehicles.find((v) => v.slug === slug);
