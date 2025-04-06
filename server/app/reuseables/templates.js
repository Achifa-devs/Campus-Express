
let pwd_reset = (token,seller_id,name) => {
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
            <h1>Campus Express Nigeria. </h1>
            <p>Hello Dear,</p>
            <p>Thank you for choosing Campus Express Nigeria! To complete your password reset, please click the link below:</p>
            <button>
                <a href='www.campusexpressng.com/seller.password-reset?token=${token}&?seller_id=${seller_id}'>Reset Password</a>
            </button>
            <p>This link is valid for 5 minutes. Please do not share this link with anyone, as it is used for identity verification purposes only.</p>
            <p>If you did not initiate this action, please contact our support team immediately.</p>
            <p>Thank you for using Campus Express Nigeria.</p>
            <p>Best regards,</p>
            <p>CEO: Akpulu Fabian<br>
            
            Campus Express Nigeria.</p>
            
        </div>
    </body>
    </html>
    `)
}

let adsMail = (data)=> {
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
                height: auto;
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
            .mailHead{
                height: auto;
                width: 97%;
                background: #FF4500;
                color: #fff;
                font-family: Times-New-Roman;
                text-align: center;
                padding: 10px;
                font-weight: 1000;
            }
            .mailPurpose{
                height: auto;
                width: 97%;
                background: #000;
                color: #fff;
                text-align: center;
                padding: 10px;
                font-weight: 1000;
            }
            .mailAdsCnt{
                height: auto;
                width: 100%;
                padding: 0px;
                display: flex;
                align-items: flex-start;
                justify-content: space-evenly;
            }
            .mailAds{
                height: auto;
                width: calc(33.3% - 10px);
                padding: 10px;
                border: 1px solid #fff;
                margin: 10px 10px 10px 0px;
            }
            .adsImg{
                height: 85px;
                width: 100%
                
            }
            p{
                font-size: small;
            }
            .footer{
                height: 50px;
                width: 100%;
                text-align: center;
                font-size: medium;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1 style="color: #FF4500">UP TO 55% OFF Iphone 12 pro max, HP pavilion, Samsung T.V... </h1>
            
            <div class="mailHead">
                Campus Express
                
            </div>
            <div class="mailPurpose">
                OnSale Now
            </div>
            
            <div class="mailAdsCnt">
                
               
            </div>
            
        </div>
        <footer>
            <div class="footer">
                Sent with ❤️ from Campus Express.
            </div>
        </footer>
    </body>
    
    <script>
        document.querySelector('.mailAdsCnt');
        
        let ads = data.map((item) => {
            return(
                <a href={"https://www.campusexpressng.com/product?product_id="+item.product_id} class="mailAds">
                    <img src="" class="adsImg" alt="">
                    <p>{item.title}</p>
                    <h5>&#8358; item.price</h5>
                </a>
            )
         })
         
         cnt.insertAdjacentHTML("beforeend", ads)
         
        
    </script>
   
    </html>
    `)
}

