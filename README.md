
# CHIPS Admin Dashboard Phase 7.4

## Overview
This is the CHIPS Admin Dashboard Phase 7.4 release with Token Gate, CI/CD, README, and Security integrations.

## Installation
1. Clone this repository
2. Install dependencies:
```bash
npm install
```
3. Run the app:
```bash
npm run dev
```

## Usage
- Admin Dashboard available at `/admin_dashboard`
- Token Gate implemented via `/api/token-gate`
- Use the Genesis Token from `.env` file for authentication

## Deployment
Configured for Vercel deployment with GitHub Actions.

## Token Gate
- Token stored in `.env` file (example provided).
- Token validated using `/api/token-gate`.

## Security
- Dependabot (placeholder) configured for future use.
- Secret scanning best practices recommended.
