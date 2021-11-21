declare namespace Vehicles {
  export type Data = {
    time: number
    energy: number
    gps: string
    odo: number
    speed: number
    soc: number
  }
  export type HistoryData = Pick<Data, 'speed' | 'soc' | 'time'>
}
