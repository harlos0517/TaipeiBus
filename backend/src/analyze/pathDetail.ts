import { getData } from "../common"

import { DataTypeName } from "../types"
import { PathDetail } from "../../data/type/PathDetail"
import { Route } from "../../data/type/Route"

export const analyzePathDetail = () => {
  console.log('檢查 PathDetail 中...')
  const pathDetails = getData<PathDetail>(DataTypeName.PathDetail)
  const routes = getData<Route>(DataTypeName.Route)
  let missingPath = 0
  let missingOrder = 0
  console.log('  檢查 PathDetail 中 是否有缺少任何 path 資料...')
  console.log('  檢查 PathDetail 中 是否有任何 path 缺少站點順序...')

  ;[...new Set(routes.map(route => route.pathAttributeId))].forEach(pathAttrId => {
    // 檢查 PathDetail 中 是否有缺少任何 path 資料...
    const thisPathDetails = pathDetails
      .filter(pathDetail => pathDetail.pathAttributeId === pathAttrId)
      .sort((a, b) => a.sequenceNo - b.sequenceNo)
    if (thisPathDetails.length === 0) {
      // console.log(`  找不到 PathAttributeId ${pathAttrId} 各站點資料`)
      missingPath++
    }

    // 檢查 PathDetail 中 是否有任何 path 缺少站點順序...
    let i = 0
    const missing = [] as Array<number>
    thisPathDetails.forEach(pathDetail => {
      while (pathDetail.sequenceNo > i) {
        missing.push(i)
        i++
      }
      i++
    })
    if (missing.length) {
      console.log(`  PathAttributeId ${pathAttrId} 沒有第 ${missing.join(',')} 個站點`)
      missingOrder++
    }
  })
  // PathDetail 結論
  // 有些 path 完全沒資料
  if(missingPath)
    console.log(`  ${missingPath} 筆 path 沒有任何 pathDetail 資料`)
  if(missingOrder)
    console.log(`  ${missingOrder} 筆 path 缺少站點`)
}
