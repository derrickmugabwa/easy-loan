import { LoanType, ToastNotification, LOAN_TYPES } from "./types"
import { generateRandomName, maskPhoneNumber } from "./utils"

/**
 * Generates random toast notification data
 */
export function generateRandomToast(): ToastNotification {
    // Random loan type
    const loanTypeConfig = LOAN_TYPES[Math.floor(Math.random() * LOAN_TYPES.length)]

    // Random amount within loan type range
    const amount = Math.floor(
        Math.random() * (loanTypeConfig.max - loanTypeConfig.min + 1) + loanTypeConfig.min
    )

    // Random Kenyan phone number (07XX XXX XXX format)
    // Kenyan mobile prefixes: 0710-0799 (Safaricom), 0700-0709 (Safaricom), 0750-0769 (Airtel), 0110-0119 (Telkom)
    const prefixes = ['071', '072', '073', '074', '075', '076', '077', '078', '079', '070', '071', '075', '076', '011']
    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)]
    const randomSuffix = Math.floor(Math.random() * 10000000).toString().padStart(7, '0')
    const randomPhone = `${randomPrefix}${randomSuffix}`

    return {
        name: generateRandomName(),
        phone: maskPhoneNumber(randomPhone),
        loanType: loanTypeConfig.type,
        amount
    }
}

/**
 * Gets random interval for toast notifications (10-25 seconds)
 */
export function getRandomToastInterval(): number {
    return (10 + Math.random() * 15) * 1000 // 10-25 seconds in milliseconds
}
