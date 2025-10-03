import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image';

const ConfirmationModal = ({ 
  show, 
  onClose, 
  onConfirm, 
  onReject, 
  prod={}
}) => {
  // Handle escape key press
  let [screenWidth, setScreenWidth] = useState(0)
  useEffect(() => {
    setScreenWidth(window.screen.width)
  }, [])
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.keyCode === 27 && show) {
        onClose();
      }
    };

    if (show) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
   
  }, [show, onClose]);

  if (!show) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="modal-backdrop show"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 10040
        }}
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className="modal show d-block"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100%',
          zIndex: 10050,
          overflowX: 'hidden',
          overflowY: 'auto'
        }}
        tabIndex="-1"
      >
        <div 
          className="modal-dialog modal-dialog-centered"
          style={{
            // maxWidth: '40%',
            height: '95%',
            width: screenWidth < 480 ? '90%' : screenWidth > 480 && screenWidth < 560 ? '85%' : screenWidth > 560 && screenWidth < 760 ? '500px' : '650px',
            margin: '10px auto'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div 
            className="modal-content shadow-lg border-0"
            style={{
              borderRadius: '5px',
              overflow: 'hidden'
            }}
          >
            {/* Modal Header */}
            <div 
              className="modal-header border-0 text-white text-center"
              style={{
                background: 'linear-gradient(135deg, #FF4500 0%, #FF4500 100%)',
                padding: '20px 15px'
              }}
            >
              <div className="w-100">
                <div 
                  style={{
                    fontSize: '3rem',
                    marginBottom: '10px',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  {/* 📦 */}
                  <Image src={prod.thumbnail_id} width={85} height={85} style={{height: '85px', width: '85px', borderRadius: '5px'}} />
                </div>
                <h4 
                  className="modal-title fw-bold mb-2"
                  style={{ fontSize: 'clamp(1.25rem, 2vw, 1.5rem)' }}
                >
                  Confirm Item Receipt
                </h4>
                <p className="mb-0 opacity-90">
                  Please verify the condition of your received item
                </p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="modal-body text-center pt-4  pb-1 px-3">
              <h5 
                className="fw-semibold text-dark mb-3"
                style={{ fontSize: 'clamp(1.1rem, 2vw, 1.3rem)' }}
              >
                "{prod?.title}"
              </h5>
              <p className="text-muted mb-4 lead">
                Please inspect your item carefully before confirming
              </p>
              
              <div 
                className="alert alert-info border-0 mx-auto"
                style={{
                  maxWidth: '500px',
                  backgroundColor: '#f8f9fa',
                  borderLeft: '4px solid #17a2b8'
                }}
              >
                <div className="d-flex align-items-center">
                  <span 
                    style={{
                      fontSize: '1.2rem',
                      marginRight: '0.5rem'
                    }}
                  >
                    ℹ️
                  </span>
                  <small className="text-muted">
                    Once confirmed, you acknowledge the item was received in good condition
                  </small>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div 
              className="modal-footer border-0 bg-light"
              style={{ padding: '8px' }}
            >
              <div className="row w-100 g-2">
                <div className="col-12 col-md-6">
                  <button
                    type="button"
                    className="btn btn-success w-100 pb-8 fw-semibold border-0"
                    onClick={onConfirm}
                    style={{
                      background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                      borderRadius: '5px',
                      fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
                      transition: 'all 0.3s ease',
                      height: 'auto'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 5px 15px rgba(40, 167, 69, 0.4)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    <span style={{ fontSize: '1.2rem', marginRight: '0.5rem' }}>✅</span>
                    Item Received in Good Condition
                  </button>
                </div>
                
                <div className="col-12 col-md-6">
                  <button
                    type="button"
                    className="btn btn-danger w-100 pb-8 fw-semibold border-0"
                    onClick={onReject}
                    style={{
                      background: 'linear-gradient(135deg, #dc3545 0%, #e83e8c 100%)',
                      borderRadius: '5px',
                      fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
                      transition: 'all 0.3s ease',
                      height: 'auto'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 5px 15px rgba(220, 53, 69, 0.4)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    <span style={{ fontSize: '1.2rem', marginRight: '0.5rem' }}>❌</span>
                    Reject & Request Refund
                  </button>
                </div>
                
                {/* <div className="col-12 mt-3">
                  <button
                    type="button"
                    className="btn btn-outline-secondary w-100 py-2"
                    onClick={onClose}
                    style={{
                      borderRadius: '5px',
                      transition: 'all 0.3s ease',
                      height: '40px'
                    }}
                  >
                    Cancel
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmationModal;