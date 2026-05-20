import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import Wallet from "@/lib/models/Wallet";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { action, email, password, firstName, lastName, phone, country } = body;

    if (action === "register") {
      if (!email || !password || !firstName || !lastName) {
        return NextResponse.json(
          { success: false, message: "All fields are required" },
          { status: 400 }
        );
      }

      const existingUser = await User.findOne({ email: email.toLowerCase() });
      if (existingUser) {
        return NextResponse.json(
          { success: false, message: "Email already registered" },
          { status: 400 }
        );
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = await User.create({
        email: email.toLowerCase(),
        password: hashedPassword,
        firstName,
        lastName,
        phone,
        country,
        role: "user",
        tier: 1,
        isVerified: false,
        isActive: true,
        kycStatus: "pending",
      });

      // Create default wallets
      const defaultCurrencies = [
        { currency: "USD", symbol: "$" },
        { currency: "BTC", symbol: "₿" },
        { currency: "ETH", symbol: "Ξ" },
        { currency: "USDT", symbol: "₮" },
      ];

      await Promise.all(
        defaultCurrencies.map((curr) =>
          Wallet.create({
            userId: user._id,
            currency: curr.currency,
            symbol: curr.symbol,
            balance: 0,
            availableBalance: 0,
            lockedBalance: 0,
          })
        )
      );

      const token = jwt.sign(
        { userId: user._id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      return NextResponse.json({
        success: true,
        message: "Registration successful",
        token,
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          tier: user.tier,
        },
      });
    }

    if (action === "login") {
      if (!email || !password) {
        return NextResponse.json(
          { success: false, message: "Email and password are required" },
          { status: 400 }
        );
      }

      const user = await User.findOne({ email: email.toLowerCase() }).select(
        "+password"
      );

      if (!user) {
        return NextResponse.json(
          { success: false, message: "Invalid credentials" },
          { status: 401 }
        );
      }

      if (!user.isActive) {
        return NextResponse.json(
          { success: false, message: "Account is deactivated" },
          { status: 403 }
        );
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return NextResponse.json(
          { success: false, message: "Invalid credentials" },
          { status: 401 }
        );
      }

      user.lastLogin = new Date();
      await user.save();

      const token = jwt.sign(
        { userId: user._id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      return NextResponse.json({
        success: true,
        message: "Login successful",
        token,
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          tier: user.tier,
          kycStatus: user.kycStatus,
          isVerified: user.isVerified,
        },
      });
    }

    return NextResponse.json(
      { success: false, message: "Invalid action" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
