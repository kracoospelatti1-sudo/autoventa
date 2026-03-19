import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { MessageCircle, Car } from 'lucide-react'

export default async function ChatPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: conversations } = await supabase
    .from('conversations')
    .select(`
      *,
      cars (id, title, image_url, price),
      buyer:profiles!conversations_buyer_id_fkey (id, full_name),
      seller:profiles!conversations_seller_id_fkey (id, full_name)
    `)
    .or(`buyer_id.eq.${user.id},seller_id.eq.${user.id}`)
    .order('created_at', { ascending: false })

  const { data: lastMessages } = conversations?.length
    ? await supabase
        .from('messages')
        .select('conversation_id, content, created_at, sender_id')
        .in('conversation_id', conversations.map(c => c.id))
    : { data: [] }

  const getLastMessage = (convId: string) => {
    const msgs = lastMessages?.filter(m => m.conversation_id === convId) || []
    return msgs.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0]
  }

  const getOtherUser = (conv: any) => {
    return conv.buyer_id === user.id ? conv.seller : conv.buyer
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-blue-100 p-3 rounded-full">
            <MessageCircle className="h-6 w-6 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Mis Conversaciones</h1>
        </div>

        {conversations && conversations.length > 0 ? (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {conversations.map(conv => {
              const otherUser = getOtherUser(conv)
              const lastMsg = getLastMessage(conv.id)
              return (
                <Link key={conv.id} href={`/chat/${conv.id}`} className="flex items-center gap-4 p-4 border-b border-gray-100 hover:bg-gray-50 transition">
                  <div className="bg-gray-200 p-3 rounded-full">
                    <Car className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-gray-900 truncate">{conv.cars?.title || 'Auto'}</p>
                      <span className="text-sm text-gray-500">${conv.cars?.price?.toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{otherUser?.full_name || 'Usuario'}</p>
                    {lastMsg && (
                      <p className="text-sm text-gray-400 truncate mt-1">
                        {lastMsg.sender_id === user.id ? 'Tú: ' : ''}{lastMsg.content}
                      </p>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl">
            <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No tienes conversaciones</p>
            <p className="text-gray-400 mt-2">Contacta a un vendedor para iniciar un chat</p>
            <Link href="/cars" className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              Ver Autos
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
