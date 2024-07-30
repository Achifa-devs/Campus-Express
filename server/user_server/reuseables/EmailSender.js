var axios = require('axios');

function KudiEmailSender(html,email,subject) {
    var axios = require('axios');
    var FormData = require('form-data');
    var data = new FormData();
    data.append('token', 'rXdAgTsFBOS8ECK7MZk1i6WojUmqy9unDv34cQablpz0JLHhIV5NfPG2teYwxR');
    data.append('senderEmail', 'campus-express@campusexpressng.com');
    data.append('senderName', 'Campus Express Nigeria');
    data.append('senderFrom', 'Campus Express Nigeria');
    data.append('campaignName', 'Campus Express Nigeria');
    data.append('recipient', email);
    data.append('subject', subject);
    data.append('templateCode', html);

    var config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://my.kudisms.net/api/campaign',
    headers: { 
        ...data.getHeaders()
    },
    data : data
    };

    axios(config)
    .then(function (response) {
    console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
    console.log(error);
    });

        
}

module.exports ={
    KudiEmailSender
} 