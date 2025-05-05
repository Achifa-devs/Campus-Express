import notifee, { AndroidStyle } from '@notifee/react-native';

export async function displayProductCard(remoteMesssage) {
  await notifee.displayNotification({
    title: remoteMesssage.title,
    body: `₦${remoteMesssage.body}`,
    android: {
      channelId: 'remoteMesssage',
      smallIcon: 'ic_launcher', // Use your app icon
      style: {
        type: AndroidStyle.BIGPICTURE,
        picture: remoteMesssage.data.media, // image must be a valid URL
      },
      pressAction: {
        id: 'default',
      },
    },
  });
}


//   await notifee.displayNotification({
    //     title: remoteMessage.notification?.title || 'New Message',
    //     body: remoteMessage.notification?.body || 'Check your app!',
    //     android: {
    //       channelId: 'default',
    //       smallIcon: 'ic_launcher',
    //     },
    //   });