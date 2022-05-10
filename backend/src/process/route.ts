import { getData, writeJson, toString, toNumber, getArrFromSeq, getUniqueKeyArr } from '../common'

import { DataTypeName } from '../types'
import { Route } from '../../data/type/Route'
import { Stop } from '../../data/type/Stop'
import { BeginEnd, Interval, Schedule, RouteData } from '../types/route'

const FOUR_DIGIT = /^[0-9]{4}$/

const toMinute = (v: string | null) => {
  if (!v) return null
  if (!/^[0-9]{4}$/.test(v)) return null
  const hh = parseInt(v.slice(0, 2))
  const mm = parseInt(v.slice(2, 4))
  return hh * 60 + mm
}

const toFirstLast = (firstString: string | null, lastString: string | null): BeginEnd => {
  const first = toMinute(firstString)
  const last  = toMinute( lastString)
  if (!first || !last) return { first, last }
  return {
    first,
    last: (last <= first) ? (last + 24 * 60) : last,
  }
}

const toGoBackTime = (
  goFirst: string | null,
  goLast : string | null,
  backFirst: string | null,
  backLast : string | null,
) => {
  return {
    go: toFirstLast(  goFirst,   goLast),
    back: toFirstLast(backFirst, backLast),
  }
}

const toInterval = (
  peakString: string | null,
  offpeakString: string | null,
  desc: string | null,
) => {
  const peakLegal = !!peakString && FOUR_DIGIT.test(peakString)
  const offpeakLegal = !!offpeakString && FOUR_DIGIT.test(offpeakString)
  const peak: Interval = {
    from: peakLegal ? parseInt(peakString.slice(0, 2)) : null,
    to: peakLegal ? parseInt(peakString.slice(2, 4)) : null,
    desc: toString(desc),
  }
  const offpeak: Interval = {
    from: offpeakLegal ? parseInt(offpeakString.slice(0, 2)) : null,
    to: offpeakLegal ? parseInt(offpeakString.slice(2, 4)) : null,
    desc: toString(desc),
  }
  return { peak, offpeak }
}

const toSchedule = (route: Route) => {
  return {
    weekday: <Schedule>{
      ...toGoBackTime(
        route.goFirstBusTime,
        route.goLastBusTime,
        route.backFirstBusTime,
        route.backLastBusTime,
      ),
      interval: toInterval(
        route.peakHeadway,
        route.offPeakHeadway,
        route.headwayDesc,
      ),
      desc: toString(route.busTimeDesc),
    },
    holiday: <Schedule>{
      ...toGoBackTime(
        route.holidayGoFirstBusTime,
        route.holidayGoLastBusTime,
        route.holidayBackFirstBusTime,
        route.holidayBackLastBusTime,
      ),
      interval: toInterval(
        route.holidayPeakHeadway,
        route.holidayOffPeakHeadway,
        route.holidayHeadwayDesc,
      ),
      desc: toString(route.holidayBusTimeDesc),
    },
  }
}


export const processRoute = () => {
  const routes = getData<Route>(DataTypeName.Route)
  const stops = getData<Stop>(DataTypeName.Stop)

  const routeIds = getUniqueKeyArr(routes, route => route.Id)
  const newRoutes: Array<RouteData> = routeIds.map(routeId => {
    const thisRoutes = routes.filter(route => route.Id === routeId)
    const route = thisRoutes[0]
    const thisStops = stops.filter(s => s.routeId === routeId)

    const providerIds = getUniqueKeyArr(thisRoutes, route => toString(route.providerId))
    const stopIds = getArrFromSeq(thisStops, d => d.seqNo, d => toString(d.Id))
    const pathIds = getUniqueKeyArr(thisRoutes, route => toString(route.pathAttributeId))
    const newRoute: RouteData =  {
      id: String(routeId),
      providerIds: providerIds as string[],
      name: {
        zh: toString(route.nameZh),
        en: toString(route.nameEn),
      },
      departureName: {
        zh: toString(route.departureZh),
        en: toString(route.departureEn),
      },
      destinationName: {
        zh: toString(route.destinationZh),
        en: toString(route.destinationEn),
      },
      distance: toNumber(route.distance),
      schedule: toSchedule(route),
      segmentBuffer: {
        zh: toString(route.segmentBufferZh),
        en: toString(route.segmentBufferEn),
      },
      ticketPrice: {
        zh: toString(route.ticketPriceDescriptionZh),
        en: toString(route.ticketPriceDescriptionEn),
      },
      routeMapUrl: toString(route.roadMapUrl),
      stopIds,
      pathIds,
    }
    return newRoute
  })
  writeJson('../data/processed/routes.json', newRoutes)
}
