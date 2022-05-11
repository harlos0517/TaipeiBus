import { analyzeRoute } from './analyze/route'
import { analyzePathDetail } from './analyze/pathDetail'
import { analyzeStop } from './analyze/stop'
import { analyzeStopLocation } from './analyze/stopLocation'

export const analyze = () => {
  console.log('分析資料中...')
  analyzeRoute()
  analyzePathDetail()
  analyzeStop()
  analyzeStopLocation()
  console.log('分析完成。')
}

if (require.main === module)
  analyze()

