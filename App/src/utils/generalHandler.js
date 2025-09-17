import DeviceInfo from 'react-native-device-info';
import { Product } from '../api';
import Memory from './memoryHandler';
import { Alert } from 'react-native';

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
}


export default Tools