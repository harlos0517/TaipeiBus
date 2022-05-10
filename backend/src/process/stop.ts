import { getData, toString, writeJson } from '../common'

import { DataTypeName } from '../types'
import { Stop } from '../../data/type/Stop'
import { GoBack, StopData } from '../types/stop'

export const processStop = () => {
  const stops = getData<Stop>(DataTypeName.Stop)

  const newStops: Array<StopData> = stops.map(stop => ({
    id: String(stop.Id),
    routeId: String(stop.routeId),
    name: {
      zh: toString(stop.nameZh),
      en: toString(stop.nameEn),
    },
    goBack: stop.goBack as GoBack,
    stopLocationId: toString(stop.stopLocationId),
  }))
  writeJson('../data/processed/stops.json', newStops)
}
