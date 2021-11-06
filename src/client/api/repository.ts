const URL = 'ws://localhost:3000'

class Repository {
  socket?: WebSocket

  open(cb?: any) {
    this.socket = new WebSocket(URL)
    this.socket.onopen = cb
  }

  close(cb?: any) {
    if (this.socket) {
      this.socket.onclose = cb
      this.socket.close()
      this.socket = undefined
    }
  }

  onmessage(cb?: any) {
    if (!this.socket) {
      this.socket = new WebSocket(URL)
    }

    this.socket.onmessage = cb;
  }

  isOpen() {
    return Boolean(this.socket);
  }
}

export default new Repository();
