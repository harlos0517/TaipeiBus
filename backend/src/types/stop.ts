import { Translatable } from '.'

export enum GoBack {
  GO = '0',
  BACK = '1',
  UNKNOWN = '2',
}

export type StopData = {
  id: string
  routeId: string
  name: Translatable
  goBack: GoBack
  stopLocationId: string | null
}
