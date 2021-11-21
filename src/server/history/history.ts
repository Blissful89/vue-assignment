import isEmpty from 'lodash/isEmpty'

const MAX_ITEMS = 500

export default class History {
  items: Vehicles.Data[]

  constructor() {
    this.items = []
  }

  add(data: Vehicles.Data) {
    this.items.push(data)
    if (this.items.length > MAX_ITEMS) {
      this.items.shift()
    }
  }

  getHistory(): Vehicles.HistoryData[] {
    return this.items.map((item) => ({ time: item.time, speed: item.speed, soc: item.soc }))
  }
}
