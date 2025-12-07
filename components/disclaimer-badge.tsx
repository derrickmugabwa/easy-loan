import { AlertTriangle } from "lucide-react"

export function DisclaimerBadge() {
    return (
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-200/60 rounded-full">
            <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
            <span className="text-xs font-medium text-amber-700">
                Demo Only
            </span>
        </div>
    )
}
