'use strict'

class NotificationController {
  constructor({ socket, request, auth }) {
    this.socket = socket
    this.request = request
    auth
      .getUser()
      .then(usr => {
        this.user = usr
      })
      .then(() => {
        this.socket.broadcast('new:connection', this.user)
      })
  }

  onMessage(message) {
    message.user = this.user
    this.socket.broadcastToAll('message', message)
  }

  onClose() {
    this.socket.broadcastToAll('drop:connection')
  }
}

module.exports = NotificationController
