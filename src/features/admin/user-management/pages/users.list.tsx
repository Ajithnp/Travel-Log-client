"use client"

import { UsersTable } from "@/components/users-table"
import { VendorsTable } from "@/components/vendors-table"
import type { User, Vendor } from "@/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"

// Sample data


export default function UserTable() {

    const [users, setUsers] = useState();
    
  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Data Management</h1>
        <p className="text-muted-foreground">Manage your users and vendors with our reusable table component</p>
      </div>

      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="vendors">Vendors</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Users Management</CardTitle>
              <CardDescription>View and manage all users in your system</CardDescription>
            </CardHeader>
            <CardContent>
              <UsersTable data={sampleUsers} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* <TabsContent value="vendors">
          <Card>
            <CardHeader>
              <CardTitle>Vendors Management</CardTitle>
              <CardDescription>View and manage all vendors in your system</CardDescription>
            </CardHeader>
            <CardContent>
              <VendorsTable data={sampleVendors} />
            </CardContent>
          </Card>
        </TabsContent> */}
      </Tabs>
    </div>
  )
}