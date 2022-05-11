<template lang="pug">
  div#main(:style="{ width: `${mapwd}px`, height: `${mapht}px` }")
    svg(:width="mapwd" :height="mapht")
      TaipeiMap(:style="{ transform: `scale(${scale})` }")
      Grid
      //- RoutePath
      Section
      StopLocation
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import {
  scale,
  mapwd,
  mapht,
  lontrans,
  lattrans,
} from '@/util/map'

export default defineComponent({
  setup() {
    return {
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
