"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

interface TermsModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function TermsModal({ open, onOpenChange }: TermsModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-2xl bg-white dark:bg-gray-900 dark:border-gray-800 p-0 gap-0 max-h-[90vh] flex flex-col">
                <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-200 dark:border-gray-800">
                    <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                        Terms & Conditions
                    </DialogTitle>
                </DialogHeader>
                
                <div className="overflow-y-auto px-6 py-4 scrollbar-thin flex-1">
                    <div className="space-y-4 text-base text-gray-700 dark:text-gray-300">
                        <section>
                            {/* <h3 className="font-bold text-base text-gray-900 dark:text-white mb-2">1. Acceptance of Terms</h3> */}
                            <p>
                                Loan facilities borrowed under this product will be hinged on pre- existing products features.
                                <br /><br />
                                In case of default of the USSD loans; the loan product facility shall be deemed to be in arrears and normal collection Processes shall apply.
                                <br /><br />
                                The maximum loan amount: Ksh 15,000 fee of Ksh. 95 Non-refundable fee is paid by borrower for detail verification
                                <br /><br />
                                Maximum Loan duration: Loan should be repayable in 1 Month (30 Days) from the day of borrowing
                                <br /><br />
                                Loan disbursement: Loan will be disbursed to the MPESA number provided & takes 5-7 working days to be processed.
                            </p>
                        </section>

                        {/* <section>
                            <h3 className="font-bold text-base text-gray-900 dark:text-white mb-2">2. Loan Eligibility</h3>
                            <p className="mb-2">To be eligible for a loan, you must:</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Be at least 18 years of age</li>
                                <li>Be a Kenyan citizen with a valid National ID</li>
                                <li>Have an active M-PESA account</li>
                                <li>Provide accurate and complete information</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="font-bold text-base text-gray-900 dark:text-white mb-2">3. Loan Terms</h3>
                            <p className="mb-2">
                                All loans are subject to approval and verification. Loan amounts, interest rates, and repayment periods are determined based on your application and eligibility assessment.
                            </p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Loan amounts range from KES 1,000 to KES 50,000</li>
                                <li>Interest rates vary by loan type</li>
                                <li>Repayment periods range from 7 to 30 days</li>
                                <li>A verification fee is required before disbursement</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="font-bold text-base text-gray-900 dark:text-white mb-2">4. Verification Fee</h3>
                            <p>
                                A non-refundable verification fee is charged to process your loan application and verify your identity. This fee is paid via M-PESA before loan disbursement.
                            </p>
                        </section>

                        <section>
                            <h3 className="font-bold text-base text-gray-900 dark:text-white mb-2">5. Loan Disbursement</h3>
                            <p>
                                Upon successful verification and payment of the verification fee, your loan will be disbursed directly to your M-PESA account within 5-10 minutes.
                            </p>
                        </section>

                        <section>
                            <h3 className="font-bold text-base text-gray-900 dark:text-white mb-2">6. Repayment</h3>
                            <p className="mb-2">
                                You agree to repay the full loan amount plus applicable interest by the due date specified in your loan agreement. Late payments may incur additional fees.
                            </p>
                        </section>

                        <section>
                            <h3 className="font-bold text-base text-gray-900 dark:text-white mb-2">7. Default and Collections</h3>
                            <p>
                                Failure to repay your loan on time may result in collection activities, reporting to credit bureaus, and legal action. We reserve the right to pursue all available remedies to collect outstanding debts.
                            </p>
                        </section>

                        <section>
                            <h3 className="font-bold text-base text-gray-900 dark:text-white mb-2">8. Privacy and Data Protection</h3>
                            <p>
                                We collect and process your personal information in accordance with our Privacy Policy and applicable data protection laws. Your information is used solely for loan processing and service delivery.
                            </p>
                        </section>

                        <section>
                            <h3 className="font-bold text-base text-gray-900 dark:text-white mb-2">9. Prohibited Activities</h3>
                            <p className="mb-2">You agree not to:</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Provide false or misleading information</li>
                                <li>Use the service for fraudulent purposes</li>
                                <li>Apply for multiple loans simultaneously</li>
                                <li>Share your account credentials with others</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="font-bold text-base text-gray-900 dark:text-white mb-2">10. Limitation of Liability</h3>
                            <p>
                                Easy Loans shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.
                            </p>
                        </section>

                        <section>
                            <h3 className="font-bold text-base text-gray-900 dark:text-white mb-2">11. Changes to Terms</h3>
                            <p>
                                We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of the modified terms.
                            </p>
                        </section>

                        <section>
                            <h3 className="font-bold text-base text-gray-900 dark:text-white mb-2">12. Contact Information</h3>
                            <p>
                                For questions about these terms, please contact us at support@easyloans.co.ke
                            </p>
                        </section> */}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
