import mongoose, { Schema, Document, Model } from "mongoose";

export interface IDeposit extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  currency: string;
  amount: number;
  amountUSD: number;
  method: "crypto" | "bank" | "card";
  status: "pending" | "confirmed" | "completed" | "rejected";
  txHash?: string;
  walletAddress?: string;
  network?: string;
  bankDetails?: {
    bankName: string;
    accountNumber: string;
    accountName: string;
  };
  adminNote?: string;
  confirmedAt?: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const DepositSchema = new Schema<IDeposit>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    currency: {
      type: String,
      required: true,
      uppercase: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    amountUSD: {
      type: Number,
      required: true,
      min: 0,
    },
    method: {
      type: String,
      enum: ["crypto", "bank", "card"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "rejected"],
      default: "pending",
    },
    txHash: {
      type: String,
    },
    walletAddress: {
      type: String,
    },
    network: {
      type: String,
    },
    bankDetails: {
      bankName: String,
      accountNumber: String,
      accountName: String,
    },
    adminNote: {
      type: String,
    },
    confirmedAt: {
      type: Date,
    },
    completedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

DepositSchema.index({ userId: 1, createdAt: -1 });
DepositSchema.index({ status: 1 });

const Deposit: Model<IDeposit> =
  mongoose.models.Deposit || mongoose.model<IDeposit>("Deposit", DepositSchema);

export default Deposit;
