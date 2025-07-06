import React from "react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import travelImage from "@/assets/Traveler on Suspension Bridge.jpeg";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import TravelLogLogo from "@/components/shared/travelLogLogo";
import FormImagesection from "../../../auth/components/FormImagesection";
import FormFooter from "../../../auth/components/FormFooter";
import { Button } from "@/components/ui/button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login attempt with:", { email, password });
  };
  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center p-4">
      {/* Main container with shadow */}
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg overflow-hidden flex relative">
        {/* Left side - Login Form */}
        <div className="w-full lg:w-3/5 p-8 md:p-12 py-24">
          {/* Logo */}
          <div className="font-bold text-2xl tracking-tight mb-12">
            <TravelLogLogo />
          </div>

          {/* Form Section */}
          <div className="max-w-md mx-auto lg:mx-0 w-full">
            {/* Login Header */}
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-base font-medium">Login</h1>
              <Link to="#" className="text-sm text-gray-500 hover:underline">
                Create a new account
              </Link>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex justify-center">
                <Input
                  type={"email"}
                  placeholder={"Email address"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={
                    "w-4/5 px-4 py-6 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300"
                  }
                />
              </div>
              <div className="flex justify-center">
                <Input
                  type={"password"}
                  placeholder={"password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={
                    "w-4/5 px-4 py-6 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300"
                  }
                />
              </div>

              <div className="text-right pr-[10%]">
                <Link to="#" className="text-xs text-gray-500 hover:underline">
                  Forgot my password?
                </Link>
              </div>

              {/* Social Media Icons */}
              <div className="flex justify-center space-x-6 my-6">
                <Button
                  type="button"
                  className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
                >
                  <FcGoogle size={20} />
                </Button>
              </div>

              {/* Continue Button */}
              <div className="flex justify-center">
                <Button
                  type={"submit"}
                  className="w-4/5 bg-black text-white py-6 text-base rounded-full font-semibold hover:bg-gray-900 transition-colors"
                >
                    Sign In
                </Button>
              </div>
            </form>
          </div>
          {/* Footer */}
          <FormFooter />
        </div>
        {/* Right side - Image Section */}
        <FormImagesection image={travelImage} />
      </div>
    </div>
  );
};

export default Login;
