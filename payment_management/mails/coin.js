let pwd_reset = (transaction_ref,user_name,coin_count,amt_paid,date) => {
    return(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your Email Template</title>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #ffffff;
                box-shadow: 0 0 10px rgba(0,0,0,0.1);
            }
            h1 {
                color: #333333;
            }
            p {
                color: #555555;
            }
            a {
                color: #007BFF;
                text-decoration: none;
            }
            .button {
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 10px 20px;
                background-color: #FF4500;
                color: #ffffff;
                text-decoration: none;
                border-radius: 5px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Confirmation of Successful Coin Purchase</h1>
            <p>Hello ${user_name}</p>
            <p>You Have Succesfully Purchased ${coin_count} at ${amt_paid}</p>

            <div>
                <h4>Transaction Details:</h4>
                <ul>
                    <li>Item: ${coin_count} Coins</li>
                    <li>Amount Paid: ${amt_paid}</li>
                    <li>Transaction ID: ${transaction_ref}</li>
                    <li>Date of Purchase: ${date}</li>
                </ul>
            </div>

            <p>Thank you for choosing our service for your transaction. If you have any questions or need further assistance, please do not hesitate to contact us.</p>
            <p>Thank you for using Campus Express Nigeria.</p>
            <p>Best regards,</p>
            <p>CEO: Akpulu Fabian<br>
            
            Campus Express Nigeria.</p>
            
        </div>
    </body>
    </html>
    `)
}


function coinTxtMail(user_name,coin_count,amt_paid,transaction_ref,date) {
    return(
        `
        Hello ${user_name}
            You Have Succesfully Purchased ${coin_count} at ${amt_paid}

            Transaction Details:
            
                Item: ${coin_count} Coins
                Amount Paid: ${amt_paid}
                Transaction ID: ${transaction_ref}
                Date of Purchase: ${date}

            Thank you for choosing our service for your transaction. If you have any questions or need further assistance, please do not hesitate to contact us.
            Thank you for using Campus Express Nigeria.
            Best regards,
            CEO: Akpulu Fabian<br>
            
            Campus Express Nigeria.
        `
    )
}

module.exports={coinTxtMail}