import mongoose, { Schema, Document, Model } from "mongoose";

export interface IWithdrawal extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  currency: string;
  amount: number;
  amountUSD: number;
  fee: number;
  netAmount: number;
  method: "crypto" | "bank";
  status: "pending" | "processing" | "completed" | "rejected";
  walletAddress?: string;
  network?: string;
  txHash?: string;
  bankDetails?: {
    bankName: string;
    accountNumber: string;
    accountName: string;
    swiftCode?: string;
    routingNumber?: string;
  };
  adminNote?: string;
  processedAt?: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const WithdrawalSchema = new Schema<IWithdrawal>(
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
    fee: {
      type: Number,
      default: 0,
      min: 0,
    },
    netAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    method: {
      type: String,
      enum: ["crypto", "bank"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "completed", "rejected"],
      default: "pending",
    },
    walletAddress: {
      type: String,
    },
    network: {
      type: String,
    },
    txHash: {
      type: String,
    },
    bankDetails: {
      bankName: String,
      accountNumber: String,
      accountName: String,
      swiftCode: String,
      routingNumber: String,
    },
    adminNote: {
      type: String,
    },
    processedAt: {
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

WithdrawalSchema.index({ userId: 1, createdAt: -1 });
WithdrawalSchema.index({ status: 1 });

const Withdrawal: Model<IWithdrawal> =
  mongoose.models.Withdrawal ||
  mongoose.model<IWithdrawal>("Withdrawal", WithdrawalSchema);

export default Withdrawal;
