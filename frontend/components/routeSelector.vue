<template lang="pug">
  #route-selector.p-4.position-fixed.bg-dark.text-white
    .row
      .col-4 路線
      .col-8
        select.w-100(v-model="selectedRoute" @change="onRouteChange")
          option(v-for="route in routes" :value="route") {{ route.name.zh }}
    .row
      .col-4 副路線
      .col-8
        select.w-100(v-model="selectedPath")
          option(v-for="path in filteredPaths" :value="path") {{ path.name.zh }}



</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */

import { computed, defineComponent, onMounted, ref } from '@nuxtjs/composition-api'

import { DataType, getData } from '~/util'
import { BusPath, BusRoute } from '~/util/busDataType'

export default defineComponent({
  setup() {
    const routes = ref<Array<BusRoute>>([])
    const paths = ref<Array<BusPath>>([])

    const selectedRoute = ref<BusRoute | null>(null)
    const selectedPath = ref<BusPath | null>(null)

    const filteredPaths = computed(
      () => paths.value.filter(r => selectedRoute.value?.pathIds.includes(r.id)),
    )

    const onRouteChange = () => {
      selectedPath.value = filteredPaths.value[0]
    }

    onMounted(async() => {
      routes.value = (await getData<BusRoute>(DataType.Route))
      paths.value = (await getData<BusPath>(DataType.Path))
      selectedRoute.value = routes.value[0]
      selectedPath.value = filteredPaths.value[0]
    })

    return {
      routes,
      filteredPaths,
      selectedRoute,
      selectedPath,
      onRouteChange,
    }
  },
})
</script>

<style lang="sass" scoped>
#route-selector
  top: 1rem
  left: 1rem
  width: 400px
</style>
