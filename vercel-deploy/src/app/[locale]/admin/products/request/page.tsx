"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface ProductOption {
  id: string;
  name: string;
  description: string;
  benefits: string[];
  category: string;
  type: "VALUEFLOWS" | "TEAM_OF_EXPERTS";
}

const productOptions: ProductOption[] = [
  {
    id: "sales-vf",
    name: "Sales",
    description: "Transform your sales process with AI-powered automation that understands and adapts to your business needs.",
    benefits: [
      "Reduce manual data entry by 75% with smart automation",
      "Increase conversion rates with AI-driven lead scoring",
      "Generate personalized sales proposals in minutes",
      "Track and analyze customer interactions in real-time"
    ],
    category: "Sales",
    type: "VALUEFLOWS"
  },
  {
    id: "onboarding-vf",
    name: "Onboarding",
    description: "Create seamless customer onboarding experiences that reduce time-to-value and increase customer satisfaction.",
    benefits: [
      "Cut onboarding time by 60% with automated workflows",
      "Ensure compliance with built-in verification steps",
      "Provide interactive guides and documentation",
      "Track onboarding progress in real-time"
    ],
    category: "Onboarding",
    type: "VALUEFLOWS"
  },
  {
    id: "collections-vf",
    name: "Collections",
    description: "Streamline your accounts receivable process with intelligent automation and predictive analytics.",
    benefits: [
      "Reduce days sales outstanding (DSO) by up to 40%",
      "Automate payment reminders and follow-ups",
      "Predict payment behavior with AI analytics",
      "Generate comprehensive collection reports"
    ],
    category: "Collections",
    type: "VALUEFLOWS"
  },
  {
    id: "sales-expert",
    name: "Expert Sales",
    description: "Access a network of elite sales professionals who specialize in complex, high-value transactions.",
    benefits: [
      "Close enterprise deals with experienced negotiators",
      "Get strategic advice on sales pipeline management",
      "Access industry-specific sales expertise",
      "Receive coaching on advanced sales techniques"
    ],
    category: "Sales",
    type: "TEAM_OF_EXPERTS"
  },
  {
    id: "negotiation-expert",
    name: "Negotiation",
    description: "Work with master negotiators who can help you secure better deals and strengthen business relationships.",
    benefits: [
      "Maximize deal value with expert negotiation strategies",
      "Reduce contract risks with thorough review",
      "Learn advanced negotiation techniques",
      "Handle complex multi-party negotiations"
    ],
    category: "Negotiation",
    type: "TEAM_OF_EXPERTS"
  },
  {
    id: "people-expert",
    name: "People",
    description: "Partner with HR experts to build and maintain high-performing teams while fostering a positive company culture.",
    benefits: [
      "Develop effective recruitment strategies",
      "Create competitive compensation packages",
      "Implement performance management systems",
      "Build engaging employee development programs"
    ],
    category: "People",
    type: "TEAM_OF_EXPERTS"
  },
  {
    id: "management-expert",
    name: "Management",
    description: "Get guidance from seasoned executives who can help you optimize operations and drive strategic growth.",
    benefits: [
      "Develop and execute growth strategies",
      "Optimize operational efficiency",
      "Improve decision-making processes",
      "Build effective leadership teams"
    ],
    category: "Management",
    type: "TEAM_OF_EXPERTS"
  }
];

export default function RequestProductPage() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const handleRequestProduct = async (product: ProductOption) => {
    // Here you would implement the API call to request the product
    toast.success(`Request sent for ${product.name}`);
    setSelectedProduct(null);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Request New Product</h1>
        <p className="mt-1 text-sm text-gray-500">
          Select a product to request for your organization
        </p>
      </div>

      {/* Valueflows Section */}
      <div className="mb-12">
        <h2 className="text-xl font-medium text-gray-900 mb-6">Valueflows</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productOptions
            .filter(product => product.type === "VALUEFLOWS")
            .map(product => (
              <Card key={product.id} className="flex flex-col h-full bg-white overflow-hidden">
                <div className="p-6 flex flex-col h-full">
                  <div className="mb-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{product.name}</h3>
                    <Badge variant="secondary" className="mb-3">
                      {product.category}
                    </Badge>
                    <p className="text-sm text-gray-500">{product.description}</p>
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm font-medium text-gray-900 mb-2">Key Benefits:</p>
                    <ul className="text-sm text-gray-500 space-y-2 list-disc pl-4 mb-6">
                      {product.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                  <Button
                    onClick={() => handleRequestProduct(product)}
                    className="w-full bg-black text-white hover:bg-gray-800 mt-auto"
                  >
                    Request Access
                  </Button>
                </div>
              </Card>
            ))}
        </div>
      </div>

      {/* Team of Experts Section */}
      <div>
        <h2 className="text-xl font-medium text-gray-900 mb-6">Team of Experts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productOptions
            .filter(product => product.type === "TEAM_OF_EXPERTS")
            .map(product => (
              <Card key={product.id} className="flex flex-col h-full bg-white overflow-hidden">
                <div className="p-6 flex flex-col h-full">
                  <div className="mb-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{product.name}</h3>
                    <Badge variant="secondary" className="mb-3">
                      {product.category}
                    </Badge>
                    <p className="text-sm text-gray-500">{product.description}</p>
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm font-medium text-gray-900 mb-2">Key Benefits:</p>
                    <ul className="text-sm text-gray-500 space-y-2 list-disc pl-4 mb-6">
                      {product.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                  <Button
                    onClick={() => handleRequestProduct(product)}
                    className="w-full bg-black text-white hover:bg-gray-800 mt-auto"
                  >
                    Request Access
                  </Button>
                </div>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
} 