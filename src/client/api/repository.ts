import { ref } from 'vue'
import eventbus from '@/client/utils/eventbus'

const URL = 'ws://localhost:3000'
const DELAY = 2000

/**
 * This repository opens the connection for vehicle data.
 * It fakes a loading state to mimic real delay
 */
class Repository {
  socket?: WebSocket
  loading = ref(false)

  openWebsocket(cb?: any) {
    this.loading.value = true
    setTimeout(() => {
      this.socket = new WebSocket(URL)
      this.socket.onopen = cb
      this.socket.onmessage = (e: any) => eventbus.emit('message', e)
      this.loading.value = false
    }, DELAY)
  }

  closeWebsocket(cb?: any) {
    if (this.socket) {
      this.socket.onclose = cb
      this.socket.close()
      this.socket = undefined
    }
  }

  isOpen() {
    return Boolean(this.socket)
  }
}

export default new Repository()
