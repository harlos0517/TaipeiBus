<template lang="pug">
  g#gridlines
    g#gridlines-lon
      path(
        v-for="i in 72"
        :key="i"
        :d="`M ${getLon(i)} 0 L ${getLon(i)} ${height}`"
      )
    g#gridlines-lat
      path(
        v-for="i in 63"
        :key="i"
        :d="`M 0 ${getLat(i)} L ${width} ${getLat(i)}`"
      )
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class extends Vue {
  @Prop(Number) width!: number
  @Prop(Number) height!: number
  @Prop(Function) lontrans!: Function
  @Prop(Function) lattrans!: Function

  getLon = (i: number) => this.lontrans(i * 0.01 + 121.28)
  getLat = (i: number) => this.lattrans(i * 0.01 +  24.67)
}
</script>

<style lang="sass" scoped>
#gridlines
  fill: none
  stroke: #888888
  stroke-width: .5px
</style>
