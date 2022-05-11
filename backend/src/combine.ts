/* eslint-disable @typescript-eslint/no-explicit-any */

import FS from 'fs'

import { BusInfo, allDataType } from './types'

const isEqual = (a: any, b: any, keys: string[]) => {
  for (let i = 0; i < keys.length; i++)
    if (a[keys[i]] !== b[keys[i]]) return false
  return true
}

export const combine = () => {
  console.log('合併中...')
  allDataType.forEach(name => {
    const tpeData: BusInfo<any> =
    JSON.parse(FS.readFileSync(`../data/raw/tpe/Get${name}.json`, { encoding: 'utf-8' }))
    const ntpData: BusInfo<any> =
    JSON.parse(FS.readFileSync(`../data/raw/ntp/Get${name}.json`, { encoding: 'utf-8' }))
    const data = tpeData.BusInfo.concat(ntpData.BusInfo)
    const newData = [] as any[]

    let dup = 0
    if (data.length) {
      const keys = Object.entries(data[0]).map(([k, _v]) => k)
      data.forEach(d => {
        if (newData.filter(e => isEqual(d, e, keys)).length) dup++
        else newData.push(d)
      })
    }

    FS.writeFileSync(`../data/raw/Get${name}.json`, JSON.stringify(newData, undefined, 2))
    console.log(`${name} combining is done.${dup ? ` Found ${dup} duplicate data` : ''}`)
  })
  console.log('合併完成。')
}

if (require.main === module)
  combine()
