import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
// import notifee, { AndroidImportance, AndroidStyle, AndroidVisibility } from '@notifee/react-native';
import { getApp } from '@react-native-firebase/app';
import { getMessaging } from '@react-native-firebase/messaging';

// // Create notification channel (for both foreground and background)
// async function createNotificationChannel() {
//   await notifee.createChannel({
//     id: 'remoteMessage',
//     name: 'Remote Messages',
//     importance: AndroidImportance.HIGH,
//     visibility: AndroidVisibility.PUBLIC,
//     sound: 'default',
//     vibration: true,
//   });
// }

// // Background message handler
// async function handleBackgroundMessage(remoteMessage) {
//   console.log('Background FCM:', remoteMessage);
  
//   await createNotificationChannel();
  
//   // Display notification
//   await notifee.displayNotification({
//     title: remoteMessage.notification?.title || remoteMessage.data?.title,
//     body: remoteMessage.notification?.body || remoteMessage.data?.body,
//     android: {
//       channelId: 'remoteMessage',
//         smallIcon: 'ic_notification', // White-only icon for status bar
//       largeIcon: 'ic_notification_large', // Your colored logo
//       style: remoteMessage.data?.media ? {
//         type: AndroidStyle.BIGPICTURE,
//         picture: remoteMessage.data.media,
//       } : undefined,
//       pressAction: {
//         id: 'default',
//       },
//       importance: AndroidImportance.HIGH,
//       visibility: AndroidVisibility.PUBLIC,
//       sound: 'default',
//     },
//   });
// }

// // Initialize Firebase messaging
// function setupBackgroundMessaging() {
//   const app = getApp();
//   const messaging = getMessaging(app);
  
//   // Register background handler
//   messaging.setBackgroundMessageHandler(handleBackgroundMessage);
  
//   // Optional: Background event listener for notification interactions
//   notifee.onBackgroundEvent(async ({ type, detail }) => {
//     console.log('Notification interacted with:', type, detail.notification);
//   });
// }

// // Initialize
// setupBackgroundMessaging();

// Register app
AppRegistry.registerComponent(appName, () => App);