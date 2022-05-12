<template lang="pug">
  g#sections
    path(
      v-for="(sec, i) in sections"
      :key="sec.id"
      :id="`route-${sec.from}-${sec.to}`"
      :d="sec.line"
    )
    path.selected(
      v-for="(sec, i) in selectedSections"
      :key="sec.id + '-selected'"
      :id="`route-${sec.from}-${sec.to}-selected`"
      :d="sec.line"
    )
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, PropType, computed, toRefs } from '@nuxtjs/composition-api'

import * as d3 from 'd3'

import { getData, DataType } from '../util'
import { BusRoute, BusStopGroup, Section } from '../util/busDataType'
import {
  lontrans,
  lattrans,
} from '@/util/map'

export default defineComponent({
  props: {
    selectedPath: { type: Object as PropType<BusRoute>, default: null },
  },
  setup(props) {
    const { selectedPath } = toRefs(props)

    const sections = ref<Array<Section & { line: string }>>([])
    const groups = ref<Array<BusStopGroup>>([])

    const selectedSections = computed(
      () => sections.value.filter(sec => selectedPath.value?.stopInfos.map(s => s.sectionId).includes(sec.id)),
    )

    onMounted(async() => {
      sections.value = (await getData<Section>(DataType.Section))
        .map(x => ({ ... x, line: '' }))
      groups.value = await getData<BusStopGroup>(DataType.StopGroup)

      sections.value.forEach(sec => {
        const fromGroup = groups.value.find(g => g.id === sec.from)
        const toGroup = groups.value.find(g => g.id === sec.to)
        if (!fromGroup || !toGroup) return
        const line = d3.line()([
          [lontrans(fromGroup.coord.lon), lattrans(fromGroup.coord.lat)],
          [lontrans(toGroup.coord.lon), lattrans(toGroup.coord.lat)],
        ])
        sec.line = line || ''
      })
    })

    return {
      sections,
      selectedSections,
    }
  },
})
</script>

<style lang="sass" scoped>
#sections
  path
    fill: none
    stroke: #005555
    stroke-width: 1px
    &.selected
      fill: none
      stroke: #00FF00
      stroke-width: 2px


</style>
