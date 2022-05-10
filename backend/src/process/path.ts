import { getData, writeJson, toString, getArrFromSeq, getUniqueKeyArr } from '../common'

import { DataTypeName } from '../types'
import { Route } from '../../data/type/Route'
import { PathDetail } from '../../data/type/PathDetail'
import { PathData } from '../types/path'

export const processPath = () => {
  const routes = getData<Route>(DataTypeName.Route)
  const pathDetails = getData<PathDetail>(DataTypeName.PathDetail)

  const pathIds = getUniqueKeyArr(routes, route => route.pathAttributeId)
  const paths = pathIds.map(pathId => {
    const path = routes.filter(route => route.pathAttributeId === pathId)[0]
    const thisPathDetails = pathDetails.filter(d => d.pathAttributeId === pathId)
    const stopIds = getArrFromSeq(thisPathDetails, d => d.sequenceNo, d => toString(d.stopId))

    const newPath: PathData = {
      id: String(pathId),
      routeId: String(path.Id),
      name: {
        zh: toString(path.pathAttributeName),
        en: toString(path.pathAttributeEname),
      },
      stopIds,
    }
    return newPath
  })
  writeJson('../data/processed/paths.json', paths)
}
