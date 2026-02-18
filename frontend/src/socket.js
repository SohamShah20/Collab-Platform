import { io } from 'socket.io-client';

const URL = 'http://localhost:5001'; // Ensure this matches your backend port

export const socket = io(URL, {
    withCredentials: true,
    autoConnect: false
});
