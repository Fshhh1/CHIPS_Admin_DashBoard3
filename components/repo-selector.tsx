"use client"
import { ScrollArea } from "@/components/ui/scroll-area"
import { GitBranch, ExternalLink } from "lucide-react"

interface Repository {
  id: number
  name: string
  full_name: string
  description: string
  updated_at: string
  html_url: string
}

interface RepoSelectorProps {
  repos: Repository[]
  selectedRepo: Repository | null
  onSelectRepo: (repo: Repository) => void
}

export function RepoSelector({ repos, selectedRepo, onSelectRepo }: RepoSelectorProps) {
  return (
    <ScrollArea className="h-96">
      <div className="space-y-2">
        {repos.map((repo) => (
          <div
            key={repo.id}
            className={`p-3 rounded-lg border cursor-pointer transition-colors ${
              selectedRepo?.id === repo.id ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200 hover:bg-gray-50"
            }`}
            onClick={() => onSelectRepo(repo)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <GitBranch className="h-4 w-4 text-gray-500" />
                  <h3 className="font-medium text-sm truncate">{repo.name}</h3>
                </div>
                {repo.description && <p className="text-xs text-gray-600 mt-1 line-clamp-2">{repo.description}</p>}
                <p className="text-xs text-gray-500 mt-1">Updated {new Date(repo.updated_at).toLocaleDateString()}</p>
              </div>
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 p-1 hover:bg-gray-100 rounded"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="h-3 w-3 text-gray-500" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
