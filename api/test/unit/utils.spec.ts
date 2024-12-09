import { getIdFromUrl } from '../../src/common/utils';

describe('getIdFromUrl', () => {
  it('should return the ID from the query string', () => {
    const url = 'https://example.com/films?id=123';
    const result = getIdFromUrl(url);
    expect(result).toBe('123');
  });

  it('should return the ID from the URL path', () => {
    const url = 'https://example.com/films/123';
    const result = getIdFromUrl(url);
    expect(result).toBe('123');
  });

  it('should return null if no ID is in the query string or path', () => {
    const url = 'https://example.com/films';
    const result = getIdFromUrl(url);
    expect(result).toBeNull();
  });

  it('should return the ID from the path even if the query string is present but empty', () => {
    const url = 'https://example.com/films/123?id=';
    const result = getIdFromUrl(url);
    expect(result).toBe('123');
  });

  it('should return null if the ID is not a valid number in the path', () => {
    const url = 'https://example.com/films/abc';
    const result = getIdFromUrl(url);
    expect(result).toBeNull();
  });

  it('should return null if the ID is an invalid query string (non-numeric)', () => {
    const url = 'https://example.com/films?id=abc';
    const result = getIdFromUrl(url);
    expect(result).toBeNull();
  });

  it('should return the first valid ID from the query string when both query and path contain an ID', () => {
    const url = 'https://example.com/films/456?id=123';
    const result = getIdFromUrl(url);
    expect(result).toBe('123');
  });
});
