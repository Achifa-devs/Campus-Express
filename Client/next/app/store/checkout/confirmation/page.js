// app/checkout/confirmation/page.js
'use client';
import '@/app/globals.css';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ConfirmationStatus from '@/files/components/Buyer/Checkout/ConfirmationStatus';
import '@/app/store/checkout/styles/xx-large.css'
import '@/app/store/checkout/styles/x-large.css'
import '@/app/store/checkout/styles/large.css'
import '@/app/store/checkout/styles/medium.css'
import '@/app/store/checkout/styles/small.css'

import '@/app/store/checkout/styles/FailedConfirmation.css';
import '@/app/store/checkout/styles/SuccessfulConfirmation.css';
import axios from 'axios';

export default function CheckoutConfirmationPage() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState('loading');
  const [reference, setReference] = useState('');

  useEffect(() => {
    axios.get('/api/store/checkout', { params: { reference } })
    .then(({ data }) => {
      console.log(data);
      if (data.success) {
        setStatus('success');
      } else {
        setStatus('failed');
      }
    })
    .catch(err => {
      console.error('Verification error:', err);
      setStatus('failed');
    }); 
  }, [reference])

  useEffect(() => {
    // Simulate checking payment status from URL params or API
    const reference = searchParams.get("reference");
    setReference(reference);
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <ConfirmationStatus status={status} orderId={reference} />
      </div>
    </div>
  );
}