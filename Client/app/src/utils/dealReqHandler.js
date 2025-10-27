import axios from "axios";

class Deal{
    static async updateDealStatus(socket){
        socket.emit('/deal/create', {

        })
    }

    static async uploadEvidence(socket, data){
        socket.emit('/deal/update', {

        })
    }

    static async claimPayment(socket){
        socket.emit('/deal/payment/claim', {

        })
    }

    static async releasePayment(socket){
        socket.emit('/deal/payment/release', {

        })
    }

    static async raiseComplaint(socket){
        socket.emit('/deal/complaint', {

        })
    }
}