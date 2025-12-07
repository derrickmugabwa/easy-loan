import { NextRequest, NextResponse } from "next/server"
import { loanApplicationSchema } from "@/lib/validators"
import { checkEligibility } from "@/lib/loan-engine"
import { LoanType } from "@/lib/types"


// In-memory storage for loan offers (cleared on server restart)
const loanOffers = new Map<string, any>()

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        // Validate request data
        const validatedData = loanApplicationSchema.parse(body)

        // Simulate processing time (10-12 seconds for realistic feel)
        const processingTime = Math.floor(Math.random() * 2000) + 10000 // 10-12 seconds
        await new Promise(resolve => setTimeout(resolve, processingTime))

        // Check eligibility using random engine
        const offer = checkEligibility(validatedData.loanType as LoanType)

        // Store in memory if approved
        if (offer.approved && offer.sessionId) {
            loanOffers.set(offer.sessionId, {
                ...offer,
                applicantName: validatedData.fullName,
                phoneNumber: validatedData.phoneNumber,
                timestamp: new Date().toISOString()
            })

            // Auto-cleanup after 30 minutes
            setTimeout(() => {
                loanOffers.delete(offer.sessionId!)
            }, 30 * 60 * 1000)
        }

        return NextResponse.json(offer)
    } catch (error: any) {
        console.error("Eligibility check error:", error)

        if (error.errors) {
            return NextResponse.json(
                { error: "Validation failed", details: error.errors },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}
