import { EventEmitter } from 'events'
import csvParse from 'csv-parse'
import fs from 'fs'
import { Writable } from 'stream'
import History from './history/history'
import validate from './validation/validate'

export default class Broadcaster extends EventEmitter {
  broadcasting: boolean
  history: History

  constructor(history: History) {
    super()
    this.broadcasting = false
    this.history = history;
  }

  start() {
    this.broadcasting = true
    const broadcast = () => {
      console.log('Broadcasting...')
      const fileStream = fs.createReadStream('./meta/route.csv')

      fileStream
        .pipe(csvParse({ delimiter: ',', columns: true, cast: true }))
        .pipe(
          new Writable({
            objectMode: true,
            write: (obj: Vehicles.Data, enc: any, cb: any) => {
              if (!this.broadcasting) return cb()
              const data = validate(obj, this.history)
              if (data) {
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
