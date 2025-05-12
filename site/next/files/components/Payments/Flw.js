import React from 'react';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';

export default function Flw({price, user}) { 
    
    const config = {
        public_key: 'FLWPUBK-502f1f73c8abf430f161a528241c198a-X',
        tx_ref: Date.now(),
        amount: price,
        currency: 'NGN',
        payment_options: 'card,mobilemoney,ussd',
        customer: {
            email: user?.email,
            phone_number: JSON.stringify(user),
        },
        customizations: {
        title: 'Campus Sphere',
        description: 'Payment for items in cart',
        logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
        },
    };

    const handleFlutterPayment = useFlutterwave(config);

    function openFlw() {
        handleFlutterPayment({
            callback: (response) => {
                console.log(response);
                closePaymentModal() // this will close the modal programmatically
            },
            onClose: () => {}
        });
    }

  return (
    <div className="Flw">
     <h1>Hello Test user</h1>

      <button
        onClick={openFlw}
      >
        Payment with React hooks
      </button>
    </div>
  );
}