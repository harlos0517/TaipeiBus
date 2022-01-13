import { Translatable } from '.'

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

export type RouteData = {
  id: string | null
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
}
