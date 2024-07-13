const { upload_chat_meta_data, upload_chat, delete_chat_meta_data, delete_chat } = require("../utils");

class Chat{
    constructor(){

    }

    async Upload(mssg,mssg_id,mssg_type,sender_id,room_id,date){
        let meta_upload = upload_chat_meta_data(mssg_id,mssg_type,sender_id,room_id,date)
        console.log(mssg,mssg_id,mssg_type,sender_id,room_id,date)
        if(meta_upload) 
        {
            let chat_upload = upload_chat(mssg,mssg_id,date);
            let response = chat_upload ? true : false;
            return response;
        }else
        {
            return(false);
        }
    }
    async Update(){

    }
    async Delete(mssg_id){
        let result1 = await delete_chat_meta_data(mssg_id)
        let result2 = await delete_chat(mssg_id)
        return (result1,result2)
    }
}

module.exports={Chat}