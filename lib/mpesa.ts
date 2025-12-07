// M-PESA Daraja API utility functions

export interface MpesaTokenResponse {
    access_token: string
    expires_in: string
}

export interface STKPushRequest {
    phoneNumber: string
    amount: number
    accountReference: string
    transactionDesc: string
}

export interface STKPushResponse {
    MerchantRequestID: string
    CheckoutRequestID: string
    ResponseCode: string
    ResponseDescription: string
    CustomerMessage: string
}

export interface CallbackMetadata {
    Item: Array<{
        Name: string
        Value: string | number
    }>
}

export interface MpesaCallbackBody {
    Body: {
        stkCallback: {
            MerchantRequestID: string
            CheckoutRequestID: string
            ResultCode: number
            ResultDesc: string
            CallbackMetadata?: CallbackMetadata
        }
    }
}

/**
 * Get M-PESA access token
 */
export async function getMpesaAccessToken(): Promise<string> {
    const consumerKey = process.env.MPESA_CONSUMER_KEY!
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET!
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')

    const url = process.env.MPESA_ENVIRONMENT === 'production'
        ? 'https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'
        : 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Basic ${auth}`
        }
    })

    if (!response.ok) {
        throw new Error('Failed to get M-PESA access token')
    }

    const data: MpesaTokenResponse = await response.json()
    return data.access_token
}

/**
 * Generate M-PESA password
 */
export function generateMpesaPassword(): { password: string; timestamp: string } {
    const shortCode = process.env.MPESA_SHORTCODE!
    const passkey = process.env.MPESA_PASSKEY!
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14)
    const password = Buffer.from(`${shortCode}${passkey}${timestamp}`).toString('base64')

    return { password, timestamp }
}

/**
 * Format phone number to M-PESA format (254XXXXXXXXX)
 */
export function formatPhoneNumber(phone: string): string {
    // Remove any spaces, dashes, or plus signs
    let cleaned = phone.replace(/[\s\-+]/g, '')
    
    // If starts with 0, replace with 254
    if (cleaned.startsWith('0')) {
        cleaned = '254' + cleaned.slice(1)
    }
    
    // If starts with 254, keep as is
    if (cleaned.startsWith('254')) {
        return cleaned
    }
    
    // If starts with 7 or 1, add 254
    if (cleaned.startsWith('7') || cleaned.startsWith('1')) {
        return '254' + cleaned
    }
    
    return cleaned
}

/**
 * Initiate STK Push
 */
export async function initiateStkPush(request: STKPushRequest): Promise<STKPushResponse> {
    const accessToken = await getMpesaAccessToken()
    const { password, timestamp } = generateMpesaPassword()
    const formattedPhone = formatPhoneNumber(request.phoneNumber)

    const shortCode = process.env.MPESA_SHORTCODE!
    const callbackUrl = process.env.MPESA_CALLBACK_URL!

    const url = process.env.MPESA_ENVIRONMENT === 'production'
        ? 'https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest'
        : 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest'

    const payload = {
        BusinessShortCode: shortCode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: Math.ceil(request.amount), // Ensure integer
        PartyA: formattedPhone,
        PartyB: shortCode,
        PhoneNumber: formattedPhone,
        CallBackURL: callbackUrl,
        AccountReference: request.accountReference,
        TransactionDesc: request.transactionDesc
    }

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })

    if (!response.ok) {
        const errorData = await response.json()
        console.error('STK Push failed:', errorData)
        throw new Error(errorData.errorMessage || 'Failed to initiate STK push')
    }

    const data: STKPushResponse = await response.json()
    return data
}
