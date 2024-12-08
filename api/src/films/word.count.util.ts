import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class WordCount {
  @Field()
  word: string;

  @Field()
  count: number;
}

/**
 * Calculates the word count for a given text.
 * @param text The text to process (e.g., opening crawl).
 * @returns Array of word counts.
 */
export function calculateWordCounts(text: string): WordCount[] {
  const wordMap = new Map<string, number>();

  // Normalize text: remove punctuation, replace line breaks, split by spaces
  const words = text
    .replace(/[\r\n]+/g, ' ') // Replace control characters
    .replace(/[^\w\s]/g, '') // Remove punctuation
    .split(/\s+/) // Split by spaces
    .filter((word) => word); // Remove empty strings

  words.forEach((word) => {
    const normalizedWord = word.toLowerCase();
    wordMap.set(normalizedWord, (wordMap.get(normalizedWord) || 0) + 1);
  });

  return Array.from(wordMap.entries()).map(([word, count]) => ({
    word,
    count,
  }));
}
