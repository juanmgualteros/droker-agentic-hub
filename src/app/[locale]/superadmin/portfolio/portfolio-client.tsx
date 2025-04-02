"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SuperAdminLayoutClient } from "@/components/superadmin/layout-client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, LayoutGrid } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function PortfolioClient({ params }: { params: { locale: string } }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  
  // Mock portfolio data
  const portfolioItems = [
    { id: 1, name: "Enterprise Dashboard", description: "Analytics dashboard for enterprise clients", status: "Active" },
    { id: 2, name: "Customer Portal", description: "Self-service portal for customers", status: "Active" },
    { id: 3, name: "Admin Console", description: "Administrative console for system management", status: "In Development" },
  ];

  // Handle client-side mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Check authentication after component is mounted
  useEffect(() => {
    if (isMounted) {
      // Only access localStorage after component is mounted on client
      const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
      const userRole = localStorage.getItem("userRole");
      
      if (!isAuthenticated || userRole !== "superadmin") {
        router.replace(`/${params.locale}/login`);
      } else {
        setIsLoading(false);
      }
    }
  }, [isMounted, router, params.locale]);

  // Return null during SSR to prevent hydration errors
  if (!isMounted) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <SuperAdminLayoutClient title="Portfolio Management" description="Manage your product portfolio">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-light">Portfolio</h1>
          <p className="text-muted-foreground">Manage your product portfolio and offerings</p>
        </div>
        <Button className="flex items-center gap-2 rounded">
          <PlusCircle className="h-4 w-4" />
          <span>Add Product</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolioItems.map((item) => (
          <Card key={item.id} className="border border-border rounded">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg font-light">{item.name}</CardTitle>
                <Badge variant={item.status === 'Active' ? "success" : "default"} className="rounded-full text-xs font-light">
                  {item.status}
                </Badge>
              </div>
              <CardDescription className="text-muted-foreground">{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-end">
                <Button variant="outline" size="sm" className="text-xs rounded font-light">
                  <LayoutGrid className="h-3 w-3 mr-1" />
                  Manage
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </SuperAdminLayoutClient>
  );
}
