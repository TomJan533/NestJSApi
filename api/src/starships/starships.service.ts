import { Injectable } from '@nestjs/common';

@Injectable()
export class StarshipsService {
  getAllStarships(): string {
    return 'Hello Starships!';
  }
}
