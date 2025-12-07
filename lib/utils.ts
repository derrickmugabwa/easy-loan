import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

/**
 * Masks a phone number for privacy
 * Example: 0712345678 -> 07** *** 678
 */
export function maskPhoneNumber(phone: string): string {
    if (!phone || phone.length < 10) return phone
    return `${phone.slice(0, 2)}** *** ${phone.slice(-3)}`
}

/**
 * Masks a national ID for privacy
 * Example: 12345678 -> 123****78
 */
export function maskNationalId(id: string): string {
    if (!id || id.length < 6) return id
    return `${id.slice(0, 3)}****${id.slice(-2)}`
}

/**
 * Formats a number as Kenyan Shillings
 * Example: 5000 -> KES 5,000
 */
export function formatCurrency(amount: number): string {
    return `KES ${amount.toLocaleString()}`
}

/**
 * Generates a random name for toast notifications
 */
export function generateRandomName(): string {
    const firstNames = ["John", "Sarah", "Kevin", "Mary", "David", "Jane", "Peter", "Lucy", "James", "Grace"]
    const lastInitials = ["K.", "M.", "O.", "W.", "N.", "A.", "B.", "C.", "D.", "E."]

    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const lastInitial = lastInitials[Math.floor(Math.random() * lastInitials.length)]

    return `${firstName} ${lastInitial}`
}
