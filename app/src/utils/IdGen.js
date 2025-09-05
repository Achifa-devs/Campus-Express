import DeviceInfo from 'react-native-device-info';

export function generateId(length) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';
  
  for (let i = 0; i < length; i++) {
    const randIndex = Math.floor(Math.random() * chars.length);
    id += chars[randIndex];
  }

  return id;
}


export const getDeviceId = async () => {
  const uniqueId = await DeviceInfo.getUniqueId();
  console.log('Device Unique ID:', uniqueId);
  return uniqueId;
};
