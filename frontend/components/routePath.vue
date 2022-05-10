<template lang="pug">
  g#route-path
    g(
      v-for="(p, i) in routePath"
      :key="p.id"
      :id="`route-path-${p.id}`"
    )
      path(:d="p.line")
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

import * as d3 from 'd3'

import { DataType, getData } from '~/util'

@Component
export default class extends Vue {
  @Prop(Function) lontrans!: Function
  @Prop(Function) lattrans!: Function

  routePath = [] as Array<any>

  async mounted() {
    const data = (await getData(DataType.RoutePath)) as any
    this.routePath = data.features.map((p: any) => {
      const coords = p.geometry.coordinates
      const line = d3.line()(coords.map(([lon, lat]: [number, number]) => [
        this.lontrans(lon),
        this.lattrans(lat),
      ]))
      return { id: p.properties.BAD_CHINES, line }
    })
  }
}
</script>

<style lang="sass" scoped>
#route-path
  path
    fill: none
    stroke: #FF3344
    stroke-width: 1px

</style>
