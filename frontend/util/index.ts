
import axios from 'axios'

// import { BusInfo } from './busDataType'

export enum DataType {
  BusData = 'BusData',
  BusEvent = 'BusEvent',
  CarInfo = 'CarInfo',
  CarUnusual = 'CarUnusual',
  EstimateTime = 'EstimateTime',
  IStop = 'IStop',
  IStopPath = 'IStopPath',
  OrgPathAttribute = 'OrgPathAttribute',
  PathDetail = 'PathDetail',
  Provider = 'Provider',
  Route = 'Route',
  SemiTimeTable = 'SemiTimeTable',
  Stop = 'Stop',
  StopLocation = 'StopLocation',
  TimeTable = 'TimeTable',
};

const dataServerHost = 'http://localhost:1337/data/raw/'

export const getData = async <T = any>(dataType: DataType) => {
  const { data } = await axios.get(`${dataServerHost}Get${dataType}.json`)
  return data as Array<T>
}
