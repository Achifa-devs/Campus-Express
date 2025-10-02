import React from 'react'

export default function Delivery({order_list, monthsList}) {
  return (
    <>
        <div className="container-fluid p-0">
            {/* Delivery Details Header */}
            <div 
                className="bg-light border rounded-top p-3"
                style={{
                    borderBottom: '1px solid #dee2e6',
                    backgroundColor: '#f8f9fa',
                    fontWeight: '600'
                }}
            >
                <i className="bi bi-truck me-2"></i>
                Delivery Details
            </div>

            {/* Delivery Information Card */}
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
                    <i className="bi bi-shield-check me-2 text-success"></i>
                    Payment Method
                </h6>
                <div 
                    className="bg-light rounded p-3"
                    style={{
                        borderLeft: '4px solid #28a745',
                        fontSize: 'clamp(0.8rem, 1.8vw, 0.9rem)'
                    }}
                >
                    <div className="d-flex align-items-center flex-wrap">
                    <i className="bi bi-credit-card me-2 text-success"></i>
                    <span className="me-1">Campus Sphere Payment</span>
                    <small className="text-muted">(Powered By Paystack Titan)</small>
                    </div>
                    <div 
                    className="mt-2 p-2 rounded"
                    style={{
                        backgroundColor: '#d4edda',
                        border: '1px solid #c3e6cb',
                        fontSize: '0.75rem'
                    }}
                    >
                    <i className="bi bi-check-circle me-1 text-success"></i>
                    Secure payment processed successfully
                    </div>
                </div>
                </div>

                {/* Pick-Up Station Address Section */}
                <div className="mb-4">
                <h6 
                    className="mb-3 d-flex align-items-center"
                    style={{
                        color: '#2c3e50',
                        fontWeight: '600',
                        fontSize: 'clamp(0.9rem, 2vw, 1rem)'
                    }}
                >
                    <i className="bi bi-geo-alt me-2 text-primary"></i>
                    Pick-Up Station Address
                </h6>
                <div 
                    className="bg-light rounded p-3"
                    style={{
                    borderLeft: '4px solid #007bff',
                    fontSize: 'clamp(0.8rem, 1.8vw, 0.9rem)'
                    }}
                >
                    <div className="d-flex align-items-start">
                    <i className="bi bi-building me-2 text-muted mt-1"></i>
                    <div>
                        <strong>Location:</strong><br />
                        <span className="text-dark">
                        {order_list?.order?.pick_up_channels[0]?.locale || 'Location not specified'}
                        </span>
                    </div>
                    </div>
                    <div 
                    className="mt-2 p-2 rounded"
                    style={{
                        backgroundColor: '#e7f3ff',
                        border: '1px solid #b3d9ff',
                        fontSize: '0.75rem'
                    }}
                    >
                    <i className="bi bi-info-circle me-1 text-primary"></i>
                    Bring your order ID for verification at pick-up
                    </div>
                </div>
                </div>

                {/* Shipping Details Section */}
                <div>
                <h6 
                    className="mb-3 d-flex align-items-center"
                    style={{
                    color: '#2c3e50',
                    fontWeight: '600',
                    fontSize: 'clamp(0.9rem, 2vw, 1rem)'
                    }}
                >
                    <i className="bi bi-calendar-event me-2 text-warning"></i>
                    Shipping Timeline
                </h6>
                <div 
                    className="bg-light rounded p-3"
                    style={{
                    borderLeft: '4px solid #ffc107',
                    fontSize: 'clamp(0.8rem, 1.8vw, 0.9rem)'
                    }}
                >
                    <div className="d-flex align-items-center mb-2">
                    <i className="bi bi-clock-history me-2 text-warning"></i>
                    <span>
                        Delivery starts{' '}
                        <strong>
                        {monthsList[order_list?.order?.pick_up_channels[0]?.date?.mth]?.month || 'Month'} {' '}
                        {order_list?.order?.pick_up_channels[0]?.date?.dy || 'Day'},{' '}
                        {order_list?.order?.pick_up_channels[0]?.date?.yr || 'Year'}
                        </strong>
                    </span>
                    </div>
                    
                    {/* Delivery Timeline Progress */}
                    <div className="mt-3">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                        <small className="text-muted">Order Prepared</small>
                        <small className="text-muted">Ready for Pick-up</small>
                    </div>
                    <div 
                        className="progress"
                        style={{
                        height: '6px',
                        backgroundColor: '#e9ecef'
                        }}
                    >
                        <div 
                        className="progress-bar bg-warning"
                        style={{
                            width: '50%'
                        }}
                        role="progressbar"
                        aria-valuenow="50"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        ></div>
                    </div>
                    <div className="d-flex justify-content-between mt-1">
                        <small className="text-success">
                        <i className="bi bi-check-circle me-1"></i>
                        Completed
                        </small>
                        <small className="text-warning">
                        <i className="bi bi-clock me-1"></i>
                        In Progress
                        </small>
                    </div>
                    </div>
                </div>
                </div>

                {/* Additional Delivery Information */}
                <div 
                className="mt-4 p-3 rounded"
                style={{
                    backgroundColor: '#fff3cd',
                    border: '1px solid #ffeaa7',
                    fontSize: 'clamp(0.75rem, 1.6vw, 0.85rem)'
                }}
                >
                <div className="d-flex align-items-start">
                    <i className="bi bi-exclamation-triangle text-warning me-2 mt-1"></i>
                    <div>
                    <strong>Important Pick-up Information:</strong>
                    <ul className="mb-0 mt-1 ps-3">
                        <li>Bring a valid ID and your order confirmation</li>
                        <li>Pick-up hours: 9:00 AM - 6:00 PM</li>
                        <li>Contact support if you cannot pick up on the scheduled date</li>
                    </ul>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </>
  )
}
