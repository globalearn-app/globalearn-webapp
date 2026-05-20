"use client";

import { useState } from "react";
import {
  Settings,
  Bell,
  Shield,
  Palette,
  Globe,
  Mail,
  Save,
  RotateCcw,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function AdminSettingsPage() {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    // General
    siteName: "Global Earn",
    siteDescription: "Professional Crypto & Stock Trading Platform",
    supportEmail: "support@globalearn.com",
    timezone: "UTC",
    
    // Trading
    minDeposit: 100,
    maxDailyWithdrawal: 50000,
    tradingFee: 0.1,
    withdrawalFee: 1,
    
    // Notifications
    emailNotifications: true,
    depositAlerts: true,
    withdrawalAlerts: true,
    kycAlerts: true,
    
    // Security
    twoFactorRequired: false,
    kycRequired: true,
    ipWhitelist: false,
    autoLogout: 30,
    
    // Maintenance
    maintenanceMode: false,
    maintenanceMessage: "We are currently performing scheduled maintenance. Please check back soon.",
  });

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleReset = () => {
    toast({
      title: "Settings reset",
      description: "Settings have been reset to default values.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Configure platform settings and preferences
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid grid-cols-5 w-full max-w-2xl">
          <TabsTrigger value="general" className="gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">General</span>
          </TabsTrigger>
          <TabsTrigger value="trading" className="gap-2">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">Trading</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Alerts</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="gap-2">
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">Appearance</span>
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Basic platform configuration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) =>
                      setSettings({ ...settings, siteName: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supportEmail">Support Email</Label>
                  <Input
                    id="supportEmail"
                    type="email"
                    value={settings.supportEmail}
                    onChange={(e) =>
                      setSettings({ ...settings, supportEmail: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea
                  id="siteDescription"
                  value={settings.siteDescription}
                  onChange={(e) =>
                    setSettings({ ...settings, siteDescription: e.target.value })
                  }
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Timezone</Label>
                <Select
                  value={settings.timezone}
                  onValueChange={(value) =>
                    setSettings({ ...settings, timezone: value })
                  }
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTC">UTC</SelectItem>
                    <SelectItem value="EST">Eastern Time (EST)</SelectItem>
                    <SelectItem value="PST">Pacific Time (PST)</SelectItem>
                    <SelectItem value="GMT">GMT</SelectItem>
                    <SelectItem value="CET">Central European (CET)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Maintenance Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Disable access to the platform for users
                    </p>
                  </div>
                  <Switch
                    checked={settings.maintenanceMode}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, maintenanceMode: checked })
                    }
                  />
                </div>
                {settings.maintenanceMode && (
                  <div className="mt-4 space-y-2">
                    <Label htmlFor="maintenanceMessage">Maintenance Message</Label>
                    <Textarea
                      id="maintenanceMessage"
                      value={settings.maintenanceMessage}
                      onChange={(e) =>
                        setSettings({ ...settings, maintenanceMessage: e.target.value })
                      }
                      rows={3}
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Trading Settings */}
        <TabsContent value="trading">
          <Card>
            <CardHeader>
              <CardTitle>Trading Settings</CardTitle>
              <CardDescription>
                Configure trading limits and fees
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="minDeposit">Minimum Deposit (USD)</Label>
                  <Input
                    id="minDeposit"
                    type="number"
                    value={settings.minDeposit}
                    onChange={(e) =>
                      setSettings({ ...settings, minDeposit: parseFloat(e.target.value) })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxWithdrawal">Max Daily Withdrawal (USD)</Label>
                  <Input
                    id="maxWithdrawal"
                    type="number"
                    value={settings.maxDailyWithdrawal}
                    onChange={(e) =>
                      setSettings({ ...settings, maxDailyWithdrawal: parseFloat(e.target.value) })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tradingFee">Trading Fee (%)</Label>
                  <Input
                    id="tradingFee"
                    type="number"
                    step="0.01"
                    value={settings.tradingFee}
                    onChange={(e) =>
                      setSettings({ ...settings, tradingFee: parseFloat(e.target.value) })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="withdrawalFee">Withdrawal Fee (%)</Label>
                  <Input
                    id="withdrawalFee"
                    type="number"
                    step="0.01"
                    value={settings.withdrawalFee}
                    onChange={(e) =>
                      setSettings({ ...settings, withdrawalFee: parseFloat(e.target.value) })
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure email alerts and notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive email notifications for important events
                  </p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, emailNotifications: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Deposit Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when users make deposits
                  </p>
                </div>
                <Switch
                  checked={settings.depositAlerts}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, depositAlerts: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Withdrawal Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when users request withdrawals
                  </p>
                </div>
                <Switch
                  checked={settings.withdrawalAlerts}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, withdrawalAlerts: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>KYC Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when users submit KYC documents
                  </p>
                </div>
                <Switch
                  checked={settings.kycAlerts}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, kycAlerts: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Configure security and access controls
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Require 2FA for Admins</Label>
                  <p className="text-sm text-muted-foreground">
                    Enforce two-factor authentication for admin accounts
                  </p>
                </div>
                <Switch
                  checked={settings.twoFactorRequired}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, twoFactorRequired: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>KYC Required for Withdrawals</Label>
                  <p className="text-sm text-muted-foreground">
                    Users must complete KYC before making withdrawals
                  </p>
                </div>
                <Switch
                  checked={settings.kycRequired}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, kycRequired: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>IP Whitelist</Label>
                  <p className="text-sm text-muted-foreground">
                    Restrict admin access to whitelisted IPs
                  </p>
                </div>
                <Switch
                  checked={settings.ipWhitelist}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, ipWhitelist: checked })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="autoLogout">Auto Logout (minutes)</Label>
                <Input
                  id="autoLogout"
                  type="number"
                  value={settings.autoLogout}
                  onChange={(e) =>
                    setSettings({ ...settings, autoLogout: parseInt(e.target.value) })
                  }
                  className="w-[200px]"
                />
                <p className="text-sm text-muted-foreground">
                  Automatically log out inactive users after this period
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>
                Customize the look and feel of the platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Primary Color</Label>
                <div className="flex gap-2">
                  {[
                    { name: "Green", class: "bg-green-500" },
                    { name: "Blue", class: "bg-blue-500" },
                    { name: "Purple", class: "bg-purple-500" },
                    { name: "Orange", class: "bg-orange-500" },
                    { name: "Red", class: "bg-red-500" },
                  ].map((color) => (
                    <button
                      key={color.name}
                      className={`h-10 w-10 rounded-lg ${color.class} ring-2 ring-offset-2 ring-offset-background ring-transparent hover:ring-primary transition-all`}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Theme Mode</Label>
                <Select defaultValue="dark">
                  <SelectTrigger className="w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Font Size</Label>
                <Select defaultValue="medium">
                  <SelectTrigger className="w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
