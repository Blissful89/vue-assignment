import { ref } from 'vue'
import eventbus from '@/client/utils/eventbus'
import config from '@/client/utils/config'

/**
 * This repository opens the connection for vehicle data.
 * It fakes a loading state to mimic real delay
 */
class Repository {
  private apiUrl = `http://${config.server.host}:${config.server.port}`
  private websocketUrl = `ws://${config.server.host}:${config.server.port}`
  socket?: WebSocket
  loading = ref(false)

  openWebsocket(cb?: any) {
    this.loading.value = true
    setTimeout(() => {
      this.socket = new WebSocket(this.websocketUrl)
      this.socket.onopen = cb
      this.socket.onmessage = (e: any) => eventbus.emit('message', JSON.parse(e.data))
      this.socket.onerror = () =>
        eventbus.emit('error', new Error('A connection was not established'))
      this.loading.value = false
    }, 1000)
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

  loadHistory(): Promise<Vehicles.HistoryData[]> {
    return fetch(`${this.apiUrl}/api/history`)
      .then((res) => res.json())
      .catch(() => eventbus.emit('error', new Error('History was not retrieved')))
  }
}

export default new Repository()
