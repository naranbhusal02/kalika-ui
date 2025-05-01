'use client'

import { Button } from "@/components/ui/button"
import { ClipboardCopy } from 'lucide-react'

interface CodeBlockProps {
  title?: string;
  language: string;
  content: string;
}

export function CodeBlock({ title, language, content }: CodeBlockProps) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(content)
  }

  return (
    <div className="my-6 rounded-lg overflow-hidden bg-gray-900">
      {title && (
        <div className="px-4 py-2 bg-gray-800 text-gray-200 flex justify-between items-center">
          <span>{title}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            className="text-gray-200 hover:text-white"
          >
            <ClipboardCopy className="h-4 w-4" />
          </Button>
        </div>
      )}
      <pre className="p-4 overflow-x-auto">
        <code className={`language-${language}`}>{content}</code>
      </pre>
    </div>
  )
}

