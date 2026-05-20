"use client";

import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Shield,
  Edit,
  Camera,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/context/AuthContext";
import { getTierById } from "@/lib/config/tiers";

export default function ProfilePage() {
  const { user } = useAuth();
  const tier = user?.tier ? getTierById(user.tier) : getTierById(1);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: "+1 234 567 8900",
    country: "United States",
    address: "123 Trading Street, New York, NY 10001",
  });

  const handleSave = () => {
    setIsEditing(false);
    // Save profile logic would go here
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">My Profile</h1>
          <p className="text-muted-foreground">
            Manage your personal information and preferences
          </p>
        </div>
        <Button
          variant={isEditing ? "default" : "outline"}
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
        >
          {isEditing ? "Save Changes" : "Edit Profile"}
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <CardContent className="p-6 text-center">
            <div className="relative inline-block mb-4">
              <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto">
                <span className="text-3xl font-bold text-primary-foreground">
                  {user?.firstName?.[0]}
                  {user?.lastName?.[0]}
                </span>
              </div>
              <button className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-secondary border-2 border-background flex items-center justify-center hover:bg-secondary/80 transition-colors">
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <h2 className="text-xl font-bold">
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="text-sm text-muted-foreground mb-4">{user?.email}</p>

            {/* Tier Badge */}
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${tier?.color} text-white text-sm font-medium`}
            >
              <Shield className="h-4 w-4" />
              {tier?.name} Tier
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-border">
              <div>
                <p className="text-2xl font-bold">{tier?.dailyProfit}%</p>
                <p className="text-xs text-muted-foreground">Daily Profit</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{tier?.duration}</p>
                <p className="text-xs text-muted-foreground">Days Duration</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="pl-10"
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="pl-10"
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="country"
                    value={formData.country}
                    onChange={(e) =>
                      setFormData({ ...formData, country: e.target.value })
                    }
                    className="pl-10"
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  disabled={!isEditing}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Verification Status */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Verification Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                <CheckCircle className="h-8 w-8 text-green-500" />
                <div>
                  <p className="font-medium">Email Verified</p>
                  <p className="text-sm text-muted-foreground">
                    Your email has been verified
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                <CheckCircle className="h-8 w-8 text-green-500" />
                <div>
                  <p className="font-medium">Phone Verified</p>
                  <p className="text-sm text-muted-foreground">
                    Your phone has been verified
                  </p>
                </div>
              </div>

              <div
                className={`flex items-center gap-3 p-4 rounded-lg ${
                  user?.kycStatus === "approved"
                    ? "bg-green-500/10 border border-green-500/30"
                    : "bg-yellow-500/10 border border-yellow-500/30"
                }`}
              >
                {user?.kycStatus === "approved" ? (
                  <CheckCircle className="h-8 w-8 text-green-500" />
                ) : (
                  <AlertCircle className="h-8 w-8 text-yellow-500" />
                )}
                <div>
                  <p className="font-medium">KYC Status</p>
                  <Badge
                    variant={user?.kycStatus === "approved" ? "default" : "secondary"}
                  >
                    {user?.kycStatus || "Pending"}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
