import { Injectable } from '@nestjs/common';
import { WordCount } from '../common/dto/word-count.dto';
import { Film } from '../films/film.model';

@Injectable()
export class FilmsStatsService {
  aggregateWordCounts(films: Film[]): WordCount[] {
    const wordCounts = films.flatMap((film) => film.wordCounts);
    const aggregatedCounts: { [word: string]: number } = {};

    wordCounts.forEach(({ word, count }) => {
      aggregatedCounts[word] = (aggregatedCounts[word] || 0) + count;
    });

    return Object.entries(aggregatedCounts).map(([word, count]) => ({
      word,
      count,
    }));
  }

  cleanNames(names: string[]): string[] {
    return names.map((name) => name.trim());
  }

  calculateNameCounts(
    names: string[],
    films: Film[],
  ): { [name: string]: number } {
    const nameCounts: { [name: string]: number } = {};
    const openingCrawls = films.map((film) => film.openingCrawl);

    names.forEach((name) => {
      const count = openingCrawls.reduce((acc, crawl) => {
        const regex = new RegExp(`\\b${name}\\b`, 'gi'); // Match whole words, case-insensitive
        const matches = crawl.match(regex);
        return acc + (matches ? matches.length : 0);
      }, 0);

      if (count > 0) {
        nameCounts[name] = count;
      }
    });

    return nameCounts;
  }

  getNamesWithMaxCount(nameCounts: { [name: string]: number }): string[] {
    const maxCount = Math.max(...Object.values(nameCounts));
    return (
      Object.entries(nameCounts)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([_, count]) => count === maxCount)
        .map(([name]) => name)
    );
  }
}
