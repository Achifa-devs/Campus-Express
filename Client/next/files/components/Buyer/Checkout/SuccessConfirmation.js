// components/checkout/SuccessConfirmation.js
import React from 'react';
const SuccessConfirmation = ({ orderId }) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="success-confirmation">
      <div className="success-container">
        <div className="success-card">
          {/* Header */}
          <div className="success-header">
            <div className="success-header-content">
              <div className="success-icon-container">
                <div className="success-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeLinecap="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="sparkle-badge">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                    </svg>
                  </div>
                </div>
              </div>
              <h1 className="success-title">Payment Successful!</h1>
              <p className="success-subtitle">
                Thank you for your order! Your purchase has been confirmed and is being processed.
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="success-content">
            {/* Order Summary */}
            <div className="order-summary">
              <div className="order-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeLinecap="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <span className="order-badge-text">Order Confirmed</span>
              </div>
              <p className="order-id-label">Your order reference</p>
              <div className="order-id">{orderId}</div>
              <p className="order-date">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeLinecap="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Confirmed on {currentDate}
              </p>
            </div>

            {/* Next Steps Grid */}
            <div className="steps-grid">
              {/* Shipping Card */}
              <div className="step-card">
                <div className="step-header">
                  <div className="step-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeLinecap="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="step-title">Shipping & Delivery</h3>
                    <p className="step-subtitle">What to expect</p>
                  </div>
                </div>
                <div className="step-items">
                  <div className="step-item">
                    <svg className="step-item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeLinecap="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="step-item-content">
                      <h4>Processing Time</h4>
                      <p>Your order will be processed within 24 hours and prepared for shipment.</p>
                    </div>
                  </div>
                  <div className="step-item">
                    <svg className="step-item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeLinecap="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <div className="step-item-content">
                      <h4>Tracking Information</h4>
                      <p>You'll receive a tracking number via email once your order ships.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Digital Access Card */}
              <div className="step-card digital">
                <div className="step-header">
                  <div className="step-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeLinecap="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="step-title">Access & Support</h3>
                    <p className="step-subtitle">Getting started</p>
                  </div>
                </div>
                <div className="step-items">
                  <div className="step-item">
                    <svg className="step-item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeLinecap="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <div className="step-item-content">
                      <h4>Instant Digital Access</h4>
                      <p>Digital products are available immediately in your account dashboard.</p>
                    </div>
                  </div>
                  <div className="step-item">
                    <svg className="step-item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeLinecap="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div className="step-item-content">
                      <h4>Order Confirmation</h4>
                      <p>A detailed receipt has been sent to your email address.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="timeline">
              <h3 className="timeline-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeLinecap="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Order Timeline
              </h3>
              <div className="timeline-steps">
                <div className="timeline-track"></div>
                <div className="timeline-progress"></div>
                {[
                  { status: 'Order Placed', completed: true },
                  { status: 'Processing', active: true },
                  { status: 'Shipped', upcoming: true },
                  { status: 'Delivered', upcoming: true }
                ].map((step, index) => (
                  <div key={step.status} className="timeline-step">
                    <div className={`timeline-dot ${
                      step.completed ? 'completed' : step.active ? 'active' : 'upcoming'
                    }`}>
                      {step.completed ? '✓' : index + 1}
                    </div>
                    <span className={`timeline-label ${
                      step.completed ? 'completed' : step.active ? 'active' : 'upcoming'
                    }`}>
                      {step.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="actions">
              <button className="action-button primary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeLinecap="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                View Order Details
                <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeLinecap="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button className="action-button secondary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeLinecap="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                Continue Shopping
                <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeLinecap="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Support Section */}
            <div className="support-section">
              <div className="support-grid">
                <div className="support-card">
                  <div className="support-badge help">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeLinecap="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="support-badge-text">Need Help?</span>
                  </div>
                  <p className="support-description">
                    Our support team is here to assist you
                  </p>
                  <button className="support-button">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{width: '16px', height: '16px', marginRight: '8px'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeLinecap="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Contact Support
                  </button>
                </div>
                <div className="support-card">
                  <div className="support-badge security">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeLinecap="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="support-badge-text">Secure Payment</span>
                  </div>
                  <p className="support-description">
                    Your transaction is secure and encrypted
                  </p>
                  <div className="security-badge">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeLinecap="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="security-text">PCI DSS Compliant</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessConfirmation;