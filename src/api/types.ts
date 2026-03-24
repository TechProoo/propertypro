/**
 * Waitlist entry types
 */
export interface WaitlistEntry {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  type: UserType;
  location?: string;
  company_name?: string;
  created_at: string;
}

export const USER_TYPES = {
  REAL_ESTATE_AGENT: "REAL_ESTATE_AGENT",
  BUILDER: "BUILDER",
  BUILDING_MATERIALS_SUPPLIER_INSTALLER: "BUILDING_MATERIALS_SUPPLIER_INSTALLER",
  PARTNER_INVESTOR: "PARTNER_INVESTOR",
} as const;

export type UserType = typeof USER_TYPES[keyof typeof USER_TYPES];

/**
 * API Request DTOs
 */
export interface CreateWaitlistRequest {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  type: UserType;
  location?: string;
  company_name?: string;
}

export interface UpdateWaitlistRequest {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  type?: UserType;
  location?: string;
  company_name?: string;
}

/**
 * API Response types
 */
export interface ApiResponse<T = unknown> {
  statusCode?: number;
  message?: string;
  data?: T;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}

/**
 * Error response type
 */
export interface ApiError {
  statusCode: number;
  message: string;
  error?: string;
  details?: unknown;
}
