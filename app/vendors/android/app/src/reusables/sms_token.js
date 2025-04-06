import axios from 'axios';
import { generateSixDigitId } from './Id';
import { storeData } from './AsyncStore.js';
export async function send_token(number) {

    let token = generateSixDigitId();
    storeData('token', token)
    console.log(token)
    
    var FormData = require('form-data');
    var data = new FormData();
    data.append('token', 'rXdAgTsFBOS8ECK7MZk1i6WojUmqy9unDv34cQablpz0JLHhIV5NfPG2teYwxR');
    data.append('senderID', 'CampusXpres');
    data.append('recipients', number);
    data.append('message', `Use this OTP '${token}' to validate your phone number on Campus Express. This OTP will expire after 5 mins.`);
    data.append('gateway', '2');

    var config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://my.kudisms.net/api/sms?token=rXdAgTsFBOS8ECK7MZk1i6WojUmqy9unDv34cQablpz0JLHhIV5NfPG2teYwxR&senderID=CampusXpres&recipients=${number}&message=Use this OTP '${token}' to validate your phone number on Campus Express. This OTP will expire after 5 mins.&gateway=2`,
    headers: { 
        // ...data.getHeaders()
    },
    data : data
    };

    return await axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
        return response.data.status
    })
    .catch(function (error) {
        console.log(error);
    });



}