<template lang="pug">
  div#main(:style="{ width: `${mapwd}px`, height: `${mapht}px` }")
    svg(:width="mapwd" :height="mapht")
      TaipeiMap(:style="{ transform: `scale(${scale})` }")
      Grid(:lontrans="lontrans" :lattrans="lattrans" :width="mapwd" :height="mapht")
      RoutePath(:lontrans="lontrans" :lattrans="lattrans")
      Section(:lontrans="lontrans" :lattrans="lattrans")
      StopLocation(:lontrans="lontrans" :lattrans="lattrans")
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import * as d3 from 'd3'

@Component
export default class extends Vue {
  scale = 20
  mapwd = 800 * this.scale
  mapht = 692 * this.scale
  lontrans = d3.scaleLinear().range([0, this.mapwd]).domain([121.281765, 122.008083])
  lattrans = d3.scaleLinear().range([this.mapht, 0]).domain([ 24.672875,  25.30056 ])
}
</script>

<style lang="sass" scoped>
#main
  height: 100vh
  background-color: black
</style>
