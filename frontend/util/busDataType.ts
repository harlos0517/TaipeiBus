export type EmptyString = '' | ' '
export type DateString = string
export type TimeString = string
export type IntegerString = string
export type NumberString = string
export type UrlString = string
export type ProviderID = number
export type StationID = number
export type CarPlateID = string
export type CarType = number // enum
export type CarID = number
export type DutyStatus = string // enum
export type BusStatus = string // enum
export type PathAttributeID = string
export type GoBack = string // enum
export type LongitudeString = string
export type LatitudeString = string
export type Longitude = number
export type Latitude = number
export type Speed = number
export type Azimuth = number

export type StopID = string
export enum BooleanString {
  FALSE = '0',
  TRUE = '1'
}

export type RouteID = number
export type NID = string
export type BuildPeriod = string // enum
export type TtiaPathId = string

export type PGP = string
export type StopLocationID = number
export type Vector = number


export type EssentialInfo = {
  Location: {
    name: string
    CenterName: string
  }
  UpdateTime: DateString
  CoordinateSystem: string
}

export type BusInfo<T> = {
  EssentialInfo: EssentialInfo
  BusInfo: Array<T>
}

export type BusData = {
  ProviderID: ProviderID
  StationID: StationID
  BusID: CarPlateID
  CarType: CarType
  CarID: CarID
  DutyStatus: DutyStatus
  BusStatus: BusStatus
  RouteID: PathAttributeID
  GoBack: GoBack
  Longitude: LongitudeString
  Latitude: LatitudeString
  Speed: Speed
  Azimuth: Azimuth
  DataTime: DateString
}

export type BusEvent = {
  ProviderID: ProviderID
  StationID: StationID
  BusID: CarPlateID
  CarType: CarType
  CarID: CarID
  DutyStatus: DutyStatus
  BusStatus: BusStatus
  RouteID: PathAttributeID
  GoBack: GoBack
  StopID: StopID
  CarOnStop: BooleanString
  DataTime: string
}

export type Route = {
  Id: RouteID
  NId: NID | null
  providerId: ProviderID
  providerName: string
  nameZh: string
  nameEn: string
  aliasName: string | EmptyString
  pathAttributeId: PathAttributeID
  pathAttributeNId: NID | null
  pathAttributeName: string
  pathAttributeEname: string
  buildPeriod: BuildPeriod
  departureZh: string
  departureEn: string
  destinationZh: string
  destinationEn: string
  realSequence: IntegerString
  distance: NumberString
  goFirstBusTime: TimeString | EmptyString
  backFirstBusTime: TimeString | EmptyString
  goLastBusTime: TimeString | EmptyString
  backLastBusTime: TimeString | EmptyString
  busTimeDesc: string | EmptyString
  peakHeadway: TimeString | string
  offPeakHeadway: TimeString | string
  headwayDesc: string | EmptyString
  holidayGoFirstBusTime: TimeString | EmptyString
  holidayBackFirstBusTime: TimeString | EmptyString
  holidayGoLastBusTime: TimeString | EmptyString
  holidayBackLastBusTime: TimeString | EmptyString
  holidayBusTimeDesc: string | EmptyString
  holidayPeakHeadway: TimeString | EmptyString
  holidayOffPeakHeadway: TimeString | EmptyString
  holidayHeadwayDesc: string | EmptyString
  segmentBufferZh: string | EmptyString
  segmentBufferEn: string | EmptyString
  ticketPriceDescriptionZh: string | EmptyString
  ticketPriceDescriptionEn: string | EmptyString
  ttiaPathId: TtiaPathId
  roadMapUrl: UrlString
}

export type Stop = {
  Id: StopID
  routeId: RouteID
  nameZh: string
  nameEn: string
  seqNo: number
  pgp: PGP | null
  longitude: LongitudeString
  latitude: LatitudeString
  goBack: GoBack
  address: string
  stopLocationId: StopLocationID
  showLon: LongitudeString
  showLat: LatitudeString
  vector: Vector | null
}

export type StopLocation = {
  id: StopLocationID
  nid: NID | null
  name: string
  address: string
  lon: LongitudeString
  lat: LatitudeString
  version: number
}

export type PathDetail = {
  id: number
  pathAttributeId: PathAttributeID
  stopId: StopID
  sequenceNo: number
  type: '0'
  typeAttribute: EmptyString
}
