"use client";

import { toast as sonnerToast, type ExternalToast } from "sonner";

type ToastType =
  | "success"
  | "error"
  | "info"
  | "warning"
  | "loading"
  | "default";

interface ToastOptions extends ExternalToast {
  type?: ToastType;
  description?: string;
  duration?: number;
}

/**
 * Custom toast utility with pre-configured options
 * Position: bottom-right
 * Types: success, error, info, warning, loading, default
 */
export const toast = {
  success: (message: string, options?: Omit<ToastOptions, "type">) => {
    return sonnerToast.success(message, options);
  },

  error: (message: string, options?: Omit<ToastOptions, "type">) => {
    return sonnerToast.error(message, options);
  },

  info: (message: string, options?: Omit<ToastOptions, "type">) => {
    return sonnerToast.info(message, options);
  },

  warning: (message: string, options?: Omit<ToastOptions, "type">) => {
    return sonnerToast.warning(message, options);
  },

  loading: (message: string, options?: Omit<ToastOptions, "type">) => {
    return sonnerToast.loading(message, options);
  },

  default: (message: string, options?: Omit<ToastOptions, "type">) => {
    return sonnerToast(message, options);
  },

  // Promise toast for async operations
  promise: <T,>(
    promise: Promise<T>,
    options: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: Error) => string);
    }
  ) => {
    return sonnerToast.promise(promise, options);
  },

  // Dismiss a specific toast or all toasts
  dismiss: (toastId?: string | number) => {
    sonnerToast.dismiss(toastId);
  },
};
