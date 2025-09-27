import { GalleryVerticalEnd } from "lucide-react";
import { Link } from "react-router-dom";

interface AuthHeaderProps {
  formType?: "Sign In" | "Sign Up";
  role?: "user" | "vendor";
}

const AuthHeader = ({ formType, role }: AuthHeaderProps) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <a href="#" className="flex flex-col items-center gap-2 font-medium">
        <div className="flex size-8 items-center justify-center rounded-md">
          <GalleryVerticalEnd className="size-6" />
        </div>
        <span className="sr-only">TravelLog</span>
      </a>

      <h1 className="text-xl font-bold">Welcome to TravelLog.</h1>

      <div className="text-center text-sm">
        {formType === "Sign In" && (
          <>
            Don’t have an account?{" "}
            <Link to={`/${role}/register`} className="underline underline-offset-4">
              Signup
            </Link>
          </>
        )}
        {formType === "Sign Up" && (
          <>
            Already have an account?{" "}
            <Link to={`/${role}/login`} className="underline underline-offset-4">
              Signin
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthHeader;
