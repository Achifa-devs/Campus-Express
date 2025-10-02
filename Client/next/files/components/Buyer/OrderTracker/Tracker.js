import { useEffect, useState } from "react";

const Tracker = ({ orderId = 'ORD-7284-9163', currentStatus = 'processing', order, product }) => {
  // const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulate API call to fetch order data
  // useEffect(() => {
  //   const fetchOrderData = async () => {
  //     // Simulate API delay
  //     await new Promise(resolve => setTimeout(resolve, 1000));
      
  //     const orderData = {
  //       id: orderId,
  //       status: currentStatus,
  //       orderDate: '2024-01-15T10:30:00Z',
  //       estimatedDelivery: '2024-01-20T18:00:00Z',
  //       customer: {
  //         name: 'John Doe',
  //         email: 'john.doe@example.com'
  //       },
  //       shipping: {
  //         address: '123 Main St, New York, NY 10001',
  //         carrier: 'FedEx',
  //         trackingNumber: '789012345678'
  //       },
  //       items: [
  //         { name: 'Wireless Headphones', quantity: 1, price: 149.99 },
  //         { name: 'Phone Case', quantity: 2, price: 19.99 }
  //       ],
  //       total: 189.97
  //     };
      
  //     setOrder(orderData);
  //     setLoading(false);
  //   };

  //   fetchOrderData();
  // }, [orderId, currentStatus]);

  const orderSteps = [
    {
      id: 'pending',
      title: 'Order Placed',
      description: 'Your order has been successfully received and confirmed.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      completed: true,
      timestamp: '2024-01-15T10:30:00Z'
    },
    {
      id: 'confirmed',
      title: 'Order Confirmed',
      description: 'Payment verified and order is being processed.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      completed: true,
      timestamp: '2024-01-15T10:35:00Z'
    },
    {
      id: 'processing',
      title: 'Processing',
      description: 'Your items are being prepared for shipment.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      completed: currentStatus === 'processing',
      active: currentStatus === 'processing',
      timestamp: currentStatus === 'processing' ? '2024-01-15T14:20:00Z' : null
    },
    {
      id: 'shipped',
      title: 'Out for Delivery / Shipped',
      description: 'Your order has been shipped and is on its way.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      completed: currentStatus === 'shipped' || currentStatus === 'delivered',
      active: currentStatus === 'shipped',
      timestamp: (currentStatus === 'shipped' || currentStatus === 'delivered') ? '2024-01-16T09:15:00Z' : null
    },
    {
      id: 'delivered',
      title: 'Delivered',
      description: 'Your package has been delivered successfully.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      ),
      completed: currentStatus === 'delivered',
      active: currentStatus === 'delivered',
      timestamp: currentStatus === 'delivered' ? '2024-01-18T14:45:00Z' : null
    },
    {
      id: 'completed',
      title: 'Completed',
      description: 'Your package has been completed successfully.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      ),
      completed: currentStatus === 'completed',
      active: currentStatus === 'completed',
      timestamp: currentStatus === 'completed' ? '2024-01-18T14:45:00Z' : null
    }
  ];



  const formatDate = (dateString) => {
    if (!dateString) return 'Pending';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStepStatus = (step) => {
    order &&
    Object.entries(order?.status).map(([key, value]) => {
      if(key === step.id){
        if(value.completed){
          return 'completed'
        }
      }
    })
    // if (step.id === order.status) return 'completed';
    if (step.active) return 'active';
    return 'upcoming';
  };

  // if (loading) {
  //   return (
  //     <div className="order-tracker">
  //       <div className="order-tracker-container">
  //         <div className="order-tracker-content" style={{ textAlign: 'center', padding: '4rem' }}>
  //           <div style={{ 
  //             width: '50px', 
  //             height: '50px', 
  //             border: '4px solid #f3f4f6', 
  //             borderTop: '4px solid #3b82f6', 
  //             borderRadius: '50%', 
  //             animation: 'spin 1s linear infinite',
  //             margin: '0 auto 1rem'
  //           }}></div>
  //           <p>Loading order details...</p>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  function getEstimatedDeliveryDate(duration, orderDate) {
      // Convert inputs to Date objects
      // Ensure inputs are valid
    const startDate = new Date(orderDate);
    if (isNaN(startDate)) {
      return new Date()
      // throw new Error("Invalid order date");
    }
    if (typeof duration !== "number" || duration < 0) {
      return new Date()
      // throw new Error("Duration must be a positive integer");
    }

    // Add the duration (in days) to the order date
    const estimatedDelivery = new Date(startDate);
    estimatedDelivery.setDate(startDate.getDate() + duration);

    return estimatedDelivery.toISOString().split("T")[0]; // YYYY-MM-DD format
  }

  return (
    <div className="order-tracker">
      <div className="order-tracker-container">

        {/* Delivery Estimate */}
        <div style={{padding: '20px'}}>
            <div className="delivery-estimate" >
                <h3 className="delivery-estimate-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Estimated Delivery
                </h3>
                <div className="delivery-estimate-date">
                {new Date(getEstimatedDeliveryDate(parseInt(product?.shipping_duration), (order?.date))).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                })}
                </div>
                <p className="delivery-estimate-note">
                Delivery times may vary based on carrier and weather conditions
                </p>
            </div>
        </div>

        {/* Main Content */}
        <div className="order-tracker-content">
          <div className="timeline-container">
            <div className="timeline">
              {orderSteps.map((step, index) => (
                <div
                  key={step.id}
                  className={`timeline-step ${getStepStatus(step)}`}
                >
                  <div className="timeline-step-icon">
                    {step.icon}
                  </div>
                  <div className="timeline-step-content">
                    <h3 className="timeline-step-title">{step.title}</h3>
                    <p className="timeline-step-description">{step.description}</p>
                    <div className="timeline-step-meta">
                      <div className="timeline-step-time">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {formatDate(step.timestamp)}
                      </div>
                      <div className="timeline-step-badge">
                        {/* {step.completed ? 'Completed' : step.active ? 'In Progress' : 'Upcoming'} */}
                        {
                          order &&
                          Object.entries(order.status).map(([key,value]) => {
                            console.log(key, value.completed)
                            if(key === step.id){
                              if(value.completed){
                                return 'Completed'
                              }else{
                                return 'Upcoming'
                              }
                            }
                          })
                        }
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            
          </div>

          {/* Action Buttons */}
          <div className="order-actions">
            <button className="order-action-button secondary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Support
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Tracker;