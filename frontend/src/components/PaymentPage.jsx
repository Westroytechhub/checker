import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaMobileAlt, FaPhone } from 'react-icons/fa';
import { initiatePayment, verifyPayment, getOrder } from '../services/api';

const PaymentPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [paymentData, setPaymentData] = useState({
    phone_number: '',
    payment_method: 'MTN',
  });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await getOrder(orderId);
        setOrder(response.data);
      } catch (err) {
        setError('Failed to load order details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInitiatePayment = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setPaymentLoading(true);

    try {
      if (!paymentData.phone_number.trim()) {
        setError('Please enter your mobile money number');
        setPaymentLoading(false);
        return;
      }

      const response = await initiatePayment({
        order_id: orderId,
        amount: order.total_amount,
        payment_method: paymentData.payment_method,
        phone_number: paymentData.phone_number,
      });

      const paymentId = response.data.id;
      setSuccess('Payment initiated! You will receive a prompt on your phone. Please complete the transaction.');

      // Poll for payment verification
      setTimeout(async () => {
        try {
          const verifyResponse = await verifyPayment(paymentId);
          if (verifyResponse.data.status === 'success') {
            navigate('/success', {
              state: { orderId, reference: order.reference_number },
            });
          }
        } catch (err) {
          console.error('Verification error:', err);
        }
      }, 5000);
    } catch (err) {
      setError(err.response?.data?.message || 'Payment initiation failed');
    } finally {
      setPaymentLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-600">Loading order details...</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-md mx-auto mt-8 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        Order not found. Please try again.
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-8 bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Complete Payment</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      {/* Order Summary */}
      <div className="bg-gray-50 p-4 rounded mb-6 border border-gray-200">
        <h3 className="font-bold text-lg mb-3">Order Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Product:</span>
            <span className="font-semibold">BECE Checker</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Quantity:</span>
            <span className="font-semibold">{order.quantity}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Unit Price:</span>
            <span className="font-semibold">GH₵{order.unit_price}</span>
          </div>
          <div className="border-t pt-2 flex justify-between text-base">
            <span className="font-bold">Total:</span>
            <span className="font-bold text-green-600">GH₵{order.total_amount}</span>
          </div>
        </div>
      </div>

      {/* Payment Form */}
      <form onSubmit={handleInitiatePayment} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <FaMobileAlt /> Payment Method *
          </label>
          <select
            name="payment_method"
            value={paymentData.payment_method}
            onChange={handlePaymentChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
          >
            <option value="MTN">MTN Mobile Money</option>
            <option value="Vodafone">Vodafone Cash</option>
            <option value="Airtel">Airtel Money</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <FaPhone /> Mobile Number *
          </label>
          <input
            type="tel"
            name="phone_number"
            value={paymentData.phone_number}
            onChange={handlePaymentChange}
            placeholder="0500000000"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            Enter the phone number associated with your mobile money account
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 p-3 rounded text-sm text-blue-700">
          <p className="font-semibold mb-1">📱 Instructions:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Enter your mobile money number</li>
            <li>Click "Pay Now"</li>
            <li>You will receive a payment prompt on your phone</li>
            <li>Complete the transaction to finalize your order</li>
          </ul>
        </div>

        <button
          type="submit"
          disabled={paymentLoading}
          className="w-full bg-green-600 text-white font-bold py-3 rounded hover:bg-green-700 disabled:bg-gray-400"
        >
          {paymentLoading ? 'Processing Payment...' : `Pay GH₵${order.total_amount}`}
        </button>
      </form>

      <p className="text-xs text-gray-500 text-center mt-4">
        Reference: {order.reference_number}
      </p>
    </div>
  );
};

export default PaymentPage;
