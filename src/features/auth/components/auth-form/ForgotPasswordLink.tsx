import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface Props {
  role?: "user" | "vendor";
}

const ForgotPasswordLink = ({ role }: Props) => (
  <div className="flex justify-center">
    <Link to={`/${role}/forgot-password`}>
      <Button
        className="p-0 text-sm font-medium hover:underline cursor-pointer"
        variant="link"
      >
        Forgot password
      </Button>
    </Link>
  </div>
);

export default ForgotPasswordLink;
