# Waitlist Management System

Staff-facing interface for managing a real-time client queue at a spa. 
Front desk staff use this tool to add clients to the waitlist as they 
request rooms, with updates instantly reflected on the customer-facing 
display screen.

Part of a two-part system — see the companion repo: 
[screenreader-waitlist](https://github.com/aakeohane/screenreader-waitlist)

## Features ✅

- Staff can add clients to the queue in real time
- Entries sync instantly to Google Firestore
- Customer-facing display updates automatically with no refresh required
- Clean, fast UI built for front desk use
- Bundled with Webpack for optimized production output

## Technologies

- JavaScript (vanilla)
- HTML / CSS
- Webpack
- Google Firebase / Firestore

## Getting Started

```bash
npm install
npm run dev    # development build
npm run build  # production build
```

## Final Reflections

This was one of my favorite freelance projects because it solved a real, 
everyday problem for a real client. Building something that staff would 
actually use every day pushed me to think beyond just making it work — 
it had to be fast, simple, and reliable under pressure. Connecting two 
separate interfaces through Firestore in real time and watching them stay 
in sync was genuinely satisfying to pull off.

### Author

[Aaron Keohane](https://aaronkeohane.com)

### Version

1.0.0
