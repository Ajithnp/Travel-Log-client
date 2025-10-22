
import { useState } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Phone, Mail, Star, Shield, ShieldCheck, Clock, Globe, XCircle } from "lucide-react";
import { VendorVerificationModal } from "./VendorVerificationForm"
import { useVendorProfileQuery } from "../hooks/api.hooks"
import { Loading } from "@/components/ui/loading"

export default function VendorProfile() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { data, isLoading, isError } = useVendorProfileQuery();

  console.log('vendor profile -----', data);

  // modal functions
  const handleShowForm = () => {
    setIsModalOpen(true)
  };

  const handleCloseForm = () => {
    setIsModalOpen(false)
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
    switch (data?.data.status) {
      case "Approved":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <ShieldCheck className="w-3 h-3 mr-1" />
            Verified
          </Badge>
        )
      case "Pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        )
      case "Rejected":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        )
      default:
        return (
          <Badge className="bg-red-500">
            <Shield className="w-3 h-3 mr-1" />
            Unverified
          </Badge>
        )
    }
  }

  if (isLoading) {
    return (
      <Loading
        variant="spinner"
        text="Loading Content..."
        className="w-full h-full" />
    )
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-6xl mx-auto p-4 space-y-4 min-h-screen"
    >
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground"></h1>
      </div>

      {/* Profile Header */}
      <motion.div variants={itemVariants}>
        <Card className="border border-border/80">
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                <Avatar className="w-16 h-16 lg:w-20 lg:h-20">
                  <AvatarImage src={data?.data.profileLogo} alt="Vendor Avatar" />
                  <AvatarFallback className="text-lg"> {data?.data?.profileLogo ? data.data.profileLogo : data?.data.name[0]}</AvatarFallback>
                </Avatar>
              </motion.div>

              <div className="flex-1 space-y-2">
                <div className="space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <h2 className="text-xl lg:text-2xl font-bold">{data?.data.name}</h2>
                    {getVerificationBadge()}
                    {data?.data.reasonForReject && (
                      <h6 className="text-sm  fond-bold  text-red-700  p-1 rounded text-right">{ data.data.reasonForReject}</h6>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">Premium organic fruits and vegetables supplier</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">4.8</span>
                    <span>(124 reviews)</span>
                  </div>
                </div>

                <motion.div>
                  {/* whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} */}
                  {data?.data.status !== "Approved" && (

                    <Button
                      onClick={handleShowForm}
                      disabled={data?.data.status === 'Pending'}
                      size="sm"
                      className="w-full sm:w-auto cursor-pointer"
                    >
                      {data?.data.status === 'Pending' ? 'Request Verification' :
                        data?.data.status === 'Rejected' ? 'Request Again' : 'Request Verification'}
                    </Button>
                  )}
                </motion.div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {/* Contact Information */}
        <motion.div variants={itemVariants}>
          <Card className="h-full border border-border/80">
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
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium">Email</p>
                  <p className="text-xs text-muted-foreground truncate">{data?.data.email}</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                whileHover={{ x: 2 }}
              >
                <Phone className="w-3 h-3 text-muted-foreground" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium">Phone</p>
                  <p className="text-xs text-muted-foreground">{data?.data.phone}</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                whileHover={{ x: 2 }}
              >
                <MapPin className="w-3 h-3 text-muted-foreground" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium">Address</p>
                  <p className="text-xs text-muted-foreground">{data?.data.businessAddress}</p>
                </div>
              </motion.div>

              {/* <motion.div
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                whileHover={{ x: 2 }}
              >
                <Globe className="w-3 h-3 text-muted-foreground" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium">Website</p>
                  <p className="text-xs text-muted-foreground truncate">{''}</p>
                </div>
              </motion.div> */}
            </CardContent>
          </Card>
        </motion.div>

        {/* About & Stats */}
        <motion.div variants={itemVariants}>
          <Card className="h-full border border-border/80 md:col-span-2 lg:col-span-1">
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
                {/* <div className="grid grid-cols-3 gap-2">
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
                </div> */}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
        <VendorVerificationModal isOpen={isModalOpen} onClose={handleCloseForm} />

      </div>
    </motion.div>
  )
}
