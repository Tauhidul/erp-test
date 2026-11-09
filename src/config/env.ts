import 'dotenv/config';

const withTrailingSlash = (url: string): string => (url.endsWith('/') ? url : `${url}/`);

export const env = {
  baseURL: process.env.MUKUT_BASE_URL ?? 'http://localhost:3000',
  /** Always ends with "/" so endpoints can be written without a leading slash. */
  apiURL: withTrailingSlash(process.env.MUKUT_API_URL ?? 'http://localhost:3000/api'),
  ci: !!process.env.CI,
} as const;
