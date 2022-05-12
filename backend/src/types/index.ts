export enum DataTypeName {
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
}

export const allDataType = [
  DataTypeName.BusData,
  DataTypeName.BusEvent,
  DataTypeName.CarInfo,
  DataTypeName.CarUnusual,
  DataTypeName.EstimateTime,
  DataTypeName.IStop,
  DataTypeName.IStopPath,
  DataTypeName.OrgPathAttribute,
  DataTypeName.PathDetail,
  DataTypeName.Provider,
  DataTypeName.Route,
  DataTypeName.SemiTimeTable,
  DataTypeName.Stop,
  DataTypeName.StopLocation,
  DataTypeName.TimeTable,
]

export type EssentialInfo = {
  Location: {
    name: string
    CenterName: string
  }
  UpdateTime: string
  CoordinateSystem: string
}

export type BusInfo<T> = {
  EssentialInfo: EssentialInfo
  BusInfo: Array<T>
}

export type Translatable = {
  zh: string | null
  en: string | null
}

export type Coordinate = {
  lon: number
  lat: number
}

export type StopInfo = {
  stopId: string | null
  locationId: string | null
  groupId: string | null
  sectionId: string | null
}
