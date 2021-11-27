const MAX_ITEMS = 10

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
}
