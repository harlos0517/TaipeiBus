import * as d3 from 'd3'

export const scale = 5
export const mapwd = 800 * scale
export const mapht = 692 * scale

export const lontrans = d3.scaleLinear().range([0, mapwd]).domain([121.281765, 122.008083])
export const lattrans = d3.scaleLinear().range([mapht, 0]).domain([ 24.672875,  25.30056 ])
