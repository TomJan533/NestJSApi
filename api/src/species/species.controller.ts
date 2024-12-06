import { Controller, Get } from '@nestjs/common';

@Controller('species')
export class SpeciesController {
  @Get()
  getAllSpecies(): string {
    return 'Hello Species!';
  }
}
