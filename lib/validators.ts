import { z } from "zod"

// Kenyan phone number validation (07XXXXXXXX or 01XXXXXXXX or +2547XXXXXXXX or +2541XXXXXXXX)
export const phoneSchema = z.string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^(\+254|0)[17]\d{8}$/, "Invalid Kenyan phone number format")

// National ID validation (basic - 6-8 digits)
export const nationalIdSchema = z.string()
    .min(6, "National ID must be at least 6 characters")
    .max(8, "National ID must not exceed 8 characters")
    .regex(/^\d+$/, "National ID must contain only numbers")

// Full name validation
export const nameSchema = z.string()
    .min(3, "Name must be at least 3 characters")
    .max(100, "Name must not exceed 100 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name must contain only letters and spaces")

// Loan application form schema
export const loanApplicationSchema = z.object({
    fullName: nameSchema,
    phoneNumber: phoneSchema,
    nationalId: nationalIdSchema,
    loanType: z.enum(["Emergency", "Personal", "Business", "Salary"])
})

export type LoanApplicationFormData = z.infer<typeof loanApplicationSchema>
