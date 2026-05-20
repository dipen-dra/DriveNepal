import { vehicles } from "./mock-data";

export type BookingStatus = "upcoming" | "active" | "completed" | "cancelled";
export type Booking = {
  id: string;
  vehicleSlug: string;
  vehicleName: string;
  vehicleImage: string;
  pickup: string;
  dropoff: string;
  startDate: string;
  endDate: string;
  days: number;
  total: number;
  status: BookingStatus;
  payment: "Khalti" | "eSewa" | "Cash";
  customer: string;
  customerEmail: string;
};

const v = (slug: string) => vehicles.find((x) => x.slug === slug)!;

export const bookings: Booking[] = [
  {
    id: "DN-10248", vehicleSlug: "tesla-model-3", vehicleName: v("tesla-model-3").name,
    vehicleImage: v("tesla-model-3").image, pickup: "Kathmandu HQ", dropoff: "Kathmandu HQ",
    startDate: "2026-05-22", endDate: "2026-05-25", days: 3, total: 37500,
    status: "upcoming", payment: "Khalti", customer: "Aayush Karki", customerEmail: "aayush@mail.com",
  },
  {
    id: "DN-10239", vehicleSlug: "royal-enfield-himalayan", vehicleName: v("royal-enfield-himalayan").name,
    vehicleImage: v("royal-enfield-himalayan").image, pickup: "Pokhara Lakeside", dropoff: "Pokhara Lakeside",
    startDate: "2026-05-18", endDate: "2026-05-21", days: 3, total: 9600,
    status: "active", payment: "eSewa", customer: "Sneha Maharjan", customerEmail: "sneha@mail.com",
  },
  {
    id: "DN-10201", vehicleSlug: "toyota-fortuner", vehicleName: v("toyota-fortuner").name,
    vehicleImage: v("toyota-fortuner").image, pickup: "Kathmandu HQ", dropoff: "Chitwan",
    startDate: "2026-04-10", endDate: "2026-04-14", days: 4, total: 39200,
    status: "completed", payment: "Khalti", customer: "Bikash Thapa", customerEmail: "bikash@mail.com",
  },
  {
    id: "DN-10185", vehicleSlug: "bmw-3-series", vehicleName: v("bmw-3-series").name,
    vehicleImage: v("bmw-3-series").image, pickup: "Kathmandu HQ", dropoff: "Kathmandu HQ",
    startDate: "2026-03-28", endDate: "2026-03-30", days: 2, total: 29000,
    status: "completed", payment: "Cash", customer: "Priya Shrestha", customerEmail: "priya@mail.com",
  },
  {
    id: "DN-10172", vehicleSlug: "hyundai-i20", vehicleName: v("hyundai-i20").name,
    vehicleImage: v("hyundai-i20").image, pickup: "Kathmandu HQ", dropoff: "Kathmandu HQ",
    startDate: "2026-03-15", endDate: "2026-03-16", days: 1, total: 4200,
    status: "cancelled", payment: "Khalti", customer: "Aayush Karki", customerEmail: "aayush@mail.com",
  },
];

export const currentUser = {
  name: "Aayush Karki",
  email: "aayush@mail.com",
  phone: "+977 98XXXXXXXX",
  joined: "2024-11-02",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
  license: "12-345-67890",
  city: "Kathmandu",
};

export const savedVehicleSlugs = ["bmw-3-series", "harley-davidson-iron-883", "tesla-model-3"];

export const adminUsers = [
  { id: "U-001", name: "Aayush Karki", email: "aayush@mail.com", bookings: 7, joined: "2024-11-02", status: "active" },
  { id: "U-002", name: "Sneha Maharjan", email: "sneha@mail.com", bookings: 4, joined: "2025-01-14", status: "active" },
  { id: "U-003", name: "Bikash Thapa", email: "bikash@mail.com", bookings: 12, joined: "2024-08-21", status: "active" },
  { id: "U-004", name: "Priya Shrestha", email: "priya@mail.com", bookings: 2, joined: "2025-09-03", status: "active" },
  { id: "U-005", name: "Rohan KC", email: "rohan@mail.com", bookings: 0, joined: "2026-04-19", status: "suspended" },
];
