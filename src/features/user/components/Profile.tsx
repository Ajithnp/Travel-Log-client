import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { IUser } from "@/types/IUser";
import { useNavigate } from "react-router-dom";

import { Edit, Mail, Phone } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

interface ProfileProps {
  user?: Partial<IUser>;
}

export default function Profile({ user }: ProfileProps) {
  const navigate = useNavigate();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between text-center md:text-left gap-3 md:gap-0">
        <div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground">
            Manage your account information and preferences
          </p>
        </div>
        <Button
          className="bg-black hover:opacity-90 text-white transition-all duration-300 mx-0 text-sm md:text-base px-4 py-2 md:px-6 md:py-2.5 cursor-pointer"
          onClick={() => {
            navigate("/user/editProfile");
          }}
        >
          <Edit className="mr-2 h-4 w-4" />
          Edit Profile
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Overview */}
        <motion.div variants={cardVariants} className="md:col-span-1">
          <Card className="shadow-card hover:shadow-hover transition-all duration-300">
            <CardHeader className="text-center">
              <div className="flex justify-center">
                <Avatar className="h-20 w-20 mt-3">
                  <AvatarImage src="/placeholder.svg" alt="Profile" />
                  <AvatarFallback className="text-lg bg-black text-primary-foreground ">
                    {user?.name ? user.name[0] : ""}
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="mt-4">{user?.name}</CardTitle>
              <div className="flex justify-center gap-2">
                {/* <Badge variant="secondary" className="flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  Premium
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Shield className="h-3 w-3" />
                  Verified
                </Badge> */}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{user?.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{user?.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                {/* <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>New York, NY </span> */}
              </div>
              <div className="flex items-center gap-3 text-sm">
                {/* <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Member since Jan 2023</span> */}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Profile Details Form */}
        <motion.div variants={cardVariants} className="md:col-span-2">
          <Card className="shadow-card">
            <CardHeader className="pt-4 md:pt-6 text-center md:text-left">
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue={`${user?.name}`} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue={`${user?.email}`}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" defaultValue={`${user?.phone}`} />
              </div>

              <div className="flex gap-3 pt-4"></div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Account Statistics */}
        <motion.div variants={cardVariants} className="md:col-span-3">
          <Card className="shadow-card">
            <CardHeader className="pt-4 md:pt-6 text-center md:text-left">
              <CardTitle>Account Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">24</div>
                  <div className="text-sm text-muted-foreground">
                    Total Orders
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-success">$2,340</div>
                  <div className="text-sm text-muted-foreground">
                    Total Spent
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-info">156</div>
                  <div className="text-sm text-muted-foreground">
                    Reward Points
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-warning">4.8</div>
                  <div className="text-sm text-muted-foreground">
                    Avg Rating
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
