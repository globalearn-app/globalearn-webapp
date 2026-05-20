"use client";

import { useState } from "react";
import {
  FileCheck,
  Upload,
  AlertCircle,
  CheckCircle,
  Clock,
  User,
  FileText,
  Camera,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/lib/context/AuthContext";

export default function KYCPage() {
  const { user } = useAuth();
  const [documentType, setDocumentType] = useState("passport");
  const [step, setStep] = useState(1);

  const kycStatus = user?.kycStatus || "pending";

  if (kycStatus === "approved") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">KYC Verification</h1>
          <p className="text-muted-foreground">
            Identity verification status
          </p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-8 text-center">
            <div className="h-20 w-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Verification Complete</h2>
            <p className="text-muted-foreground mb-6">
              Your identity has been verified. You now have full access to all
              platform features including higher withdrawal limits.
            </p>
            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-sm">
              <p className="text-green-500 font-medium">KYC Status: Approved</p>
              <p className="text-muted-foreground">Verified on January 10, 2024</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (kycStatus === "submitted" || kycStatus === "under_review") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">KYC Verification</h1>
          <p className="text-muted-foreground">
            Identity verification status
          </p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-8 text-center">
            <div className="h-20 w-20 rounded-full bg-yellow-500/20 flex items-center justify-center mx-auto mb-6">
              <Clock className="h-10 w-10 text-yellow-500" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Verification In Progress</h2>
            <p className="text-muted-foreground mb-6">
              Your documents are being reviewed by our team. This process usually
              takes 24-48 hours. We&apos;ll notify you once the review is complete.
            </p>
            <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-sm">
              <p className="text-yellow-500 font-medium">KYC Status: Under Review</p>
              <p className="text-muted-foreground">Submitted on January 14, 2024</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">KYC Verification</h1>
        <p className="text-muted-foreground">
          Complete your identity verification to unlock all features
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-4 mb-8">
        {[
          { num: 1, label: "Personal Info" },
          { num: 2, label: "Document" },
          { num: 3, label: "Selfie" },
        ].map((s, index) => (
          <div key={s.num} className="flex items-center">
            <div
              className={`flex items-center gap-2 ${
                step >= s.num ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center font-medium ${
                  step > s.num
                    ? "bg-primary text-primary-foreground"
                    : step === s.num
                    ? "bg-primary/20 text-primary border-2 border-primary"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {step > s.num ? <CheckCircle className="h-5 w-5" /> : s.num}
              </div>
              <span className="hidden sm:inline font-medium">{s.label}</span>
            </div>
            {index < 2 && (
              <div
                className={`w-12 h-0.5 mx-2 ${
                  step > s.num ? "bg-primary" : "bg-border"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileCheck className="h-5 w-5" />
            {step === 1 && "Personal Information"}
            {step === 2 && "Upload Document"}
            {step === 3 && "Take a Selfie"}
          </CardTitle>
          <CardDescription>
            {step === 1 && "Please provide your personal details as they appear on your ID"}
            {step === 2 && "Upload a clear photo of your government-issued ID"}
            {step === 3 && "Take a selfie holding your ID document"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {step === 1 && (
            <>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>First Name</Label>
                  <Input placeholder="John" defaultValue={user?.firstName} />
                </div>
                <div className="space-y-2">
                  <Label>Last Name</Label>
                  <Input placeholder="Doe" defaultValue={user?.lastName} />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Date of Birth</Label>
                <Input type="date" />
              </div>

              <div className="space-y-2">
                <Label>Nationality</Label>
                <Select defaultValue="us">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="ng">Nigeria</SelectItem>
                    <SelectItem value="in">India</SelectItem>
                    <SelectItem value="de">Germany</SelectItem>
                    <SelectItem value="fr">France</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Address</Label>
                <Input placeholder="Street address" />
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>City</Label>
                  <Input placeholder="City" />
                </div>
                <div className="space-y-2">
                  <Label>State/Province</Label>
                  <Input placeholder="State" />
                </div>
                <div className="space-y-2">
                  <Label>Postal Code</Label>
                  <Input placeholder="12345" />
                </div>
              </div>

              <Button className="w-full" onClick={() => setStep(2)}>
                Continue
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <div className="space-y-2">
                <Label>Document Type</Label>
                <Select value={documentType} onValueChange={setDocumentType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="passport">Passport</SelectItem>
                    <SelectItem value="national_id">National ID Card</SelectItem>
                    <SelectItem value="drivers_license">Driver&apos;s License</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Document Number</Label>
                <Input placeholder="Enter document number" />
              </div>

              <div className="space-y-4">
                <Label>Front of Document</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm font-medium mb-1">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG or PDF up to 10MB
                  </p>
                  <input type="file" className="hidden" accept="image/*,.pdf" />
                </div>
              </div>

              {documentType !== "passport" && (
                <div className="space-y-4">
                  <Label>Back of Document</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-sm font-medium mb-1">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG or PDF up to 10MB
                    </p>
                    <input type="file" className="hidden" accept="image/*,.pdf" />
                  </div>
                </div>
              )}

              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <div className="flex gap-3">
                  <AlertCircle className="h-5 w-5 text-blue-500 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium text-blue-500">Tips for a clear photo</p>
                    <ul className="text-muted-foreground mt-1 space-y-1">
                      <li>Make sure all four corners are visible</li>
                      <li>Ensure the document is well-lit and in focus</li>
                      <li>Avoid glare or shadows on the document</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button className="flex-1" onClick={() => setStep(3)}>
                  Continue
                </Button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="space-y-4">
                <Label>Selfie with Document</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Camera className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm font-medium mb-1">
                    Take a selfie holding your ID
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Make sure your face and ID are clearly visible
                  </p>
                  <input type="file" className="hidden" accept="image/*" capture="user" />
                </div>
              </div>

              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <div className="flex gap-3">
                  <AlertCircle className="h-5 w-5 text-blue-500 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium text-blue-500">Selfie requirements</p>
                    <ul className="text-muted-foreground mt-1 space-y-1">
                      <li>Hold your ID next to your face</li>
                      <li>Make sure both your face and the ID are clearly visible</li>
                      <li>Look directly at the camera</li>
                      <li>Ensure good lighting</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button className="flex-1">
                  Submit Verification
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Benefits Section */}
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-base">Benefits of Verification</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="text-center p-4">
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <p className="font-medium">Higher Limits</p>
              <p className="text-sm text-muted-foreground">
                Increased deposit and withdrawal limits
              </p>
            </div>
            <div className="text-center p-4">
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
                <User className="h-6 w-6 text-primary" />
              </div>
              <p className="font-medium">Full Access</p>
              <p className="text-sm text-muted-foreground">
                Access to all trading features
              </p>
            </div>
            <div className="text-center p-4">
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <p className="font-medium">Secure Account</p>
              <p className="text-sm text-muted-foreground">
                Enhanced security for your funds
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
