"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LoanType, LOAN_TYPES } from "@/lib/types"
import { loanApplicationSchema } from "@/lib/validators"
import { saveApplicationData, saveOfferData } from "@/lib/session-storage"
import { Loader2, ChevronDown } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

export function LoanForm() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        fullName: "",
        phoneNumber: "",
        nationalId: "",
        loanType: "" as LoanType | ""
    })
    const [errors, setErrors] = useState<Record<string, string>>({})

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setErrors({})
        setLoading(true)

        try {
            const validatedData = loanApplicationSchema.parse(formData)
            saveApplicationData(validatedData)

            const response = await fetch("/api/eligibility", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(validatedData)
            })

            const result = await response.json()

            if (result.approved) {
                saveOfferData(result)
                router.push("/offer")
            } else {
                router.push("/rejected")
            }
        } catch (error: any) {
            if (error.errors) {
                const fieldErrors: Record<string, string> = {}
                error.errors.forEach((err: any) => {
                    if (err.path) {
                        fieldErrors[err.path[0]] = err.message
                    }
                })
                setErrors(fieldErrors)
                toast.error("Please check the form for errors")
            } else {
                toast.error("Something went wrong. Please try again.")
            }
            setLoading(false)
        }
    }

    const inputClass = (hasError: boolean) => cn(
        "w-full h-14 px-6 rounded-full border bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100",
        "placeholder:text-gray-400 dark:placeholder:text-gray-500 text-base",
        "transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 dark:focus:border-green-400",
        "disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:cursor-not-allowed",
        hasError 
            ? "border-red-300 dark:border-red-700 focus:border-red-500 focus:ring-red-500/20" 
            : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
    )

    const labelClass = "block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2"

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Full Name */}
            <div>
                <label htmlFor="fullName" className={labelClass}>
                    Full Name <span className="text-red-500">*</span>
                </label>
                <input
                    id="fullName"
                    type="text"
                    placeholder="e.g. John Kamau"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    disabled={loading}
                    required
                    className={inputClass(!!errors.fullName)}
                />
                {errors.fullName && (
                    <p className="text-sm text-red-500 mt-2">{errors.fullName}</p>
                )}
            </div>

            {/* Phone Number */}
            <div>
                <label htmlFor="phoneNumber" className={labelClass}>
                    M-Pesa Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                    id="phoneNumber"
                    type="tel"
                    placeholder="e.g. 0712 345 678"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    disabled={loading}
                    required
                    className={inputClass(!!errors.phoneNumber)}
                />
                {errors.phoneNumber && (
                    <p className="text-sm text-red-500 mt-2">{errors.phoneNumber}</p>
                )}
            </div>

            {/* National ID */}
            <div>
                <label htmlFor="nationalId" className={labelClass}>
                    National ID Number <span className="text-red-500">*</span>
                </label>
                <input
                    id="nationalId"
                    type="text"
                    placeholder="e.g. 12345678"
                    value={formData.nationalId}
                    onChange={(e) => setFormData({ ...formData, nationalId: e.target.value })}
                    disabled={loading}
                    required
                    className={inputClass(!!errors.nationalId)}
                />
                {errors.nationalId && (
                    <p className="text-sm text-red-500 mt-2">{errors.nationalId}</p>
                )}
            </div>

            {/* Loan Type */}
            <div>
                <label htmlFor="loanType" className={labelClass}>
                    Loan Type <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <select
                        id="loanType"
                        value={formData.loanType}
                        onChange={(e) => setFormData({ ...formData, loanType: e.target.value as LoanType })}
                        disabled={loading}
                        required
                        className={cn(
                            inputClass(!!errors.loanType),
                            "appearance-none cursor-pointer pr-10"
                        )}
                    >
                        <option value="" disabled>Select loan type</option>
                        {LOAN_TYPES.map((lt) => (
                            <option key={lt.type} value={lt.type} className="text-gray-900 dark:text-gray-100 dark:bg-gray-900 py-2">
                                {lt.type}
                            </option>
                        ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 dark:text-gray-500">
                        <ChevronDown className="w-5 h-5" />
                    </div>
                </div>
                {errors.loanType && (
                    <p className="text-sm text-red-500 mt-2">{errors.loanType}</p>
                )}
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={loading}
                className={cn(
                    "w-full h-14 rounded-full font-semibold text-white text-lg",
                    "bg-gray-900 hover:bg-gray-800",
                    "focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    "transition-all duration-200",
                    "flex items-center justify-center gap-2",
                    "mt-6"
                )}
            >
                {loading ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Checking...</span>
                    </>
                ) : (
                    "Check Eligibility"
                )}
            </button>
        </form>
    )
}
