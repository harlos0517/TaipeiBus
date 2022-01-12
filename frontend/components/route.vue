<template lang="pug">
  g#routes
    g(
      v-for="(route, i) in routes"
      :key="i"
      :id="`route-${route.pathAttributeId}-${i}`"
    )
      path(:d="route.line")
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

import * as d3 from 'd3'

import { getData, DataType } from '../util'
import { Route, PathDetail, Stop } from '../util/busDataType'

@Component
export default class extends Vue {
  @Prop(Function) lontrans!: Function
  @Prop(Function) lattrans!: Function

  routes = [] as Array<Route & { line: string }>
  pathDetails = [] as Array<PathDetail>
  stops = [] as Array<Stop>
  async mounted() {
    const routeData = await getData<Route>(DataType.Route)
    this.routes = routeData.map(x => ({ line: '', ...x }))
    const pathData = await getData<PathDetail>(DataType.PathDetail)
    this.pathDetails = pathData
    const stopData = await getData<Stop>(DataType.Stop)
    this.stops = stopData

    this.routes.forEach((route, i) => {
      if (i > 20) return
      const pathDetail = this.pathDetails
        .filter((p) => p.pathAttributeId === route.pathAttributeId)
        .sort((a, b) => a.sequenceNo - b.sequenceNo)
        .map((p) => {
          const thisStop = this.stops.find((stop) => stop.Id === p.stopId)
          if (!thisStop) return null
          return [thisStop.longitude, thisStop.latitude]
        })
        .filter((x) => !!x)
      const line = d3.line()(
        pathDetail.map(([lon, lat]) => [
          parseFloat(this.lontrans(lon)),
          parseFloat(this.lattrans(lat)),
        ])
      )
      route.line = line
    })
  }
}
</script>

<style lang="sass" scoped>
#routes
  path
    fill: none
    stroke: #88DDDD
    stroke-width: 1px

</style>
