import { Controller, Get } from '@nestjs/common';

@Controller('starships')
export class StarshipsController {
  @Get()
  getAllStarships(): string {
    return 'Hello Starships!';
  }
}
