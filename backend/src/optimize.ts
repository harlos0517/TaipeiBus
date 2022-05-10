import { readJson, writeJson, getArrAvg, dis } from './common'

import { StopInfo } from './types'
import { BusPath, PathData } from './types/path'
import { BusRoute, RouteData } from './types/route'
import { StopData } from './types/stop'
import { BusStopGroup, BusStopLocation, StopLocationData } from './types/stopLocation'

const paths = readJson<Array<PathData>>('../data/processed/paths.json')
const routes = readJson<Array<RouteData>>('../data/processed/routes.json')
const stops = readJson<Array<StopData>>('../data/processed/stops.json')
const stopLocations = readJson<Array<StopLocationData>>('../data/processed/stopLocations.json')


// generate stopGroups
const stopGroups = [] as Array<BusStopGroup>

const locsWithName = stopLocations.map(loc => {
  const subName = (loc.name || '').match(/\((.+)\)/)
  const mainName = (loc.name || '').match(/(^[^(]+)/)
  return {
    ...loc,
    subName: subName ? subName[1] : '',
    mainName: mainName ? mainName[1] : '',
    handled: false,
    groupId: '',
  }
})

let groupId = 0
locsWithName.forEach(loc => {
  if (loc.handled) return
  groupId++
  const nearLocs = locsWithName.filter(l => l.mainName === loc.mainName && dis(loc.coord, l.coord) < 0.005)
  nearLocs.forEach(nearLoc => {
    nearLoc.handled = true
    nearLoc.groupId = String(groupId)
  })
  stopGroups.push({
    id: String(groupId),
    name: loc.mainName,
    locIds: nearLocs.map(loc => loc.id),
    coord: {
      lon: getArrAvg(nearLocs.map(loc => loc.coord.lon)),
      lat: getArrAvg(nearLocs.map(loc => loc.coord.lat)),
    },
  })
})
writeJson('../data/optimized/stopGroups.json', stopGroups)

const stopLocs: Array<BusStopLocation> = locsWithName.map(loc => ({
  id: loc.id,
  name: loc.name,
  address: loc.address,
  coord: {
    lon: loc.coord.lon,
    lat: loc.coord.lat,
  },
  groupId: loc.groupId,
}))
writeJson('../data/optimized/stopLocations.json', stopLocs)


const getStopInfo = (stopId: string | null): StopInfo => {
  const stop = stopId ? stops.find(s => s.id === stopId) || null : null
  const stopLoc = stop
    ? stopLocs.find(l => l.id === stop.stopLocationId) || null
    : null
  return {
    stopId,
    locationId: stop?.stopLocationId || null,
    groupId: stopLoc?.groupId || null,
  }
}


const newRoutes: Array<BusRoute> = routes.map(route => {
  const stopInfos = route.stopIds.map(getStopInfo)
  const { stopIds: _, ...newRoute } = route
  return { ...newRoute, stopInfos }
})
writeJson('../data/optimized/routes.json', newRoutes)

const newPaths: Array<BusPath> = paths.map(path => {
  const stopInfos = path.stopIds.map(getStopInfo)
  const { stopIds: _, ...newRoute } = path
  return { ...newRoute, stopInfos }
})
writeJson('../data/optimized/paths.json', newPaths)


const sections = [] as Array<{
  from: string
  to: string
  count: number
}>

newPaths.forEach(path => {
  let prevGroupId = null as string | null
  path.stopInfos.forEach(stopInfo => {
    if (prevGroupId && stopInfo.groupId) {
      const sec = sections
        .find(s => s.from === prevGroupId && s.to === stopInfo.groupId)
      if (sec) sec.count ++
      else sections.push({
        from: prevGroupId,
        to: stopInfo.groupId,
        count: 1,
      })
    }
    prevGroupId = stopInfo.groupId
  })
})
writeJson('../data/optimized/sections.json', sections)

writeJson('../data/optimized/stops.json', stops)
