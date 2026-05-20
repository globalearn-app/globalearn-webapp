import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITrade extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  type: "buy" | "sell";
  pair: string;
  baseCurrency: string;
  quoteCurrency: string;
  amount: number;
  price: number;
  total: number;
  fee: number;
  status: "pending" | "completed" | "cancelled" | "failed";
  orderType: "market" | "limit";
  limitPrice?: number;
  executedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const TradeSchema = new Schema<ITrade>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["buy", "sell"],
      required: true,
    },
    pair: {
      type: String,
      required: true,
      uppercase: true,
    },
    baseCurrency: {
      type: String,
      required: true,
      uppercase: true,
    },
    quoteCurrency: {
      type: String,
      required: true,
      uppercase: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    fee: {
      type: Number,
      default: 0,
      min: 0,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled", "failed"],
      default: "pending",
    },
    orderType: {
      type: String,
      enum: ["market", "limit"],
      default: "market",
    },
    limitPrice: {
      type: Number,
    },
    executedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

TradeSchema.index({ userId: 1, createdAt: -1 });
TradeSchema.index({ status: 1 });
TradeSchema.index({ pair: 1 });

const Trade: Model<ITrade> =
  mongoose.models.Trade || mongoose.model<ITrade>("Trade", TradeSchema);

export default Trade;
