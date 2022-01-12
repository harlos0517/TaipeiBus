import { getData, toString, toNumber } from "../common";

import { DataTypeName } from "../dataType";
import { Route } from "../../data/type/Route";

const toMinute = (v: string | null) => {
  if (!v) return null
  if (!/^[0-9]{4}$/.test(v)) return null
  const hh = parseInt(v.slice(0, 2))
  const mm = parseInt(v.slice(2, 4))
  return hh * 60 + mm
}

const toFirstLast = (firstString: string, lastString: string) => {
  const first = toMinute(firstString)
  const last  = toMinute( lastString)
  if (!first || !last) return null
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
  if (!goFirst || !goLast || !backFirst || !backLast) return null
  return {
      go: toFirstLast(  goFirst,   goLast),
    back: toFirstLast(backFirst, backLast),
  }
}

const toInterval = (peak: string | null, offpeak: string | null) => {
  if (!peak || !offpeak) return null
  if (!/^[0-9]{4}$/.test(peak) || !/^[0-9]{4}$/.test(offpeak)) return null
  return {
    peak: {
      from: parseInt(peak.slice(0, 2)),
      to: parseInt(peak.slice(2, 4)),
    },
    offpeak: {
      from: parseInt(offpeak.slice(0, 2)),
      to: parseInt(offpeak.slice(2, 4)),
    },
  }
}

const toSchedule = (route: Route) => {
  return {
    weekday: {
      ...toGoBackTime(
        route.goFirstBusTime,
        route.goLastBusTime,
        route.backFirstBusTime,
        route.backLastBusTime
      ),
      desc: route.busTimeDesc,
      interval: {
        ...toInterval(route.peakHeadway, route.offPeakHeadway),
        desc: route.holidayHeadwayDesc
      },
    },
    holiday: {
      ...toGoBackTime(
        route.holidayGoFirstBusTime,
        route.holidayGoLastBusTime,
        route.holidayBackFirstBusTime,
        route.holidayBackLastBusTime
      ),
      interval: {
        ...toInterval(route.holidayPeakHeadway, route.holidayOffPeakHeadway),
        desc: route.holidayHeadwayDesc
      },
      desc: route.holidayBusTimeDesc,
    },  
  }
}


export const processRoute = () => {
  const routes = getData<Route>(DataTypeName.Route)
  const routeIds = [...new Set(routes.map(route => route.Id))]
  const newRoutes = routeIds.map(routeId => {
    const thisRoutes = routes.filter(route => route.Id === routeId)
    const route = thisRoutes[0]
    return {
      id: toString(routeId),
      providerIds: thisRoutes.map(route => toString(route.providerId)),
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
      routeMapUrl: toString(route.roadMapUrl)
    }
  })
}
