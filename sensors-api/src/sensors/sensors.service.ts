import {
  Injectable,
  NotFoundException,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sensor } from './entities/sensor.entity';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';

@Injectable()
export class SensorsService {
  private readonly logger = new Logger(SensorsService.name);

  constructor(
    @InjectRepository(Sensor)
    private sensorRepository: Repository<Sensor>,
  ) {}

  async create(createSensorDto: CreateSensorDto): Promise<Sensor> {
    try {
      const sensor = this.sensorRepository.create(createSensorDto);
      return await this.sensorRepository.save(sensor);
    } catch (error) {
      this.logger.error(
        `Failed to create sensor: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException('Failed to create sensor');
    }
  }

  async findAll(paginationQuery: { page: number; limit: number }) {
    try {
      const { page, limit } = paginationQuery;
      const [results, total] = await this.sensorRepository.findAndCount({
        take: limit,
        skip: (page - 1) * limit,
      });

      return {
        data: results,
        total,
        page,
        lastPage: Math.ceil(total / limit),
      };
    } catch (error) {
      this.logger.error(
        `Failed to find all sensors: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException('Failed to find all sensors');
    }
  }

  async findOne(id: number): Promise<Sensor> {
    try {
      const sensor = await this.sensorRepository.findOneBy({ id });
      if (!sensor) {
        throw new NotFoundException(`Sensor with ID ${id} not found`);
      }
      return sensor;
    } catch (error) {
      this.logger.error(
        `Failed to find sensor with ID ${id}: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException(
        `Failed to find sensor with ID ${id}`,
      );
    }
  }

  async update(id: number, updateSensorDto: UpdateSensorDto): Promise<Sensor> {
    try {
      const sensor = await this.sensorRepository.preload({
        id,
        ...updateSensorDto,
      });

      if (!sensor) {
        throw new NotFoundException(`Sensor with ID ${id} not found`);
      }

      return await this.sensorRepository.save(sensor);
    } catch (error) {
      this.logger.error(
        `Failed to update sensor with ID ${id}: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException(
        `Failed to update sensor with ID ${id}`,
      );
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const result = await this.sensorRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Sensor with ID ${id} not found`);
      }
    } catch (error) {
      this.logger.error(
        `Failed to remove sensor with ID ${id}: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException(
        `Failed to remove sensor with ID ${id}`,
      );
    }
  }
}
