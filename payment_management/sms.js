function checkoutMssgToSeller(seller,buyer,item,date) {
    return(
        `
            Hello ${seller.fname} ${seller.lname}
            ${buyer.fname} ${buyer.lname} Have Succesfully Paid ${item.price} for ${item.title}.
            Contact the buyer on his telephone now to make enquiries about his delivery.

            Transaction Details:
            
                Item Purchased: ${item.title} Coins
                Amount Paid: ${item.price}
                Buyer Phone: ${buyer.phone}
                

            Thank you for choosing our service for your transaction. If you have any questions or need further assistance, please do not hesitate to contact us.
            Thank you for using Campus Express Nigeria.
            Best regards,
            CEO: Akpulu Fabian.
            
            Campus Express Nigeria.
        `
    )
}

module.exports={checkoutMssgToSeller}
