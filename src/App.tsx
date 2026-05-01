import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "@/routes/AppRoutes";
import { ThemeProvider } from "@/components/theme.provider";
import { Toaster } from "@/components/ui/sonner"
import ScrollToTop from "./hooks/app/page-view";
import { CheckCircle2, XCircle } from "lucide-react";


const App = () => {
  return (
    <>
      <Router>
        <ScrollToTop />
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <AppRoutes />
          <Toaster
            position="top-center"
            richColors
            closeButton
            icons={{
              success: <CheckCircle2 className="h-5 w-5 text-green-600" />,
              error: <XCircle className="h-5 w-5 text-red-600" />,
            }}
          />
        </ThemeProvider>
      </Router>
    </>
  );
};

export default App;
