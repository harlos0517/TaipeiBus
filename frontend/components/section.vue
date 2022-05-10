<template lang="pug">
  g#sections
    path(
      v-for="(sec, i) in sections"
      :key="sec.id"
      :id="`route-${sec.from}-${sec.to}`"
      :d="sec.line"
    )
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

import * as d3 from 'd3'

import { getData, DataType } from '../util'
import { BusStopGroup, Section } from '../util/busDataType'

@Component
export default class extends Vue {
  @Prop(Function) lontrans!: Function
  @Prop(Function) lattrans!: Function

  sections = [] as Array<Section & { line: string }>
  groups = [] as Array<BusStopGroup>
  async mounted() {
    this.sections = (await getData<Section>(DataType.Section))
      .map(x => ({ ... x, line: '' }))
    this.groups = await getData<BusStopGroup>(DataType.StopGroup)

    this.sections.forEach(sec => {
      const fromGroup = this.groups.find(g => g.id === sec.from)
      const toGroup = this.groups.find(g => g.id === sec.to)
      if (!fromGroup || !toGroup) return
      const line = d3.line()([
        [this.lontrans(fromGroup.coord.lon), this.lattrans(fromGroup.coord.lat)],
        [this.lontrans(toGroup.coord.lon), this.lattrans(toGroup.coord.lat)],
      ])
      sec.line = line || ''
    })
  }
}
</script>

<style lang="sass" scoped>
#sections
  path
    fill: none
    stroke: #88DDDD
    stroke-width: 1px

</style>
