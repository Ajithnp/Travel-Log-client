import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "@/routes/AppRoutes";
import { ThemeProvider } from "@/components/theme.provider";
import { Toaster } from "@/components/ui/sonner"
import ScrollToTop from "./hooks/app/page-view";


const App = () => {
  return (
    <>
      <Router>
         <ScrollToTop />
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <AppRoutes />
          <Toaster position="top-center" />
        </ThemeProvider>
      </Router>
    </>
  );
};

export default App;
