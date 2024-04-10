import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { SensorTypeEnums } from '../types/sensors'; // Update the import path as needed

@Entity()
export class Sensor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sensorId: string; // Assuming sensorId is a unique identifier for the sensor device

  @Column({
    type: 'text',
    enum: SensorTypeEnums,
  })
  type: string; // Type of the sensor (e.g., temperature, humidity)

  @Column('double precision')
  value: number; // The value recorded by the sensor

  @CreateDateColumn()
  timestamp: Date; // The timestamp when the data was recorded
}
