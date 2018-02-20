import io from 'socket.io'
import authSubscriber from "./subscribers/auth";
import messageSubscriber from "./subscribers/message";



const subscribers = Object.assign({}, authSubscriber, messageSubscriber)



export default (http) => {
    return io(http)
        // This will run when the client first connects to our socket
        // It registers all of the listeners for THEM
        .on('connection', (socket) => {
            Object.keys(subscribers)
                .map(type => ({ type, handler: subscribers[type] }))
                .forEach(subscriber => {
                    // TODO: do a "socket.on" for the subscriber.type that takes payload and tries to run its handler
                })
        })
        .on('error', (error) => {
            console.error('__SOCKET_IO_ERROR__', error)
        })
}
