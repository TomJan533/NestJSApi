import { Injectable } from '@nestjs/common';

@Injectable()
export class FilmsService {
  getAllFilms(): string {
    return 'Hello Films!';
  }
}
