import FS from 'fs'

import jsonToTs  from 'json-to-ts'

import { getData } from './common'
import { allDataType } from './types'

export const typing = () => {
  console.log('分析資料類型中...')
  allDataType.forEach(name => {
    const obj = getData(name)
    if (!obj.length) return
    const typeData = jsonToTs(obj).map(type => ('export ' + type.replace(/;/g, '')).replace('RootObject', name) + '\n').join('\n\n')
    FS.writeFileSync(`../data/type/${name}.ts`, typeData)
  })
  console.log('分析完成。')
}

if (require.main === module)
  typing()
