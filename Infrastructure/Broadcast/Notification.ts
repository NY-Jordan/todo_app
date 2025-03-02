import toast from "react-hot-toast";
import { getAllNotification } from "../Services/NotificationService";
import Notification from '../../presentation/components/Notification/Notification';
import { NotificationEnum } from "@/domain/enum/NotificationEnums";

export const handleNotification = (notif : unknown) => {
 const Notification =  notif as NotificationEnum
  playNotificationSound();
    toast('Vous avez une nouvelle notification', {
        duration: 4000,
        position: "bottom-left",
        style: {
            backgroundColor : '#0284c7',
            color : 'black'
        },
        icon: '🔔',
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      });
    getAllNotification()
  if (Notification === NotificationEnum.invitation_accepted) {
    
  }
}

const playNotificationSound = () => {
  const audio = new Audio('/sound/notification-22-270130.mp3');
  audio.play().catch((error) => {
    console.error('Erreur lors de la lecture du son:', error);
  });
};