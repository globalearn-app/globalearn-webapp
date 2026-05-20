import mongoose, { Schema, Document, Model } from "mongoose";

export interface IWallet extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  currency: string;
  symbol: string;
  balance: number;
  availableBalance: number;
  lockedBalance: number;
  address?: string;
  createdAt: Date;
  updatedAt: Date;
}

const WalletSchema = new Schema<IWallet>(
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
    symbol: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      default: 0,
      min: 0,
    },
    availableBalance: {
      type: Number,
      default: 0,
      min: 0,
    },
    lockedBalance: {
      type: Number,
      default: 0,
      min: 0,
    },
    address: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

WalletSchema.index({ userId: 1, currency: 1 }, { unique: true });

const Wallet: Model<IWallet> =
  mongoose.models.Wallet || mongoose.model<IWallet>("Wallet", WalletSchema);

export default Wallet;
