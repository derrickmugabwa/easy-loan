import { NextRequest, NextResponse } from 'next/server'
import { MpesaCallbackBody } from '@/lib/mpesa'

// In-memory storage for payment results (for demo purposes)
// In production, you'd use a database
const paymentResults = new Map<string, any>()

export async function POST(request: NextRequest) {
    try {
        const body: MpesaCallbackBody = await request.json()
        
        console.log('M-PESA Callback received:', JSON.stringify(body, null, 2))

        const { stkCallback } = body.Body
        const { 
            MerchantRequestID, 
            CheckoutRequestID, 
            ResultCode, 
            ResultDesc,
            CallbackMetadata 
        } = stkCallback

        // Store the result
        const result: any = {
            merchantRequestId: MerchantRequestID,
            checkoutRequestId: CheckoutRequestID,
            resultCode: ResultCode,
            resultDesc: ResultDesc,
            success: ResultCode === 0,
            timestamp: new Date().toISOString()
        }

        // If payment was successful, extract metadata
        if (ResultCode === 0 && CallbackMetadata) {
            const metadata: any = {}
            CallbackMetadata.Item.forEach(item => {
                metadata[item.Name] = item.Value
            })
            
            result.amount = metadata.Amount
            result.mpesaReceiptNumber = metadata.MpesaReceiptNumber
            result.transactionDate = metadata.TransactionDate
            result.phoneNumber = metadata.PhoneNumber
        }

        // Store in memory (use CheckoutRequestID as key)
        paymentResults.set(CheckoutRequestID, result)

        console.log('Payment result stored:', result)

        // Acknowledge receipt to Safaricom
        return NextResponse.json({
            ResultCode: 0,
            ResultDesc: 'Accepted'
        })

    } catch (error) {
        console.error('Callback processing error:', error)
        
        // Still acknowledge to Safaricom even if there's an error
        return NextResponse.json({
            ResultCode: 0,
            ResultDesc: 'Accepted'
        })
    }
}

// Helper endpoint to check payment status (for frontend polling)
export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const checkoutRequestId = searchParams.get('checkoutRequestId')

    if (!checkoutRequestId) {
        return NextResponse.json(
            { error: 'Missing checkoutRequestId' },
            { status: 400 }
        )
    }

    const result = paymentResults.get(checkoutRequestId)

    if (!result) {
        return NextResponse.json({
            status: 'pending',
            message: 'Payment status not yet received'
        })
    }

    return NextResponse.json({
        status: result.success ? 'success' : 'failed',
        ...result
    })
}
