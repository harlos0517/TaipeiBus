import { processRoute } from './process/route'
import { processPath } from './process/path'
import { processStop } from './process/stop'
import { processStopLocation } from './process/stopLocation'

export const process = () => {
  console.log('處理中...')
  processRoute()
  processPath()
  processStop()
  processStopLocation()
  console.log('處理完成。')
}

if (require.main === module)
  process()
