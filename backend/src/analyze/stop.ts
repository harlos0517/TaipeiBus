import { getData } from "../common"

import { DataTypeName } from "../types"
import { Stop } from "../../data/type/Stop"
import { PathDetail } from "../../data/type/PathDetail"

export const analyzeStop = () => {
   console.log('檢查 Stop 中...')
  const stops = getData<Stop>(DataTypeName.Stop)
  const pathDetails = getData<PathDetail>(DataTypeName.PathDetail)
  let missingStop = 0
  let dupStop = 0
  let unusedStop = 0
  let stopMissingOrder = 0

  console.log('  檢查 Stop 是否有缺少 pathDetail 中的 StopID 資料 中...')
  ;[...new Set(pathDetails.map(pathDetail => pathDetail.stopId))].forEach(stopId => {
    const thisStops = stops
      .filter(stop => stop.Id === stopId)
    if (thisStops.length === 0) {
      // console.log(`找不到 stopId ${stopId} 資料`)
      missingStop++
    }
  })

  console.log('  檢查 Stop 是否有重複 StopID 資料...')
  console.log('  檢查 pathDetail 是否有缺少的 Stop 資料...')
  const stopIds = [...new Set(stops.map(stop => stop.Id))]
  stopIds.forEach(stopId => {
    const thisStops = stops
      .filter(stop => stop.Id === stopId)
    if (thisStops.length > 1) {
      dupStop++
      console.log(`  找到重複 stopId ${stopId} 資料`)
    }

    const thisPathDetails = pathDetails
      .filter(pathDetail => pathDetail.stopId === stopId)
    if (thisPathDetails.length === 0) {
      unusedStop++
      // console.log(`  pathDetail 找不到 stopId ${stopId} 資料`)
    }
  })

  console.log('  檢查 stop 是否有缺少的站點順序...')
  ;[...new Set(stops.map(stop => stop.routeId))].forEach(routeId => {
    const thisStops = stops
      .filter(stop => stop.routeId === routeId)
      .sort((a, b) => a.seqNo - b.seqNo)
    let i = 0
    const missing = [] as Array<number>
    thisStops.forEach(stop => {
      while (stop.seqNo > i) {
        missing.push(i)
        i++
      }
      i++
    })
    if (missing.length) {
      // console.log(`routeId ${routeId} 沒有第 ${missing.join(',')} 個 stop 站點`)
      stopMissingOrder++
    }
  })
  // stops 結論
  // pathDetail 裡的 stopId 在 stops 會缺
  // stops 裡的 stopId 在 pathDetail 也不一定會被用到
  // stopId 會出現在相同 Route 的不同 PathAttr 裡
  // 指的是同公車 Route 的停靠點
  // 順序會漏，我不懂 =_=
  if(missingStop)
    console.log(`  ${missingStop} 筆 detail 中使用 但 stops 找不到的 stop 資料`)
  if(dupStop)
    console.log(`  ${dupStop} 筆 重複 stopID`)
  if(unusedStop)
    console.log(`  ${unusedStop} 筆 detail 中沒用到的 stop 資料`)
  if(stopMissingOrder)
    console.log(`  ${stopMissingOrder} 筆 route 的 stop 缺失順序`)
}
