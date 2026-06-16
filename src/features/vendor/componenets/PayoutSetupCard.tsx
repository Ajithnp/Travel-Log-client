import { useStripeOnboardingMutation, useStripeOnboardingStatusQuery } from "../hooks/api.hooks";


export const PayoutSetupCard = () => {
  const { data, isLoading } = useStripeOnboardingStatusQuery();
  const { mutate: startOnboarding, isPending } = useStripeOnboardingMutation();

  const status = data?.data;


  if (isLoading) {
    return (
      <div className="rounded-xl border p-5 animate-pulse bg-gray-50">
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
        <div className="h-3 bg-gray-200 rounded w-2/3" />
      </div>
    );
  }

  // ─── Fully connected 
  if (status?.onboardingComplete && status?.payoutsEnabled) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-5 flex items-start gap-3">
        <span className="text-green-500 text-xl">✅</span>
        <div>
          <p className="font-semibold text-green-800">Payouts Active</p>
          <p className="text-sm text-green-700 mt-0.5">
            Your bank account is connected. You'll receive payments
            automatically after trip completion.
          </p>
        </div>
      </div>
    );
  }

  // ─── Started but incomplete
  if (status?.hasStripeAccount && !status?.onboardingComplete) {
    return (
      <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-5 flex items-start gap-3">
        <span className="text-yellow-500 text-xl">⚠️</span>
        <div className="flex-1">
          <p className="font-semibold text-yellow-800">Payout Setup Incomplete</p>
          <p className="text-sm text-yellow-700 mt-0.5">
            You haven't finished connecting your bank account.
            Complete setup to receive payments.
          </p>
          <button
            onClick={() => startOnboarding()}
            disabled={isPending}
            className="mt-3 px-4 py-2 bg-yellow-500 hover:bg-yellow-600
                       text-white text-sm font-medium rounded-lg
                       disabled:opacity-50 transition"
          >
            {isPending ? 'Redirecting...' : 'Continue Setup'}
          </button>
        </div>
      </div>
    );
  }

  // ─── Not started
  return (
    <div className="rounded-xl border border-orange-200 bg-orange-50 p-5 flex items-start gap-3">
      <span className="text-orange-500 text-xl">🏦</span>
      <div className="flex-1">
        <p className="font-semibold text-orange-800">Setup Payouts</p>
        <p className="text-sm text-orange-700 mt-0.5">
          Connect your bank account to receive earnings
          after trip completion.
        </p>
        <button
          onClick={() => startOnboarding()}
          disabled={isPending}
          className="mt-3 px-4 py-2 bg-orange-500 hover:bg-orange-600
                     text-white text-sm font-medium rounded-lg
                     disabled:opacity-50 transition"
        >
          {isPending ? 'Redirecting...' : 'Connect Bank Account'}
        </button>
      </div>
    </div>
  );
};