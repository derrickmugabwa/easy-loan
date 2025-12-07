import { CheckCircle, Calendar, Percent, DollarSign, FileText, User, Phone, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function LoanApprovalPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8 md:py-16">
      <div className="w-full max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-10 md:mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5 text-success" />
            <span className="text-sm font-medium text-success">Application Approved</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3 text-balance">
            Congratulations, Derrick!
          </h1>

          <p className="text-base text-muted-foreground">Your loan offer is ready for disbursement</p>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-10 md:mb-12">
          {/* Loan Offer Card - Left Column */}
          <Card className="border border-border rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-5 h-5 text-success" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground">Loan Offer</h2>
                  <p className="text-xs text-muted-foreground">Your approved loan details</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                  Approved Amount
                </p>
                <p className="text-4xl font-bold text-success">Ksh 8,401</p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-secondary border border-border">
                  <div className="flex items-center justify-center mb-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <p className="text-xl font-bold text-foreground text-center">30</p>
                  <p className="text-xs text-muted-foreground text-center mt-1">Days</p>
                </div>

                <div className="p-3 rounded-xl bg-secondary border border-border">
                  <div className="flex items-center justify-center mb-2">
                    <Percent className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <p className="text-xl font-bold text-foreground text-center">10%</p>
                  <p className="text-xs text-muted-foreground text-center mt-1">Interest</p>
                </div>

                <div className="p-3 rounded-xl bg-secondary border border-border">
                  <div className="flex items-center justify-center mb-2">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <p className="text-xl font-bold text-foreground text-center">Ksh 1</p>
                  <p className="text-xs text-muted-foreground text-center mt-1">Fee</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Application Details Card - Right Column */}
          <Card className="border border-border rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground">Application Details</h2>
                  <p className="text-xs text-muted-foreground">Your submitted information</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-start justify-between gap-3 pb-4 border-b border-border">
                <div className="flex items-start gap-2 flex-1">
                  <FileText className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Tracking ID</p>
                    <p className="text-sm font-medium text-foreground mt-1">LOAN-176508774073...</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start justify-between gap-3 pb-4 border-b border-border">
                <div className="flex items-start gap-2 flex-1">
                  <User className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Full Name</p>
                    <p className="text-sm font-medium text-foreground mt-1">Derrick Mugabwa</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start justify-between gap-3 pb-4 border-b border-border">
                <div className="flex items-start gap-2 flex-1">
                  <Phone className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">M-PESA Number</p>
                    <p className="text-sm font-medium text-foreground mt-1">0719177208</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start justify-between gap-3 pb-4 border-b border-border">
                <div className="flex items-start gap-2 flex-1">
                  <FileText className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">ID Number</p>
                    <p className="text-sm font-medium text-foreground mt-1">6346346</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Briefcase className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Loan Type</p>
                  <p className="text-sm font-medium text-success mt-1">Personal Loan</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Legal Text */}
        <div className="text-center mb-8 md:mb-10">
          <p className="text-sm text-muted-foreground">
            By proceeding, you agree to our{" "}
            <a href="#" className="text-success hover:text-success/80 font-medium transition-colors">
              Terms & Conditions
            </a>{" "}
            and{" "}
            <a href="#" className="text-success hover:text-success/80 font-medium transition-colors">
              Privacy Policy
            </a>
          </p>
        </div>

        {/* CTA Section */}
        <div className="space-y-3 md:space-y-2">
          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold h-11 text-base rounded-lg transition-colors">
            Get Your Loan Now
            <span className="ml-2">→</span>
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            A verification fee of <span className="font-medium">Ksh 1</span> will be charged via M-PESA
          </p>
        </div>
      </div>
    </div>
  )
}
