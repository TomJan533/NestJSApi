import { Controller, Get } from '@nestjs/common';

@Controller('planets')
export class PlanetsController {
  @Get()
  getAllPlanets(): string {
    return 'Hello Planets!';
  }
}
