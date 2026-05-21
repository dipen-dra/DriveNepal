/**
 * Centralized API client for DriveNepal.
 * All requests go through /api (proxied to localhost:5000 in dev).
 */

const BASE = '/api';

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public errors?: Array<{ msg: string; path?: string }>,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function request<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    credentials: 'include',
    ...options,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new ApiError(
      res.status,
      (data as { message?: string }).message || 'Something went wrong',
      (data as { errors?: Array<{ msg: string; path?: string }> }).errors,
    );
  }

  return data as T;
}

// ── Types ──────────────────────────────────────────────────

export type UserRole = 'user' | 'admin';

export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  license?: string;
  city?: string;
  avatar?: string;
  role: UserRole;
  createdAt?: string;
  isActive?: boolean;
  bookingsCount?: number;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: UserProfile;
}

export type VehicleType = 'car' | 'bike';
export interface Vehicle {
  _id: string;
  slug: string;
  name: string;
  brand: string;
  type: VehicleType;
  category: string;
  pricePerDay: number;
  fuel: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
  transmission: 'Automatic' | 'Manual';
  seats: number;
  rating: number;
  reviews: number;
  image: string;
  gallery: string[];
  features: string[];
  location: string;
  description: string;
  isAvailable: boolean;
}

export type BookingStatus = 'upcoming' | 'active' | 'completed' | 'cancelled';
export interface Booking {
  _id: string;
  bookingId: string;
  vehicleName: string;
  vehicleImage: string;
  vehicleSlug: string;
  pickup: string;
  dropoff: string;
  startDate: string;
  endDate: string;
  days: number;
  subtotal: number;
  serviceFee: number;
  vat: number;
  discount: number;
  total: number;
  status: BookingStatus;
  payment: 'Khalti' | 'eSewa' | 'Cash';
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  license: string;
  couponCode?: string;
  createdAt: string;
  user?: { name: string; email: string };
}

export interface AdminStats {
  revenue: number;
  activeBookings: number;
  totalBookings: number;
  totalVehicles: number;
  totalUsers: number;
  dailyRevenue: Array<{ _id: number; revenue: number; count: number }>;
}

// ── Auth ───────────────────────────────────────────────────

export const loginUser = (email: string, password: string) =>
  request<AuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

export const registerUser = (name: string, email: string, password: string) =>
  request<AuthResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });

export const logoutUser = () =>
  request<{ success: boolean }>('/auth/logout', { method: 'POST' });

export const getMe = () =>
  request<{ success: boolean; user: UserProfile }>('/auth/me');

export const forgotPassword = (email: string) =>
  request<{ success: boolean; message: string; resetUrl?: string }>('/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });

export const resetPassword = (token: string, password: string) =>
  request<{ success: boolean; message: string }>('/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify({ token, password }),
  });

// ── Vehicles ───────────────────────────────────────────────

export interface VehicleFilters {
  type?: string;
  category?: string;
  location?: string;
  maxPrice?: number;
  sort?: string;
  q?: string;
}

export const getVehicles = (filters: VehicleFilters = {}) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([k, v]) => {
    if (v !== undefined && v !== '') params.set(k, String(v));
  });
  const qs = params.toString();
  return request<{ success: boolean; data: Vehicle[] }>(`/vehicles${qs ? `?${qs}` : ''}`);
};

export const getVehicle = (slug: string) =>
  request<{ success: boolean; data: Vehicle }>(`/vehicles/${slug}`);

export const createVehicle = (data: Partial<Vehicle>) =>
  request<{ success: boolean; data: Vehicle }>('/vehicles', {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const updateVehicle = (id: string, data: Partial<Vehicle>) =>
  request<{ success: boolean; data: Vehicle }>(`/vehicles/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

export const deleteVehicle = (id: string) =>
  request<{ success: boolean; message: string }>(`/vehicles/${id}`, { method: 'DELETE' });

// ── Bookings ───────────────────────────────────────────────

export interface CreateBookingPayload {
  vehicleSlug: string;
  startDate: string;
  endDate: string;
  pickup: string;
  dropoff?: string;
  payment: 'Khalti' | 'eSewa' | 'Cash';
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  license: string;
  couponCode?: string;
}

export const getMyBookings = (status?: string) => {
  const qs = status && status !== 'all' ? `?status=${status}` : '';
  return request<{ success: boolean; data: Booking[] }>(`/bookings${qs}`);
};

export const createBooking = (payload: CreateBookingPayload) =>
  request<{ success: boolean; data: Booking }>('/bookings', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const cancelBooking = (id: string) =>
  request<{ success: boolean; data: Booking }>(`/bookings/${id}/cancel`, { method: 'PATCH' });

export const getAllBookings = () =>
  request<{ success: boolean; data: Booking[] }>('/bookings/admin/all');

export const updateBookingStatus = (id: string, status: BookingStatus) =>
  request<{ success: boolean; data: Booking }>(`/bookings/admin/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });

export const deleteBooking = (id: string) =>
  request<{ success: boolean }>(`/bookings/admin/${id}`, { method: 'DELETE' });

// ── Users ──────────────────────────────────────────────────

export const updateProfile = (data: Partial<UserProfile>) =>
  request<{ success: boolean; data: UserProfile }>('/users/me', {
    method: 'PUT',
    body: JSON.stringify(data),
  });

export const changePassword = (currentPassword: string, newPassword: string) =>
  request<{ success: boolean; message: string }>('/users/me/password', {
    method: 'PUT',
    body: JSON.stringify({ currentPassword, newPassword }),
  });

export const getAllUsers = () =>
  request<{ success: boolean; data: UserProfile[] }>('/users/admin/all');

export const updateUserStatus = (id: string, isActive: boolean) =>
  request<{ success: boolean; data: UserProfile }>(`/users/admin/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ isActive }),
  });

export const updateUserRole = (id: string, role: UserRole) =>
  request<{ success: boolean; data: UserProfile }>(`/users/admin/${id}/role`, {
    method: 'PATCH',
    body: JSON.stringify({ role }),
  });

export const deleteUser = (id: string) =>
  request<{ success: boolean }>(`/users/admin/${id}`, { method: 'DELETE' });

// ── Admin ──────────────────────────────────────────────────

export const getAdminStats = () =>
  request<{ success: boolean; data: AdminStats }>('/admin/stats');
