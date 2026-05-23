import axiosClient from './axiosClient';

export const adminService = {
  // --- AUTHENTICATION ---
  login: async (email, password) => {
    const response = await axiosClient.post('/auth/login', { email, password });
    return response.data;
  },
  logout: async () => {
    return await axiosClient.post('/auth/logout');
  },

  // --- MANAGE WISATA ---
  getAllWisata: async (page = 1) => {
    // Endpoint publik juga bisa dipakai admin untuk melihat list
    const response = await axiosClient.get(`/wisata?page=${page}`);
    return response.data;
  },
  createWisata: async (wisataData) => {
    const response = await axiosClient.post('/admin/wisata', wisataData);
    return response.data;
  },
  updateWisata: async (id, wisataData) => {
    const response = await axiosClient.put(`/admin/wisata/${id}`, wisataData);
    return response.data;
  },
  deleteWisata: async (id) => {
    const response = await axiosClient.delete(`/admin/wisata/${id}`);
    return response.data;
  },

  getWisataBySlug: async (slug) => {
    // Asumsi: Backend si B mendukung pencarian by slug untuk admin
    const response = await axiosClient.get(`/wisata/${slug}`);
    return response.data;
  },

  // --- MANAGE SCHEDULE ---
  createSchedule: async (scheduleData) => {
    const response = await axiosClient.post('/admin/schedules', scheduleData);
    return response.data;
  },

  // --- VERIFICATION & CHECK-IN ---
  getBookingsByStatus: async (status = 'WAITING_VERIFICATION') => {
    const response = await axiosClient.get(`/admin/bookings?status=${status}`);
    return response.data;
  },
  verifyBooking: async (id) => {
    const response = await axiosClient.put(`/admin/bookings/${id}/verify`);
    return response.data;
  },
  rejectBooking: async (id) => {
    const response = await axiosClient.put(`/admin/bookings/${id}/reject`);
    return response.data;
  },
  scanTicket: async (qrCode) => {
    const response = await axiosClient.post('/admin/bookings/scan', { qrCode });
    return response.data;
  },
  
  // --- MANAGE TAGS ---
  getTags: async () => {
    const response = await axiosClient.get('/tags');
    return response.data;
  }
};