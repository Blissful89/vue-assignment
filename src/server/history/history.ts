const MAX_ITEMS = 1000

export default class History {
  items: Vehicles.Data[]

  constructor() {
    this.items = []
    Object.freeze(this)
  }

  add(data: Vehicles.Data) {
    this.items.push(data)

    if(this.items.length > MAX_ITEMS) {
      this.items.shift()
    }
  }
}