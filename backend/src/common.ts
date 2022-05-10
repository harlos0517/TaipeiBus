/* eslint-disable @typescript-eslint/no-explicit-any */

import FS from 'fs'

import { Coordinate, DataTypeName } from './types'

export const getData = <T = any>(name: DataTypeName) => {
  return readJson<Array<T>>(`../data/raw/Get${name}.json`)
}

export const readJson = <T>(path: string) => {
  return JSON.parse(FS.readFileSync(path, { encoding: 'utf-8' })) as T
}

export const writeJson = (path: string, obj: any) => {
  FS.writeFileSync(path, JSON.stringify(obj, undefined, 2))
}

export const keyDiff = (a: any, b: any, keys: string[], exception: string[] = []) => {
  return keys.filter(k => a[k] !== b[k] && !exception.includes(k))
}

export const toString = (v: string | number | null) => {
  if (v === null) return null
  const str = String(v).trim()
  return str ? str : null
}

export const toNumber = (v: string | number | null) => {
  if (!v) return null
  const number = Number(v)
  return isNaN(number) ? null : number
}

export const getUniqueKeyArr = <T, U>(
  arr: Array<T>,
  getKey: (a: T) => U | null,
)  => [...new Set(arr.map(getKey).filter(x => x))] as Array<U>

export const getKeyMax = <T>(
  arr: Array<T>,
  getKey: (a: T) => number,
) => {
  if (arr.length === 0) return -1
  const maxId = getKey(arr.reduce(
    (a, b) => getKey(a) > getKey(b) ? a : b),
  )
  return Math.max(maxId, 0)
}

export const getArrFromSeq = <T>(
  arr: Array<T>,
  getSeq: (a: T) => number,
  getId: (a: T) => string | null,
) => {
  const maxId = getKeyMax(arr, getSeq)
  return [...Array(maxId + 1).keys()].map(id => {
    const item = arr.find(detail => getSeq(detail) === id)
    return item ? getId(item) : null
  })
}

export const getArrAvg = (arr: Array<number>) =>
  arr.reduce((a, b) => a + b, 0) / arr.length

export const dis = (a: Coordinate, b: Coordinate) => {
  const sqsum =
    (a.lon - b.lon) * (a.lon - b.lon) + (a.lat - b.lat) * (a.lat - b.lat)
  return Math.sqrt(sqsum)
}
