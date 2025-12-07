export enum LoanType {
    EMERGENCY = "Emergency",
    EDUCATION = "Education",
    CAR = "Car",
    BUSINESS = "Business"
}

export interface LoanTypeConfig {
    type: LoanType
    min: number
    max: number
    description: string
}

export const LOAN_TYPES: LoanTypeConfig[] = [
    {
        type: LoanType.EMERGENCY,
        min: 500,
        max: 5000,
        description: "Quick cash for urgent needs"
    },
    {
        type: LoanType.EDUCATION,
        min: 2000,
        max: 20000,
        description: "For education"
    },
    {
        type: LoanType.BUSINESS,
        min: 5000,
        max: 50000,
        description: "Grow your business venture"
    },
    {
        type: LoanType.CAR,
        min: 3000,
        max: 30000,
        description: "Get a Car"
    }
]

export interface LoanApplication {
    fullName: string
    phoneNumber: string
    nationalId: string
    loanType: LoanType
}

export interface LoanOffer {
    approved: boolean
    amount?: number
    loanType?: LoanType
    interestRate?: number
    repaymentPeriod?: number
    totalRepayment?: number
    verificationFee?: number
    sessionId?: string
}

export enum ApplicationStatus {
    PENDING = "pending",
    APPROVED = "approved",
    REJECTED = "rejected",
    PAYMENT_PENDING = "payment_pending",
    PAYMENT_SUCCESS = "payment_success",
    PAYMENT_FAILED = "payment_failed"
}

export interface PaymentRequest {
    phoneNumber: string
    amount: number
    sessionId: string
}

export interface PaymentCallback {
    ResultCode: number
    ResultDesc: string
    CheckoutRequestID: string
}

export interface ToastNotification {
    name: string
    phone: string
    loanType: LoanType
    amount: number
}
