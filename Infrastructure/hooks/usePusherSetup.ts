import { useEffect, useState } from 'react';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { getCurrentUser } from '../helpers/HelperUtils';
import { IUser } from '@/domain/entities/user.entities';
import { handleNotification } from '../Broadcast/Notification';

declare global {
  interface Window {
    Pusher: any; 
  }
}

const usePusherSetup = () => {
  const [echo, setEcho] = useState<Echo<"pusher"> | null>(null);
    type PusherEchoOptions = {
    broadcaster: 'pusher';
    key: string|undefined;
    cluster: string|undefined;
    forceTLS: boolean;
    authEndpoint: string;
    auth: {
        headers: {
        Authorization: string;
        Accept: string;
        };
    };
    };
  useEffect(() => {
    if (typeof window !== 'undefined' ) {
      // Associez Pusher à Laravel Echo\
      Pusher.logToConsole = true;
      window.Pusher = Pusher;
       ;
      const user = getCurrentUser() as IUser;
      const token = localStorage.getItem('token');

      const options : PusherEchoOptions = {
        broadcaster: 'pusher',
        key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY || '',
        cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER || '',
        forceTLS: true,
        authEndpoint: `${process.env.NEXT_PUBLIC_BASE_URL}/broadcasting/auth`,
        auth: {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        },
      };

     

      const echoInstance = new Echo(options);
      echoInstance.private(`App.Models.User.${user?.id}`)
        .notification((notification: Record<string, unknown>) => {
          console.log('Notification reçue :', notification);
          handleNotification(notification);
        });

      setEcho(echoInstance);

      // Déconnectez Echo lors de la destruction du composant
      return () => {
        echoInstance.disconnect();
      };
    }
  }, []);

  return echo;
};

export default usePusherSetup;
