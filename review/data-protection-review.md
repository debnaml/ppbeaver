# Data Protection & Privacy Review — Performance Peak

**Date:** 25 February 2026  
**Scope:** Full review against UK GDPR, PECR, and data protection best practice  
**Severity scale:** 🔴 Critical · 🟠 High · 🟡 Medium · 🟢 Low / Informational

---

## Executive Summary

Performance Peak collects limited personal data (contact form submissions and analytics cookies) and has published privacy, cookies, and terms pages. This is a solid starting position. However, the site currently loads Google Analytics and sets cookies **before obtaining user consent**, which is a direct PECR (Privacy and Electronic Communications Regulations) compliance breach. Several other gaps exist in the privacy policy's coverage and in how personal data is handled in transit and at rest.

---

## 1. No Cookie Consent Mechanism ✅ Resolved

**Severity:** 🔴 Critical

### Finding

Google Analytics scripts (including the `_ga` and `_ga_GNTKBV087EC` cookies) are loaded unconditionally in `layout.tsx` on every page load. The only condition checked is whether `GA_MEASUREMENT_ID` is set — there is no consent gate.

Under PECR (applicable in the UK), non-essential cookies require **prior, informed, freely-given consent** before being placed. Analytics cookies are classified as non-essential.

The cookies policy page acknowledges these cookies exist and says "You can block or clear our cookies at any time through your browser settings" — but relying on browser settings does not satisfy the consent requirement.

### Recommendation

1. **Implement a cookie consent banner/modal** that loads before any analytics scripts execute.
2. **Only inject the GA `<Script>` tags after the user has given affirmative consent** (opt-in, not opt-out).
3. Store the consent choice in a cookie (e.g. `pp_cookie_consent`) and check it before loading GA.
4. Provide a mechanism for users to withdraw consent and have their analytics cookies deleted.
5. The consent UI must not use dark patterns (pre-ticked boxes, deceptive button styling, etc.).

---

## 2. Privacy Policy — Incomplete Disclosures ✅ Resolved

**Severity:** 🟠 High

### Finding

The privacy policy (`/privacy`) is missing several mandatory disclosures under UK GDPR Article 13:

| Missing Element                          | Detail                                                                                                                                                                                              |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Data controller identity and contact** | The policy does not name the legal entity (PP Worldwide Ltd, Company Number 15037470) as the data controller, or provide a registered address.                                                      |
| **Lawful basis for processing**          | No mention of which lawful basis applies to each processing activity (likely legitimate interests for analytics, contract performance for contact form).                                            |
| **Data retention periods**               | The policy says data is stored "as long as that engagement requires" and mentions archiving/deleting — but no specific retention periods are stated.                                                |
| **Data subject rights**                  | The policy does not list the full set of rights: access, rectification, erasure, restriction, data portability, objection, and the right to lodge a complaint with the ICO.                         |
| **International transfers**              | Data is processed by Google (US) and Resend (US). The policy does not disclose these international transfers or the safeguards in place (e.g. Standard Contractual Clauses, UK adequacy decisions). |
| **Automated decision-making**            | Should state that no automated decision-making or profiling takes place (if that is the case).                                                                                                      |
| **Third-party processor list**           | Google Analytics and Resend are mentioned contextually but not formally listed as data processors.                                                                                                  |
| **Last updated date**                    | The privacy policy has no "last updated" date (the terms page does, but privacy does not).                                                                                                          |

### Recommendation

Rewrite the privacy policy to include all Article 13 disclosures. A clear, layered approach works well: a summary at the top with links to detailed sections below.

---

## 3. Contact Form — No Explicit Consent or Privacy Notice at Point of Collection ✅ Resolved

**Severity:** 🟠 High

### Finding

The contact form (`ContactModal.tsx`) collects name, company, phone, email, and message. There is no:

- Link to the privacy policy near the form.
- Consent checkbox or statement explaining how the data will be used.
- Confirmation of the lawful basis for processing.
- Indication of who will receive the data or how long it will be retained.

Under UK GDPR, privacy information must be provided "at the time when personal data are obtained" (Article 13).

### Recommendation

1. Add a short privacy notice statement near the form submit button, e.g. _"By submitting this form you agree to our [Privacy Policy](/privacy). We'll use your details to respond to your enquiry and won't share them with third parties."_
2. If relying on consent as the lawful basis (rather than legitimate interests), add a required checkbox.
3. Link to the full privacy policy from within the form.

---

## 4. Email Data Handling — No Encryption at Rest Guarantee

**Severity:** 🟡 Medium

### Finding

Contact form submissions are sent via Resend to `lee@pp-worldwide.com`. Once delivered, the data resides in the recipient's email inbox. The privacy policy mentions "encrypted backups" and "secure tools" but does not specifically address:

- Whether Resend retains a copy of sent emails and for how long.
- Whether the receiving mailbox enforces encryption at rest.
- What the retention/deletion schedule is for enquiry emails.

### Recommendation

1. Review Resend's data processing agreement (DPA) and retention policy — document findings.
2. Confirm the receiving email provider enforces TLS and encryption at rest.
3. Define a clear retention period for enquiry emails (e.g. "deleted after 12 months if no engagement results").
4. Include Resend in the privacy policy's processor disclosure.

---

## 5. Google Analytics — IP Anonymisation and Data Retention

**Severity:** 🟡 Medium

### Finding

The GA configuration in `layout.tsx` includes `anonymize_ip: true`, which is good practice. However:

