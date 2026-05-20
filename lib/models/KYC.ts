import mongoose, { Schema, Document, Model } from "mongoose";

export interface IKYC extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  documentType: "passport" | "national_id" | "drivers_license";
  documentNumber: string;
  frontImage: string;
  backImage?: string;
  selfieImage: string;
  dateOfBirth: Date;
  nationality: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  status: "pending" | "under_review" | "approved" | "rejected";
  rejectionReason?: string;
  reviewedBy?: mongoose.Types.ObjectId;
  reviewedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const KYCSchema = new Schema<IKYC>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    documentType: {
      type: String,
      enum: ["passport", "national_id", "drivers_license"],
      required: true,
    },
    documentNumber: {
      type: String,
      required: true,
    },
    frontImage: {
      type: String,
      required: true,
    },
    backImage: {
      type: String,
    },
    selfieImage: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    nationality: {
      type: String,
      required: true,
    },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    status: {
      type: String,
      enum: ["pending", "under_review", "approved", "rejected"],
      default: "pending",
    },
    rejectionReason: {
      type: String,
    },
    reviewedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    reviewedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

KYCSchema.index({ userId: 1 });
KYCSchema.index({ status: 1 });

const KYC: Model<IKYC> =
  mongoose.models.KYC || mongoose.model<IKYC>("KYC", KYCSchema);

export default KYC;
