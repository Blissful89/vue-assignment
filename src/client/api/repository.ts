import { ref } from 'vue'
import eventbus from '@/client/utils/eventbus'
import config from '@/client/utils/config'

/**
 * This repository opens the connection for vehicle data.
 * It fakes a loading state to mimic real delay
 */
class Repository {
  private url = `ws://${config.server.host}:${config.server.port}`
  socket?: WebSocket
  loading = ref(false)

  openWebsocket(cb?: any) {
    this.loading.value = true
    setTimeout(() => {
      this.socket = new WebSocket(this.url)
      this.socket.onopen = cb
      this.socket.onmessage = (e: any) => eventbus.emit('message', e)
      this.loading.value = false
    }, 2000)
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
