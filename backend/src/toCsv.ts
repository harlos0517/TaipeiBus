import FS from 'fs'

import { getData } from './common'
import { allDataType } from './dataType'

allDataType.forEach(name => {
  const obj = getData<any>(name)
  if (!obj[0]) return;
  const head = Object.entries(obj[0]).map(([k, v]) => k)
  const body = obj.map((info: any) => head.map(key => info[key]).join('\t')).join('\n')
  const csv = head.join('\t') + '\n' + body
  FS.writeFileSync(`../data/csv/${name}.csv`, csv)
})
