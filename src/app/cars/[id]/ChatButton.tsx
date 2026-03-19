'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { MessageCircle, Send } from 'lucide-react'

interface ChatButtonProps {
  carId: string
  sellerId: string
  buyerId: string
  existingConversationId?: string
}

export default function ChatButton({ carId, sellerId, buyerId, existingConversationId }: ChatButtonProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleStartChat = async () => {
    setLoading(true)

    if (existingConversationId) {
      router.push(`/chat/${existingConversationId}`)
      return
    }

    const { data, error } = await supabase
      .from('conversations')
      .insert({ car_id: carId, buyer_id: buyerId, seller_id: sellerId })
      .select()
      .single()

    if (error) {
      console.error('Error creating conversation:', error)
      setLoading(false)
      return
    }

    router.push(`/chat/${data.id}`)
  }

  return (
    <button
      onClick={handleStartChat}
      disabled={loading}
      className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
    >
      {loading ? 'Cargando...' : existingConversationId ? (
        <>
          <MessageCircle className="h-5 w-5" />
          Continuar Chat
        </>
      ) : (
        <>
          <Send className="h-5 w-5" />
          Contactar Vendedor
        </>
      )}
    </button>
  )
}
