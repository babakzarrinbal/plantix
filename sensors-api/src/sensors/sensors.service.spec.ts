import { Test, TestingModule } from '@nestjs/testing';
import { SensorsService } from './sensors.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Sensor } from './entities/sensor.entity';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { SensorTypeEnums } from './types/sensors';

import {
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';

describe('SensorsService', () => {
  let service: SensorsService;
  let repository: Repository<Sensor>;
  let logger: Logger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SensorsService,
        Logger,
        {
          provide: getRepositoryToken(Sensor),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<SensorsService>(SensorsService);
    repository = module.get<Repository<Sensor>>(getRepositoryToken(Sensor));
    logger = module.get<Logger>(Logger);

    jest.spyOn(logger, 'log').mockImplementation(() => {});
    jest.spyOn(logger, 'error').mockImplementation(() => {});
    jest.spyOn(logger, 'warn').mockImplementation(() => {});
    jest.spyOn(logger, 'debug').mockImplementation(() => {});
    jest.spyOn(logger, 'verbose').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a sensor', async () => {
      const createSensorDto: CreateSensorDto = {
        sensorId: 'testId',
        type: SensorTypeEnums.HUMIDITY,
        value: 10,
      };
      const expectedSensor: Sensor = {
        id: 1,
        sensorId: 'testId',
        type: SensorTypeEnums.HUMIDITY,
        value: 10,
        timestamp: new Date(),
      };

      jest.spyOn(repository, 'create').mockReturnValue(expectedSensor);
      jest.spyOn(repository, 'save').mockResolvedValue(expectedSensor);

      const result = await service.create(createSensorDto);

      expect(result).toEqual(expectedSensor);
    });

    it('should throw InternalServerErrorException when creation fails', async () => {
      const createSensorDto: CreateSensorDto = {
        sensorId: 'testId',
        type: SensorTypeEnums.HUMIDITY,
        value: 10,
      };

      jest.spyOn(repository, 'create').mockImplementation(() => {
        throw new Error();
      });

      await expect(service.create(createSensorDto)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('findAll', () => {
    it('should find all sensors with pagination', async () => {
      const paginationQuery = { page: 1, limit: 10 };
      const expectedResults: Sensor[] = [
        {
          id: 1,
          sensorId: 'testId',
          type: 'humidity',
          value: 10,
          timestamp: new Date(),
        },
        {
          id: 2,
          sensorId: 'testId',
          type: 'humidity',
          value: 10,
          timestamp: new Date(),
        },
      ];
      const expectedTotal = 2;

      jest
        .spyOn(repository, 'findAndCount')
        .mockResolvedValue([expectedResults, expectedTotal]);

      const result = await service.findAll(paginationQuery);

      expect(result.data).toEqual(expectedResults);
      expect(result.total).toEqual(expectedTotal);
      expect(result.page).toEqual(paginationQuery.page);
      expect(result.lastPage).toEqual(
        Math.ceil(expectedTotal / paginationQuery.limit),
      );
    });

    it('should throw InternalServerErrorException when find all fails', async () => {
      const paginationQuery = { page: 1, limit: 10 };

      jest.spyOn(repository, 'findAndCount').mockImplementation(() => {
        throw new Error();
      });

      await expect(service.findAll(paginationQuery)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
