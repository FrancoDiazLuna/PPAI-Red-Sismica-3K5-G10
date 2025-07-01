/**
 * Utility functions for consistent error handling across the application
 */

export interface ErrorWithMessage {
  message: string;
}

/**
 * Type guard to check if an error has a message property
 */
export function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as Record<string, unknown>).message === "string"
  );
}

/**
 * Converts any error to an error with a message property
 */
export function toErrorWithMessage(error: unknown): ErrorWithMessage {
  if (isErrorWithMessage(error)) return error;

  try {
    return new Error(JSON.stringify(error));
  } catch {
    // fallback in case there's an error stringifying the error
    return new Error(String(error));
  }
}

/**
 * Gets a string message from any error
 */
export function getErrorMessage(error: unknown): string {
  return toErrorWithMessage(error).message;
}
