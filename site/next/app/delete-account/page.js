"use client"
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { open_notice } from '@/files/reusable.js/notice';
import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { useRouter } from 'next/router';

export default function DeleteAccount() {
  const [reason, setReason] = useState('');
  const [otherReason, setOtherReason] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  let {
    user_id
  } = useSelector(s => s.user_id)
  // const navigation = useNavigate();

  const handleSubmit = async (e) => {
    

    if (user_id !== null) {
      e.preventDefault();
      setIsSubmitting(true);
      setError('');
      try {
        // In a real app, you would call your API here
        const response = await fetch('https://cs-server-olive.vercel.app/account/delete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            reason: reason === 'other' ? otherReason : reason,
            password,
            user_id
          }),
        });
  
        if (!response.ok) throw new Error('Deletion failed');
  
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Redirect to confirmation page after successful deletion
        window.location.href('/');
        navigation
      } catch (err) {
        setError(err.message || 'Something went wrong. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      open_notice(true, 'You are not logged in!')
    }
  };

  return (
    <>
      <Head>
        <title>Delete Your Account | MyApp</title>
        <meta name="description" content="Delete your MyApp account permanently" />
      </Head>

      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-red-600 text-white p-6 text-center">
            <h1 className="text-2xl font-bold mb-1">Delete Your Account</h1>
            <p className="opacity-90">We are sorry to see you go</p>
          </div>

          <div className="p-6">
            <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-6 rounded-r">
              <h3 className="text-red-600 font-semibold mb-2">Warning: This action is permanent</h3>
              <p className="text-red-800">Once you delete your account, there is no way to recover it. Please be certain before proceeding.</p>
            </div>

            <h2 className="text-lg font-semibold mb-3">What happens when you delete your account?</h2>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li>All your personal data will be permanently removed from our systems</li>
              <li>You will lose access to all your account features</li>
              <li>Any active subscriptions will be canceled</li>
              <li>Your username will become available for others to use</li>
            </ul>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
                  Why are you leaving us? (Optional)
                </label>
                <select
                  id="reason"
                  name="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                >
                  <option value="">Select a reason...</option>
                  <option value="privacy">Privacy concerns</option>
                  <option value="features">Missing features</option>
                  <option value="complexity">Too complex to use</option>
                  <option value="alternative">Found a better alternative</option>
                  <option value="other">Other reason</option>
                </select>
              </div>

              {reason === 'other' && (
                <div>
                  <label htmlFor="otherReason" className="block text-sm font-medium text-gray-700 mb-1">
                    Please specify
                  </label>
                  <textarea
                    id="otherReason"
                    name="otherReason"
                    rows={3}
                    value={otherReason}
                    onChange={(e) => setOtherReason(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                  />
                </div>
              )}

              {/* Confirmation checkboxes */}
              <div className="space-y-3">
                <label className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    name="confirm1"
                    required
                    className="mt-1 focus:ring-red-500 h-4 w-4 text-red-600 border-gray-300 rounded"
                  />
                  <span>I understand that all my data will be permanently deleted</span>
                </label>

                <label className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    name="confirm2"
                    required
                    className="mt-1 focus:ring-red-500 h-4 w-4 text-red-600 border-gray-300 rounded"
                  />
                  <span>I understand that this action cannot be undone</span>
                </label>

                <label className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    name="confirm3"
                    required
                    className="mt-1 focus:ring-red-500 h-4 w-4 text-red-600 border-gray-300 rounded"
                  />
                  <span>I have downloaded any data I want to keep</span>
                </label>
              </div>

              {/* Password confirmation */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Enter your password to confirm
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                />
              </div>

              {error && (
                <div className="text-red-600 text-sm py-2">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Processing...' : 'Permanently Delete My Account'}
              </button>

              {/* Cancel button */}
              <button
                type="button"
                onClick={() => router.push('/account')}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Cancel
              </button>
            </form>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 text-center text-sm text-gray-500">
            <p>Need help? <Link href="/contact" className="text-red-600 hover:text-red-700">Contact our support team</Link></p>
          </div>
        </div>
      </div>
    </>
  );
}