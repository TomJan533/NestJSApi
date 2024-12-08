import { calculateWordCounts } from '../../src/films/word.count.util';

describe('calculateWordCounts', () => {
  it('should return an empty array for empty text', () => {
    const result = calculateWordCounts('');
    expect(result).toEqual([]);
  });

  it('should count words correctly', () => {
    const text = 'A long time ago in a galaxy far, far away...';
    const result = calculateWordCounts(text);
    expect(result).toContainEqual({ word: 'a', count: 2 });
    expect(result).toContainEqual({ word: 'long', count: 1 });
    expect(result).toContainEqual({ word: 'far', count: 2 });
  });

  it('should ignore line breaks and normalize spacing', () => {
    const text = 'Hello\nworld   hello';
    const result = calculateWordCounts(text);
    expect(result).toEqual([
      { word: 'hello', count: 2 },
      { word: 'world', count: 1 },
    ]);
  });

  it('should handle special characters', () => {
    const text = 'Hello, world! Hello.';
    const result = calculateWordCounts(text);
    expect(result).toEqual([
      { word: 'hello', count: 2 },
      { word: 'world', count: 1 },
    ]);
  });
});
