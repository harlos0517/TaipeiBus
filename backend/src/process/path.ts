import { getData, writeJson, toString, toNumber } from "../common";

import { DataTypeName } from "../types";
import { Route } from "../../data/type/Route";

export const processPath = () => {
  const routes = getData<Route>(DataTypeName.Route)
  const pathIds = [...new Set(routes.map(route => route.pathAttributeId))]
  const paths = pathIds.map(pathId => {
    const path = routes.filter(route => route.pathAttributeId === pathId)[0]
    return {
      id: toString(pathId),
      routeId: toString(path.Id),
      name: {
        zh: toString(path.pathAttributeName),
        en: toString(path.pathAttributeEname),
      }
    }
  })
  writeJson('../data/processed/paths.json', paths)
}
