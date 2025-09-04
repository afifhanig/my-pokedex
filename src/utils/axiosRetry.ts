import type { AxiosInstance } from "axios";

export function withExponentialRetry(
  instance: AxiosInstance,
  { retries = 3, baseDelayMs = 300 } = {}
) {
  instance.interceptors.response.use(
    (res) => res,
    async (error) => {
      const cfg: any = error.config || {};
      cfg.__retryCount = cfg.__retryCount ?? 0;
      const status = error?.response?.status;
      const shouldRetry =
        (!status || status >= 500) && cfg.__retryCount < retries;
      if (!shouldRetry) throw error;
      cfg.__retryCount++;
      const delay = Math.pow(2, cfg.__retryCount) * baseDelayMs;
      await new Promise((r) => setTimeout(r, delay));
      return instance(cfg);
    }
  );
}
