<template lang="pug">
  g#bus
    g(v-for="bus in buses" :key="bus.carId")
      circle(
        :cx="lontrans(bus.coord.lon)"
        :cy="lattrans(bus.coord.lat)"
        r="2"
      )
      text(
        text-anchor="middle"
        :x="lontrans(bus.coord.lon)"
        :y="lattrans(bus.coord.lat) - 12"
      )
        | {{ bus.busId }}
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from '@nuxtjs/composition-api'

import { Bus } from '~/util/busDataType'
import { getData, DataType } from '../util'
import {
  lontrans,
  lattrans,
} from '@/util/map'

export default defineComponent({
  setup() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const buses = ref<Array<Bus>>([])

    onMounted(async() => {
      const data = await getData<Bus>(DataType.BusData)
      buses.value = data
    })

    return {
      buses,
      lontrans,
      lattrans,
    }
  },
})
</script>

<style lang="sass" scoped>
#bus
  circle
    fill: #FF0000
    stroke: #000000
    stroke-width: .5px
  text
    fill: #FFFFFF
    font-size: 8px
    background-color: rgba(255,255,255,.5)
    opacity: 0
    paint-order: stroke
    stroke: #000000
    stroke-width: .5px
  &>g:hover
    &>circle
      r: 4
    &>text
      opacity: 1
      font-size: 12px

</style>
