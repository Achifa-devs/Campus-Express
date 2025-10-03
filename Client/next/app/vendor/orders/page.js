"use client"
import '@/app/vendor/orders/styles/xx-large.css'
import '@/app/vendor/orders/styles/x-large.css'
import '@/app/vendor/orders/styles/large.css'
import '@/app/vendor/orders/styles/medium.css'
import '@/app/vendor/orders/styles/small.css'
import React, { useEffect, useRef, useState } from "react";

import js_ago from 'js-ago';
import backSvg from '@/files/assets/back-svgrepo-com (3).svg';
import Thumbnail from '@/files/components/Buyer/Thumbnail';
import { useSelector } from 'react-redux'
import axios from 'axios'
import { open_notice } from '@/files/reusable.js/notice'
import { seller_overlay_setup } from '@/files/reusable.js/overlay-setup'


export default function App() {
  let [cards, setCards] = useState([])
  let [item, setItem] = useState('')
  // const isClient = useIsClient();

  
  let {
    user_id
  }=useSelector(s=>s.user_id);

  
  useEffect(() => {

    if(user_id !== '' && user_id !== null){
      axios.get('/api/vendor/orders', {params: {user_id: user_id.trim()}})
      .then(({data})=>{
        console.log(data)
        setCards(data?.data)
      })
      .catch(error=>{
          console.log(error)
      })
    }

  },[user_id])

  function updateSelectedOrder(data) {
    setItem(data)
  }
  const [statusType, setStatusType] = useState('')

  
  function getOrderStatus() {
    const o = item?.order;
    const status = o?.status;

    if (!status) return null;

    if (status.delivered?.completed) {
      setStatusType('completed')
      return "Click here to confirm completion";
    } else if (status.shipping?.completed) {
      setStatusType('delivered')
      return "Click here to confirm delivery";
    } else if (status.processing?.completed) {
      setStatusType('shipping')
      return "Click here to confirm shipping";
    } else if (status.confirmed?.completed) {
      setStatusType('processing')
      return "Click here to proceed with shipping";
    }

    return null;
  }

  let [text, setText] = useState('')
  useEffect(() => {
    let text = getOrderStatus()
    setText(text)
  }, [item])
  return (
    <div className='seller-order' style={{overflow: 'auto'}}>
      {
        item === ''
        ?
        <OrdersList cards={cards} updateSelectedOrder={updateSelectedOrder} />
        :
        <OrderData item={item} text={text} statusType={statusType} updateSelectedOrder={updateSelectedOrder} />
      }
    </div>
  );
}


function OrderData({item, updateSelectedOrder, statusType, text}){
  return(
    <>
      <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
        <div onClick={e=>updateSelectedOrder('')} style={{cursor: 'pointer'}}>
          <img src={backSvg.src} style={{height: '20px', width: '20px'}} alt="..." />
        </div>
        &nbsp;
        &nbsp;
        &nbsp;
        <b>Manage Order #{item?.order?.order_id}</b> &nbsp; here
      </div>

      <hr />

      <OrderCard item={item} statusType={statusType} text={text} />

      <OrderInfo item={item} />
    </>
  )
}

function OrdersList({updateSelectedOrder, cards}) {

  let [screenWidth, setScreenWidth] = useState(0);
  useEffect(() => {
    setScreenWidth(window.innerWidth)
  }, [])
  return(
    <>
      <div >
        <b>Manage your products</b> here
      </div>
      <hr />
      <div className='seller-order-cnt'>
        <header>
          <ul style={{padding: '10px 0px', background: '#fff'}}>
          
            <li className='th-buyer' >S/N</li>
            <li className='th-item'>Item</li>
            <li className='th-price'>Price</li>
            <li className='th-paid'>Paid</li>
            <li className='th-stat'>Status</li>
            <li className='th-date' style={{display: screenWidth > 480 ? 'block' : 'none'}}>Date</li>
            <li className='th-action'>Action</li>
          </ul>
        </header>
        <section>
          {
            cards.map((item,index) => 
            
              <ul key={index} style={{height: '90px', padding: '0', fontWeight: '300', background: '#fff', opacity: item.order.status.state === 'cancelled' ? '.5': '1', pointerEvents: item?.order?.status?.state === 'cancelled' ? 'none': 'all' }}>
            
                <li key={index} className='tb-buyer'>
                  <span style={{marginLeft: '8px'}}> {index + 1}</span>
                </li>
                <li key={index} className='tb-item'>
                  <span style={{height: '50px', width: '50px', borderRadius: '10px', display: screenWidth > 480 ? 'block' : 'none'}}><Thumbnail thumbnail_id={item.product.thumbnail_id} height={'100%'} /></span>
                  <span style={{width: screenWidth > 480 ? '60%' : '100%', marginLeft: screenWidth > 480 ? '15px' : '0'}}>
                  {item.product.title}
                  </span>
                </li>
                <li key={index} className='tb-price'>
                  <span style={{width: '30%'}}>
                  &#8358;{new Intl.NumberFormat('en-us').format(item.product.price)}
                  </span>
                </li>
                <li key={index} className='tb-paid'>
                  {item?.order?.havepaid ? 'Yes' :'No'}
                </li>
                <li key={index} className='tb-stat'>
                  {item?.order?.status?.state}
                </li>
                <li key={index} className='tb-date' style={{display: screenWidth > 480 ? 'block' : 'none'}}>
                  {item?.order?.date ? js_ago(new Date(item?.order?.date)) : item?.order?.date}
                </li>
                <li key={index}  className='tb-action'>
                  <button onClick={e =>updateSelectedOrder(item)}  style={{height: 'fit-content', width: 'fit-content', padding: '5px 5px', borderRadius: '4px'}}><><b>View</b></></button>
                </li>
              </ul>
            )
          }
        </section>
      </div>
    </>
  )
}

