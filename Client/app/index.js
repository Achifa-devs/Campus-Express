import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import notifee, {
  AndroidImportance,
  AndroidStyle,
  AndroidVisibility,
} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

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
