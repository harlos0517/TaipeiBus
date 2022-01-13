import FS from 'fs'

import { DataTypeName } from './types'


export const getData = <T>(name: DataTypeName) => {
  return JSON.parse(
    FS.readFileSync(
      `../data/raw/Get${name}.json`,
      { encoding: 'utf-8' }
    )
  ) as Array<T>
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
  return !!str ? str : null
}

export const toNumber = (v: string | number | null) => {
  if (!v) return null
  const number = Number(v)
  return isNaN(number) ? null : number
}
