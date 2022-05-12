import { getData, toNumber, writeJson } from '../common'

import { DataTypeName } from '../types'
import { BusData } from 'data/type/BusData'
import { Bus } from '../types/busData'

export const processBusData = () => {
  const busData = getData<BusData>(DataTypeName.BusData)

  const newBusData: Array<Bus> =
    busData.map(bus => ({
      busId: String(bus.BusID),
      carId: String(bus.CarID),
      time: String(bus.DataTime),
      coord: {
        lon: toNumber(bus.Longitude) as number,
        lat: toNumber(bus.Latitude) as number,
      },
    }))
  writeJson('../data/processed/busData.json', newBusData)
}