- `anonymize_ip` is a **legacy Universal Analytics parameter**. In GA4, IP addresses are automatically not stored. Verify the property is GA4 (the `G-` prefix confirms this), in which case the parameter is redundant but harmless.
- The cookies policy states `_ga` lasts "two years" — but there is no mention of the GA data retention setting in the Google Analytics admin panel. By default, GA4 retains user-level data for 2 months (extendable to 14 months).
- No mention of Google Signals — confirm this is disabled to avoid re-identification risk.

### Recommendation

1. Confirm GA4 property settings: data retention period, Google Signals off, advertising features off.
2. Remove the redundant `anonymize_ip` parameter (or keep it for defence-in-depth — harmless either way).
3. Document the GA data retention period in the cookies policy.
4. Consider enabling GA4's consent mode so analytics degrades gracefully when consent is not given.

---

## 6. No Data Processing Agreement (DPA) Disclosure

**Severity:** 🟡 Medium

### Finding

The site uses two third-party data processors:

1. **Google** (Google Analytics) — US-based.
2. **Resend** — US-based email API provider.

The privacy policy does not mention Data Processing Agreements or the safeguards for international data transfers. Under UK GDPR, when personal data is transferred outside the UK, appropriate safeguards (SCCs, adequacy decisions, etc.) must be in place and disclosed.

### Recommendation

1. Execute DPAs with both Google and Resend (Google offers a standard DPA; check Resend's terms for theirs).
2. Disclose in the privacy policy that data is transferred to the US and state the safeguard mechanism.
3. Keep copies of executed DPAs on file.

---

## 7. localStorage Usage — Minor Data Footprint ✅ Resolved

**Severity:** 🟢 Low

### Finding

The hero sequence stores a preference in `localStorage` (`ppb:heroPosterMode`) to remember if the user prefers the static poster. This contains:

```json
{ "value": "poster", "expiresAt": <timestamp> }
```

This is not personal data and does not require consent under PECR (it falls under the "strictly necessary" exemption for user preferences). However, it is not mentioned in the cookies policy.

### Recommendation

Add a brief mention of `localStorage` usage in the cookies policy for transparency, e.g. _"We store a small preference in your browser's local storage to remember your video playback setting. This does not contain personal data and is automatically cleared after 24 hours."_

---

## 8. No Data Breach Notification Plan

**Severity:** 🟢 Low

### Finding

There is no documented process for handling a personal data breach. Under UK GDPR Article 33, a breach must be reported to the ICO within 72 hours if it poses a risk to individuals.

### Recommendation

Create a simple data breach response plan covering:

- How to identify a breach.
- Internal escalation steps.
- ICO notification template and 72-hour deadline.
- Communication plan for affected individuals (if required under Article 34).

---

## 9. Third-Party Fonts — Google Fonts Privacy Consideration

**Severity:** 🟢 Low

### Finding

The site uses `next/font/google` for Syne and Source Sans 3. Next.js's built-in Google Fonts integration **self-hosts** the font files at build time, meaning no requests are sent to Google's servers at runtime. This is privacy-positive and avoids the GDPR concerns that arise when fonts are loaded directly from `fonts.googleapis.com`.

### Recommendation

No action needed — the current approach is correct. Document this decision for future reference in case someone considers switching to a CDN-loaded approach.

---

## 10. Cookies Policy — Technical Accuracy ✅ Resolved

**Severity:** 🟢 Low

### Finding

The cookies policy mentions two specific cookies:

- `_ga` — described as lasting "two years" ✅ (correct for GA4 default)
- `_ga_GNTKBV087EC` — described as "mainly used to stitch together activity from the same session" and "typically resets every two years" ⚠️ (the `_ga_<container-id>` cookie in GA4 does default to 2 years, but the description conflates session-level and persistent behaviour)

The GA measurement ID embedded in the environment is `G-3PBNS7VHKP`, but the cookie suffix referenced is `GNTKBV087EC`. These don't match — the `_ga_` cookie suffix derives from the container/stream ID, so the policy may be referencing the wrong cookie name.

### Recommendation

1. Verify the actual `_ga_` cookie name set by the live site (it should be `_ga_3PBNS7VHKP` or similar based on the measurement ID).
2. Update the cookies policy with the correct cookie name.
3. Clarify the description to distinguish between persistent identification and session stitching.

---

## Summary of Recommendations (Priority Order)

| Priority | Action                                                                                       | Status    |
| -------- | -------------------------------------------------------------------------------------------- | --------- |
| 🔴 1     | Implement a cookie consent mechanism — do not load GA before consent                         | ✅ Done   |
| 🟠 2     | Rewrite privacy policy with all UK GDPR Article 13 mandatory disclosures                     | ✅ Done   |
| 🟠 3     | Add a privacy notice and/or consent mechanism at the point of data collection (contact form) | ✅ Done   |
| 🟡 4     | Review and document Resend's DPA and data retention practices                                | Open      |
| 🟡 5     | Confirm GA4 settings (data retention, Signals off, advertising off)                          | Open      |
| 🟡 6     | Execute and disclose DPAs for Google and Resend; document international transfer safeguards  | ✅ Done\* |
| 🟢 7     | Mention localStorage usage in the cookies policy                                             | ✅ Done   |
| 🟢 8     | Create a data breach notification plan                                                       | Open      |
| 🟢 9     | Verify and correct the `_ga_` cookie name in the cookies policy                              | ✅ Done   |

\*Item 6: International transfers and processor disclosures are now included in the rewritten privacy policy. DPA execution itself is a business/administrative step.
