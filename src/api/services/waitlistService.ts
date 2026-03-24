import apiClient from "../client";
import type {
  WaitlistEntry,
  CreateWaitlistRequest,
  UpdateWaitlistRequest,
} from "../types";

/**
 * Waitlist API Service
 * Handles all waitlist-related API calls
 */
const waitlistService = {
  /**
   * Get all waitlist entries
   */
  getAll: async (): Promise<WaitlistEntry[]> => {
    const { data } = await apiClient.get<WaitlistEntry[]>("/waitlist");
    return data;
  },

  /**
   * Get a single waitlist entry by ID
   */
  getById: async (id: string): Promise<WaitlistEntry> => {
    const { data } = await apiClient.get<WaitlistEntry>(`/waitlist/${id}`);
    return data;
  },

  /**
   * Create a new waitlist entry
   */
  create: async (
    payload: CreateWaitlistRequest
  ): Promise<WaitlistEntry> => {
    const { data } = await apiClient.post<WaitlistEntry>(
      "/waitlist",
      payload
    );
    return data;
  },

  /**
   * Update a waitlist entry
   */
  update: async (
    id: string,
    payload: UpdateWaitlistRequest
  ): Promise<WaitlistEntry> => {
    const { data } = await apiClient.patch<WaitlistEntry>(
      `/waitlist/${id}`,
      payload
    );
    return data;
  },

  /**
   * Delete a waitlist entry
   */
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/waitlist/${id}`);
  },

  /**
   * Bulk delete waitlist entries
   */
  bulkDelete: async (ids: string[]): Promise<void> => {
    await apiClient.post("/waitlist/bulk-delete", { ids });
  },

  /**
   * Export waitlist entries (returns CSV content)
   */
  export: async (): Promise<Blob> => {
    const { data } = await apiClient.get("/waitlist/export", {
      responseType: "blob",
    });
    return data;
  },

  /**
   * Send email to a waitlist entry
   */
  sendEmail: async (
    id: string,
    payload: {
      to: string;
      subject: string;
      text: string;
      html?: string;
    }
  ): Promise<{ success: boolean; message: string }> => {
    const { data } = await apiClient.post<{ success: boolean; message: string }>(
      `/waitlist/${id}/send-email`,
      payload
    );
    return data;
  },
};

export default waitlistService;
