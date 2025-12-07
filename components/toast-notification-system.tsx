"use client"

import { useEffect, useRef } from "react"
import { generateRandomToast, getRandomToastInterval } from "@/lib/toast-generator"
import { formatCurrency } from "@/lib/utils"
import { toast } from "sonner"

export function ToastNotificationSystem() {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        const showRandomToast = () => {
            const notification = generateRandomToast()

            toast.success(
                `${notification.name} (${notification.phone}) received ${formatCurrency(notification.amount)}`,
                {
                    description: `${notification.loanType} Loan`,
                    duration: 4000,
                }
            )

            const nextInterval = getRandomToastInterval()
            timeoutRef.current = setTimeout(showRandomToast, nextInterval)
        }

        const initialDelay = getRandomToastInterval()
        timeoutRef.current = setTimeout(showRandomToast, initialDelay)

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [])

    return null
}
