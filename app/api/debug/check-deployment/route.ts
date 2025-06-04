import { NextResponse } from "next/server"

export async function GET() {
  try {
    const deploymentInfo = {
      vercelUrl: process.env.VERCEL_URL,
      vercelEnv: process.env.VERCEL_ENV,
      gitCommitSha: process.env.VERCEL_GIT_COMMIT_SHA,
      gitCommitRef: process.env.VERCEL_GIT_COMMIT_REF,
      gitRepoOwner: process.env.VERCEL_GIT_REPO_OWNER,
      gitRepoSlug: process.env.VERCEL_GIT_REPO_SLUG,
      deploymentId: process.env.VERCEL_DEPLOYMENT_ID,
      region: process.env.VERCEL_REGION,
      timestamp: new Date().toISOString(),
    }

    // Check if deployment is in sync with GitHub
    const isProduction = process.env.VERCEL_ENV === "production"
    const hasGitInfo = !!(deploymentInfo.gitCommitSha && deploymentInfo.gitCommitRef)

    return NextResponse.json({
      ...deploymentInfo,
      isProduction,
      hasGitInfo,
      synced: hasGitInfo,
      status: hasGitInfo ? "synced" : "not-synced",
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
