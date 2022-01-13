import { getData } from "../common"

import { DataTypeName } from "../types"
import { StopLocation } from "../../data/type/StopLocation"
import { Stop } from "../../data/type/Stop"

export const analyzeStopLocation = () => {
  console.log('檢查 StopLocation 中...')
  const stopLocations = getData<StopLocation>(DataTypeName.StopLocation)
  const stops = getData<Stop>(DataTypeName.Stop)
  let missingStopLocation = 0
  let dupStopLocation = 0
  let unusedStopLocation = 0

  console.log('  檢查 缺失的 StopLocation...')
  console.log('  檢查 重複的 StopLocation...')
  ;[...new Set(stops.map(stop => stop.stopLocationId))].forEach(stopLocationId => {
    const thisStopLocations = stopLocations
      .filter(stopLocation => stopLocation.id === stopLocationId)
    if (thisStopLocations.length === 0) {
      console.log(`找不到 stopLocationId ${stopLocationId} 資料`)
      missingStopLocation++
    }
    if (thisStopLocations.length > 1) {
      console.log(`找到多個 stopLocationId ${stopLocationId} 資料`)
      dupStopLocation++
    }
  })

  console.log('  檢查 沒用到的 StopLocation...')
  const stopLocationIds = [...new Set(stopLocations.map(stopLocation => stopLocation.id))]
  stopLocationIds.forEach(stopLocationId => {
    const thisStops = stops
      .filter(stop => stop.stopLocationId === stopLocationId)
    if (thisStops.length === 0) {
      // console.log(`stops 找不到 stopLocationId ${stopLocationId} 資料`)
      unusedStopLocation++
    }
  })
  // stopLocation 才是實體的公車站，有可能沒有被指派到停靠的公車站
  if(missingStopLocation)
    console.log(`  ${missingStopLocation} 筆 stops 中使用 但 stopLocation 找不到的資料`)
  if(dupStopLocation)
    console.log(`  ${dupStopLocation} 筆 重複 stopLocationID`)
  if(unusedStopLocation)
    console.log(`  ${unusedStopLocation} 筆 stops 中沒用到的 stopLocation 資料`)
}
