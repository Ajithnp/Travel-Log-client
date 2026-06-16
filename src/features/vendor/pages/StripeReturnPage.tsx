import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStripeOnboardingStatusQuery } from '../hooks/api.hooks';


const StripeReturnPage = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useStripeOnboardingStatusQuery();

  useEffect(() => {
    if (!isLoading && data) {
      const timer = setTimeout(() => {
        navigate('/vendor/profile');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isLoading, data, navigate]);

  const status = data?.data;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden relative">
        <div 
          className={`h-1.5 w-full ${
            isLoading ? 'bg-blue-500 animate-pulse' 
            : status?.payoutsEnabled ? 'bg-green-500' 
            : 'bg-amber-500'
          }`} 
        />
        
        <div className="p-8 text-center">
          {isLoading ? (
            <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6 animate-pulse">
                <span className="text-2xl">⏳</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Verifying Account</h3>
              <p className="text-gray-500 text-sm">Please wait while we confirm your Stripe setup...</p>
            </div>
          ) : status?.payoutsEnabled ? (
            <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-6 ring-8 ring-green-50/50">
                <span className="text-2xl">🎉</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Setup Complete!</h3>
              <p className="text-green-700 font-medium bg-green-50 border border-green-100 px-4 py-2 rounded-full text-sm mb-6">
                Bank account connected successfully
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Redirecting to profile...</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
              <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mb-6 ring-8 ring-amber-50/50">
                <span className="text-2xl">⚠️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Setup Incomplete</h3>
              <p className="text-gray-500 text-sm mb-8">
                It looks like you didn't finish all the required steps in Stripe. You need to complete setup to receive payouts.
              </p>
              <button
                onClick={() => navigate('/vendor/profile')}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-2.5 px-4 rounded-xl transition-colors duration-200 shadow-sm hover:shadow active:scale-[0.98]"
              >
                Return to Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StripeReturnPage;