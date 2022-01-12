import FS from 'fs'

import { getType, getTypingList } from './lib/typing'

import { getData } from './common'
import { allDataType, DataTypeName } from './dataType'

import { analyzeRoute } from './analyze/route'
import { analyzePathDetail } from './analyze/pathDetail'
import { analyzeStop } from './analyze/stop'
import { analyzeStopLocation } from './analyze/stopLocation'

console.log('分析資料類型 中...')
allDataType.forEach(name => {
  const obj = getData<any>(name)
  const typing = getType(obj, name)
  const yaml = getTypingList(typing)
  FS.writeFileSync(`../data/type/${name}.ts`, `export type ${name} = ${yaml}\n`)
})
console.log('  分析完成。')

analyzeRoute()
analyzePathDetail()
analyzeStop()
analyzeStopLocation()