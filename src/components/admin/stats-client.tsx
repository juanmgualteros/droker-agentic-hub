"use client";

import { StatCard } from "@/components/shared/stat-card";
import { Users, Package, CreditCard } from "lucide-react";

export function StatsClient() {
  // For now, we'll use dummy data
  const stats = [
    {
      title: "Total Users",
      value: "0",
      description: "Users in your organization",
      icon: Users,
    },
    {
      title: "Total Products",
      value: "0",
      description: "Products in your catalog",
      icon: Package,
    },
    {
      title: "Subscription",
      value: "Free",
      description: "Your current plan",
      icon: CreditCard,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          description={stat.description}
          icon={stat.icon}
        />
      ))}
    </div>
  );
} 