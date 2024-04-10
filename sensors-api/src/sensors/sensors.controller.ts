import {
  Query,
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SensorsService } from './sensors.service';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';

@Controller('sensors/data')
export class SensorsController {
  constructor(private readonly sensorsService: SensorsService) {}

  @Post()
  create(@Body() createSensorDto: CreateSensorDto) {
    console.log('createSensorDto', createSensorDto);
    return this.sensorsService.create(createSensorDto);
  }

  @Get()
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    limit = limit > 100 ? 100 : limit;
    return this.sensorsService.findAll({ page, limit });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sensorsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSensorDto: UpdateSensorDto) {
    return this.sensorsService.update(+id, updateSensorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sensorsService.remove(+id);
  }
}
