import { NextRequest, NextResponse } from "next/server"

const isProduction = process.env.NODE_ENV === "production"

export const productionGuard = () => {
  if (isProduction) {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 },
    )
  }
}