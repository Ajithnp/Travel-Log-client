import { useEffect } from 'react';
import { useStripeOnboardingMutation } from '../hooks/api.hooks';


const StripeRefreshPage = () => {
  const { mutate: startOnboarding, isPending } = useStripeOnboardingMutation();

  useEffect(() => {
    startOnboarding();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="relative bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/20 max-w-md w-full mx-4 text-center overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
        
        <div className="flex justify-center mb-8">
          <div className="relative">

            <div className="w-16 h-16 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-purple-500 rounded-full animate-pulse" />
          </div>
        </div>

        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-2">
          {isPending ? 'Generating new link...' : 'Redirecting to Stripe...'}
        </h2>
        
        <p className="text-gray-500 mb-6 text-sm">
          Your previous link expired. We're securely reconnecting you.
        </p>

        <div className="flex items-center justify-center gap-2 text-xs text-gray-400 font-medium">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          Secure Connection
        </div>
      </div>
    </div>
  );
};

export default StripeRefreshPage;
