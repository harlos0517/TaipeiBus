<template lang="pug">
  g#gridlines
    g#gridlines-lon
      path(
        v-for="i in 72"
        :key="i"
        :d="`M ${getLon(i)} 0 L ${getLon(i)} ${mapht}`"
      )
    g#gridlines-lat
      path(
        v-for="i in 63"
        :key="i"
        :d="`M 0 ${getLat(i)} L ${mapwd} ${getLat(i)}`"
      )
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import {
  mapwd,
  mapht,
  lontrans,
  lattrans,
} from '@/util/map'

export default defineComponent({
  setup() {
    const getLon = (i: number) => lontrans(i * 0.01 + 121.28)
    const getLat = (i: number) => lattrans(i * 0.01 +  24.67)

    return {
      mapwd,
      mapht,
      getLon,
      getLat,
    }
  },
})
</script>

<style lang="sass" scoped>
#gridlines
  fill: none
  stroke: #888888
  stroke-width: .5px
</style>
