"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DataTable } from "@/components/ui/data-table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal, Plus, Trash2, Users, Key, Package, Database, Settings, BarChart } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  type: 'VALUEFLOWS' | 'EXPERTS';
  category: 'SALES' | 'ONBOARDING' | 'COLLECTIONS' | 'OPERATIONS' | 'NEGOTIATION' | 'EXPERT_SALES';
}

interface ApiKey {
  id: string;
  name: string;
  type: 'OPENAI' | 'SUPABASE';
  value: string;
}

interface AdminUser {
  name: string;
  email: string;
  password: string;
}

type Tab = 'details' | 'products' | 'apiKeys' | 'users' | 'settings';

export default function NewOrganizationPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>('details');
  const [adminUser, setAdminUser] = useState<AdminUser>({ name: '', email: '', password: '' });
  const [products, setProducts] = useState<Product[]>([]);
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/organizations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          adminUser,
          products,
          apiKeys,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create organization');
      }

      setHasUnsavedChanges(false);
      toast.success('Organization created successfully');
      router.push('/superadmin/organizations');
    } catch (error) {
      toast.error('Failed to create organization');
      console.error('Error:', error);
    }
  };

  const handleTabChange = (tab: Tab) => {
    if (hasUnsavedChanges) {
      const confirmed = window.confirm('You have unsaved changes. Do you want to continue without saving?');
      if (!confirmed) return;
    }
    setActiveTab(tab);
  };

  const tabs = [
    { id: 'details' as const, label: 'Details', icon: Database },
    { id: 'products' as const, label: 'Products', icon: Package },
    { id: 'apiKeys' as const, label: 'API Keys', icon: Key },
    { id: 'users' as const, label: 'Users', icon: Users },
    { id: 'settings' as const, label: 'Settings', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'details':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium mb-2 text-foreground font-comfortaa">Organization Details</h2>
              <p className="text-sm text-muted-foreground mb-4 font-comfortaa">Basic information about the organization</p>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Organization Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setHasUnsavedChanges(true);
                    }}
                    placeholder="Enter organization name"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'products':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium mb-2 text-foreground font-comfortaa">Products Configuration</h2>
              <p className="text-sm text-muted-foreground mb-4 font-comfortaa">Manage organization products</p>
              <DataTable
                data={products}
                columns={[
                  {
                    accessorKey: 'name',
                    header: 'Name',
                  },
                  {
                    accessorKey: 'type',
                    header: 'Type',
                  },
                  {
                    accessorKey: 'category',
                    header: 'Category',
                  },
                ]}
                actions={(product: Product) => (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setProducts(products.filter(p => p.id !== product.id))}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              />
              <Button 
                className="mt-4"
                onClick={() => {
                  // Add product dialog logic here
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </div>
          </div>
        );

      case 'apiKeys':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium mb-2 text-foreground font-comfortaa">API Keys</h2>
              <p className="text-sm text-muted-foreground mb-4 font-comfortaa">Manage API keys for external services</p>
              <DataTable
                data={apiKeys}
                columns={[
                  {
                    accessorKey: 'name',
                    header: 'Name',
                  },
                  {
                    accessorKey: 'type',
                    header: 'Type',
                  },
                ]}
                actions={(apiKey: ApiKey) => (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setApiKeys(apiKeys.filter(k => k.id !== apiKey.id))}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              />
              <Button 
                className="mt-4"
                onClick={() => {
                  // Add API key dialog logic here
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add API Key
              </Button>
            </div>
          </div>
        );

      case 'users':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium mb-2 text-foreground font-comfortaa">Admin User</h2>
              <p className="text-sm text-muted-foreground mb-4 font-comfortaa">Configure the organization's admin user</p>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="adminName">Admin Name</Label>
                  <Input
                    id="adminName"
                    value={adminUser.name}
                    onChange={(e) => {
                      setAdminUser({ ...adminUser, name: e.target.value });
                      setHasUnsavedChanges(true);
                    }}
                    placeholder="Enter admin name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="adminEmail">Admin Email</Label>
                  <Input
                    id="adminEmail"
                    type="email"
                    value={adminUser.email}
                    onChange={(e) => {
                      setAdminUser({ ...adminUser, email: e.target.value });
                      setHasUnsavedChanges(true);
                    }}
                    placeholder="Enter admin email"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="adminPassword">Admin Password</Label>
                  <Input
                    id="adminPassword"
                    type="password"
                    value={adminUser.password}
                    onChange={(e) => {
                      setAdminUser({ ...adminUser, password: e.target.value });
                      setHasUnsavedChanges(true);
                    }}
                    placeholder="Enter admin password"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium mb-2 text-foreground font-comfortaa">Organization Settings</h2>
              <p className="text-sm text-muted-foreground mb-4 font-comfortaa">Additional configuration options</p>
              {/* Add organization settings here */}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-light text-foreground font-comfortaa">Configure Organization</h1>
        <p className="mt-1 text-sm text-muted-foreground font-comfortaa">
          Set up your organization's configuration and resources
        </p>
      </div>

      <div className="border-b border-border">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={cn(
                  "flex items-center space-x-2 border-b-2 px-1 pb-4 pt-2 text-sm font-medium",
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="bg-background shadow-sm rounded-lg p-6 border border-border">
        {renderContent()}
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            if (hasUnsavedChanges) {
              const confirmed = window.confirm('You have unsaved changes. Are you sure you want to cancel?');
              if (!confirmed) return;
            }
            router.push('/superadmin/organizations');
          }}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit}
          disabled={!name || !adminUser.name || !adminUser.email || !adminUser.password}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
} 