import { Sensor } from "@/types/sensors";
import { sensorsApiFactory } from "@apiFactory";
export const list = sensorsApiFactory("/sensors/data");
export const get = async(id:string)=> sensorsApiFactory("/sensors/data/:id")({params: {id}});
export const create = async(newSensor:Sensor)=>sensorsApiFactory("/sensors/data", {
  method: "POST",
})({body: newSensor});
