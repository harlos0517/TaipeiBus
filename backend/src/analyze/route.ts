import { getData, keyDiff } from "../common"

import { DataTypeName } from "../dataType"
import { Route } from "../../data/type/Route"

export const analyzeRoute = () => {
  console.log('檢查 Route 中...')
  const routes = getData<Route>(DataTypeName.Route)
  const routeIds = [...new Set(routes.map(route => route.Id))]
  let sameRouteExceptionDiffAttr = 0
  let diffPathHasSameName = 0
  let samePathdiffProvider = 0
  let samePathHasDiffOtherThanProvider = 0
  console.log('  檢查 Route 中 例外不同屬性...')
  console.log('  檢查 Route 中 相同 PathAttributeId 的例外不同屬性...')
  console.log('  檢查 Route 中 不同 PathAttributeId 會不會有相同 Path 名稱...')

  const routeKeys = Object.entries(routes[0]).map(([k, v]) => k)
  routeIds.forEach(routeId => {
    const thisRoutes = routes.filter(route => route.Id === routeId)
    if (thisRoutes.length === 1) return

    // 檢查 Route 中 不同屬性...
    thisRoutes.forEach((route, i) => {
      if (i === 0) return
      const diff = keyDiff(route, thisRoutes[0], routeKeys, [
        'pathAttributeId',
        'pathAttributeNId',
        'pathAttributeName',
        'pathAttributeEname',
        'ttiaPathId',
        'providerId',
        'providerName',
      ])
      if (diff.length) {
        console.log(`  routeId ${routeId} 含多筆資料，例外不同處: ${diff.join(', ')}`)
        sameRouteExceptionDiffAttr++
      }
    })

    // 檢查 Route 中 相同 PathAttributeId 的不同屬性...
    const pathAttrIds = [...new Set(thisRoutes.map(route => route.pathAttributeId))]
    if (thisRoutes.length === pathAttrIds.length) return
    pathAttrIds.forEach(pathAttrId => {
      const thisPathAttrs = thisRoutes.filter(route => route.pathAttributeId === pathAttrId)
      if (thisPathAttrs.length > 1) {
        // console.log(`PathAttributeId ${pathAttrId} 有 ${thisPathAttrs.length} 筆資料`)
        const keys = Object.entries(thisPathAttrs[0]).map(([k, v]) => k)
        thisPathAttrs.forEach((path, i) => {
          if (i === 0) return
          const diff = keyDiff(path, thisPathAttrs[0], keys)
          if ((diff[0] === 'providerId' && diff[1] === 'providerName')) samePathdiffProvider++
          else {
            console.log(`  PathAttributeId ${pathAttrId} 含多筆資料，不同處： ${diff.join(', ')}`)
            samePathHasDiffOtherThanProvider++
          }
        })
      }
    })

    // 檢查 Route 中 不同 PathAttributeId 會不會有相同 Path 名稱...
    const pathAttrNames = [...new Set(thisRoutes.map(route => route.pathAttributeName))]
    if (pathAttrNames.length === thisRoutes.length && pathAttrNames.length === pathAttrIds.length) return
    else {
      pathAttrNames.forEach(name => {
        const thisNames = thisRoutes.filter(route => route.pathAttributeName === name)
        thisNames.forEach((path, i) => {
          if (i === 0) return
          if (path.pathAttributeId !== thisNames[0].pathAttributeId) {
            console.log(`  RouteId ${routeId} 不同 PathAttributeId 含有相同 Path 名稱`)
            diffPathHasSameName ++
          }
        })
      })
    }
  })
  // Routes 結論
  // 每個 PathAttributeId 路線名稱不同
  // 相同 PathAttributeId 有可能是不同業者
  if(sameRouteExceptionDiffAttr)
    console.log(`  ${sameRouteExceptionDiffAttr} 筆 有相同 RouteID 例外不同屬性`)
  if(diffPathHasSameName)
    console.log(`  ${diffPathHasSameName} 筆 不同 Path 有相同名稱`)
  if(samePathdiffProvider)
    console.log(`  ${samePathdiffProvider} 筆 不同業者的相同資料`)
  if(samePathHasDiffOtherThanProvider)
    console.log(`  ${samePathHasDiffOtherThanProvider} 筆 相同 Path 有例外不同屬性`)
}