import axios from 'axios'

// import { BusInfo } from './busDataType'

export enum DataType {
  BusData = 'busData',
  Route = 'route',
  Path = 'path',
  Stop = 'stop',
  StopLocation = 'stopLocation',
  StopGroup = 'stopGroup',
  Section = 'section',
  RoutePath = 'routePath',
}

const dataServerHost = 'http://localhost:1337/'

export const getData = async <T = any>(dataType: DataType) => {
  const { data } = await axios.get(`${dataServerHost}${dataType}s.json`)
  return data as Array<T>
}
