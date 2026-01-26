"use client"

import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { open_notice } from '@/files/reusable.js/notice'
import { AlertTriangle, Shield, Download, Lock, HelpCircle, ArrowLeft } from 'lucide-react'

export default function DeleteAccount() {
  const [formData, setFormData] = useState({
    reason: '',
    otherReason: '',
    password: '',
    confirmations: {
      irreversible: false,
      dataBackup: false,
      understandConsequences: false
    }
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const [currentStep, setCurrentStep] = useState(1)
  
  const { user_id } = useSelector(state => state.user_id)
  const totalSteps = 3

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleConfirmationChange = (confirmation) => {
    setFormData(prev => ({
      ...prev,
      confirmations: {
        ...prev.confirmations,
        [confirmation]: !prev.confirmations[confirmation]
      }
    }))
  }

  // Validate current step
  const validateStep = () => {
    const newErrors = {}
    
    if (currentStep === 2) {
      if (!formData.reason) {
        newErrors.reason = 'Please select a reason to help us improve'
      }
      if (formData.reason === 'other' && !formData.otherReason.trim()) {
        newErrors.otherReason = 'Please provide more details'
      }
    }
    
    if (currentStep === 3) {
      if (!formData.password) {
        newErrors.password = 'Password is required'
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters'
      }
      
      const requiredConfirmations = ['irreversible', 'dataBackup']
      requiredConfirmations.forEach(confirmation => {
        if (!formData.confirmations[confirmation]) {
          newErrors.confirmations = 'Please confirm all required acknowledgments'
        }
      })
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Navigation between steps
  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps))
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  // Submit final deletion request
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!user_id) {
      open_notice(true, 'Please log in to continue')
      return
    }
    
    if (!validateStep()) return
    
    setIsSubmitting(true)
    setErrors({})
    
    try {
      const response = await fetch('https://cs-server-olive.vercel.app/account/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reason: formData.reason === 'other' ? formData.otherReason : formData.reason,
          password: formData.password,
          user_id
        }),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Account deletion failed')
      }
      
      // Redirect to homepage with success state
      window.location.href = '/?account_deleted=true'
      
    } catch (err) {
      setErrors({ submit: err.message })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Step content components
  const Step1 = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3 text-amber-600 bg-amber-50 p-4 rounded-lg">
        <AlertTriangle className="w-5 h-5" />
        <span className="font-medium">Important Information</span>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">What happens when you delete your account?</h3>
        
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
              <span className="text-red-600 text-sm font-bold">!</span>
            </div>
            <div>
              <p className="font-medium text-gray-900">Immediate Access Loss</p>
              <p className="text-sm text-gray-600">You will no longer be able to access your account or any associated data.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
              <Download className="w-3 h-3 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Data Removal</p>
              <p className="text-sm text-gray-600">Most personal data will be permanently deleted within 30 days.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-gray-400" />
            <div>
              <p className="font-medium text-gray-900">Legal Retention</p>
              <p className="text-sm text-gray-600">Some information may be retained for legal or security purposes as required by law.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <HelpCircle className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Recommendation</span>
        </div>
        <p className="text-sm text-gray-600">
          Consider downloading your data before proceeding. You can export your information from your account settings.
        </p>
      </div>
    </div>
  )

  const Step2 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Help us improve</h3>
      <p className="text-sm text-gray-600">Your feedback helps us enhance our service for everyone.</p>
      
      <div className="space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-gray-900 mb-2 block">Primary reason for leaving</span>
          <select
            value={formData.reason}
            onChange={(e) => handleInputChange('reason', e.target.value)}
            className={`w-full px-4 py-3 rounded-lg border ${errors.reason ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
          >
            <option value="">Select a reason</option>
            <option value="privacy">Privacy concerns</option>
            <option value="features">Missing essential features</option>
            <option value="usability">Too complicated to use</option>
            <option value="alternative">Found a better alternative</option>
            <option value="usage">No longer need the service</option>
            <option value="other">Other reason</option>
          </select>
          {errors.reason && <p className="mt-1 text-sm text-red-600">{errors.reason}</p>}
        </label>
        
        {formData.reason === 'other' && (
          <label className="block">
            <span className="text-sm font-medium text-gray-900 mb-2 block">Please specify</span>
            <textarea
              rows={3}
              value={formData.otherReason}
              onChange={(e) => handleInputChange('otherReason', e.target.value)}
              placeholder="Tell us more about your decision..."
              className={`w-full px-4 py-3 rounded-lg border ${errors.otherReason ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
            />
            {errors.otherReason && <p className="mt-1 text-sm text-red-600">{errors.otherReason}</p>}
          </label>
        )}
      </div>
    </div>
  )

  const Step3 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Final confirmation</h3>
      
      <div className="space-y-4">
        <label className="block">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-900">Enter your password</span>
            <Lock className="w-4 h-4 text-gray-400" />
          </div>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            placeholder="Current account password"
            className={`w-full px-4 py-3 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
          />
          {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
        </label>
        
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-900">Required acknowledgments</h4>
          
          <label className="flex items-start gap-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
            <input
              type="checkbox"
              checked={formData.confirmations.irreversible}
              onChange={() => handleConfirmationChange('irreversible')}
              className="mt-1 w-4 h-4 text-red-600 rounded focus:ring-red-500"
            />
            <div>
              <p className="font-medium text-gray-900">This action is permanent</p>
              <p className="text-sm text-gray-600 mt-1">I understand that account deletion cannot be reversed or recovered.</p>
            </div>
          </label>
          
          <label className="flex items-start gap-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
            <input
              type="checkbox"
              checked={formData.confirmations.dataBackup}
              onChange={() => handleConfirmationChange('dataBackup')}
              className="mt-1 w-4 h-4 text-red-600 rounded focus:ring-red-500"
            />
            <div>
              <p className="font-medium text-gray-900">Data backup responsibility</p>
              <p className="text-sm text-gray-600 mt-1">I have saved or exported any information I wish to keep.</p>
            </div>
          </label>
          
          <label className="flex items-start gap-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
            <input
              type="checkbox"
              checked={formData.confirmations.understandConsequences}
              onChange={() => handleConfirmationChange('understandConsequences')}
              className="mt-1 w-4 h-4 text-red-600 rounded focus:ring-red-500"
            />
            <div>
              <p className="font-medium text-gray-900">Understand consequences</p>
              <p className="text-sm text-gray-600 mt-1">I acknowledge that all subscriptions, credits, and associated services will be terminated.</p>
            </div>
          </label>
          
          {errors.confirmations && (
            <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">{errors.confirmations}</p>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <>
      <Head>
        <title>Delete Account | Dorm Deals</title>
        <meta name="description" content="Permanently delete your Dorm Deals account" />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          {/* Progress indicator */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`flex items-center gap-2 text-sm ${currentStep === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <span className="text-sm text-gray-500">
                Step {currentStep} of {totalSteps}
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-red-600 transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {/* Main card */}
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="px-8 pt-8 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Delete Account</h1>
                  <p className="text-gray-600 mt-1">Permanently remove your account and data from Dorm Deals</p>
                </div>
              </div>
            </div>

            {/* Content area */}
            <div className="px-8 py-8">
              {currentStep === 1 && <Step1 />}
              {currentStep === 2 && <Step2 />}
              {currentStep === 3 && <Step3 />}
              
              {errors.submit && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-700">{errors.submit}</p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="px-8 py-6 bg-gray-50 border-t border-gray-100">
              <div className="flex flex-col sm:flex-row gap-3">
                {currentStep < totalSteps ? (
                  <>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="flex-1 px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-black transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                    >
                      Continue
                    </button>
                    <button
                      type="button"
                      onClick={() => window.location.href = '/account/settings'}
                      className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`flex-1 px-6 py-3 font-medium rounded-lg transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
                        isSubmitting
                          ? 'bg-red-400 cursor-not-allowed'
                          : 'bg-red-600 text-white hover:bg-red-700'
                      }`}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Processing...
                        </span>
                      ) : (
                        'Permanently Delete Account'
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Review Again
                    </button>
                  </>
                )}
              </div>
              
              {/* Support link */}
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500">
                  Need assistance?{' '}
                  <Link 
                    href="/support/account-deletion" 
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Contact Support
                  </Link>
                </p>
              </div>
            </div>
          </form>

          {/* Warning footer */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Account deletion is processed immediately. Some data may be retained as required by applicable laws.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}