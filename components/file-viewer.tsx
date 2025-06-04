"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { File, Folder, ArrowLeft, Edit, Save, X } from "lucide-react"

interface Repository {
  id: number
  name: string
  full_name: string
}

interface FileItem {
  name: string
  path: string
  type: "file" | "dir"
  size?: number
  download_url?: string
  content?: string
  sha?: string
}

interface FileViewerProps {
  repo: Repository
}

export function FileViewer({ repo }: FileViewerProps) {
  const [contents, setContents] = useState<FileItem[]>([])
  const [currentPath, setCurrentPath] = useState("")
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null)
  const [fileContent, setFileContent] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState("")
  const [commitMessage, setCommitMessage] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchContents(currentPath)
  }, [repo, currentPath])

  const fetchContents = async (path: string) => {
    setLoading(true)
    try {
      const [owner, repoName] = repo.full_name.split("/")
      const response = await fetch(`/api/github/repos/${owner}/${repoName}/contents?path=${path}`)
      if (response.ok) {
        const data = await response.json()
        setContents(Array.isArray(data) ? data : [data])
      }
    } catch (error) {
      console.error("Error fetching contents:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchFileContent = async (file: FileItem) => {
    if (file.type === "file" && file.download_url) {
      try {
        const response = await fetch(file.download_url)
        const content = await response.text()
        setFileContent(content)
        setSelectedFile(file)
      } catch (error) {
        console.error("Error fetching file content:", error)
      }
    }
  }

  const saveFile = async () => {
    if (!selectedFile || !commitMessage.trim()) return

    try {
      const [owner, repoName] = repo.full_name.split("/")
      const encodedContent = btoa(editContent)

      const response = await fetch(`/api/github/repos/${owner}/${repoName}/contents?path=${selectedFile.path}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: commitMessage,
          content: encodedContent,
          sha: selectedFile.sha,
        }),
      })

      if (response.ok) {
        setFileContent(editContent)
        setIsEditing(false)
        setCommitMessage("")
        // Refresh the file to get updated SHA
        await fetchFileContent(selectedFile)
      }
    } catch (error) {
      console.error("Error saving file:", error)
    }
  }

  const navigateToFolder = (folderPath: string) => {
    setCurrentPath(folderPath)
    setSelectedFile(null)
    setFileContent("")
  }

  const goBack = () => {
    const pathParts = currentPath.split("/").filter(Boolean)
    pathParts.pop()
    setCurrentPath(pathParts.join("/"))
    setSelectedFile(null)
    setFileContent("")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>{repo.name}</span>
            {currentPath && (
              <>
                <span className="text-gray-400">/</span>
                <span className="text-sm text-gray-600">{currentPath}</span>
              </>
            )}
          </div>
          {currentPath && (
            <Button variant="outline" size="sm" onClick={goBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
          </div>
        ) : selectedFile ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{selectedFile.name}</h3>
              <div className="flex gap-2">
                {!isEditing ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setIsEditing(true)
                      setEditContent(fileContent)
                    }}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setIsEditing(false)
                        setEditContent("")
                        setCommitMessage("")
                      }}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                    <Button size="sm" onClick={saveFile} disabled={!commitMessage.trim()}>
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  </>
                )}
              </div>
            </div>

            {isEditing && (
              <div className="space-y-2">
                <Input
                  placeholder="Commit message"
                  value={commitMessage}
                  onChange={(e) => setCommitMessage(e.target.value)}
                />
              </div>
            )}

            <ScrollArea className="h-96 border rounded-md">
              {isEditing ? (
                <Textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="min-h-96 font-mono text-sm border-0 resize-none"
                />
              ) : (
                <pre className="p-4 text-sm font-mono whitespace-pre-wrap">{fileContent}</pre>
              )}
            </ScrollArea>
          </div>
        ) : (
          <ScrollArea className="h-96">
            <div className="space-y-1">
              {contents.map((item) => (
                <div
                  key={item.path}
                  className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
                  onClick={() => {
                    if (item.type === "dir") {
                      navigateToFolder(item.path)
                    } else {
                      fetchFileContent(item)
                    }
                  }}
                >
                  {item.type === "dir" ? (
                    <Folder className="h-4 w-4 text-blue-500" />
                  ) : (
                    <File className="h-4 w-4 text-gray-500" />
                  )}
                  <span className="text-sm">{item.name}</span>
                  {item.size && (
                    <span className="text-xs text-gray-500 ml-auto">{(item.size / 1024).toFixed(1)} KB</span>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  )
}
