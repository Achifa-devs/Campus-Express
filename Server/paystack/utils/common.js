export class Transfer {

    static async createRecipient(name, account_number, bank_code) {
    
        const https = require('https')

        const params = JSON.stringify({
            "type": "nuban",
            "name": name,
            "account_number": account_number,
            "bank_code": bank_code,
            "currency": "NGN"
        })

        const options = {
            hostname: 'api.paystack.co',
            port: 443,
            path: '/transferrecipient',
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.paystack_secret_key}`,
                'Content-Type': 'application/json'
            }
        }

        const req = https.request(options, res => {
            let data = ''

            res.on('data', (chunk) => {
                data += chunk
            });

            res.on('end', () => {
                console.log(JSON.parse(data))
            })
        }).on('error', error => {
            console.error(error)
        })

        req.write(params)
        req.end()
    }

    static async initiateTransfer(amount, recipient, reason, reference) {
        const https = require('https')

        const params = JSON.stringify({
            "source": "balance",
            "reason": reason,
            "amount": amount,
            "recipient": recipient,
            "reference": reference
        })

        const options = {
            hostname: 'api.paystack.co',
            port: 443,
            path: '/transfer',
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.paystack_secret_key}`,
                'Content-Type': 'application/json'
            }
        }

        const req = https.request(options, res => {
            let data = ''

            res.on('data', (chunk) => {
                data += chunk
            });

            res.on('end', () => {
                console.log(JSON.parse(data))
            })
        }).on('error', error => {
            console.error(error)
        })

        req.write(params)
        req.end()
    }

}