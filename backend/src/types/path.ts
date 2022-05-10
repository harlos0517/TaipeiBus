import { StopInfo, Translatable } from '.'

export type PathData = {
  id: string;
  routeId: string;
  name: Translatable;
  stopIds: Array<string | null>;
}

export type BusPath = Omit<PathData, 'stopIds'> & {
  stopInfos: Array<StopInfo>
}
