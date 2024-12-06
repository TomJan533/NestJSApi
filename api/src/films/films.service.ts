import { Injectable } from '@nestjs/common';
import { Film } from './film.model';

@Injectable()
export class FilmsService {
  getAllFilms(): Film[] {
    return [
      { id: '1', title: 'A New Hope', director: 'George Lucas' },
      { id: '2', title: 'The Empire Strikes Back', director: 'Irvin Kershner' },
    ];
  }
}
