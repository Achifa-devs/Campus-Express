import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import notifee, {
  AndroidImportance,
  AndroidStyle,
  AndroidVisibility,
  EventType,
} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import { navigate } from './src/navigation/root_nav';
import Tools from './src/utils/generalHandler';

// ✅ Create notification channel (for both foreground and background)
async function createNotificationChannel() {
  await notifee.createChannel({
    id: 'remoteMessage',
    name: 'Remote Messages',
    importance: AndroidImportance.HIGH,
    visibility: AndroidVisibility.PUBLIC,
    sound: 'default',
    vibration: true
  });
}

notifee.onBackgroundEvent(async ({ type, detail }) => {
  if (type === EventType.PRESS && detail.notification?.data) {
    const { room } = detail.notification.data;
    // Save to some global or handle when app starts
    navigate('Chat', { 
      room,
      from: 'notifee',
      id: Tools.generateId(10) 
    });
  }
});

// from: 'notifee', 
// room: { key: room, partner: response.partner },
// id: Tools.generateId(0)

notifee.onForegroundEvent(({ type, detail }) => {
  if (type === EventType.PRESS && detail.notification?.data) {
    const { room } = detail.notification.data;
    navigate('Chat', { 
      room,
      from: 'notifee',
      id: Tools.generateId(10) 
    });
  }
});

// ✅ Background message handler (must be top-level)
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Background FCM:', remoteMessage);

  await createNotificationChannel();

  await notifee.displayNotification({
    title: remoteMessage.notification?.title || remoteMessage.data?.title,
    body: remoteMessage.notification?.body || remoteMessage.data?.body,
    android: {
      channelId: 'remoteMessage',
      smallIcon: 'ic_notification', // white-only icon for status bar
      largeIcon: 'ic_notification_large', // your colored logo
      style: remoteMessage.data?.media
        ? {
            type: AndroidStyle.BIGPICTURE,
            picture: remoteMessage.data.media,
          }
        : undefined,
      pressAction: {
        id: 'default',
      },
      color: '#FF4500', // 🔥 optional custom color (orange-red)
      importance: AndroidImportance.HIGH,
      visibility: AndroidVisibility.PUBLIC,
      sound: 'default'
    },
  });
});

// ✅ Handle notification interactions in background
notifee.onBackgroundEvent(async ({ type, detail }) => {
  console.log('Notification interaction:', type, detail.notification);
});

// ✅ Register app
AppRegistry.registerComponent(appName, () => App);
