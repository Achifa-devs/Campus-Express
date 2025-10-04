import React, { useEffect, useState } from 'react'
import Thumbnail from '../../../components/Buyer/Thumbnail'
import js_ago from 'js-ago'
import ellipsisSvg from '../../../assets/ellipsis-svgrepo-com.svg'
import { buyer_overlay_setup } from '@/files/reusable.js/overlay-setup';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Dropdown from '@/files/reusable.js/Dropdown';

export default function OrderedItem({ item, order }) {
    let [screenWidth, setScreenWidth] = useState(0);
    useEffect(() => { setScreenWidth(window.innerWidth) }, []);
    let { user_id } = useSelector(s => s.user_id);

    return (
        <div className="container-fluid p-0 mb-3">
            {/* Order Header Card */}
            <div 
                className="bg-white border rounded-top p-3 d-flex align-items-center justify-content-between"
                style={{
                    borderBottom: '2px solid #007bff',
                    backgroundColor: '#ffffff',
                    minHeight: '60px'
                }}
            >
                <div className="d-flex align-items-center">
                    <div 
                        className="badge me-2 d-flex align-items-center"
                        style={{
                            fontSize: 'small',
                            padding: '7px 7px',
                            background: '#FF4500',
                            color: '#fff',
                            borderRadius: '5px'
                        }}
                    >
                        <i className="bi bi-clock-history me-1" style={{color: '#fff'}}></i>
                        Order In Progress
                    </div>
                    
                    {/* Order Status Indicator */}
                    <div 
                        className="progress mx-2"
                        style={{
                            width: '120px',
                            height: '6px',
                            backgroundColor: '#e9ecef'
                        }}
                    >
                        <div 
                            className="progress-bar bg-warning"
                            style={{
                                width: '60%'
                            }}
                            role="progressbar"
                            aria-valuenow="60"
                            aria-valuemin="0"
                            aria-valuemax="100"
                        ></div>
                    </div>
                </div>

                {/* Dropdown Menu */}
                <Dropdown 
                    list={[
                        {
                            title: (
                                <span className="d-flex align-items-center text-danger">
                                    <i className="bi bi-x-circle me-2"></i>
                                    Cancel order
                                </span>
                            )
                        }
                    ]}
                />
            </div>

            {/* Product Card */}
            <div 
                className="border border-top-0 rounded-bottom"
                style={{
                    backgroundColor: '#ffffff'
                }}
            >
                <div className="row g-0">
                    {/* Thumbnail Column */}
                    <div 
                        className="col-4 col-md-3 position-relative"
                        style={{
                            minHeight: '140px',
                            background: '#f8f9fa'
                        }}
                    >
                        <div className="h-100 d-flex align-items-center justify-content-center p-2">
                            <Thumbnail 
                                thumbnail_id={item?.thumbnail_id} 
                                height={'180px'}
                                className="img-fluid rounded"
                                style={{
                                    maxHeight: '120px',
                                    objectFit: 'cover'
                                }}
                            />
                        </div>
                        
                        {/* More Options Button */}
                        <button 
                            className="btn btn-sm btn-light position-absolute top-0 end-0 m-2 rounded-circle"
                            style={{
                                width: '28px',
                                height: '28px',
                                padding: '0',
                                border: '1px solid #dee2e6'
                            }}
                        >
                            <img 
                                src={ellipsisSvg} 
                                alt="More options" 
                                style={{
                                    height: '12px',
                                    width: '12px'
                                }}
                            />
                        </button>
                    </div>

                    {/* Content Column */}
                    <div className="col-8 col-md-9">
                        <div className="p-3 h-100 d-flex flex-column">
                            {/* Top Section - Title and Price */}
                            <div className="d-flex justify-content-between align-items-start mb-2 flex-grow-1">
                                <div 
                                    className="me-2"
                                    style={{
                                        minWidth: '0' /* Enables text truncation */
                                    }}
                                >
                                    <h6 
                                        className="mb-1 text-dark fw-semibold"
                                        style={{
                                            fontSize: 'clamp(0.9rem, 1.8vw, 1rem)',
                                            lineHeight: '1.3',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden'
                                        }}
                                    >
                                        {item?.title || 'Product Title'}
                                    </h6>
                                    
                                    <p 
                                        className="text-muted mb-0"
                                        style={{
                                            fontSize: 'clamp(0.75rem, 1.5vw, 0.85rem)',
                                            lineHeight: '1.2',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden'
                                        }}
                                    >
                                        <i className="bi bi-geo-alt me-1"></i>
                                        {item?.campus || 'Campus'} in {item?.uni_state || 'State'} state
                                    </p>
                                </div>

                                <div 
                                    className="text-end flex-shrink-0"
                                    style={{
                                        minWidth: 'fit-content'
                                    }}
                                >
                                    <div 
                                        className="text-success fw-bold"
                                        style={{
                                            fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)'
                                        }}
                                    >
                                        ₦{new Intl.NumberFormat('en-US').format(item?.price || 0)}
                                    </div>
                                    <small 
                                        className="text-muted"
                                        style={{ fontSize: '0.7rem' }}
                                    >
                                        per unit
                                    </small>
                                </div>
                            </div>

                            {/* Bottom Section - Stock and Actions */}
                            <div className="d-flex justify-content-between align-items-end mt-auto">
                                <div 
                                    className="badge bg-light text-dark border"
                                    style={{
                                        fontSize: 'clamp(0.7rem, 1.4vw, 0.8rem)',
                                        padding: '0.4rem 0.8rem'
                                    }}
                                >
                                    <i className="bi bi-box-seam me-1"></i>
                                    {order?.stock || 0} unit{order?.stock !== 1 ? 's' : ''} selected
                                </div>

                            </div>

                            {/* Additional Info Row */}
                            <div 
                                className="row mt-2 g-2"
                                style={{
                                    fontSize: '0.7rem'
                                }}
                            >
                                <div className="col-6">
                                    <div className="d-flex align-items-center text-muted">
                                        <i className="bi bi-calendar me-1"></i>
                                        Ordered {js_ago(new Date(order?.date))}
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Compact View */}
            {screenWidth < 768 && (
                <div 
                    className="mt-2 p-2 rounded border"
                    style={{
                        backgroundColor: '#f8f9fa',
                        fontSize: '0.75rem'
                    }}
                >
                    <div className="row text-center g-2">
                        <div className="col-4">
                            <div className="text-primary fw-semibold">Order ID</div>
                            <div className="text-muted">#{order?.order_id?.slice(-8)}</div>
                        </div>
                        <div className="col-4">
                            <div className="text-primary fw-semibold">Total</div>
                            <div className="text-success fw-semibold">
                                ₦{new Intl.NumberFormat('en-US').format(
                                    (item?.price || 0) * (order?.stock || 0)
                                )}
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="text-primary fw-semibold">Status</div>
                            <div className="badge bg-warning text-dark">Processing</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

// Delivery pending