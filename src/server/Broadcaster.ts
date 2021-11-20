import { EventEmitter } from 'events'
import csvParse from 'csv-parse'
import fs from 'fs'
import { Writable } from 'stream'
import History from './history/history'
import validate from './validation/validate'

export default class Broadcaster extends EventEmitter {
  broadcasting: boolean
  history: History

  constructor() {
    super()
    this.broadcasting = false
    this.history = new History()
  }

  start() {
    this.broadcasting = true
    const broadcast = () => {
      console.log('Broadcasting...')
      const fileStream = fs.createReadStream('./meta/route.csv')

      fileStream
        // Filestream piped to csvParse which accept nodejs readablestreams and parses each line to a JSON object
        .pipe(csvParse({ delimiter: ',', columns: true, cast: true }))
        // Then it is piped to a writable streams that will push it into nats
        .pipe(
          new Writable({
            objectMode: true,
            write: (obj: Vehicles.Data, enc: any, cb: any) => {
              if (!this.broadcasting) return cb()
              // console.log(obj);
              const data = validate(obj, this.history)
              if (data) {
                // setTimeout in this case is there to emulate real life situation
                // data that came out of the vehicle came in with irregular interval
                // Hence the Math.random() on the second parameter
                setTimeout(() => {
                  this.emit('data', data)
                  this.history.add(data)
                  cb()
                }, Math.ceil(Math.random() * 150))
              } else {
                cb()
              }
            },
          }),
        )
        .once('finish', () => {
          console.log('Finished broadcasting')
          if (this.broadcasting) {
            console.log('Re-broadcast')
            broadcast()
          } else {
            console.log('Stopped broadcast')
            return
          }
        })
    }
    broadcast()
  }

  end() {
    this.broadcasting = false
  }
}
