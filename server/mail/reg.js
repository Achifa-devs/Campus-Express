

function regTxtMailTemplate(user_name) {
    return(
        `
        <!DOCTYPE html>
      <html lang="en">
      	<head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        	<title>Your Email Template</title>
        </head>
        <style>
              body {
                  font-family: 'Arial', sans-serif;
                  margin: 0;
                  height: auto;
                  padding: 0;
                  background-color: #f4f4f4;
              }
              .container {
                  width: 100%;
                  margin: 0 auto;
                  padding: 20px;
                  background-color: #ffffff;
                  
          }
p,header,h4,a{
    font-size: small;
    padding: 10px;
          }
button{
    padding: 10px;
    background-color: #FF4500;
    width: calc(100% - 20px);
    color: #fff;
}

				
		</style>

        <body>
          <header><h2>Campus Express Nigeria</h2></header>
          <div class='container'>
            <h4>Hello ${user_name}</h4>
        
        
        <p>Welcome to Campus Express! We are thrilled to have you join our community of sellers. Your registration has been successfully completed, and you are now ready to start selling your products on our platform.</p>
        
        <h4>Here’s what you can do next:</h4>
        <ol>
            <li>Set Up Your Store:
               <ul>
                  </li>Log in to your account and complete your store profile.</li>
                  </li>Add a detailed description of your store to attract customers.</li>
               </ul>
            </li>
         
            <li>List Your Products:
               <ul>
                  </li>Add high-quality images and detailed descriptions of your products.</li>
                  </li>Set competitive prices to attract more buyers.</li>
               </ul>
            </li>

            <li> Promote Your Store:
               <ul>
                     </li>Utilize our promotional tools to reach a wider audience.</li>
                     </li>Engage with customers through reviews and feedback to build a strong reputation.</li>
               </ul>
            </li>

            <li> Get Support:
            <ul>
                  </li>Visit our Help Center for tips and tutorials on how to optimize your store.</li>
                  </li>Contact our support team at 08032639894 if you need any assistance.</li>  
               </ul>
            </li>
         </ol>

        <p>We are committed to helping you succeed and grow your business on Campus Express. If you have any questions or need any assistance, please do not hesitate to reach out to us.</p>
        
        <p>Once again, welcome aboard! We look forward to seeing your store thrive on Campus Express.</p>
        
        <p>Best regards,</p>
          <br/>
          <p>Akpulu Fabian Chinedu  </p>
          <p>CEO/Director</p>
          <p>Campus Express Team  </p>
          <p>akpulufabian@gmail.com</p>
          </div>
        </body>
       	</html>


        `
    )
}

function regTxtMail(user_name) {
   return(
       `Hello ${user_name}
       \n\n
       We are thrilled to have you join Campus Express! community of sellers. You can now start selling your items on our platform by:
       \n\n
       1.Setting Up Your Store.
       \n\n
       2.Listing Your Items.
       \n\n
       3.Promoting Your Store using our promotional tools to reach more buyers.
       \n\n
       4.Engaging with customers via reviews to build a strong reputation.
       \n\n
       Contact our support team at 08032639894 if you need any help.
       \n\n
       We look forward to seeing your store thrive on Campus Express.
       \n\n
       Best regards`
   )
}

function emailRegMail(user_name,token,email) {
   return(
       `
       Hello ${user_name}
       ---
       
       Welcome to Campus Express! We are thrilled to have you join our community of sellers. Your registration has been successfully completed, and you are now ready to start selling your products on our platform.

       Click the link below to verify your email:
       http://localhost:3000/seller.email-verification?token='${token}'&email='${email}'
       If the link does not work, you can copy and paste it into your web browser.
       
       We are committed to helping you succeed and grow your business on Campus Express. If you have any questions or need any assistance, please do not hesitate to reach out to us.
       
       Once again, welcome aboard! We look forward to seeing your store thrive on Campus Express.
       
       Best regards,
       
       Akpulu Fabian Chinedu  
       CEO/Director
       Campus Express Team  
       akpulufabian@gmail.com
       
       ---
       `
   )
}

