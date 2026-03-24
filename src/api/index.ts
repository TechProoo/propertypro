import waitlistService from "./services/waitlistService";

/**
 * Central API service export
 * All API endpoints are accessed through these services
 */
export const api = {
  waitlist: waitlistService,
};

/**
 * Usage:
 * import { api } from '@/api'
 *
 * // Get all waitlist entries
 * const entries = await api.waitlist.getAll()
 *
 * // Create a new entry
 * const entry = await api.waitlist.create({
 *   first_name: "John",
 *   last_name: "Doe",
 *   email: "john@example.com",
 *   phone: "+234 801 234 5678",
 *   type: UserType.REAL_ESTATE_AGENT
 * })
 */

export default api;
