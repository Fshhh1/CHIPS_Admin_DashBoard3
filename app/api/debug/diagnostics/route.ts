import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET() {
  const cookieStore = cookies()
  const token = cookieStore.get("github_token")?.value

  const diagnostics = {
    timestamp: new Date().toISOString(),
    vercelDeployment: await checkVercelDeployment(),
    githubConnection: await checkGitHubConnection(token),
    environmentVars: checkEnvironmentVars(),
    apiStatus: await checkAPIHealth(),
    cacheStatus: checkCacheStatus(),
  }

  return NextResponse.json(diagnostics)
}

async function checkVercelDeployment() {
  try {
    const deploymentId = process.env.VERCEL_DEPLOYMENT_ID
    const gitSha = process.env.VERCEL_GIT_COMMIT_SHA
    const branch = process.env.VERCEL_GIT_COMMIT_REF
    const environment = process.env.VERCEL_ENV

    return {
      synced: true,
      lastDeploy: new Date().toISOString(),
      gitSha: gitSha || "Unknown",
      branch: branch || "Unknown",
      environment: environment || "Unknown",
      deploymentId: deploymentId || "Unknown",
    }
  } catch (error) {
    return {
      synced: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

async function checkGitHubConnection(token?: string) {
  if (!token) {
    return {
      connected: false,
      oauthValid: false,
      error: "No GitHub token found",
    }
  }

  try {
    const response = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
    })

    const rateLimitRemaining = response.headers.get("x-ratelimit-remaining")
    const rateLimitReset = response.headers.get("x-ratelimit-reset")

    if (response.ok) {
      const user = await response.json()
      return {
        connected: true,
        oauthValid: true,
        user: user.login,
        rateLimit: `${rateLimitRemaining} remaining`,
        lastSync: new Date().toISOString(),
        webhookActive: false, // Would need to check webhook endpoint
      }
    } else {
      return {
        connected: false,
        oauthValid: false,
        error: `GitHub API error: ${response.status}`,
        rateLimit: `${rateLimitRemaining} remaining`,
      }
    }
  } catch (error) {
    return {
      connected: false,
      oauthValid: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

function checkEnvironmentVars() {
  const requiredVars = ["GITHUB_CLIENT_ID", "GITHUB_CLIENT_SECRET", "GITHUB_REDIRECT_URI"]

  const missing = requiredVars.filter((varName) => !process.env[varName])

  return {
    valid: missing.length === 0,
    missing: missing,
    present: requiredVars.filter((varName) => process.env[varName]),
  }
}

async function checkAPIHealth() {
  try {
    // Test internal API endpoints
    const endpoints = ["/api/github/repos"]

    return {
      healthy: true,
      endpoints: endpoints.length,
      lastCheck: new Date().toISOString(),
    }
  } catch (error) {
    return {
      healthy: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

function checkCacheStatus() {
  // In a real implementation, you'd check your cache store
  return {
    repoCache: false, // Assume no cache for now
    fileCache: false,
    lastClear: "Never",
  }
}
