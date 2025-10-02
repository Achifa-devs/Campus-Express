import React from 'react'

export default function Payment({order_list, price}) {
  return (
    <>
        <div className="container-fluid p-0">
            {/* Payment Information Header */}
            <div 
                className="bg-light border rounded-top p-3"
                style={{
                    borderBottom: '1px solid #dee2e6',
                    backgroundColor: '#f8f9fa',
                    fontWeight: '600'
                }}
            >
                <i className="bi bi-credit-card me-2"></i>
                Payment Information
            </div>

            {/* Payment Details Card */}
            <div 
                className="border border-top-0 rounded-bottom p-3"
                style={{
                backgroundColor: '#ffffff'
                }}
            >
                {/* Payment Method Section */}
                <div className="mb-4">
                <h6 
                    className="mb-3 d-flex align-items-center"
                    style={{
                        color: '#2c3e50',
                        fontWeight: '600',
                        fontSize: 'clamp(0.9rem, 2vw, 1rem)'
                    }}
                >
                    <i className="bi bi-wallet2 me-2"></i>
                    Payment Method
                </h6>
                <div 
                    className="bg-light rounded p-3"
                    style={{
                        borderLeft: '4px solid #007bff',
                        fontSize: 'clamp(0.8rem, 1.8vw, 0.9rem)'
                    }}
                >
                    <div className="d-flex align-items-center">
                    <i className="bi bi-truck me-2 text-primary"></i>
                    <span>Prepaid Payment powered by Paystack Titans</span>
                    </div>
                </div>
                </div>

                {/* Payment Details Section */}
                <div>
                <h6 
                    className="mb-3 d-flex align-items-center"
                    style={{
                        color: '#2c3e50',
                        fontWeight: '600',
                        fontSize: 'clamp(0.9rem, 2vw, 1rem)'
                    }}
                >
                    <i className="bi bi-receipt me-2"></i>
                    Payment Details
                </h6>
                
                <div 
                    className="bg-white rounded"
                    style={{
                            border: '1px solid #e9ecef'
                    }}
                >
                    <ul className="list-group list-group-flush">
                    {/* Product Total */}
                    <li 
                        className="list-group-item d-flex justify-content-between align-items-center px-3 py-2"
                        style={{
                            fontSize: 'clamp(0.8rem, 1.8vw, 0.9rem)',
                            borderColor: '#f8f9fa'
                        }}
                    >
                        <span className="d-flex align-items-center">
                        <i className="bi bi-box me-2 text-muted" style={{fontSize: '0.8rem'}}></i>
                            Product total:
                        </span>
                        <span className="fw-medium">
                        {new Intl.NumberFormat('en-US').format(order_list?.order?.stock || 0)}
                        </span>
                    </li>

                    {/* Total Amount Paid */}
                    <li 
                        className="list-group-item d-flex justify-content-between align-items-center px-3 py-2"
                        style={{
                            fontSize: 'clamp(0.8rem, 1.8vw, 0.9rem)',
                            borderColor: '#f8f9fa'
                        }}
                    >
                        <span className="d-flex align-items-center">
                        <i className="bi bi-currency-dollar me-2 text-muted" style={{fontSize: '0.8rem'}}></i>
                        Total Amount Paid:
                        </span>
                        <span className="fw-medium text-success">
                        ₦ {new Intl.NumberFormat('en-US').format(
                            (order_list?.product?.price || 0) * (order_list?.order?.stock || 0)
                        )}
                        </span>
                    </li>

                    {/* Delivery Fees */}
                    <li 
                        className="list-group-item d-flex justify-content-between align-items-center px-3 py-2"
                        style={{
                            fontSize: 'clamp(0.8rem, 1.8vw, 0.9rem)',
                            borderColor: '#f8f9fa'
                        }}
                    >
                        <span className="d-flex align-items-center">
                        <i className="bi bi-truck me-2 text-muted" style={{fontSize: '0.8rem'}}></i>
                        Delivery Fees:
                        </span>
                        <span className="fw-medium">
                        ₦ {new Intl.NumberFormat('en-US').format(parseInt(price) || 0)}
                        </span>
                    </li>

                    {/* Grand Total */}
                    <li 
                        className="list-group-item d-flex justify-content-between align-items-center px-3 py-2 bg-light"
                        style={{
                            fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                            fontWeight: '600',
                            borderColor: '#dee2e6',
                            backgroundColor: '#f8f9fa !important'
                        }}
                    >
                        <span className="d-flex align-items-center">
                        <i className="bi bi-calculator me-2 text-primary"></i>
                        Total:
                        </span>
                        <span className="text-primary fw-bold">
                        ₦ {new Intl.NumberFormat('en-US').format(
                            ((order_list?.product?.price || 0) * (order_list?.order?.stock || 0)) + 
                            (parseInt(price) || 0)
                        )}
                        </span>
                    </li>
                    </ul>
                </div>
                </div>

                {/* Additional Payment Info */}
                <div 
                className="mt-3 p-2 rounded"
                style={{
                    backgroundColor: '#e7f3ff',
                    border: '1px solid #b3d9ff',
                    fontSize: 'clamp(0.75rem, 1.6vw, 0.85rem)'
                }}
                >
                <div className="d-flex align-items-start">
                    <i className="bi bi-info-circle text-primary me-2 mt-1" style={{fontSize: '0.8rem'}}></i>
                    <div>
                    <strong>Prepaid Payment:</strong> You’ll complete your payment before your order is processed. Secure payment can be made instantly online, ensuring faster delivery and a smooth checkout experience.
                    </div>
                </div>
                </div>
            </div>
        </div>
    </>
  )
}
