/**
 * Extracts an ID from the provided URL. The ID can be found either in the query string
 * (as `?id=<value>`) or at the end of the URL path (e.g., `/films/123`).
 *
 * @param url - The URL from which the ID needs to be extracted.
 *              It can either have the ID in the query string (`?id=<value>`) or in the path.
 *              Example: `https://example.com/films/123` or `https://example.com/films?id=123`.
 *
 * @returns The extracted ID as a string, or `null` if no valid ID is found.
 *          The ID is considered valid if it is a non-empty string or a number in the URL path.
 */
export function getIdFromUrl(url: string): string | null {
  const urlObject = new URL(url);

  // Check if the ID is in the query string (e.g., ?id=123)
  const idFromQuery = urlObject.searchParams.get('id');
  if (idFromQuery && !isNaN(Number(idFromQuery))) {
    return idFromQuery;
  }

  // Check if the ID is in the URL path (e.g., /films/123)
  const pathSegments = urlObject.pathname.split('/');
  const idFromPath = pathSegments[pathSegments.length - 1];

  // Return the ID if it's a valid number or string
  return idFromPath && !isNaN(Number(idFromPath)) ? idFromPath : null;
}
