type ToDisplayUrlOptions = {
  maxPathChars?: number;
};

export const toDisplayUrl = (url: string, options: ToDisplayUrlOptions = {}): string => {
  const { maxPathChars } = options;

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(url);
  } catch {
    return url;
  }

  const hostname = parsedUrl.hostname.replace(/^www\./, "");
  let pathname = parsedUrl.pathname.replace(/\/$/, "");
  if (maxPathChars && pathname.length > maxPathChars) {
    pathname = pathname.slice(0, maxPathChars) + "...";
  }
  return `${hostname}${pathname}`;
};

export default toDisplayUrl;
