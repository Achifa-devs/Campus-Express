import { request } from "../utils/requestHandler";

export class Common{

    static async getBanners(){
        return await request({
            url: "/banner",
            method: "GET"
        });
    }
    
}