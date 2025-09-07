"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Phone, Mail, Calendar, Star, Shield, ShieldCheck, Clock, Building2, Globe, Users } from "lucide-react";
import VendorVerificationModal from "./vendor.profile.verification.form"


export default function VendorProfile() {
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationStatus, setVerificationStatus] = useState<"pending" | "verified" | "unverified">("unverified")
//    const [isOpen, setIsOpen] = useState(false)
      const [isModalOpen, setIsModalOpen] = useState(false);

    const [isVendorVerified, setIsVendorVerified] = useState(false); // Replace with real logic

//   const handleVerification = async () => {
//     setIsVerifying(true)
//     // Simulate verification process
//     setTimeout(() => {
//       setVerificationStatus("pending")
//       setIsVerifying(false)
//     }, 2000)
//   }

const handleVerification = () => {
    if(!isVendorVerified) {
         setIsModalOpen(true);
    }else{
        alert("You are already verified!"); 
    }
}

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  const getVerificationBadge = () => {
    switch (verificationStatus) {
      case "verified":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <ShieldCheck className="w-3 h-3 mr-1" />
            Verified
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        )
      default:
        return (
          <Badge variant="secondary">
            <Shield className="w-3 h-3 mr-1" />
            Unverified
          </Badge>
        )
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-6xl mx-auto p-4 space-y-4 min-h-screen"
    >
      {/* Profile Header */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                <Avatar className="w-16 h-16 lg:w-20 lg:h-20">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Vendor Avatar" />
                  <AvatarFallback className="text-lg">JD</AvatarFallback>
                </Avatar>
              </motion.div>

              <div className="flex-1 space-y-2">
                <div className="space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <h1 className="text-xl lg:text-2xl font-bold">John's Fresh Produce</h1>
                    {getVerificationBadge()}
                  </div>
                  <p className="text-sm text-muted-foreground">Premium organic fruits and vegetables supplier</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">4.8</span>
                    <span>(124 reviews)</span>
                  </div>
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={handleVerification}
                    // disabled={isVerifying || verificationStatus === "verified" || verificationStatus === "pending"}
                    size="sm"
                    className="w-full sm:w-auto"
                  >
                    {isVerifying ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        className="w-4 h-4 mr-2"
                      >
                        <Shield className="w-4 h-4" />
                      </motion.div>
                    ) : (
                      <ShieldCheck className="w-4 h-4 mr-2" />
                    )}
                    {verificationStatus === "verified"
                      ? "Verified"
                      : verificationStatus === "pending"
                        ? "Verification Pending"
                        : isVerifying
                          ? "Verifying..."
                          : "Request Verification"}
                  </Button>
                </motion.div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Contact Information */}
        <motion.div variants={itemVariants}>
          <Card className="h-full">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Phone className="w-4 h-4" />
                Contact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <motion.div
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                whileHover={{ x: 2 }}
              >
                <Mail className="w-3 h-3 text-muted-foreground" />
                <div>
                  <p className="text-xs font-medium">Email</p>
                  <p className="text-xs text-muted-foreground">john@freshproduce.com</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                whileHover={{ x: 2 }}
              >
                <Phone className="w-3 h-3 text-muted-foreground" />
                <div>
                  <p className="text-xs font-medium">Phone</p>
                  <p className="text-xs text-muted-foreground">+1 (555) 123-4567</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                whileHover={{ x: 2 }}
              >
                <MapPin className="w-3 h-3 text-muted-foreground" />
                <div>
                  <p className="text-xs font-medium">Address</p>
                  <p className="text-xs text-muted-foreground">123 Farm Road, Green Valley, CA</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                whileHover={{ x: 2 }}
              >
                <Globe className="w-3 h-3 text-muted-foreground" />
                <div>
                  <p className="text-xs font-medium">Website</p>
                  <p className="text-xs text-muted-foreground">johnsfreshproduce.com</p>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Business Details */}
        <motion.div variants={itemVariants}>
          <Card className="h-full">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Building2 className="w-4 h-4" />
                Business
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <motion.div
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                whileHover={{ x: 2 }}
              >
                <Calendar className="w-3 h-3 text-muted-foreground" />
                <div>
                  <p className="text-xs font-medium">Established</p>
                  <p className="text-xs text-muted-foreground">March 2018</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                whileHover={{ x: 2 }}
              >
                <Users className="w-3 h-3 text-muted-foreground" />
                <div>
                  <p className="text-xs font-medium">Team Size</p>
                  <p className="text-xs text-muted-foreground">15-20 employees</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                whileHover={{ x: 2 }}
              >
                <Building2 className="w-3 h-3 text-muted-foreground" />
                <div>
                  <p className="text-xs font-medium">Business Type</p>
                  <p className="text-xs text-muted-foreground">Organic Farm & Distributor</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                whileHover={{ x: 2 }}
              >
                <MapPin className="w-3 h-3 text-muted-foreground" />
                <div>
                  <p className="text-xs font-medium">Service Area</p>
                  <p className="text-xs text-muted-foreground">CA, NV, AZ</p>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* About & Stats */}
        <motion.div variants={itemVariants}>
          <Card className="h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">About & Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="space-y-3"
              >
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Premium organic produce supplier since 2018. Sustainable farming practices with farm-to-table
                  delivery.
                </p>
                <div className="grid grid-cols-1 gap-2">
                  <motion.div whileHover={{ scale: 1.02 }} className="p-2 rounded-lg bg-muted/50 text-center">
                    <div className="text-lg font-bold text-primary">500+</div>
                    <div className="text-xs text-muted-foreground">Customers</div>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} className="p-2 rounded-lg bg-muted/50 text-center">
                    <div className="text-lg font-bold text-primary">50+</div>
                    <div className="text-xs text-muted-foreground">Products</div>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} className="p-2 rounded-lg bg-muted/50 text-center">
                    <div className="text-lg font-bold text-primary">6</div>
                    <div className="text-xs text-muted-foreground">Years</div>
                  </motion.div>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
         <VendorVerificationModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
      </div>
    </motion.div>
  )
}
