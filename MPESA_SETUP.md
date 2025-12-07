# M-PESA Integration Setup Guide

## Required Environment Variables

Create a `.env.local` file in the root directory and add the following variables:

```env
# M-PESA Daraja API Credentials
MPESA_CONSUMER_KEY=your_consumer_key_here
MPESA_CONSUMER_SECRET=your_consumer_secret_here
MPESA_SHORTCODE=your_business_shortcode_here
MPESA_PASSKEY=your_passkey_here

# Environment (sandbox or production)
MPESA_ENVIRONMENT=sandbox

# Callback URL (must be publicly accessible)
MPESA_CALLBACK_URL=https://yourdomain.com/api/mpesa/callback

# Verification Fee (in KES)
VERIFICATION_FEE=99
```

## How to Get M-PESA Credentials

### 1. Create a Safaricom Developer Account
- Go to https://developer.safaricom.co.ke/
- Sign up for an account
- Verify your email

### 2. Create an App
- Log in to the developer portal
- Click "My Apps" → "Create New App"
- Select "Lipa Na M-PESA Online" (STK Push)
- Fill in the app details

### 3. Get Your Credentials

#### For Sandbox (Testing):
- **Consumer Key**: Found in your app details
- **Consumer Secret**: Found in your app details
- **Business Short Code**: Use `174379` (Safaricom sandbox test shortcode)
- **Passkey**: Use the sandbox passkey provided in the documentation
  - Sandbox Passkey: `bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919`

#### For Production:
- You need to apply for a Paybill or Till Number from Safaricom
- Get approval from Safaricom to use the production API
- Use your actual business shortcode and passkey

### 4. Set Up Callback URL

The callback URL must be:
- **Publicly accessible** (not localhost)
- **HTTPS** (SSL certificate required)

#### Options for Development:
1. **Deploy to Vercel/Netlify** and use the deployed URL
2. **Use ngrok** to expose localhost:
   ```bash
   ngrok http 3000
   # Use the ngrok URL: https://your-id.ngrok.io/api/mpesa/callback
   ```
3. **Use a VPS** with a domain and SSL certificate

## Testing the Integration

### Sandbox Test Numbers
Safaricom provides test phone numbers for sandbox:
- Use any number starting with `254` for testing
- Example: `254708374149`

### Test Flow
1. Click "Get Your Loan Now" button
2. STK push will be sent to the phone number
3. Enter M-PESA PIN: `1234` (sandbox test PIN)
4. Payment will be processed
5. Callback will be received
6. Status will update automatically

## Important Notes

⚠️ **Security**
- Never commit `.env.local` to git
- Keep your credentials secret
- Use environment variables for all sensitive data

⚠️ **Production Checklist**
- [ ] Get Safaricom production approval
- [ ] Set up SSL certificate
- [ ] Configure production callback URL
- [ ] Test with small amounts first
- [ ] Monitor callback logs
- [ ] Implement proper error handling
- [ ] Set up database for payment records

## Verification Fee

The verification fee is configurable via the `VERIFICATION_FEE` environment variable.

**Common values:**
- KES 49 (Low tier)
- KES 99 (Standard - Default)
- KES 199 (Premium)

**To change the fee:**
1. Open `.env.local`
2. Set `VERIFICATION_FEE=49` (or your preferred amount)
3. Restart your development server

The fee must be paid before loan status changes to verified.

## Troubleshooting

### "Failed to get M-PESA access token"
- Check your Consumer Key and Consumer Secret
- Verify you're using the correct environment (sandbox/production)

### "Invalid phone number"
- Phone must be in format: 254XXXXXXXXX
- Must start with 254 (Kenya country code)
- Must be 12 digits total

### "Callback not received"
- Ensure callback URL is publicly accessible
- Check if URL has HTTPS
- Verify the URL is correctly set in environment variables
- Check server logs for incoming requests

### "STK Push timeout"
- User may have cancelled the payment
- Phone may be offline
- M-PESA service may be down
- Check Safaricom status page

## API Endpoints Created

1. **POST /api/mpesa/stk-push**
   - Initiates STK push payment
   - Body: `{ phoneNumber, amount, accountReference, transactionDesc }`

2. **POST /api/mpesa/callback**
   - Receives payment callbacks from Safaricom
   - Stores payment results in memory

3. **GET /api/mpesa/callback?checkoutRequestId=xxx**
   - Check payment status
   - Used for polling payment results

## Next Steps

1. Create `.env.local` file with your credentials
2. Test with sandbox credentials first
3. Deploy to a platform with HTTPS
4. Update callback URL to your deployed URL
5. Test the complete flow
6. Apply for production access when ready

## Support

For M-PESA API issues:
- Safaricom Developer Portal: https://developer.safaricom.co.ke/
- API Documentation: https://developer.safaricom.co.ke/APIs/MpesaExpressSimulate
- Support Email: apisupport@safaricom.co.ke
