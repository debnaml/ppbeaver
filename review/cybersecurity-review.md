# Cybersecurity Review — Performance Peak

**Date:** 25 February 2026  
**Scope:** Full codebase audit of the Performance Peak Next.js website  
**Severity scale:** 🔴 Critical · 🟠 High · 🟡 Medium · 🟢 Low / Informational

---

## Executive Summary

The site has a relatively small attack surface — a single-page marketing site with one API endpoint and no authentication. Several important security hardening measures are missing, however, particularly around HTTP headers, API rate limiting, and secrets management. None of the issues found represent an active, exploitable vulnerability in isolation, but in combination they widen the window for abuse.

---

## 1. Missing Security Headers ✅ Resolved

**Severity:** 🟠 High

### Finding

`next.config.ts` is effectively empty — no custom `headers()` function is defined. This means the following headers are absent from every response:

| Header                                | Purpose                                                                  |
| ------------------------------------- | ------------------------------------------------------------------------ |
| `Content-Security-Policy`             | Prevents XSS, inline script injection, and unauthorised resource loading |
| `Strict-Transport-Security` (HSTS)    | Forces HTTPS, prevents downgrade attacks                                 |
| `X-Content-Type-Options`              | Prevents MIME-type sniffing                                              |
| `X-Frame-Options` / `frame-ancestors` | Prevents clickjacking                                                    |
| `Referrer-Policy`                     | Controls how much referrer data is leaked                                |
| `Permissions-Policy`                  | Restricts browser features (camera, mic, geolocation, etc.)              |
| `X-XSS-Protection`                    | Legacy XSS filter (still useful for older browsers)                      |

### Recommendation

Add a `headers()` function to `next.config.ts` returning all of the above **except HSTS**. A strict CSP is the single most impactful change — it should allowlist only the exact origins in use (self, Google Analytics, Cloudflare Stream, Resend, and Google Fonts).

> ⚠️ **HSTS WARNING — DO NOT ADD WITHOUT EXPLICIT SIGN-OFF**
>
> `Strict-Transport-Security` is effectively irreversible once deployed. Browsers cache the directive for the specified `max-age` (typically 1–2 years) and will refuse all HTTP connections for the entire duration. If HTTPS ever becomes unavailable (expired certificate, hosting migration, DNS change), the site is completely inaccessible to every browser that cached the policy. If `preload` is set and the domain is submitted to the browser preload list, removal takes months because it is compiled into browser source code.
>
> **Never add this header without a dedicated conversation confirming the domain will remain HTTPS-only permanently.**

---

## 2. No Rate Limiting on the Contact API

**Severity:** 🟠 High

### Finding

`/api/contact/route.ts` accepts unlimited POST requests. An attacker could:

- Exhaust the Resend email quota (financial impact and service disruption).
- Use the endpoint as an email relay for spam if `reply_to` is abused.
- Launch a denial-of-service against the API route itself.

The honeypot field is a lightweight anti-bot measure but is trivially bypassed by any targeted attack.

### Recommendation

1. **Add server-side rate limiting** — use an in-memory store (e.g. `lru-cache`) or a middleware like `next-rate-limit` keyed on IP + fingerprint. Suggested limit: 3–5 requests per IP per 10-minute window.
2. **Consider adding a CAPTCHA or challenge token** — the existing "pick the beaver" verification runs entirely client-side and is not validated server-side. An attacker can POST directly to `/api/contact` without completing any challenge.
3. **Add a server-side verification token** — generate a signed token when the client-side challenge is passed and validate it in the API handler to ensure submissions originate from the legitimate form flow.

---

## 3. Client-Only Bot Verification

**Severity:** 🟡 Medium

### Finding

The "Check I'm Human" image-selection challenge in `useContactForm.ts` / `ContactModal.tsx` is purely client-side. The correct answer (`beaver`) is hardcoded in the client bundle and none of the verification state is sent to or validated by the API.

### Recommendation

- Generate a verification token (e.g. a signed JWT with a short TTL) when the user passes the challenge.
- Send the token alongside the form payload.
- Validate the token in `/api/contact/route.ts` before sending the email.
- Alternatively, consider integrating Cloudflare Turnstile (free, privacy-first CAPTCHA).

---

## 4. Exposed API Key in `.env.local`

**Severity:** 🟡 Medium

### Finding

The Resend API key (`re_THtVeuSo_...`) is stored in `.env.local`. While `.env.local` is normally gitignored and not shipped to the browser, the following risks apply:

- There is no `.gitignore` visible in the project root to confirm it is excluded.
- The key appears to be a production key (not a test key prefixed `re_test_`).
- If the key were committed to version control at any point, it would remain in history.

### Recommendation

1. Confirm `.env.local` is in `.gitignore`.
2. Audit the git history for any prior commits containing the key: `git log --all -p -- '.env*'`.
3. Rotate the Resend API key if there is any doubt about prior exposure.
4. Restrict the Resend API key to "send only" scope (no account management permissions) via the Resend dashboard.
5. Consider using a secrets manager (Vercel environment variables, AWS Secrets Manager, etc.) rather than a local dotfile.

---

## 5. No CSRF Protection on the API Endpoint

**Severity:** 🟡 Medium

### Finding

