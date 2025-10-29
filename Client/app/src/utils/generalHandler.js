import DeviceInfo from 'react-native-device-info';
import { Product } from '../api';
import Memory from './memoryHandler';
import { Alert, PermissionsAndroid, Platform } from 'react-native';

class Tools {
    static async getDeviceId(){
        const uniqueId = await DeviceInfo.getUniqueId();
        console.log('Device Unique ID:', uniqueId);
        return uniqueId;
    }


    static generateId(length){
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let id = '';
        
        for (let i = 0; i < length; i++) {
            const randIndex = Math.floor(Math.random() * chars.length);
            id += chars[randIndex];
        }

        return id;
    }

    static async createView({data, user_id}){

        const response = await Product.createView({
            product_id: data?.product_id,
            user_id
        })
        if (response?.success) {  
            const newHistory = { date: new Date(), data: data };
            const prevHistory = await Memory.get('history');
            console.log(prevHistory)
            if(prevHistory){
                const arr = (prevHistory);
                let duplicate = arr.filter(item => item.data.product_id === data?.product_id).length>0;
                if(!duplicate){
                    Memory.store('history', ([...arr, newHistory]));
                }
            }else{
                Memory.store('history', ([newHistory]));
            }

            
        }
    }

    static capitalize(str) {
        return str && str.charAt(0).toUpperCase() + str.slice(1);
    }

    static formatNumber(num) {
        if (num < 1000) {
            return num.toString(); // leave small numbers as-is
        } else if (num < 1_000_000) {
            return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1) + "k";
        } else if (num < 1_000_000_000) {
            return (num / 1_000_000).toFixed(num % 1_000_000 === 0 ? 0 : 1) + "m";
        } else {
            return (num / 1_000_000_000).toFixed(num % 1_000_000_000 === 0 ? 0 : 1) + "b";
        }
    }

    static generateConversationId(userA, userB) {
        // console.log(userA, userB)
        if (userA === userB) {
        throw new Error("Conversation requires two different users");
        }
        // Sort the two IDs lexicographically (alphabet + number ordering)
        return [userA, userB].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0)).join('_');
    }

    static generateDealStatusAfterPurchase(){
        return(
            {
                refunded: {
                    outcome: null,
                    completed: false,
                    completedAt: null,
                },
                shipping: {
                    outcome: null,
                    completed: false,
                    completedAt: null,
                },
                cancelled: {
                    outcome: null,
                    completed: false,
                    completedAt: null,
                },
                completed: {
                    outcome: null,
                    completed: false,
                    completedAt: null,
                    buyer: false,
                    vendor: false
                },
                confirmed: {
                    outcome: null,
                    completed: false,
                    completedAt: null,
                },
                delivered: {
                    outcome: null,
                    completed: false,
                    completedAt: null,
                },
                purchased: {
                    outcome: "success",
                    completed: true,
                    completedAt: new Date(),
                },
            }
        )
    }

    static capitalize = str => str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
    static lower_case = str => str ? str.charAt(0).toLowerCase() + str.slice(1) : '';

    static requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title: 'Camera Permission',
                message: 'App needs camera access to take photos.',
                buttonPositive: 'OK',
            },
            );

            return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
        return true; // iOS handles via Info.plist
    };

    static getTimeAgo = (pastDate) => {
        if (!pastDate) return '';
    
        const now = new Date();
        const past = new Date(pastDate);
        const diffMs = now - past; // difference in milliseconds
    
        // Convert to seconds, minutes, hours, days
        const seconds = Math.floor(diffMs / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
    
        if (days >= 1) {
          return `${days} day${days > 1 ? 's' : ''} & Counting`;
        } else if (hours >= 1) {
          return `${hours} hour${hours > 1 ? 's' : ''} & Counting`;
        } else if (minutes >= 1) {
          return `${minutes} minute${minutes > 1 ? 's' : ''} & Counting`;
        } else {
          return `${seconds} second${seconds !== 1 ? 's' : ''} & Counting`;
        }
      };
    
    
    static formatDealDate = (dateString) => {
        if (!dateString) return '';
    
        const date = new Date(dateString);
    
        // Get date parts
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
    
        // Add ordinal suffix (st, nd, rd, th)
        const getOrdinal = (n) => {
          const s = ['th', 'st', 'nd', 'rd'];
          const v = n % 100;
          return s[(v - 20) % 10] || s[v] || s[0];
        };
    
        const hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const hour12 = hours % 12 || 12;
    
        return `${day}${getOrdinal(day)} ${month} ${year} by ${hour12}:${minutes}${ampm}`;
    }
    

}


export default Tools