"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
  href?: string;
}

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  href,
}: StatCardProps) {
  const CardWrapper = href ? Link : "div";
  
  const content = (
    <div className="rounded-lg border bg-white p-6">
      <div className="flex items-center gap-4">
        <div className="rounded-full bg-gray-100 p-3">
          <Icon className="h-6 w-6 text-gray-600" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
      <p className="mt-4 text-sm text-gray-500">{description}</p>
    </div>
  );

  if (href) {
    return <CardWrapper href={href}>{content}</CardWrapper>;
  }

  return content;
} 