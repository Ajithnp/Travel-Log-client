import { Button } from "@/components/ui/button";
import { RefreshCw, Home, AlertTriangle } from "lucide-react";

interface ErrorFallbackProps {
  error?: Error;
  resetError?: () => void;
}

export function ErrorFallback({ error, resetError }: ErrorFallbackProps) {
  const handleReload = () => {
    if (resetError) {
      resetError();
    } else {
      window.location.reload();
    }
  };

  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full animate-float"></div>
        <div className="absolute bottom-32 right-32 w-24 h-24 bg-white rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-20 w-16 h-16 bg-white rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-md w-full text-center animate-fade-in">
        {/* Glass morphism card */}
        <div className="bg-glass-gradient backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
          {/* Error icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 bg-error-card rounded-full flex items-center justify-center shadow-lg animate-pulse-soft">
                <AlertTriangle className="w-12 h-12 text-error" />
              </div>
              <div className="absolute inset-0 bg-error-card rounded-full opacity-20 animate-ping"></div>
            </div>
          </div>

          {/* Error text */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-3">
              Oops! Something went wrong
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Don't worry, these things happen. Let's get you back on track.
            </p>
            {error && (
              <details className="mt-4 text-left">
                <summary className="text-muted-foreground text-sm cursor-pointer hover:text-foreground transition-colors">
                  Technical details
                </summary>
                <div className="mt-2 p-3 bg-muted rounded-lg text-muted-foreground text-xs font-mono overflow-auto max-h-32">
                  {error.message}
                </div>
              </details>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              variant="default"
              size="lg"
              onClick={handleReload}
              className="flex-1 sm:flex-none"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Try Again
            </Button>
            <Button 
              variant="outline"
              size="lg"
              onClick={handleGoHome}
              className="flex-1 sm:flex-none"
            >
              <Home className="w-5 h-5 mr-2" />
              Go Home
            </Button>
          </div>
        </div>

        {/* Bottom text */}
        <p className="text-muted-foreground text-sm mt-6 px-4">
          If this problem persists, please contact our support team.
        </p>
      </div>
    </div>
  );
}