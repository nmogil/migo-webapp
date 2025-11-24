'use client'
import { Markdown } from './markdown'

interface StreamdownMarkdownProps {
  content: string
  className?: string
}

export function StreamdownMarkdown({ content, className = '' }: StreamdownMarkdownProps) {
  return (
    <div className={`streamdown-markdown ${className}`}>
      <Markdown content={content} />
    </div>
  )
}

export default StreamdownMarkdown
