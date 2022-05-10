export type Translatable = {
  zh: string | null;
  en: string | null;
}

export type Coordinate = {
  lon: number
  lat: number
}

export type StopInfo = {
  stopId: string | null,
  locationId: string | null
  groupId: string | null
}

export type Section = {
  from: string
  to: string
  count: number
}

export type Interval = {
  from: number | null
  to: number | null
  desc: string | null
}

export type BeginEnd = {
  first: number | null
  last: number | null
}

export type Schedule = {
  interval: {
    peak: Interval
    offpeak: Interval
  }
  desc: string | null
  go: BeginEnd
  back: BeginEnd
}

export enum GoBack {
  GO = '0',
  BACK = '1',
  UNKNOWN = '2',
}



export type BusPath = {
  id: string;
  routeId: string;
  name: Translatable;
  stopInfos: Array<StopInfo>
}

export type BusRoute = {
  id: string
  providerIds: string[]
  name: Translatable
  departureName: Translatable
  destinationName: Translatable
  distance: number | null
  schedule: {
    weekday: Schedule
    holiday: Schedule
  }
  segmentBuffer: Translatable
  ticketPrice: Translatable
  routeMapUrl: string | null
  pathIds: Array<string>
  stopInfos: Array<StopInfo>
}

export type StopData = {
  id: string
  routeId: string
  name: Translatable
  goBack: GoBack
  stopLocationId: string | null
}

export type BusStopLocation = {
  id: string
  name: string | null
  address: string | null
  coord: Coordinate
  groupId: string
}

export type BusStopGroup = {
  id: string
  name: string
  locIds: Array<string>
  coord: Coordinate
}
