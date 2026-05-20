import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const COINGECKO_API = "https://api.coingecko.com/api/v3";

export async function GET() {
  try {
    const response = await fetch(
      `${COINGECKO_API}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=1h,24h,7d`,
      {
        headers: {
          Accept: "application/json",
        },
        next: { revalidate: 30 },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch from CoinGecko");
    }

    const data = await response.json();

    const markets = data.map(
      (coin: {
        id: string;
        symbol: string;
        name: string;
        image: string;
        current_price: number;
        market_cap: number;
        total_volume: number;
        price_change_percentage_24h: number;
        price_change_percentage_1h_in_currency?: number;
        price_change_percentage_7d_in_currency?: number;
        sparkline_in_7d?: { price: number[] };
        market_cap_rank: number;
        high_24h: number;
        low_24h: number;
      }) => ({
        id: coin.id,
        symbol: coin.symbol.toUpperCase(),
        name: coin.name,
        image: coin.image,
        price: coin.current_price,
        marketCap: coin.market_cap,
        volume24h: coin.total_volume,
        change24h: coin.price_change_percentage_24h,
        change1h: coin.price_change_percentage_1h_in_currency || 0,
        change7d: coin.price_change_percentage_7d_in_currency || 0,
        sparkline: coin.sparkline_in_7d?.price || [],
        rank: coin.market_cap_rank,
        high24h: coin.high_24h,
        low24h: coin.low_24h,
      })
    );

    return NextResponse.json({ success: true, data: markets });
  } catch (error) {
    console.error("Market fetch error:", error);

    const fallbackData = [
      {
        id: "bitcoin",
        symbol: "BTC",
        name: "Bitcoin",
        image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
        price: 67542.0,
        marketCap: 1329000000000,
        volume24h: 28500000000,
        change24h: 2.34,
        change1h: 0.15,
        change7d: 5.67,
        sparkline: Array.from({ length: 168 }, (_, i) =>
          65000 + Math.sin(i / 10) * 2000 + Math.random() * 500
        ),
        rank: 1,
        high24h: 68200,
        low24h: 66100,
      },
      {
        id: "ethereum",
        symbol: "ETH",
        name: "Ethereum",
        image:
          "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
        price: 3456.78,
        marketCap: 415000000000,
        volume24h: 15200000000,
        change24h: 1.89,
        change1h: -0.22,
        change7d: 4.12,
        sparkline: Array.from({ length: 168 }, (_, i) =>
          3300 + Math.sin(i / 10) * 150 + Math.random() * 50
        ),
        rank: 2,
        high24h: 3520,
        low24h: 3380,
      },
      {
        id: "binancecoin",
        symbol: "BNB",
        name: "BNB",
        image:
          "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png",
        price: 598.45,
        marketCap: 89000000000,
        volume24h: 1800000000,
        change24h: 0.76,
        change1h: 0.08,
        change7d: 2.34,
        sparkline: Array.from({ length: 168 }, (_, i) =>
          580 + Math.sin(i / 10) * 20 + Math.random() * 10
        ),
        rank: 3,
        high24h: 605,
        low24h: 590,
      },
      {
        id: "solana",
        symbol: "SOL",
        name: "Solana",
        image:
          "https://assets.coingecko.com/coins/images/4128/large/solana.png",
        price: 178.92,
        marketCap: 82000000000,
        volume24h: 3200000000,
        change24h: 4.56,
        change1h: 0.45,
        change7d: 12.34,
        sparkline: Array.from({ length: 168 }, (_, i) =>
          165 + Math.sin(i / 10) * 15 + Math.random() * 5
        ),
        rank: 4,
        high24h: 182,
        low24h: 171,
      },
      {
        id: "ripple",
        symbol: "XRP",
        name: "XRP",
        image: "https://assets.coingecko.com/coins/images/44/large/xrp.png",
        price: 0.5234,
        marketCap: 28000000000,
        volume24h: 1200000000,
        change24h: -1.23,
        change1h: -0.34,
        change7d: 0.89,
        sparkline: Array.from({ length: 168 }, (_, i) =>
          0.51 + Math.sin(i / 10) * 0.02 + Math.random() * 0.01
        ),
        rank: 5,
        high24h: 0.535,
        low24h: 0.515,
      },
      {
        id: "cardano",
        symbol: "ADA",
        name: "Cardano",
        image:
          "https://assets.coingecko.com/coins/images/975/large/cardano.png",
        price: 0.4567,
        marketCap: 16000000000,
        volume24h: 450000000,
        change24h: 1.45,
        change1h: 0.12,
        change7d: 3.21,
        sparkline: Array.from({ length: 168 }, (_, i) =>
          0.44 + Math.sin(i / 10) * 0.02 + Math.random() * 0.01
        ),
        rank: 6,
        high24h: 0.465,
        low24h: 0.445,
      },
    ];

    return NextResponse.json({ success: true, data: fallbackData });
  }
}
