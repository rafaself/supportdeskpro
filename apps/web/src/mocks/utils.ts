/**
 * Simulates a network request delay.
 * @param ms Delay in milliseconds (default: 500ms - 1500ms)
 */
export const delay = (ms?: number) => {
  const time = ms || Math.random() * 1000 + 500;
  return new Promise((resolve) => setTimeout(resolve, time));
};

/**
 * Simulates a successful API response.
 */
export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

/**
 * Generic mock request handler.
 * @param data The data to return on success.
 * @param shouldFail Whether the request should simulate a failure.
 */
export async function mockRequest<T>(
  data: T,
  shouldFail: boolean = false
): Promise<ApiResponse<T>> {
  await delay();

  if (shouldFail) {
    throw new Error('Simulated API Error: Something went wrong.');
  }

  return {
    data,
    status: 200,
    message: 'Success',
  };
}
