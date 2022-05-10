import { Coordinate } from '.'

export type StopLocationData = {
  id: string
  name: string | null
  address: string | null
  coord: Coordinate
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
