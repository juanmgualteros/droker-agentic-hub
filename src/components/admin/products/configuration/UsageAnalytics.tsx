import React from 'react';
import { Button } from "@/components/ui/button";
import { StyledCard, ConfigSection, StatCard } from "../ui-components";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FileText, Download } from "lucide-react";

interface UsageAnalyticsProps {
  tooltips: Record<string, string>;
  handleExportReport: () => void;
}

// Sample data for the charts
const conversationData = [
  { name: 'Oct', value: 400 },
  { name: 'Nov', value: 300 },
  { name: 'Dec', value: 500 },
  { name: 'Jan', value: 700 },
  { name: 'Feb', value: 600 },
  { name: 'Mar', value: 800 }
];

const topQuestions = [
  { question: "What services do you offer?", count: 245 },
  { question: "How much does your product cost?", count: 189 },
  { question: "Can I get a demo?", count: 156 },
  { question: "What are your business hours?", count: 132 },
  { question: "Do you offer support?", count: 98 }
];

const userSources = [
  { source: "Website", percentage: 45 },
  { source: "Mobile App", percentage: 30 },
  { source: "API Integration", percentage: 15 },
  { source: "Other", percentage: 10 }
];

const UsageAnalytics: React.FC<UsageAnalyticsProps> = ({
  tooltips,
  handleExportReport
}) => {
  return (
    <div className="space-y-6">
      <StyledCard>
        <div className="space-y-4">
          <ConfigSection 
            title="Usage Analytics" 
            tooltip="View usage metrics and analytics for your AI assistant"
            className="space-y-4"
          >
            {/* Overview Cards */}
            <div className="grid grid-cols-3 gap-4">
              <StatCard 
                title="Total Conversations" 
                value="1,285" 
                change="12%" 
                isPositive={true} 
              />
              <StatCard 
                title="Total Messages" 
                value="8,432" 
                change="8%" 
                isPositive={true} 
              />
              <StatCard 
                title="Avg. Response Time" 
                value="1.2s" 
                change="15%" 
                isPositive={true} 
              />
            </div>

            {/* Conversation History Chart */}
            <div className="space-y-4 pt-4 border-t border-border">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-comfortaa font-medium text-foreground dark:text-white">Conversation History</h4>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={conversationData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis 
                      dataKey="name" 
                      className="text-xs font-comfortaa text-muted-foreground dark:text-white/70" 
                    />
                    <YAxis 
                      className="text-xs font-comfortaa text-muted-foreground dark:text-white/70" 
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'var(--background)', 
                        border: '1px solid var(--border)',
                        borderRadius: '0.5rem',
                        color: 'var(--foreground)'
                      }} 
                    />
                    <Bar dataKey="value" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Top Questions */}
            <div className="space-y-4 pt-4 border-t border-border">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-comfortaa font-medium text-foreground dark:text-white">Top Questions</h4>
              </div>
              <div className="space-y-2">
                {topQuestions.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-background dark:bg-card/50 border border-border">
                    <span className="font-comfortaa font-light text-foreground dark:text-white">{item.question}</span>
                    <span className="font-comfortaa font-light text-muted-foreground dark:text-white/70">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* User Sources */}
            <div className="space-y-4 pt-4 border-t border-border">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-comfortaa font-medium text-foreground dark:text-white">User Sources</h4>
              </div>
              <div className="space-y-2">
                {userSources.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-background dark:bg-card/50 border border-border">
                    <span className="font-comfortaa font-light text-foreground dark:text-white">{item.source}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-[100px] h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                        <div 
                          className="h-full bg-primary" 
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                      <span className="font-comfortaa font-light text-muted-foreground dark:text-white/70">{item.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Export Report Button */}
            <div className="flex justify-end pt-4 border-t border-border">
              <Button 
                onClick={handleExportReport}
                variant="outline" 
                className="font-comfortaa font-light rounded-xl"
              >
                <FileText className="mr-2 h-4 w-4" />
                Export Report
              </Button>
            </div>
          </ConfigSection>
        </div>
      </StyledCard>
    </div>
  );
};

export default UsageAnalytics;
