import { NextRequest, NextResponse } from 'next/server'
import { initiateStkPush } from '@/lib/mpesa'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { phoneNumber, amount, accountReference, transactionDesc } = body

        // Validate required fields
        if (!phoneNumber || !amount || !accountReference) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        // Validate phone number format
        const phoneRegex = /^(254|0)?[17]\d{8}$/
        const cleanPhone = phoneNumber.replace(/[\s\-+]/g, '')
        if (!phoneRegex.test(cleanPhone)) {
            return NextResponse.json(
                { error: 'Invalid phone number format' },
                { status: 400 }
            )
        }

        // Validate amount
        if (amount <= 0 || amount > 150000) {
            return NextResponse.json(
                { error: 'Invalid amount. Must be between 1 and 150,000' },
                { status: 400 }
            )
        }

        // Initiate STK push
        const response = await initiateStkPush({
            phoneNumber,
            amount,
            accountReference,
            transactionDesc: transactionDesc || 'Loan Verification Fee'
        })

        // Check if STK push was successful
        if (response.ResponseCode === '0') {
            return NextResponse.json({
                success: true,
                message: response.CustomerMessage,
                checkoutRequestId: response.CheckoutRequestID,
                merchantRequestId: response.MerchantRequestID
            })
        } else {
            return NextResponse.json(
                { 
                    success: false,
                    error: response.ResponseDescription || 'STK push failed'
                },
                { status: 400 }
            )
        }

    } catch (error) {
        console.error('STK Push Error:', error)
        return NextResponse.json(
            { 
                success: false,
                error: error instanceof Error ? error.message : 'Failed to initiate payment'
            },
            { status: 500 }
        )
    }
}
