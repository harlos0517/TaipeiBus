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
/* eslint-disable @typescript-eslint/no-explicit-any */

import { defineComponent, onMounted, ref } from '@nuxtjs/composition-api'

import * as d3 from 'd3'

import { DataType, getData } from '~/util'

import {
  lontrans,
  lattrans,
} from '@/util/map'

export default defineComponent({
  setup() {
    const routePath = ref<Array<any>>([])

    onMounted(async() => {
      const data = (await getData(DataType.RoutePath)) as any
      routePath.value = data.features.map((p: any) => {
        const coords = p.geometry.coordinates
        const line = d3.line()(coords.map(([lon, lat]: [number, number]) => [
          lontrans(lon),
          lattrans(lat),
        ]))
        return { id: p.properties.BAD_CHINES, line }
      })
    })

    return {
      routePath,
      lontrans,
      lattrans,
    }
  },
})
</script>

<style lang="sass" scoped>
#route-path
  path
    fill: none
    stroke: #FF3344
    stroke-width: 1px
</style>
