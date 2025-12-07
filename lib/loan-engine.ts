import { LoanType, LoanOffer, LOAN_TYPES } from "./types"

const APPROVAL_RATE = 1.0 // 100% approval rate (Rejection logic removed)
const INTEREST_RATE = 10 // 10% interest rate
const REPAYMENT_PERIOD = 30 // 30 days

// Get verification fee from environment variable or use default
const getVerificationFee = (): number => {
    const fee = process.env.VERIFICATION_FEE
    return fee ? parseInt(fee, 10) : 99
}

/**
 * Random loan eligibility engine
 * Returns approval/rejection with random loan amount within type range
 */
export function checkEligibility(loanType: LoanType): LoanOffer {
    console.log("Checking eligibility for:", loanType)

    // Random approval decision
    const isApproved = Math.random() < APPROVAL_RATE

    if (!isApproved) {
        return {
            approved: false
        }
    }

    // Find loan type configuration
    const loanConfig = LOAN_TYPES.find(lt => lt.type === loanType)
    if (!loanConfig) {
        return { approved: false }
    }

    // Generate random amount within range
    const amount = Math.floor(
        Math.random() * (loanConfig.max - loanConfig.min + 1) + loanConfig.min
    )

    // Calculate total repayment
    const interestAmount = (amount * INTEREST_RATE) / 100
    const totalRepayment = amount + interestAmount

    // Generate session ID
    const sessionId = `LOAN-${Date.now()}-${Math.random().toString(36).substring(7)}`

    return {
        approved: true,
        amount,
        loanType,
        interestRate: INTEREST_RATE,
        repaymentPeriod: REPAYMENT_PERIOD,
        totalRepayment,
        verificationFee: getVerificationFee(),
        sessionId
    }
}
