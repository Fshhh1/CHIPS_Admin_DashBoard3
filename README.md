# CHIPS:// Admin Dashboard

A secure admin dashboard with GitHub integration, built with Next.js 14 and TypeScript.

## Features

- 🔐 Secure token-based authentication
- 📊 Admin dashboard with real-time monitoring
- 🔗 GitHub OAuth integration
- 🛡️ HTTP-only cookie security
- 🎨 Modern UI with Tailwind CSS and shadcn/ui
- 🚀 Built with Next.js 14 App Router

## Quick Start

1. Clone this repository
2. Install dependencies: `npm install`
3. Set up environment variables (see .env.example)
4. Run development server: `npm run dev`

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

\`\`\`
GENESIS_TOKEN=your_secure_genesis_token
ADMIN_ROLE_TOKEN=your_admin_role_token
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_REDIRECT_URI=https://your-domain.vercel.app/api/auth/github
\`\`\`

## Deployment

This project is optimized for deployment on Vercel:

1. Push to GitHub
2. Connect to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy!

## Security

- No sensitive data exposed to client
- HTTP-only cookies for authentication
- Middleware-based route protection
- Server-side token validation

Built with ❤️ using Next.js and Vercel.
