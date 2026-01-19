# Third-Party Cookies - Cal.com Integration

## Overview
This document explains how we handle third-party cookies from Cal.com and our privacy-first approach.

## Implementation

### User Consent Mechanism
We've implemented a consent-based loading system for the Cal.com booking calendar:

1. **Lazy Loading**: The calendar component only becomes active when the user scrolls near the contact section
2. **Consent Prompt**: Before loading Cal.com, users see a clear explanation of third-party cookies
3. **User Choice**: Users can:
   - Accept and load the embedded calendar
   - Decline and use the direct Cal.com link instead
   - Use alternative contact methods (email, social media)

### Cookies Used by Cal.com

When users consent to load the calendar, Cal.com sets the following cookies:

| Cookie Name | Purpose | Duration |
|------------|---------|----------|
| `__cf_bm` | Cloudflare bot management | 30 minutes |
| `__Secure-next-auth.csrf-token` | CSRF protection for authentication | Session |
| `__Secure-next-auth.callback-url` | Authentication callback handling | Session |

### Privacy Benefits

1. **No Automatic Loading**: Cookies are never set without user interaction
2. **Clear Communication**: Users understand what cookies are used and why
3. **Alternative Options**: Direct Cal.com link and email contact available
4. **GDPR Compliant**: Explicit consent before third-party content loads

## Technical Implementation

### Component: `cal-embed-lazy.tsx`

```typescript
// Key features:
- IntersectionObserver for viewport detection
- Consent state management
- Conditional rendering based on user choice
- Fallback options for declined consent
```

### User Flow

1. User scrolls to contact section
2. Consent prompt appears (no cookies set yet)
3. User makes a choice:
   - **Accept**: Cal.com loads with cookies
   - **Decline**: Alternative options shown
   - **Direct Link**: Opens Cal.com in new tab

## Future Improvements

Consider these enhancements:

1. **Cookie Consent Management**: Integrate with a full cookie consent platform
2. **Remember Preference**: Store user's consent choice in localStorage
3. **Analytics**: Track consent rates (privacy-respecting)
4. **Alternative Booking**: Consider self-hosted booking solution

## Testing

To test the implementation:

1. Clear browser cookies
2. Navigate to contact section
3. Verify consent prompt appears
4. Test both accept and decline flows
5. Check that cookies only appear after acceptance

## Compliance

This implementation helps with:

- ✅ GDPR (EU)
- ✅ CCPA (California)
- ✅ PECR (UK)
- ✅ General privacy best practices

## Support

For questions about this implementation, contact the development team.
