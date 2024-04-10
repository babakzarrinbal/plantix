export interface Sensor {
  id: number;
  sensorId: string;
  type: string;
  value: number;
  timestamp: Date;
}


export interface FetchSensorDataResult {
  data: Sensor[];
  total: number;
}

export interface Pagination {
  current: number;
  pageSize: number;
  total: number;
}