let newItem = (category,price,title,img)=> {
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
                height: auto;
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
            .mailHead{
                height: auto;
                width: 97%;
                background: #FF4500;
                color: #fff;
                font-family: Times-New-Roman;
                text-align: center;
                padding: 10px;
                font-weight: 1000;
            }
            .mailPurpose{
                height: auto;
                width: 97%;
                background: #000;
                color: #fff;
                text-align: center;
                padding: 10px;
                font-weight: 1000;
            }
            .mailAdsCnt{
                height: auto;
                width: 100%;
                padding: 0px;
                display: flex;
                align-items: flex-start;
                justify-content: space-evenly;
            }
            .mailAds{
                height: auto;
                width: calc(33.3% - 10px);
                padding: 10px;
                border: 1px solid #fff;
                margin: 10px 10px 10px 0px;
            }
            .adsImg{
                height: 85px;
                width: 100%
                
            }
            p{
                font-size: small;
            }
            .footer{
                height: 50px;
                width: 100%;
                text-align: center;
                font-size: medium;
            }
            img{
                height: 100%;
                width: 100%;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1 style="color: #FF4500">Good Day</h1>
            
            <div class="mailHead">
                Campus Sphere
            </div>
            
            <p class="mailAdsCnt">
                We are delighted to inform you that your item has been successfully published on Campus Sphere and is now visible to our campus community of buyers. Congratulations on reaching this milestone!
            </p>

            <img src="${img}" alt=""/>
            <h1>Item Details:</h1>
            <ul>
                <li><b>Item Name</b>: ${title}</li>
                <li><b>Category<b>: ${category}</li>
                <li><b>Price<b>: ${price}</li>
            </ul>

            <p>Your product is now live and can be viewed by all our campus residents. We are committed to providing you with the best platform to reach your customers and facilitate smooth transactions.</p>
            
            <h1>Next Steps:</h1>
            <ul>
                <li><b>Monitor Your Listings</b>: Keep an eye on your seller dashboard for updates, inquiries, and sales.</li>
                <li><b>Engage with Buyers<b>: Respond promptly to any buyer questions to enhance their shopping experience.</li>
                <li><b>Update Inventory<b>: Ensure that your stock levels and product information are kept up-to-date.</li>
            </ul>

            <div>If you have any questions or need further assistance, please do not hesitate to contact our support team at support@campusSphere.com. We are here to help you succeed.</div>
            <div>Thank you for choosing Campus Sphere as your selling platform. We look forward to seeing your business thrive!</div>
        </div>
        <footer>
            <div class="footer">
                Sent with ❤️ from Campus Sphere.
            </div>
        </footer>
    </body>
   
    </html>
    `)
}

let cronRentUpgrade = (data)=> {
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
                height: auto;
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
            .mailHead{
                height: auto;
                width: 97%;
                background: #FF4500;
                color: #fff;
                font-family: Times-New-Roman;
                text-align: center;
                padding: 10px;
                font-weight: 1000;
            }
            .mailPurpose{
                height: auto;
                width: 97%;
                background: #000;
                color: #fff;
                text-align: center;
                padding: 10px;
                font-weight: 1000;
            }
            .mailAdsCnt{
                height: auto;
                width: 100%;
                padding: 0px;
                display: flex;
                align-items: flex-start;
                justify-content: space-evenly;
            }
            .mailAds{
                height: auto;
                width: calc(33.3% - 10px);
                padding: 10px;
                border: 1px solid #fff;
                margin: 10px 10px 10px 0px;
            }
            .adsImg{
                height: 85px;
                width: 100%
                
            }
            p{
                font-size: small;
            }
            .footer{
                height: 50px;
                width: 100%;
                text-align: center;
                font-size: medium;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1 style="color: #FF4500">Rent Upgrade</h1>
            
            <div class="mailHead">
                Campus Express
            </div>
            <div class="mailPurpose">
                Important Update: Virtual Shop Rent Upgraded to 10 Campus Coins
            </div>
            
            <div class="mailAdsCnt">
                
                <p>We are writing to inform you of an important update regarding your virtual shop on Campus Express. As part of our ongoing efforts to improve our services and enhance the virtual selling experience, we have upgraded the rent for your virtual shop.</p>
                <p>Please note that the new rent of 10 Campus Coins has been deducted from your balance. We believe this adjustment will help us maintain and improve the platform, ensuring a better environment for all our sellers and buyers.</p>
                <p>We understand that changes like these can impact your operations, and we are committed to providing you with the best support possible during this transition. If you have any questions or concerns, please do not hesitate to reach out to our support team at support@campusexpress.com.</p>
                <p>Thank you for your continued partnership and for being a valued member of the Campus Express community.</p>
            </div>
            
        </div>
        <footer>
            <div class="footer">
                Sent with ❤️ from Campus Express.
            </div>
        </footer>
    </body>
    
  
   
    </html>
    `)
}

let cronListingDeativation = (data)=> {
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
                height: auto;
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
            .mailHead{
                height: auto;
                width: 97%;
                background: #FF4500;
                color: #fff;
                font-family: Times-New-Roman;
                text-align: center;
                padding: 10px;
                font-weight: 1000;
            }
            .mailPurpose{
                height: auto;
                width: 97%;
                background: #000;
                color: #fff;
                text-align: center;
                padding: 10px;
                font-weight: 1000;
            }
            .mailAdsCnt{
                height: auto;
                width: 100%;
                padding: 0px;
                display: flex;
                align-items: flex-start;
                justify-content: space-evenly;
            }
            .mailAds{
                height: auto;
                width: calc(33.3% - 10px);
                padding: 10px;
                border: 1px solid #fff;
                margin: 10px 10px 10px 0px;
            }
            .adsImg{
                height: 85px;
                width: 100%
                
            }
            p{
                font-size: small;
            }
            .footer{
                height: 50px;
                width: 100%;
                text-align: center;
                font-size: medium;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1 style="color: #FF4500">Shop Deactivation!</h1>
            
            <div class="mailHead">
                Campus Express
            </div>
            <div class="mailPurpose">
                Important Update: Virtual Shop Deactivated
            </div>
            
            <div class="mailAdsCnt">
                
                <p>We are writing to inform you that your virtual shop on Campus Express has expired. As a result, all your listings have been deactivated.</p>

                <p>We understand that this may be an inconvenience, and we encourage you to take the necessary steps to reactivate your shop and restore your listings. If you wish to continue selling on Campus Express, please click the link below</p>

                <a href='https://www.campusexpressng.com/seller.profile'>Click Here To Reactivate Your Shop</a>
                
                <p>Thank you for your continued partnership and for being a valued member of the Campus Express community.</p>
            </div>
            
        </div>
        <footer>
            <div class="footer">
                Sent with ❤️ from Campus Express.
            </div>
        </footer>
    </body>
    
  
   
    </html>
    `)
}

module.exports={cronListingDeativation,pwd_reset,adsMail,newItem}