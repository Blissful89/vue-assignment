import History from '../history/history'
import takeRight from 'lodash/takeRight'
import last from 'lodash/last'

const DEVIATION_ITEMS = 3
const DEVIATION_MAX = 0.004

function getStandardDeviation(array: number[]) {
  const n = array.length
  const mean = array.reduce((a, b) => a + b) / n
  return Math.sqrt(array.map((x) => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n)
}

function isValidNumber(item: any) {
  return typeof item === 'number'
}

function parseGPS(gps: string) {
  return gps.split('|').map((coordStr) => Number(coordStr))
}

function isValidGPS(item: string, history: History) {
  if (history.items.length < DEVIATION_ITEMS) {
    return true
  }

  const [lat, long] = parseGPS(item)
  const { lats, longs } = takeRight(history.items, DEVIATION_ITEMS)
    .map((item) => parseGPS(item.gps))
    .reduce(
      (previous, [lat, long]) => {
        return {
          lats: [...previous.lats, lat],
          longs: [...previous.longs, long],
        }
      },
      { lats: [], longs: [] } as { lats: number[]; longs: number[] },
    )

  lats.push(lat)
  longs.push(long)

  return !(getStandardDeviation(lats) > DEVIATION_MAX || getStandardDeviation(longs) > DEVIATION_MAX)
}

export default function validate(data: Vehicles.Data, history: History): Vehicles.Data | null {
  const previous = last(history.items) ?? data

  // If the timestamp is incorrect just discard of that data point
  if (!isValidNumber(data.time)) {
    return null
  }

  // If any other value is incorrect, return the previous value of that field
  const result = {
    time: data.time,
    energy: isValidNumber(data.energy) ? data.energy : previous?.energy,
    gps: isValidGPS(data.gps, history) ? data.gps : previous?.gps,
    odo: isValidNumber(data.odo) ? data.odo : previous?.odo,
    speed: isValidNumber(data.speed) ? data.speed : previous?.speed,
    soc: isValidNumber(data.soc) ? data.soc : previous?.soc,
  }

  // If deviation is too much, return the previous value of that field

  return result
}
