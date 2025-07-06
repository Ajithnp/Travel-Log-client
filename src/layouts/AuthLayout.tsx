import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import React from "react";

interface AuthLayoutProps {
    cardTitle: string;
    cardDescription?: string;
    cardAction?:React.ReactNode;
    children:React.ReactNode;
    footer?: React.ReactNode;
}

const AuthLayout = ({cardTitle,cardDescription,cardAction,children,footer}:AuthLayoutProps) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-yellow-100">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>{cardTitle}</CardTitle>
          <CardDescription>{cardDescription}</CardDescription>
          <CardAction>{cardAction}</CardAction>
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
        <CardFooter className="flex-col gap-2">
          {footer}
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthLayout;