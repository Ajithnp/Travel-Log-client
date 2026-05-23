import { useState, useMemo } from "react";
import { StepIndicator } from "./step-indicator";
import { Step1Schedule } from "./step-1-schedule";
import { Step2Travellers } from "./step-2-travellers";
import { Step3AddOns } from "./step-3-addson";
import { Step4Payment } from "./step-4-payment";
import {
  calcPricing,
  type BookingState,
  type Coupon,
  type PricingTierType,
  type Schedule,
  type TravellerInfo,
} from "@/types/booking.types";
import type { PublicPackageDetailDTO } from "@/types/types";
import { useBookingFlow } from "@/hooks/app/booking-flow";
import { calculatePaymentSplit } from "@/utils/booking/payment-split-calculator";

interface BookingWizardProps {
  schedules: Schedule[];
  pkg: PublicPackageDetailDTO;
}

const initialState: BookingState = {
  step: 1,
  selectedSchedule: null,
  selectedTierType: "SOLO",
  travellers: [],
  appliedCoupon: null,
};


export function BookingWizard({ schedules, pkg }: BookingWizardProps) {
  const [state, setState] = useState<BookingState>(initialState);


  const {
    bookingId,
    checkoutUrl,
    useWallet,
    setUseWallet,
    walletBalance,
    isLoadingWallet,
    isProcessing,
    initiateBooking,
  } =
    useBookingFlow();


  const selectedPricing = useMemo(() => {
    if (!state.selectedSchedule) return null;
    return (
      state.selectedSchedule.pricing.find(
        (p) => p.type === state.selectedTierType,
      ) ?? null
    );
  }, [state.selectedSchedule, state.selectedTierType]);

  const pricing = useMemo(
    () =>
      selectedPricing ? calcPricing(selectedPricing, state.appliedCoupon) : null,
    [selectedPricing, state.appliedCoupon],
  );

  const split = useMemo(
    () => calculatePaymentSplit(pricing?.totalAmount ?? 0, walletBalance, useWallet),
    [pricing?.totalAmount, walletBalance, useWallet],
  );

  const goTo = (step: number) => setState((s) => ({ ...s, step }));


  const handleScheduleSelect = (schedule: Schedule) => {

    setState((s) => ({
      ...s,
      selectedSchedule: schedule,
      selectedTierType: "SOLO",
      travellers: [],
      appliedCoupon: null,
    }));
  };


  const handleTierChange = (type: PricingTierType) =>
    setState((s) => ({ ...s, selectedTierType: type, travellers: [] }));

  const handleTravellerSubmit = (travellers: TravellerInfo[]) =>
    setState((s) => ({ ...s, travellers, step: 3 }));


  const handleApplyCoupon = (coupon: Coupon) =>
    setState((s) => ({ ...s, appliedCoupon: coupon }));

  const handleRemoveCoupon = () =>
    setState((s) => ({ ...s, appliedCoupon: null }));

  const handlePay = async () => {
    if (!state.selectedSchedule || !pricing) return;

    await initiateBooking({
      packageId: pkg.packageId,
      scheduleId: state.selectedSchedule.scheduleId,
      tierType: state.selectedTierType,
      seatsCount: pricing.travellersCount,
      useWallet,
      travelers: state.travellers,
      amountInPaise: pricing.totalAmount * 100,
    });
  };

  return (
    <div className="space-y-4">
      <StepIndicator currentStep={state.step} />

      {state.step === 1 && (
        <Step1Schedule
          schedules={schedules}
          selectedSchedule={state.selectedSchedule}
          onSelect={handleScheduleSelect}
          onContinue={() => goTo(2)}
        />
      )}

      {state.step === 2 && (
        <Step2Travellers
          schedule={state.selectedSchedule!}
          selectedTierType={state.selectedTierType}
          travellers={state.travellers}
          onTierChange={handleTierChange}
          onSubmit={handleTravellerSubmit}
          onBack={() => goTo(1)}
        />
      )}

      {state.step === 3 && pricing && (
        <Step3AddOns
          pricing={pricing}
          appliedCoupon={state.appliedCoupon}
          onApplyCoupon={handleApplyCoupon}
          onRemoveCoupon={handleRemoveCoupon}
          onContinue={() => goTo(4)}
          onBack={() => goTo(2)}
        />
      )}

      {state.step === 4 && pricing && (
        <Step4Payment
          selectedSchedule={state.selectedSchedule}
          selectedTierType={state.selectedTierType}
          pricing={pricing}
          appliedCoupon={state.appliedCoupon}
          bookingId={bookingId}
          checkoutUrl={checkoutUrl}

          isProcessing={isProcessing}
          walletBalance={walletBalance}
          isLoadingWallet={isLoadingWallet}
          useWallet={useWallet}
          onToggleWallet={() => setUseWallet(!useWallet)}
          split={split}
          onPay={handlePay}
          onBack={() => goTo(3)}
        />
      )}
    </div>
  );
}



