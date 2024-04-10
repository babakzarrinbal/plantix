import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { SensorTypeEnums } from '../types/sensors'; // Adjust the import path as necessary

export class UpdateSensorDto {
  @IsOptional()
  @IsString()
  sensorId?: string;

  @IsOptional()
  @IsEnum(SensorTypeEnums)
  type?: SensorTypeEnums;

  @IsOptional()
  @IsNumber()
  value?: number;
}
