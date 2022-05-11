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
import { defineComponent, ref, onMounted } from '@nuxtjs/composition-api'

import { BusStopGroup } from '~/util/busDataType'
import { getData, DataType } from '../util'
import {
  lontrans,
  lattrans,
} from '@/util/map'

export default defineComponent({
  setup() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const stopLocations = ref<Array<any>>([])

    onMounted(async() => {
      const data = await getData<BusStopGroup>(DataType.StopGroup)
      stopLocations.value = data
    })

    return {
      stopLocations,
      lontrans,
      lattrans,
    }
  },
})
</script>

<style lang="sass" scoped>
#stop-location
  circle
    fill: #FFFFFF
    stroke: #000000
    stroke-width: .5px
    // transition: 100ms

  text
    fill: #FFFFFF
    font-size: 8px
    background-color: rgba(255,255,255,.5)
    opacity: 0
    paint-order: stroke
    stroke: #000000
    stroke-width: .5px
    // transition: 100ms

  &>g:hover
    &>circle
      r: 4
    &>text
      opacity: 1
      font-size: 12px

</style>
