import { LoanOffer } from "./types"

const SESSION_KEY = "loan_application_data"
const OFFER_KEY = "loan_offer_data"

/**
 * Store loan application data in sessionStorage
 */
export function saveApplicationData(data: any): void {
    if (typeof window !== "undefined") {
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(data))
    }
}

/**
 * Retrieve loan application data from sessionStorage
 */
export function getApplicationData(): any | null {
    if (typeof window !== "undefined") {
        const data = sessionStorage.getItem(SESSION_KEY)
        return data ? JSON.parse(data) : null
    }
    return null
}

/**
 * Store loan offer data in sessionStorage
 */
export function saveOfferData(offer: LoanOffer): void {
    if (typeof window !== "undefined") {
        sessionStorage.setItem(OFFER_KEY, JSON.stringify(offer))
    }
}

/**
 * Retrieve loan offer data from sessionStorage
 */
export function getOfferData(): LoanOffer | null {
    if (typeof window !== "undefined") {
        const data = sessionStorage.getItem(OFFER_KEY)
        return data ? JSON.parse(data) : null
    }
    return null
}

/**
 * Clear all loan-related session data
 */
export function clearSessionData(): void {
    if (typeof window !== "undefined") {
        sessionStorage.removeItem(SESSION_KEY)
        sessionStorage.removeItem(OFFER_KEY)
    }
}
