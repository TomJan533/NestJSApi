import { Controller, Get } from '@nestjs/common';

@Controller('films')
export class FilmsController {
  @Get()
  getAllFilms(): string {
    return 'Hello Films!';
  }
}
