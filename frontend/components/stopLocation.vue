<template lang="pug">
  g#stop-location
    g(v-for="stop in stopLocations" :key="stop.id")
      circle(
        :cx="lontrans(stop.coord.lon)"
        :cy="lattrans(stop.coord.lat)"
        r="2"
      )
      text(
        text-anchor="middle"
        :x="lontrans(stop.coord.lon)"
        :y="lattrans(stop.coord.lat) - 12"
      )
        | {{ stop.name }}
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { BusStopGroup } from '~/util/busDataType'

import { getData, DataType } from '../util'

@Component
export default class extends Vue {
  @Prop(Function) lontrans!: Function
  @Prop(Function) lattrans!: Function

  stopLocations = [] as any[]
  async mounted() {
    const data = await getData<BusStopGroup>(DataType.StopGroup)
    this.stopLocations = data
  }
}
</script>

<style lang="sass" scoped>
#stop-location
  circle
    fill: #FFFFFF
    transition: 100ms
    stroke: #000000
    stroke-width: .5px

  text
    fill: #FFFFFF
    font-size: 8px
    background-color: rgba(255,255,255,.5)
    font-weight: 200
    opacity: 0
    stroke: #000000
    stroke-width: .3px
    transition: 100ms

  &>g:hover
    &>circle
      r: 4
    &>text
      opacity: 1
      font-size: 12px
      font-weight: 800

</style>
