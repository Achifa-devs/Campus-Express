// components/checkout/ConfirmationStatus.js
import SuccessConfirmation from './SuccessConfirmation';
// import LoadingSpinner from './LoadingSpinner';
import FailedConfirmation from './FailedConfirmation';

export default function ConfirmationStatus({ status, orderId }) {
//   if (status === 'loading') {
//     return <LoadingSpinner />;
//   }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      {status !== 'success' ? (
        <SuccessConfirmation orderId={orderId} />
      ) : (
        <FailedConfirmation orderId={orderId} />
      )}
    </div>
  );
}