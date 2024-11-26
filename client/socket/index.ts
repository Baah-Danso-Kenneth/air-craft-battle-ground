import {io} from 'socket.io-client'

const SOCKET_URL = 'http://localhost:3000'

export const socket = io(SOCKET_URL,{
    transports: ['websocket'],
    reconnection: true,
    reconnectionAttempts: 5,
    timeout: 10000
});


socket.on('connect',()=>{
    console.log(`Connected to socket Server with Id ${socket.id}`)
});

socket.on('disconnect',()=>{
    console.log('Disconnected')
})