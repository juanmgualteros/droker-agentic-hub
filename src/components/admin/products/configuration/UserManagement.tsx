import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StyledCard, ConfigSection } from "../ui-components";
import { Download } from "lucide-react";

interface UserManagementProps {
  tooltips: Record<string, string>;
  handleBulkImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UserManagement: React.FC<UserManagementProps> = ({
  tooltips,
  handleBulkImport
}) => {
  return (
    <div className="space-y-6">
      <StyledCard>
        <div className="space-y-4">
          <ConfigSection 
            title="User Management" 
            tooltip={tooltips.users}
            className="space-y-4"
          >
            <div className="flex justify-end mb-4">
              <Input
                type="file"
                className="hidden"
                id="bulk-import"
                accept=".csv,.xlsx"
                onChange={handleBulkImport}
              />
              <label htmlFor="bulk-import">
                <Button 
                  variant="outline" 
                  className="font-comfortaa font-light rounded-xl" 
                  asChild
                >
                  <span>
                    <Download className="mr-2 h-4 w-4" />
                    Import Users
                  </span>
                </Button>
              </label>
            </div>
            
            {/* User table would go here */}
            <div className="border border-border rounded-xl p-4 bg-background dark:bg-card/50">
              <div className="text-center py-8 text-muted-foreground dark:text-white/70 font-comfortaa font-light">
                User management table would be displayed here
              </div>
            </div>
            
            {/* Pagination controls would go here */}
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground dark:text-white/70 font-comfortaa font-light">
                Showing 0 of 0 users
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="font-comfortaa font-light rounded-xl" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" className="font-comfortaa font-light rounded-xl" disabled>
                  Next
                </Button>
              </div>
            </div>
          </ConfigSection>
        </div>
      </StyledCard>
    </div>
  );
};

export default UserManagement;
