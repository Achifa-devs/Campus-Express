import Geolocation from 'react-native-geolocation-service';
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import { set_location } from '../../../../../redux/location';
// import { setUserLocationTo } from '../../../../../redux/location';

async function requestLocationPermission() {
  if (Platform.OS === 'ios') {
    return true;
  }

  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn(err);
    return false;
  }
}

export async function getCurrentLocationAndAddress(dispatch) {
    const hasPermission = await requestLocationPermission();

    if (!hasPermission) {
        console.log('Permission not granted');
        return;
    }

    Geolocation.getCurrentPosition(
        async (position) => {
            const { latitude, longitude } = position.coords;
            // console.log('Latitude:', latitude, 'Longitude:', longitude);

            const address = await getAddressFromCoordinates(latitude, longitude);
            console.log('User address:', address.address.state);
            
            dispatch(set_location(address));
        },
        (error) => {
            console.error(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
}

async function getAddressFromCoordinates(latitude, longitude) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
      {
        headers: {
          'User-Agent': 'Estate/1.0 (akpulufabian@gmail.com)', // <-- Important
        },
      }
    );

    const data = await response.json();
    // console.log('Nominatim Response:', data); // <-- Add this to inspect

    if (data && data.display_name) {
      return data;
    } else {
      console.log('No address found in response');
      return null;
    }
  } catch (error) {
    console.error('Error in reverse geocoding:', error);
    return null;
  }
}
