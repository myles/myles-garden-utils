const ROOT_PATH = "/";

/**
 * Drop a path's trailing slash, e.g. "/a/b/" to "/a/b". The root keeps its
 * slash, having nothing else to be.
 */
export const trimTrailingSlash = (pathname: string): string => {
  if (pathname === ROOT_PATH || !pathname.endsWith(ROOT_PATH)) {
    return pathname;
  }
  return pathname.slice(0, -1);
};

/**
 * Normalise a URL to its canonical form without a trailing slash, e.g.
 * "https://example.com/a/" to "https://example.com/a".
 */
export const toCanonicalUrl = (value: string): string => {
  const url = new URL(value);
  url.pathname = trimTrailingSlash(url.pathname);
  return url.toString();
};

export default toCanonicalUrl;
