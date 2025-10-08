'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';

const SocketContext = createContext(null);

export function SocketProvider({ children }) {
  const {
      buyer_info
    } = useSelector(s => s?.buyer_info)
  const socketRef = useRef(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!buyer_info?.user_id) return;

    const SOCKET_URL = 'https://campus-express-kzo2.onrender.com';

    // Only connect if not already connected
    if (!socketRef.current) {
      const socketInstance = io(SOCKET_URL, {
        transports: ['websocket'],
        withCredentials: true,
        query: { user_id: buyer_info.user_id },
      });

      socketRef.current = socketInstance;
      setSocket(socketInstance);

      socketInstance.on('connect', () => {
        console.log('✅ Socket connected:', socketInstance.id);
      });

      socketInstance.on('disconnect', () => {
        console.log('❌ Socket disconnected');
      });

      socketInstance.on('connect_error', (err) => {
        console.error('⚠️ Socket error:', err.message);
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
        setSocket(null);
      }
    };
  }, [buyer_info?.user_id]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
}

// Custom hook to use the socket anywhere
export function useSocket() {
  return useContext(SocketContext);
}