function phoneRegMail(user_name,token,phone) {
   return(
       `Hello ${user_name}
       \n\n
       \n\n
       
       Welcome to Campus Express! We are thrilled to have you join our community of sellers. Your registration has been successfully completed, and you are now ready to start selling your products on our platform.
       \n\n
       \n\n
       Click the link below to confirm this is your phone number:
       \n\n
       http://localhost:3000/seller.phone-verification?token='${token}'&phone='${phone}'
       \n\n
       \n\n
       We are committed to helping you succeed and grow your business on Campus Express. If you have any questions or need any assistance, please do not hesitate to reach out to us.
       \n\n
       \n\n
       Once again, welcome aboard! We look forward to seeing your store thrive on Campus Express.
       \n\n
       \n\n
       Best regards,
       \n\n
       Akpulu Fabian Chinedu  
       CEO/Director
       Campus Express Team  
       akpulufabian@gmail.com
       
       `
   )
}

function mailTemplate(user_name,token,email) {
   return(
      `
      <!DOCTYPE html>
      <html lang="en">
      	<head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        	<title>Campus Express</title>
        </head>
        <style>
            body {
               font-family: 'Arial', sans-serif;
               margin: 0;
               height: auto;
               padding: 0;
               background-color: #f4f4f4;
            }
            .container {
               width: 100%;
               margin: 0 auto;
               padding: 20px;
               background-color: #ffffff;
               
            }
            p,header,h4,a{
               font-size: small;
               padding: 10px;
                     }
            button{
               padding: 10px;
               background-color: #FF4500;
               width: calc(100% - 20px);
               color: #fff;
            }
		   </style>

        <body>
          <header><h2>Campuse Express Nigeria</h2></header>
          <div class='container'>
            <h4>Hello ${user_name}</h4>
			<br/>
            <p>Thank you for registering as a seller on Campus Express! To complete your registration and start selling, please verify your email address.</p>
            <br/>
            
            <a href="http://localhost:3000/seller.email-verification?token='${token}'&email='${email}'">
               <button>
                  Click Here To Verify Your Email
               </button>
               <br/>
            </a>
            <br/>
			
            <p>We are committed to helping you succeed and grow your business on Campus Express. If you have any questions or need any assistance, please do not hesitate to reach out to us.</p>
            <br/>
            <p>Once again, welcome aboard! We look forward to seeing your store thrive on Campus Express.Once again, welcome aboard! We look forward to seeing your store thrive on Campus Express.</p>
            <br/>

            <p>Best regards,</p>
			   <br/>
            <p>Akpulu Fabian Chinedu  </p>
            <p>CEO/Director</p>
            <p>Campus Express Team  </p>
            <p>akpulufabian@gmail.com</p>
       
          </div>
        </body>
      </html>


      `
   )
}


function pwdMailTemplate(token,email) {
   return(
      `
      <!DOCTYPE html>
      <html lang="en">
      	<head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        	<title>Campus Express</title>
        </head>
        <style>
            body {
               font-family: 'Arial', sans-serif;
               margin: 0;
               height: auto;
               padding: 0;
               background-color: #f4f4f4;
            }
            .container {
               width: 100%;
               margin: 0 auto;
               padding: 20px;
               background-color: #ffffff;
               
            }
            p,header,h4,a{
               font-size: small;
               padding: 10px;
                     }
            button{
               padding: 10px;
               background-color: #FF4500;
               width: calc(100% - 20px);
               color: #fff;
            }
		   </style>

        <body>
          <header><h2>Campuse Express Nigeria</h2></header>
          <div class='container'>
            <h4>Hello </h4>
			<br/>
            <p>Thank you for choosing Campus Express! To reset your password and continue selling, please click the link below.</p>
            <br/>
            
            <a href="http://localhost:3000/seller.password-reset?token='${token}'&email='${email}'">
               <button>
                  Click Here To Reset Password
               </button>
               <br/>
            </a>
            <br/>
			
            <p>We are committed to helping you succeed and grow your business on Campus Express. If you have any questions or need any assistance, please do not hesitate to reach out to us.</p>
            <br/>
            <p>Once again, welcome aboard! We look forward to seeing your store thrive on Campus Express.Once again, welcome aboard! We look forward to seeing your store thrive on Campus Express.</p>
            <br/>

            <p>Best regards,</p>
			   <br/>
            <p>Akpulu Fabian Chinedu  </p>
            <p>CEO/Director</p>
            <p>Campus Express Team  </p>
            <p>akpulufabian@gmail.com</p>
       
          </div>
        </body>
      </html>


      `
   )
}

module.exports={regTxtMail,emailRegMail,phoneRegMail,mailTemplate,regTxtMailTemplate,pwdMailTemplate}