function OrderCard({ item, statusType, text }) {

  const [screenWidth, setScreenWidth] = useState(0);
  
  useEffect(() => {
    setScreenWidth(window.innerWidth);
  }, []);

  const getStatusConfig = () => {
    const status = item?.order?.status?.state;
    switch (status) {
      case 'pending':
        return { 
          badge: 'warning', 
          text: 'In Progress', 
          icon: 'bi-clock-history',
          button: { visible: true, variant: 'danger', text: 'Cancel Order' }
        };
      case 'cancelled':
        return { 
          badge: 'danger', 
          text: 'Cancelled', 
          icon: 'bi-x-circle',
          button: { visible: false, variant: 'secondary', text: 'Cancelled' }
        };
      case 'completed':
        return { 
          badge: 'success', 
          text: 'Completed', 
          icon: 'bi-check-circle',
          button: { visible: false, variant: 'success', text: 'Completed' }
        };
      default:
        return { 
          badge: 'secondary', 
          text: 'Unknown', 
          icon: 'bi-question-circle',
          button: { visible: false, variant: 'secondary', text: 'Unknown' }
        };
    }
  };

  const statusConfig = getStatusConfig();


  

  function update_order_status () {
    seller_overlay_setup(true, 'Processing ...')
    axios.post(`/api/vendor/status/`, {order_id: item.order.order_id, statusType: statusType, product_id: item.order.product_id})
    .then((res) => {
      if (res.data.success) {
        // window.location.reload()
      }
    }).catch(err => {
      open_notice(true, "Error occured please try again...")
    })
  }

  return (
    <div className="card border-0 shadow-sm mb-4">
      {/* Header */}
      <div 
        className="card-header bg-white d-flex align-items-center justify-content-between py-3"
        style={{
          borderBottom: '2px solid #e9ecef'
        }}
      >
        <div className="d-flex align-items-center">
          <span 
            className={`badge bg-${statusConfig.badge} d-flex align-items-center me-3`}
            style={{
              fontSize: 'clamp(0.75rem, 1.5vw, 0.85rem)',
              padding: '0.5rem 1rem'
            }}
          >
            <i className={`bi ${statusConfig.icon} me-2`}></i>
            Order {statusConfig.text}
          </span>
          
          {/* Progress Bar for Pending Orders */}
          {item?.order?.status?.state === 'pending' && (
            <div 
              className="progress"
              style={{
                width: '120px',
                height: '6px',
                backgroundColor: '#e9ecef'
              }}
            >
              <div 
                className="progress-bar bg-warning"
                style={{ width: '60%' }}
                role="progressbar"
              ></div>
            </div>
          )}
        </div>

        {/* Cancel Button */}
        {statusConfig.button.visible && (
          <button 
            className={`btn btn-${statusConfig.button.variant} btn-sm d-flex align-items-center`}
            onClick={(e) => {
              seller_overlay_setup(true, 'Cancelling order.');
              axios.post('https://cs-node.vercel.app/vendor/cancel-order', { order_id: item?.order?.order_id })
                .then(({ data }) => {
                  if (data) {
                    seller_overlay_setup(false, '');
                    open_notice(true, 'Order cancelled successfully');
                    window.location.reload();
                  } else {
                    seller_overlay_setup(false, '');
                    open_notice(true, 'Order was not cancelled successfully');
                  }
                })
                .catch(error => {
                  console.log(error);
                  seller_overlay_setup(false, '');
                });
            }}
            style={{
              fontSize: 'clamp(0.75rem, 1.5vw, 0.85rem)',
              padding: '0.5rem 1rem'
            }}
          >
            <i className="bi bi-x-circle me-2"></i>
            {statusConfig.button.text}
          </button>
        )}
      </div>

      {/* Body */}
      <div className="card-body p-0">
        <div className="row g-0">
          {/* Thumbnail */}
          <div className="col-4 col-md-3">
            <div 
              className="h-100 d-flex align-items-center justify-content-center p-3"
              style={{
                backgroundColor: '#f8f9fa',
                minHeight: '140px'
              }}
            >
              <Thumbnail 
                thumbnail_id={item?.product?.thumbnail_id} 
                height={'100%'}
                className="img-fluid rounded"
                style={{
                  maxHeight: '100px',
                  objectFit: 'cover'
                }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="col-8 col-md-9">
            <div className="p-3 h-100 d-flex flex-column">
              {/* Top Section */}
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div className="flex-grow-1 me-3">
                  <h6 
                    className="card-title mb-2 text-dark fw-semibold"
                    style={{
                      fontSize: 'clamp(0.9rem, 1.8vw, 1rem)',
                      lineHeight: '1.3',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {item?.product?.title || 'Product Title'}
                  </h6>
                  
                  {/* Buyer Info */}
                  <div className="d-flex align-items-center text-muted mb-2">
                    <i className="bi bi-person me-2"></i>
                    <span 
                      style={{
                        fontSize: '0.8rem',
                        display: '-webkit-box',
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      Buyer: {item?.order?.user_id || 'Unknown'}
                    </span>
                  </div>

                  {/* Stock Info */}
                  <div className="d-flex align-items-center">
                    <span 
                      className="badge bg-light text-dark border"
                      style={{
                        fontSize: '0.75rem',
                        padding: '0.4rem 0.8rem'
                      }}
                    >
                      <i className="bi bi-box-seam me-1"></i>
                      {item?.order?.stock || 0} unit{item?.order?.stock !== 1 ? 's' : ''} ordered
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div className="text-end flex-shrink-0">
                  <div 
                    className="text-success fw-bold"
                    style={{
                      fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)'
                    }}
                  >
                    ₦{new Intl.NumberFormat('en-US').format(item?.product?.price || 0)}
                  </div>
                  <small className="text-muted" style={{ fontSize: '0.7rem' }}>
                    per unit
                  </small>
                </div>
              </div>

              {/* WhatsApp Button */}
              <div className="mt-auto d-flex flex-row justify-between">
                <button 
                  className={`btn w-48 d-flex align-items-center justify-content-center ${
                    item?.order?.havepaid ? 'btn-danger' : 'btn-secondary'
                  }`}
                  // onClick={(e) => update_order_status()}
                  style={{
                    fontSize: 'clamp(0.8rem, 1.6vw, 0.9rem)',
                    padding: '0.6rem 1rem'
                  }}
                >
                  <i className="bi bi-whatsapp me-2" style={{ fontSize: '1.1rem' }}></i>
                  {/* {item?.order?.havepaid ? 'Click here to start shipping now' : 'Awaiting Payment'} */}
                  Cancel this order now
                </button>

                <button 
                  className={`btn w-auto d-flex align-items-center justify-content-center ${
                    item?.order?.havepaid ? 'btn-success' : 'btn-secondary'
                  }`}
                  onClick={(e) => update_order_status()}
                  style={{
                    fontSize: 'clamp(0.8rem, 1.6vw, 0.9rem)',
                    padding: '0.6rem 1rem'
                  }}
                >
                  <i className="bi bi-whatsapp me-2" style={{ fontSize: '1.1rem' }}></i>
                  {/* {item?.order?.havepaid ? 'Click here to start shipping now' : 'Awaiting Payment'} */}
                  { text }
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function OrderInfo({ item }) {
  const monthsList = [
    { month: 'january' }, { month: 'february' }, { month: 'march' }, { month: 'april' },
    { month: 'may' }, { month: 'june' }, { month: 'july' }, { month: 'august' },
    { month: 'september' }, { month: 'october' }, { month: 'november' }, { month: 'december' }
  ];

  const totalAmount = (item?.product?.price || 0) * (item?.order?.stock || 0);
  const fee = totalAmount * 0.1;
  const amountToReceive = totalAmount * 0.9;

  return (
    <div className="row g-4">
      {/* Payment Information */}
      <div className="col-12 col-lg-6">
        <div className="card border-0 shadow-sm h-100">
          <div 
            className="card-header bg-white d-flex align-items-center"
            style={{
              borderBottom: '2px solid #007bff'
            }}
          >
            <i className="bi bi-credit-card text-primary me-2"></i>
            <h6 className="card-title mb-0 fw-semibold text-dark">
              Payment Information
            </h6>
          </div>
          
          <div className="card-body">
            {!item?.order?.havepaid ? (
              <div className="text-center py-4">
                <i className="bi bi-clock text-warning" style={{ fontSize: '2rem' }}></i>
                <p className="text-muted mt-2 mb-0">
                  Payment information will be available after the buyer completes payment.
                </p>
              </div>
            ) : (
              <div className="list-group list-group-flush">
                <div className="list-group-item d-flex justify-content-between align-items-center px-0 py-2 border-0">
                  <span className="text-muted">Item Price</span>
                  <span className="fw-semibold">
                    ₦{new Intl.NumberFormat('en-US').format(item?.product?.price || 0)}
                  </span>
                </div>
                
                <div className="list-group-item d-flex justify-content-between align-items-center px-0 py-2 border-0">
                  <span className="text-muted">Amount for {item?.order?.stock} units</span>
                  <span className="fw-semibold text-primary">
                    ₦{new Intl.NumberFormat('en-US').format(totalAmount)}
                  </span>
                </div>
                
                <div className="list-group-item d-flex justify-content-between align-items-center px-0 py-2 border-0">
                  <span className="text-muted">
                    <i className="bi bi-info-circle me-1"></i>
                    Platform Fee (10%)
                  </span>
                  <span className="fw-semibold text-danger">
                    -₦{new Intl.NumberFormat('en-US').format(fee)}
                  </span>
                </div>
                
                <div className="list-group-item d-flex justify-content-between align-items-center px-0 py-2 border-0 bg-light rounded">
                  <span className="fw-bold text-dark">Amount to Receive</span>
                  <span className="fw-bold text-success fs-6">
                    ₦{new Intl.NumberFormat('en-US').format(amountToReceive)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delivery Information */}
      <div className="col-12 col-lg-6">
        <div className="card border-0 shadow-sm h-100">
          <div 
            className="card-header bg-white d-flex align-items-center"
            style={{
              borderBottom: '2px solid #28a745'
            }}
          >
            <i className="bi bi-truck text-success me-2"></i>
            <h6 className="card-title mb-0 fw-semibold text-dark">
              Delivery Information
            </h6>
          </div>
          
          <div className="card-body">
            <div className="list-group list-group-flush">
              <div className="list-group-item d-flex justify-content-between align-items-center px-0 py-2 border-0">
                <span className="text-muted">Delivery Type</span>
                <span className="fw-semibold text-capitalize">
                  {item?.order?.pick_up_channels?.[0]?.channel || 'Not specified'}
                </span>
              </div>
              
              <div className="list-group-item px-0 py-2 border-0">
                <span className="text-muted d-block mb-1">Pick-Up Station</span>
                <div className="fw-semibold">
                  {item?.order?.pick_up_channels?.[0]?.locale?.split(',').map((line, index) => (
                    <div key={index} className="text-dark">{line.trim()}</div>
                  )) || 'Location not specified'}
                </div>
              </div>
              
              <div className="list-group-item d-flex justify-content-between align-items-center px-0 py-2 border-0">
                <span className="text-muted">Shipping Date</span>
                <span className="fw-semibold">
                  {item?.order?.pick_up_channels?.[0]?.date?.dy || 'Day'} {' '}
                  <span className="text-capitalize">
                    {monthsList[item?.order?.pick_up_channels?.[0]?.date?.mth]?.month || 'Month'}
                  </span>{' '}
                  {item?.order?.pick_up_channels?.[0]?.date?.yr || 'Year'}
                </span>
              </div>
            </div>

            {/* Additional Delivery Info */}
            <div 
              className="mt-3 p-3 rounded"
              style={{
                backgroundColor: '#e7f3ff',
                border: '1px solid #b3d9ff',
                fontSize: '0.8rem'
              }}
            >
              <div className="d-flex align-items-start">
                <i className="bi bi-info-circle text-primary me-2 mt-1"></i>
                <div>
                  <strong>Delivery Instructions:</strong>
                  <ul className="mb-0 mt-1 ps-3">
                    <li>Ensure product is properly packaged</li>
                    <li>Include all order documentation</li>
                    <li>Verify buyer identity at pick-up</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

