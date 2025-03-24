"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FileText, MessageSquare, Upload, ChevronRight } from "lucide-react";

// Temporary mock data - this would come from your API/database
const products = [
  {
    id: "1",
    name: "Product A",
    description: "Description for Product A",
    isEnabled: true,
    features: {
      files: true,
      chat: true,
      qa: true,
    },
  },
  {
    id: "2",
    name: "Product B",
    description: "Description for Product B",
    isEnabled: false,
    features: {
      files: false,
      chat: true,
      qa: false,
    },
  },
  // Add more products as needed
];

export function ProductsList() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className={cn(
              "border rounded-lg p-4 bg-white",
              !product.isEnabled && "opacity-60"
            )}
          >
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 
                  className={cn(
                    "text-lg font-medium",
                    product.isEnabled ? "text-gray-900" : "text-gray-500"
                  )}
                >
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500">{product.description}</p>
              </div>
              <Link href={`/admin/products/${product.id}/configure`}>
                <Button variant="outline" className="ml-4">
                  Configure
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="mt-4 flex gap-4">
              <div className="flex items-center text-sm">
                <FileText className="mr-2 h-4 w-4 text-gray-500" />
                <span className={cn(
                  product.features.files ? "text-gray-900" : "text-gray-400"
                )}>
                  Files
                </span>
              </div>
              <div className="flex items-center text-sm">
                <MessageSquare className="mr-2 h-4 w-4 text-gray-500" />
                <span className={cn(
                  product.features.chat ? "text-gray-900" : "text-gray-400"
                )}>
                  Chat
                </span>
              </div>
              <div className="flex items-center text-sm">
                <Upload className="mr-2 h-4 w-4 text-gray-500" />
                <span className={cn(
                  product.features.qa ? "text-gray-900" : "text-gray-400"
                )}>
                  Q&A
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 