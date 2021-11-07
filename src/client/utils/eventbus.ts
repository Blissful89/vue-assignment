import mitt from 'mitt'

type Events = {
  message: Vehicles.Data
  error: Error
}

export default mitt<Events>()
