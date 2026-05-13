import PaymentLoader from "@/components/app/booking-flow/payment-confirm-loader";
import { Error } from "@/components/common/error";
import { useBookingVerifyPaymentQuery } from "@/hooks/app/api.hooks";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const BookingConfirm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const sessionId = searchParams.get("session_id");

  const { data, isLoading, isError } =
    useBookingVerifyPaymentQuery(sessionId!, {
      enabled: !!sessionId,
    });

  useEffect(() => {
    if (!data?.data) return;

    if (data.data.status === "failure") {
      navigate("/user/payment/failure", { replace: true });
    }

    if (data.data.status === "success") {
      navigate("/user/payment/success", {
        replace: true,
        state: {
          bookingId: data.data.bookingId,
          amount: data.data.amount,
        },
      });
    }
  }, [data, navigate]);

  if (!sessionId) {
    return <div>Invalid payment session.</div>;
  }

  if (isLoading) return <PaymentLoader />;

  if (isError) {
    return (
      <Error message="An error occurred while verifying payment. Please try again." />
    );
  }

  return null;
};

export default BookingConfirm;