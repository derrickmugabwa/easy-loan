"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

interface PrivacyModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function PrivacyModal({ open, onOpenChange }: PrivacyModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-2xl bg-white dark:bg-gray-900 dark:border-gray-800 p-0 gap-0 max-h-[90vh] flex flex-col">
                <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-200 dark:border-gray-800">
                    <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                        Privacy Policy
                    </DialogTitle>
                </DialogHeader>
                
                <div className="overflow-y-auto px-6 py-4 scrollbar-thin flex-1">
                    <div className="space-y-4 text-base text-gray-700 dark:text-gray-300">
                        <section>
                            {/* <h3 className="font-bold text-base text-gray-900 dark:text-white mb-2">1. Introduction</h3> */}
                            <p>
                               We care about your privacy, data protection, and confidentiality. This Privacy policy (hereinafter – "Privacy policy") states, what information we collect, for which purposes and means, and what are your rights.
                               <br /><br />
                               When is this Privacy policy applicable?
                               <br /><br />
                               This Privacy policy applies when:
                               <br /><br />
                               You use or have expressed the intention to use any of our Services; You represent a Client (for example as a guarantor, the payer, authorized representative, next of kin etc.) or you have been indicated as the contact person for the Client;
                               <br /><br />
                               You have used our Services in the past and we are required to retain this information;
                               <br /><br />
                               You contact us or visit any of our representative and customer service offices; You visit our website;
                               <br /><br />
                               In any other way provide us with your personal data for any of the data processing purposes set in this Privacy policy.
                            </p>
                        </section>

                        {/* <section>
                            <h3 className="font-bold text-base text-gray-900 dark:text-white mb-2">2. Information We Collect</h3>
                            <p className="mb-2">We collect the following types of information:</p>
                            
                            <h4 className="font-semibold text-gray-900 dark:text-white mt-3 mb-1">Personal Information:</h4>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Full name</li>
                                <li>National ID number</li>
                                <li>M-PESA phone number</li>
                                <li>Loan application details</li>
                            </ul>

                            <h4 className="font-semibold text-gray-900 dark:text-white mt-3 mb-1">Transaction Information:</h4>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Payment history</li>
                                <li>Loan repayment records</li>
                                <li>M-PESA transaction details</li>
                            </ul>

                            <h4 className="font-semibold text-gray-900 dark:text-white mt-3 mb-1">Technical Information:</h4>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>IP address</li>
                                <li>Browser type and version</li>
                                <li>Device information</li>
                                <li>Usage data and analytics</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="font-bold text-base text-gray-900 dark:text-white mb-2">3. How We Use Your Information</h3>
                            <p className="mb-2">We use your information to:</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Process and approve loan applications</li>
                                <li>Verify your identity and eligibility</li>
                                <li>Disburse loans to your M-PESA account</li>
                                <li>Process payments and manage repayments</li>
                                <li>Communicate with you about your loan</li>
                                <li>Prevent fraud and ensure security</li>
                                <li>Comply with legal and regulatory requirements</li>
                                <li>Improve our services and user experience</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="font-bold text-base text-gray-900 dark:text-white mb-2">4. Information Sharing and Disclosure</h3>
                            <p className="mb-2">We may share your information with:</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li><strong>Payment Processors:</strong> Safaricom M-PESA for payment processing</li>
                                <li><strong>Credit Reference Bureaus:</strong> For credit assessment and reporting</li>
                                <li><strong>Legal Authorities:</strong> When required by law or to protect our rights</li>
                                <li><strong>Service Providers:</strong> Third parties who assist in our operations</li>
                            </ul>
                            <p className="mt-2">
                                We do not sell your personal information to third parties.
                            </p>
                        </section>

                        <section>
                            <h3 className="font-bold text-base text-gray-900 dark:text-white mb-2">5. Data Security</h3>
                            <p>
                                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
                            </p>
                        </section>

                        <section>
                            <h3 className="font-bold text-base text-gray-900 dark:text-white mb-2">6. Data Retention</h3>
                            <p>
                                We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, comply with legal obligations, resolve disputes, and enforce our agreements.
                            </p>
                        </section>

                        <section>
                            <h3 className="font-bold text-base text-gray-900 dark:text-white mb-2">7. Your Rights</h3>
                            <p className="mb-2">You have the right to:</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Access your personal information</li>
                                <li>Request correction of inaccurate data</li>
                                <li>Request deletion of your data (subject to legal requirements)</li>
                                <li>Object to processing of your information</li>
                                <li>Withdraw consent at any time</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="font-bold text-base text-gray-900 dark:text-white mb-2">8. Cookies and Tracking</h3>
                            <p>
                                We use cookies and similar tracking technologies to enhance your experience, analyze usage patterns, and improve our services. You can control cookie settings through your browser.
                            </p>
                        </section>

                        <section>
                            <h3 className="font-bold text-base text-gray-900 dark:text-white mb-2">9. Third-Party Links</h3>
                            <p>
                                Our service may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies.
                            </p>
                        </section>

                        <section>
                            <h3 className="font-bold text-base text-gray-900 dark:text-white mb-2">10. Children's Privacy</h3>
                            <p>
                                Our services are not intended for individuals under 18 years of age. We do not knowingly collect personal information from children.
                            </p>
                        </section>

                        <section>
                            <h3 className="font-bold text-base text-gray-900 dark:text-white mb-2">11. Changes to Privacy Policy</h3>
                            <p>
                                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
                            </p>
                        </section>

                        <section>
                            <h3 className="font-bold text-base text-gray-900 dark:text-white mb-2">12. Contact Us</h3>
                            <p className="mb-2">
                                If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:
                            </p>
                            <ul className="list-none space-y-1">
                                <li><strong>Email:</strong> privacy@easyloans.co.ke</li>
                                <li><strong>Phone:</strong> +254 700 000 000</li>
                                <li><strong>Address:</strong> Nairobi, Kenya</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="font-bold text-base text-gray-900 dark:text-white mb-2">13. Compliance</h3>
                            <p>
                                This Privacy Policy complies with the Kenya Data Protection Act, 2019 and other applicable data protection regulations.
                            </p>
                        </section> */}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
