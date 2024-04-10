import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { SensorTypeEnums } from '../types/sensors'; // Adjust the import path as necessary

export class CreateSensorDto {
  @IsNotEmpty()
  @IsString()
  sensorId: string;

  @IsEnum(SensorTypeEnums)
  type: SensorTypeEnums;

  @IsNumber()
  value: number;
}
