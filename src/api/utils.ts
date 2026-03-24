import { AxiosError } from "axios";
import type { ApiError } from "./types";

/**
 * Extract user-friendly error message from API error
 */
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    const data = error.response?.data as ApiError | undefined;

    // Handle backend error response
    if (data?.message) {
      return data.message;
    }

    // Handle specific status codes
    switch (error.response?.status) {
      case 400:
        return "Invalid request. Please check your input.";
      case 401:
        return "Please log in to continue.";
      case 403:
        return "You don't have permission to perform this action.";
      case 404:
        return "The requested resource was not found.";
      case 409:
        return "This resource already exists.";
      case 500:
        return "Server error. Please try again later.";
      case 503:
        return "Service unavailable. Please try again later.";
      default:
        return error.message || "An unexpected error occurred";
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred";
};

/**
 * Check if error is due to network issues
 */
export const isNetworkError = (error: unknown): boolean => {
  if (error instanceof AxiosError) {
    return !error.response || error.code === "ECONNABORTED";
  }
  return false;
};

/**
 * Check if error is validation error
 */
export const isValidationError = (error: unknown): boolean => {
  if (error instanceof AxiosError) {
    return error.response?.status === 400;
  }
  return false;
};

/**
 * Format API error for logging
 */
export const formatApiError = (error: unknown): object => {
  if (error instanceof AxiosError) {
    return {
      status: error.response?.status,
      message: error.message,
      url: error.config?.url,
      method: error.config?.method,
      data: error.response?.data,
      timestamp: new Date().toISOString(),
    };
  }

  return {
    error: String(error),
    timestamp: new Date().toISOString(),
  };
};
