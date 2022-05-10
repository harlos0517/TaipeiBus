import { getData, toNumber, toString, writeJson } from '../common'

import { DataTypeName } from '../types'
import { StopLocation } from '../../data/type/StopLocation'
import { StopLocationData } from '../types/stopLocation'

export const processStopLocation = () => {
  const stopLocations = getData<StopLocation>(DataTypeName.StopLocation)

  const newStopLocations: Array<StopLocationData> =
    stopLocations.map(loc => ({
      id: String(loc.id),
      name: toString(loc.name),
      address: toString(loc.address),
      coord: {
        lon: toNumber(loc.lon) as number,
        lat: toNumber(loc.lat) as number,
      },
    }))
  writeJson('../data/processed/stopLocations.json', newStopLocations)
}
