import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type{ IUser } from "@/types/IUser";

interface ProfileProps {
    user?: IUser
}

import { 
  Edit, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Star,
  Shield
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

export default function Profile({ user }: ProfileProps) {
    
    
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground">Manage your account information and preferences</p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90">
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
                <Avatar className="h-24 w-24 mt-3">
                  <AvatarImage src="/placeholder.svg" alt="Profile" />
                  <AvatarFallback className="text-lg bg-black text-primary-foreground ">
                    {user?.name[0]}
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
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue={`${user?.name}`} />
                </div>
                {/* <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Doe" />
                </div> */}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue={`${user?.email}`} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" defaultValue={`${user?.phone}`} />
              </div>

              {/* <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" defaultValue="123 Main Street" />
              </div> */}

              {/* <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" defaultValue="New York" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" defaultValue="NY" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input id="zip" defaultValue="10001" />
                </div>
              </div> */}

              <div className="flex gap-3 pt-4">
                {/* <Button className="bg-gradient-primary hover:opacity-90">
                  Save Changes
                </Button>
                <Button variant="outline">
                  Cancel
                </Button> */}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Account Statistics */}
        {/* <motion.div variants={cardVariants} className="md:col-span-3">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Account Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">24</div>
                  <div className="text-sm text-muted-foreground">Total Orders</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-success">$2,340</div>
                  <div className="text-sm text-muted-foreground">Total Spent</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-info">156</div>
                  <div className="text-sm text-muted-foreground">Reward Points</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-warning">4.8</div>
                  <div className="text-sm text-muted-foreground">Avg Rating</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div> */}
      </div>
    </motion.div>
  );
}