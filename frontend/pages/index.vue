<template lang="pug">
  div#main(:style="{ width: `${mapwd}px`, height: `${mapht}px` }")
    svg(:width="mapwd" :height="mapht")
      TaipeiMap(:style="{ transform: `scale(${scale})` }")
      Grid
      //- RoutePath
      Section(:selectedPath="selectedPath")
      Bus
      StopLocation
    RouteSelector(ref="routeSelectorRef")
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@nuxtjs/composition-api'

import {
  scale,
  mapwd,
  mapht,
  lontrans,
  lattrans,
} from '@/util/map'
import { BusPath, BusRoute } from '~/util/busDataType'

export default defineComponent({
  setup() {
    const routeSelectorRef = ref<HTMLElement & {
      selectedRoute: BusRoute | null
      selectedPath: BusPath | null
    } | null>(null)
    const selectedRoute = computed(() => routeSelectorRef.value?.selectedRoute)
    const selectedPath = computed(() => routeSelectorRef.value?.selectedPath)

    return {
      routeSelectorRef,
      selectedRoute,
      selectedPath,
      scale,
      mapwd,
      mapht,
      lontrans,
      lattrans,
    }
  },
})
</script>

<style lang="sass" scoped>
#main
  height: 100vh
  background-color: black
</style>
