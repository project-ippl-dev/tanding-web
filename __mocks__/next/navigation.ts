const mockRouter = {
  basePath: '',
  pathname: '/',
  route: '/',
  query: {},
  asPath: '/',
  push: jest.fn((url: string) => Promise.resolve(true)),
  replace: jest.fn(() => Promise.resolve(true)),
  reload: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  prefetch: jest.fn(() => Promise.resolve()),
  beforePopState: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  isFallback: false,
  isLocaleDomain: false,
  isReady: true,
  isPreview: false,
};

const mockSearchParams = {
  get: jest.fn((param: string) => null), // Default: return null for any param
  getAll: jest.fn((param: string) => []),
  has: jest.fn((param: string) => false),
  forEach: jest.fn(),
  append: jest.fn(),
  set: jest.fn(),
  delete: jest.fn(),
  sort: jest.fn(),
  toString: jest.fn(() => ''),
  entries: jest.fn(() => [].values() as IterableIterator<[string, string]>),
  keys: jest.fn(() => [].values() as IterableIterator<string>),
  values: jest.fn(() => [].values() as IterableIterator<string>),
  [Symbol.iterator]: jest.fn(() => [].values() as IterableIterator<[string, string]>),
};

const mockPathname = jest.fn(() => '/');

// Exporting the mocks so they can be imported and spied upon in tests if needed
export const __mockRouter = mockRouter;
export const __mockSearchParams = mockSearchParams;
export const __mockPathname = mockPathname;

export const useRouter = jest.fn(() => mockRouter);
export const useParams = jest.fn();
export const useSearchParams = jest.fn(() => mockSearchParams);
export const usePathname = jest.fn(mockPathname); // Call the mockPathname to allow spying on its return value changes
export const redirect = jest.fn();
export const permanentRedirect = jest.fn();
export const notFound = jest.fn();

// Re-exporting with module.exports for broader compatibility if some setups prefer it,
// though ES6 exports are generally preferred with TypeScript.
module.exports = {
  ...jest.requireActual('next/navigation'), // Important to spread actual to not break other exports
  useRouter,
  useSearchParams,
  useParams,
  usePathname,
  redirect,
  permanentRedirect,
  notFound,
  __mockRouter,
  __mockSearchParams,
  __mockPathname,
};
