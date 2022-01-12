<template lang="pug">
  g#stop-location
    g(v-for="stop in stopLocations" :key="stop.id")
      circle(
        :cx="lontrans(stop.lon)"
        :cy="lattrans(stop.lat)"
        r="2"
      )
      text(
        text-anchor="middle"
        :x="lontrans(stop.lon)"
        :y="lattrans(stop.lat) - 12"
      )
        | {{ stop.name }}
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

import { getData, DataType } from '../util'

@Component
export default class extends Vue {
  @Prop(Function) lontrans!: Function
  @Prop(Function) lattrans!: Function

  stopLocations = []
  async mounted() {
    const data = await getData(DataType.StopLocation)
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
