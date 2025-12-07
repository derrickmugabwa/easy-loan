"use client"

import { useState, useMemo, memo } from "react"
import { CheckCircle, Calendar, Percent, Banknote, FileText, User, Phone, Briefcase, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { LoanOffer, LoanApplication } from "@/lib/types"
import { TermsModal } from "./terms-modal"
import { PrivacyModal } from "./privacy-modal"

interface LoanApprovalPageProps {
  offer: LoanOffer
  applicant: LoanApplication
  onPayment: () => void
  processingPayment: boolean
}

export const LoanApprovalPage = memo(function LoanApprovalPage({ offer, applicant, onPayment, processingPayment }: LoanApprovalPageProps) {
  const firstName = useMemo(() => applicant.fullName.split(' ')[0], [applicant.fullName])
  const [showTermsModal, setShowTermsModal] = useState(false)
  const [showPrivacyModal, setShowPrivacyModal] = useState(false)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center px-4 py-6 md:py-12">
      <div className="w-full max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-6 md:mb-8">
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1.5 rounded-full bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
            <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-500" />
            <span className="text-xs font-semibold text-green-700 dark:text-green-400">Application Approved</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2 text-balance">
            Congratulations, {firstName}!
          </h1>

          <p className="text-sm text-gray-600 dark:text-gray-400">Your loan offer is ready for disbursement</p>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
          {/* Loan Offer Card - Left Column */}
          <Card className="border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm bg-white dark:bg-gray-900">
            <CardHeader className="pb-4">
              <div className="flex items-start gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-green-50 dark:bg-green-950 flex items-center justify-center flex-shrink-0">
                  <Banknote className="w-4 h-4 text-green-600 dark:text-green-500" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-gray-900 dark:text-white">Loan Offer</h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Your approved loan details</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div>
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                  Approved Amount
                </p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-500">Ksh {offer.amount?.toLocaleString()}</p>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="p-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-center mb-1">
                    <Calendar className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                  </div>
                  <p className="text-lg font-bold text-gray-900 dark:text-white text-center">{offer.repaymentPeriod}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center">Days</p>
                </div>

                <div className="p-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-center mb-1">
                    <Percent className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                  </div>
                  <p className="text-lg font-bold text-gray-900 dark:text-white text-center">{offer.interestRate}%</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center">Interest</p>
                </div>

                <div className="p-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-center mb-1">
                    <Banknote className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                  </div>
                  <p className="text-lg font-bold text-gray-900 dark:text-white text-center">Ksh {offer.verificationFee}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center">Fee</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Application Details Card - Right Column */}
          <Card className="border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm bg-white dark:bg-gray-900">
            <CardHeader className="pb-4">
              <div className="flex items-start gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-gray-900 dark:text-white">Application Details</h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Your submitted information</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="flex items-start justify-between gap-2 pb-3 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-start gap-2 flex-1">
                  <FileText className="w-3 h-3 text-gray-400 dark:text-gray-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Tracking ID</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mt-0.5 break-all">{offer.sessionId}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start justify-between gap-2 pb-3 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-start gap-2 flex-1">
                  <User className="w-3 h-3 text-gray-400 dark:text-gray-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Full Name</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mt-0.5">{applicant.fullName}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start justify-between gap-2 pb-3 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-start gap-2 flex-1">
                  <Phone className="w-3 h-3 text-gray-400 dark:text-gray-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">M-PESA Number</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mt-0.5">{applicant.phoneNumber}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start justify-between gap-2 pb-3 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-start gap-2 flex-1">
                  <FileText className="w-3 h-3 text-gray-400 dark:text-gray-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">ID Number</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mt-0.5">{applicant.nationalId}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Briefcase className="w-3 h-3 text-gray-400 dark:text-gray-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Loan Type</p>
                  <p className="text-sm font-medium text-green-600 dark:text-green-500 mt-0.5">{offer.loanType || applicant.loanType} Loan</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Legal Text */}
            <div className="text-center mb-4 md:mb-6">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    By proceeding, you agree to our{" "}
                    <button
                        type="button"
                        onClick={(e) => {
                            e.preventDefault()
                            setShowTermsModal(true)
                        }}
                        className="text-green-600 dark:text-green-500 hover:text-green-700 dark:hover:text-green-400 font-medium transition-colors underline-offset-2 hover:underline"
                    >
                        Terms & Conditions
                    </button>{" "}
                    and{" "}
                    <button
                        type="button"
                        onClick={(e) => {
                            e.preventDefault()
                            setShowPrivacyModal(true)
                        }}
                        className="text-green-600 dark:text-green-500 hover:text-green-700 dark:hover:text-green-400 font-medium transition-colors underline-offset-2 hover:underline"
                    >
                        Privacy Policy
                    </button>
                </p>
                {/* <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    No CRB Check. No Guarantors . Disbursed to MPESA . No Paperwork
                </p> */}
            </div>

        {/* Modals */}
                    <TermsModal open={showTermsModal} onOpenChange={setShowTermsModal} />
                    <PrivacyModal open={showPrivacyModal} onOpenChange={setShowPrivacyModal} />

        {/* CTA Section */}
        <div className="space-y-2">
          <Button 
            onClick={onPayment}
            disabled={processingPayment}
            className="w-full bg-gray-900 dark:bg-gray-100 hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-gray-900 font-semibold h-12 text-base rounded-full shadow-sm disabled:opacity-50"
          >
            {processingPayment ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Processing Payment...
              </>
            ) : (
              <>
                Get Your Loan Now
                <span className="ml-2">→</span>
              </>
            )}
          </Button>

          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            A verification fee of <span className="font-semibold text-gray-700 dark:text-gray-300">Ksh {offer.verificationFee}</span> will be charged via M-PESA
          </p>
        </div>
      </div>
    </div>
  )
})
