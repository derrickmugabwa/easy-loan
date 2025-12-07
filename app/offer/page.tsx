"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getOfferData, getApplicationData } from "@/lib/session-storage"
import { LoanOffer, LoanApplication } from "@/lib/types"
import { LoanApprovalPage } from "@/components/loan-approval-page"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { 
    Loader2, 
    PartyPopper,
    Banknote,
    ShieldCheck
} from "lucide-react"

export default function OfferPage() {
    const router = useRouter()
    const [offer, setOffer] = useState<LoanOffer | null>(null)
    const [applicant, setApplicant] = useState<LoanApplication | null>(null)
    const [loading, setLoading] = useState(true)
    const [processingPayment, setProcessingPayment] = useState(false)
    const [showSuccessDialog, setShowSuccessDialog] = useState(false)
    const [paymentDetails, setPaymentDetails] = useState<any>(null)

    useEffect(() => {
        const timer = setTimeout(() => {
            const offerData = getOfferData()
            const applicantData = getApplicationData()

            if (!offerData || !offerData.approved) {
                router.push("/")
                return
            }
            setOffer(offerData)
            setApplicant(applicantData)
            setLoading(false)
        }, 1000)

        return () => clearTimeout(timer)
    }, [router])

    const handlePayment = async () => {
        if (!offer || !applicant) return

        setProcessingPayment(true)

        try {
            // Initiate STK Push
            const response = await fetch('/api/mpesa/stk-push', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    phoneNumber: applicant.phoneNumber,
                    amount: offer.verificationFee,
                    accountReference: offer.sessionId || 'LOAN-' + Date.now(),
                    transactionDesc: `Verification Fee - ${offer.loanType} Loan`
                })
            })

            const data = await response.json()

            if (data.success) {
                // STK push sent successfully
                toast.success('Payment request sent!', {
                    description: `Please check your phone (${applicant.phoneNumber}) and enter your M-PESA PIN to complete the payment.`,
                    duration: 8000,
                })
                
                // Poll for payment status
                pollPaymentStatus(data.checkoutRequestId)
            } else {
                toast.error('Payment failed', {
                    description: data.error || 'Unable to initiate payment. Please try again.',
                    duration: 6000,
                })
                setProcessingPayment(false)
            }

        } catch (error) {
            console.error('Payment error:', error)
            toast.error('Payment failed', {
                description: 'Failed to initiate payment. Please check your connection and try again.',
                duration: 6000,
            })
            setProcessingPayment(false)
        }
    }

    const pollPaymentStatus = async (checkoutRequestId: string) => {
        let attempts = 0
        const maxAttempts = 30 // Poll for 60 seconds (30 * 2s)

        const poll = setInterval(async () => {
            attempts++

            try {
                const response = await fetch(`/api/mpesa/callback?checkoutRequestId=${checkoutRequestId}`)
                const data = await response.json()

                if (data.status === 'success') {
                    clearInterval(poll)
                    setProcessingPayment(false)
                    
                    // Store payment details and show success dialog
                    setPaymentDetails(data)
                    setShowSuccessDialog(true)
                    
                    toast.success('Payment successful! 🎉', {
                        description: `Receipt: ${data.mpesaReceiptNumber} • Amount: Ksh ${data.amount}`,
                        duration: 5000,
                    })
                } else if (data.status === 'failed') {
                    clearInterval(poll)
                    setProcessingPayment(false)
                    toast.error('Payment failed', {
                        description: data.resultDesc || 'The payment was not completed. Please try again.',
                        duration: 8000,
                    })
                } else if (attempts >= maxAttempts) {
                    clearInterval(poll)
                    setProcessingPayment(false)
                    toast.warning('Payment timeout', {
                        description: 'Please check your M-PESA messages to confirm if payment was successful.',
                        duration: 8000,
                    })
                }
            } catch (error) {
                console.error('Polling error:', error)
            }
        }, 2000) // Poll every 2 seconds
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                        <Loader2 className="w-6 h-6 text-success animate-spin" />
                    </div>
                    <p className="text-muted-foreground font-medium">Loading your offer...</p>
                </div>
            </div>
        )
    }

    if (!offer || !applicant) return null

    return (
        <>
            <LoanApprovalPage 
                offer={offer}
                applicant={applicant}
                onPayment={handlePayment}
                processingPayment={processingPayment}
            />

            {/* Success Dialog */}
            <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
                <DialogContent className="sm:max-w-md dark:bg-gray-900 dark:border-gray-800">
                    <DialogHeader className="text-center space-y-3">
                        <div className="mx-auto w-16 h-16 rounded-full bg-green-50 dark:bg-green-950 flex items-center justify-center">
                            <PartyPopper className="w-8 h-8 text-green-600 dark:text-green-500" />
                        </div>
                        <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">
                            Your Loan is On The Way! 🎉
                        </DialogTitle>
                        <DialogDescription className="text-sm text-gray-600 dark:text-gray-400">
                            Payment verified successfully. Your loan will be disbursed to your M-PESA account shortly.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-3 py-3">
                        {/* Payment Details */}
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 space-y-2 border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-500 dark:text-gray-400">Receipt Number</span>
                                <span className="font-mono text-xs font-semibold text-gray-900 dark:text-gray-100">
                                    {paymentDetails?.mpesaReceiptNumber}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-500 dark:text-gray-400">Amount Paid</span>
                                <span className="text-xs font-semibold text-green-600 dark:text-green-500">
                                    Ksh {paymentDetails?.amount?.toLocaleString()}
                                </span>
                            </div>
                        </div>

                        {/* Loan Amount */}
                        <div className="bg-green-50 dark:bg-green-950 rounded-xl p-4 text-center border border-green-200 dark:border-green-800">
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Loan Amount</p>
                            <div className="flex items-center justify-center gap-2">
                                <Banknote className="w-5 h-5 text-green-600 dark:text-green-500" />
                                <p className="text-2xl font-bold text-green-600 dark:text-green-500">
                                    Ksh {offer?.amount?.toLocaleString()}
                                </p>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                Expected in 5-10 minutes
                            </p>
                        </div>

                        {/* Info */}
                        <div className="flex items-start gap-2 p-3 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                            <ShieldCheck className="w-4 h-4 text-green-600 dark:text-green-500 mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                                <p className="text-xs font-medium text-gray-900 dark:text-gray-100">
                                    Check your M-PESA messages
                                </p>
                                <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                                    You'll receive a confirmation SMS from M-PESA once the loan is disbursed to {applicant?.phoneNumber}
                                </p>
                            </div>
                        </div>
                    </div>

                    <Button
                        onClick={() => {
                            setShowSuccessDialog(false)
                            router.push('/')
                        }}
                        className="w-full h-11 bg-gray-900 dark:bg-gray-100 hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-gray-900 font-semibold rounded-full transition-all duration-200"
                    >
                        Done
                    </Button>
                </DialogContent>
            </Dialog>
        </>
    )
}
