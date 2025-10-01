// components/checkout/FailedConfirmation.js
import React from 'react';

const FailedConfirmation = ({ orderId }) => {
  return (
    <div className="failed-confirmation">
      <div className="failed-container">
        <div className="failed-card">
          {/* Header */}
          <div className="failed-header">
            <div className="failed-header-content">
              <div className="failed-icon-container">
                <div className="failed-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="alert-badge">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                </div>
              </div>
              <h1 className="failed-title">Payment Failed</h1>
              <p className="failed-subtitle">
                We encountered an issue processing your payment. Don't worry, we're here to help.
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="failed-content">
            {/* Reference Section */}
            <div className="reference-section">
              <div className="reference-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="reference-badge-text">Reference Number</span>
              </div>
              <p className="reference-label">Please keep this reference for support</p>
              <div className="reference-id">{orderId}</div>
              <p className="reference-note">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Keep this reference for support inquiries
              </p>
            </div>

            {/* Info Grid */}
            <div className="info-grid">
              {/* Refund Information */}
              <div className="refund-card">
                <div className="card-header">
                  <div className="card-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="card-title">Refund Timeline</h3>
                    <p className="card-subtitle">What to expect next</p>
                  </div>
                </div>
                <div className="card-items">
                  <div className="card-item">
                    <svg className="card-item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <div className="card-item-content">
                      <h4>Automatic Refund Processing</h4>
                      <p>Any temporary authorization holds will be automatically released within 1-3 business days. No action needed.</p>
                    </div>
                  </div>
                  <div className="card-item">
                    <svg className="card-item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div className="card-item-content">
                      <h4>Email Confirmation</h4>
                      <p>You'll receive a confirmation email once the refund is fully processed. Check your statement in 5-7 days.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Solutions */}
              <div className="solutions-card">
                <div className="card-header">
                  <div className="card-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="card-title">Quick Solutions</h3>
                    <p className="card-subtitle">Try these steps first</p>
                  </div>
                </div>
                <ul className="solutions-list">
                  {[
                    "Check your account balance and daily limits",
                    "Verify card number, expiry date, and CVV",
                    "Try a different card or payment method",
                    "Contact your bank for transaction approval",
                    "Ensure billing address matches card records",
                    "Clear browser cache and try again"
                  ].map((solution, index) => (
                    <li key={index}>
                      <div className="solution-bullet"></div>
                      <span>{solution}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="failed-actions">
              <button className="failed-action-button primary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Try Payment Again
                <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              <button className="failed-action-button secondary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                Different Payment Method
                <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Support Section */}
            <div className="support-section-failed">
              <div className="support-content-failed">
                <div className="support-badge-failed">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>24/7 Support Available</span>
                </div>
                <h4 className="support-title-failed">Need Immediate Assistance?</h4>
                <p className="support-description-failed">
                  Our dedicated support team is ready to help you complete your purchase securely
                </p>
                <div className="support-actions-failed">
                  <button className="support-button-failed">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{width: '16px', height: '16px', marginRight: '8px'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Contact Support Team
                  </button>
                  <div className="phone-section">
                    <p className="phone-label">Call Us Directly</p>
                    <p className="phone-number">1-800-HELP-NOW</p>
                    <p className="phone-availability">Available 24/7</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Footer */}
            <div className="security-footer-failed">
              <div className="security-badge-failed">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Bank-level encryption & security</span>
                <div className="security-dot"></div>
                <span className="security-text-failed">PCI DSS Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FailedConfirmation;