The `POST /api/contact` route does not validate the `Origin` or `Referer` header, nor does it use a CSRF token. Any website could submit a form POST to this endpoint on behalf of a visitor.

### Recommendation

- Check the `Origin` header in the API handler against the expected domain (`www.performancepeak.co.uk`).
- Alternatively, use `SameSite=Strict` cookies with a CSRF token pattern.

---

## 6. Inline Scripts and GA Injection

**Severity:** 🟡 Medium

### Finding

Google Analytics is loaded via an inline `<Script>` tag in `layout.tsx`:

```tsx
gtag("config", "${GA_MEASUREMENT_ID}", { anonymize_ip: true });
```

The measurement ID comes from `NEXT_PUBLIC_GA_ID`, a public environment variable. While this is standard practice, without a Content-Security-Policy, any injected inline script would execute freely.

### Recommendation

- Use a nonce-based CSP (`'nonce-<random>'`) for the GA inline script.
- Move the GA ID into a runtime config rather than embedding it directly in the script string.

---

## 7. Cloudflare Stream Video URLs Are Publicly Accessible

**Severity:** 🟢 Low

### Finding

The hero video sources in `hero/config.ts` use direct Cloudflare Stream download URLs:

```
https://customer-wsmbmuhwgz78t75t.cloudflarestream.com/.../downloads/default.mp4
```

These are publicly accessible and could be directly linked or downloaded by anyone.

### Recommendation

- If bandwidth cost or content protection matters, switch to signed/tokenised Cloudflare Stream URLs with expiry.
- If the videos are purely marketing content, this is acceptable — just be aware they are hotlinkable.

---

## 8. Missing `rel="noopener noreferrer"` on External Links

**Severity:** 🟢 Low

### Finding

The `mailto:` link in `ContactTrigger.tsx` and any future external links should include `rel="noopener noreferrer"` to prevent `window.opener` attacks. Modern browsers handle this by default for `target="_blank"`, but explicit declaration is best practice.

### Recommendation

Add `rel="noopener noreferrer"` to all external-facing `<a>` elements as a blanket policy.

---

## 9. No Subresource Integrity (SRI) on Third-Party Scripts

**Severity:** 🟢 Low

### Finding

The Google Analytics script tag loads `https://www.googletagmanager.com/gtag/js` without an `integrity` attribute. If the CDN were compromised, a tampered script would execute.

### Recommendation

Add `integrity` and `crossOrigin` attributes to the GA `<Script>` tag. Note that Google does not officially support SRI for their tag manager scripts, so consider self-hosting the GA snippet as an alternative.

---

## 10. Email Input Validation Could Be Stricter

**Severity:** 🟢 Low

### Finding

Both client and server validate email with the regex `/^\S+@\S+\.\S+$/`. This allows many invalid addresses through (e.g. `a@b.c`, addresses with special characters in unusual positions). While the server-side sanitisation prevents injection, a stricter regex or library validation would reduce junk submissions.

### Recommendation

Use a more robust email validation approach or library (e.g. `validator.js`), or at minimum tighten the regex (e.g. require 2+ char TLD).

---

## 11. `console.error` Leaks Internal Details

**Severity:** 🟢 Low

### Finding

The API route logs the full error object to `console.error`:

```ts
console.error("Contact form email failed", error);
```

In a serverless environment (Vercel), this is logged to the platform's log stream. While not directly exposed to the client, detailed error objects could contain stack traces, API keys in error messages, or internal service details.

### Recommendation

Log a sanitised message server-side and ensure the Resend SDK error objects do not contain sensitive data before logging.

---

## Summary of Recommendations (Priority Order)

| Priority | Action                                                                                    | Status       |
| -------- | ----------------------------------------------------------------------------------------- | ------------ |
| 🟠 1     | Add comprehensive security headers (CSP, HSTS, X-Frame-Options, etc.) to `next.config.ts` | ✅ Done\*    |
| 🟠 2     | Implement server-side rate limiting on `/api/contact`                                     | Open         |
| 🟡 3     | Add server-side verification (signed token or Turnstile) for the contact form             | Open         |
| 🟡 4     | Add Origin/CSRF validation to the API endpoint                                            | Open         |
| 🟡 5     | Confirm `.env.local` is gitignored; rotate key if needed; restrict API key scope          | Open         |
| 🟡 6     | Add nonce-based CSP for inline GA scripts                                                 | Deferred\*\* |
| 🟢 7     | Consider signed Cloudflare Stream URLs                                                    | Open         |
| 🟢 8     | Add `rel="noopener noreferrer"` to external links                                         | Open         |
| 🟢 9     | Consider SRI or self-hosting for third-party scripts                                      | Open         |
| 🟢 10    | Tighten email validation                                                                  | Open         |
| 🟢 11    | Sanitise server-side error logging                                                        | Open         |

\*CSP is in **Report-Only** mode — monitor browser console for violations, then switch to enforcing. HSTS starts at `max-age=300` (5 min), domain-only, no `includeSubDomains`, no `preload` — step up gradually once verified.

\*\*Item 6: `'unsafe-inline'` is used in `script-src` instead of a nonce for now. A nonce-based approach can be implemented later for tighter security but requires Next.js middleware changes.
