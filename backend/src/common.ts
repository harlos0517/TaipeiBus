import FS from 'fs'

import { DataTypeName } from './dataType'


export const getData = <T>(name: DataTypeName) => {
  return JSON.parse(
    FS.readFileSync(
      `../data/raw/Get${name}.json`,
      { encoding: 'utf-8' }
    )
  ) as Array<T>
}


export const keyDiff = (a: any, b: any, keys: string[], exception: string[] = []) => {
  return keys.filter(k => a[k] !== b[k] && !exception.includes(k))
}


export const toString = (v: string | number | null) => {
  if (v === null) return null
  return String(v).trim() || null
}

export const toNumber = (v: string | number | null) => {
  if (!v) return null
  const number = Number(v)
  return isNaN(number) ? null : number
}