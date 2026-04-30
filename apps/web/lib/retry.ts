interface RetryOptions {
  readonly maxAttempts?: number;
  readonly delayMs?: number;
  readonly backoffFactor?: number;
}

/**
 * Retries an async function with exponential backoff.
 * @param fn - The async function to retry.
 * @param options - Configuration for retry behavior.
 * @throws The last error if all attempts fail.
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const { maxAttempts = 3, delayMs = 500, backoffFactor = 2 } = options;
  let lastError: unknown;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (attempt < maxAttempts - 1) {
        const wait = delayMs * Math.pow(backoffFactor, attempt);
        await new Promise((resolve) => setTimeout(resolve, wait));
      }
    }
  }
  throw lastError;
}
