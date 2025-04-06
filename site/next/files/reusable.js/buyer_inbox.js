function get_mssg(src) {
    if (src === 'new-order') {
        return (
            {
                subject: 'New order created',
                mssg: 'A new order has been successfully created. You will receive a confirmation shortly.'
            }
        );
    } else if (src === 'order-cancellation') {
        return (
            {
                subject: 'Order cancelled',
                mssg: 'The order has been successfully cancelled. If you have any questions, feel free to contact support.'
            }
        );
    } else if (src === 'order-completion') {
        return (
            {
                subject: 'Order completed',
                mssg: 'Your order has been completed successfully. Thank you for your purchase!'
            }
        );
    } else if (src === 'order-refund-instance') {
        return (
            {
                subject: 'Order refund initiated',
                mssg: 'A refund process has been initiated for your order. You will receive an update once it’s processed.'
            }
        );
    } else if (src === 'order-refund') {
        return (
            {
                subject: 'Order refunded',
                mssg: 'Your order has been refunded successfully. The amount should reflect in your account shortly.'
            }
        );
    } else if (src === 'order-checkout') {
        return (
            {
                subject: 'Order checked out',
                mssg: 'Your order has been successfully checked out. You will receive a confirmation and tracking details soon.'
            }
        );
    }
}
module.exports={get_mssg}