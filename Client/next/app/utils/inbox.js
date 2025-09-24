export function get_mssg(src) {
    if (src === 'new-order') {
        return (
            {
                subject: 'New order created',
                mssg: 'A new order was been successfully created. You will receive a confirmation shortly.'
            }
        );
    } else if (src === 'order-cancellation') {
        return (
            {
                subject: 'Order cancelled',
                mssg: 'The order was successfully cancelled and you will be refunded your balance within 24 hours. If you have any questions, feel free to contact support.'
            }
        );
    } else if (src === 'order-completion') {
        return (
            {
                subject: 'Order completed',
                mssg: 'Your order was completed successfully. Thank you for choosing Campus Sphere!'
            }
        );
    } else if (src === 'new-refund') {
        return (
            {
                subject: 'Order refund initiated',
                mssg: 'A refund process has been initiated for your order. You will receive an update once it’s processed.'
            }
        );
    } else if (src === 'refund-completed') {
        return (
            {
                subject: 'Refunded completed',
                mssg: 'Your order was been refunded successfully. The amount should reflect in your account shortly.'
            }
        );
    } else if (src === 'refund-cancellation') {
        return (
            {
                subject: 'Refund cancelled',
                mssg: 'The refund was successfully cancelled and you will not refunded your balance. If you have any questions, feel free to contact support.'
            }
        );
    } else if (src === 'order-checkout') {
        return (
            {
                subject: 'Order checked out',
                mssg: 'Your order was been successfully checked out. You will receive a confirmation and tracking details soon.'
            }
        );
    }
}