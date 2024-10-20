import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type DebounceFunction<F extends (...args: unknown[]) => void> = {
  (...args: Parameters<F>): void; // The debounced function itself
  cancel: () => void; // The cancel method
};

/**
 * Creates a debounced version of the provided function.
 *
 * @param func - The function to debounce.
 * @param delay - The debounce delay in milliseconds.
 * @returns A debounced version of the function with a cancel method.
 */
export function debounce<F extends (...args: unknown[]) => void>(
  func: F,
  delay: number
): DebounceFunction<F> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const debouncedFunction = function (...args: Parameters<F>): void {
    // Clear the previous timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Set a new timeout
    timeoutId = setTimeout(() => {
      func(...args); // Call the original function with the arguments
    }, delay);
  } as DebounceFunction<F>;

  debouncedFunction.cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = undefined; // Reset timeoutId
    }
  };

  return debouncedFunction;
}
