import React, { useState } from 'react'
import { MagnifyingGlassIcon, ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'
import Header from '@/app/components/header'
import type { ConversationItem } from '@/types/app'
import { APP_INFO } from '@/config'

interface ConversationListProps {
  conversationList: ConversationItem[]
  currConversationId: string
  onSelectConversation: (id: string) => void
  onNewConversation: () => void
  onClose: () => void
}

const formatTime = (timestamp?: number) => {
  if (!timestamp) return ''
  const date = new Date(timestamp * 1000)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const diffMinutes = Math.floor(diff / (1000 * 60))
  const diffHours = Math.floor(diff / (1000 * 60 * 60))
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (diffMinutes < 60) {
    return `${diffMinutes} min ago`
  }
  if (diffHours < 24 && now.getDate() === date.getDate()) {
    return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`
  }
  return `${date.getMonth() + 1}.${date.getDate()}.${date.getFullYear().toString().slice(2)}`
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversationList,
  currConversationId,
  onSelectConversation,
  onNewConversation,
  onClose,
}) => {
  const { t } = useTranslation()
  const [searchText, setSearchText] = useState('')

  const filteredList = conversationList
    .filter(item => item.id !== '-1') // Exclude temporary new chat item
    .filter(item => 
      item.name.toLowerCase().includes(searchText.toLowerCase())
    )

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header 
        title={APP_INFO?.title || 'Migo'} 
        onClose={onClose} 
      />
      
      <div className="flex-1 flex flex-col overflow-hidden max-w-[800px] w-full mx-auto relative">
        {/* Search Bar */}
        <div className="px-4 py-2 bg-white sticky top-0 z-10 border-b border-gray-100">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              className="block w-full rounded-lg border border-gray-200 py-2 pl-10 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 bg-white outline-none"
              placeholder="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto pb-24">
          <div className="flex flex-col">
            {filteredList.map((item) => {
                // const isActive = item.id === currConversationId
                return (
                  <div
                    key={item.id}
                    onClick={() => onSelectConversation(item.id)}
                    className="group flex items-start gap-3 p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="shrink-0 mt-1 p-2 rounded-full bg-blue-50 text-blue-600">
                        <ChatBubbleOvalLeftEllipsisIcon className="h-5 w-5" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline mb-1">
                            <h3 className="text-base font-semibold text-gray-900 truncate pr-2">
                                {item.name}
                            </h3>
                            <span className="text-xs text-gray-400 whitespace-nowrap shrink-0">
                                {formatTime(item.created_at)}
                            </span>
                        </div>
                        <p className="text-sm text-gray-500 line-clamp-2">
                            {item.introduction || (item.inputs ? Object.values(item.inputs).join(' ') : '') || t('app.chat.newChatDefaultName')}
                        </p>
                    </div>
                  </div>
                )
            })}
             
            {filteredList.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                    <p>No conversations found.</p>
                </div>
            )}
          </div>
        </div>

        {/* Bottom Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-sm border-t border-gray-100">
            <button
                onClick={onNewConversation}
                className="w-full flex items-center justify-center gap-2 bg-[#1C1C1E] hover:bg-gray-800 text-white font-medium py-3.5 px-4 rounded-lg shadow-sm transition-colors duration-200"
            >
                Start new conversation
            </button>
        </div>
      </div>
    </div>
  )
}

export default ConversationList
