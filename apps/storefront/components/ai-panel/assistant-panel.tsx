"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, X, Sparkles } from "lucide-react"

export function AIAssistantPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [conversation, setConversation] = useState<Array<{role: string, content: string}>>([])

  const handleSendMessage = async () => {
    if (!message.trim()) return

    const userMessage = message
    setMessage("")
    setConversation(prev => [...prev, { role: "user", content: userMessage }])

    // Mock AI response - integrate with your actual AI service
    const responses = {
      general: "I'm your AI store assistant. I can help with product inquiries, store analytics, and customer support.",
      products: "I can help you find products, check inventory, or suggest alternatives.",
      orders: "I can help track orders, process returns, or answer shipping questions.",
      analytics: "I can provide insights on sales performance, customer behavior, and inventory management."
    }

    const response = responses.general // Default response
    
    setConversation(prev => [...prev, { role: "assistant", content: response }])
  }

  return (
    <>
      {/* Floating Action Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg z-50 bg-blue-600 hover:bg-blue-700"
        size="icon"
      >
        <Sparkles className="h-6 w-6" />
      </Button>

      {/* Chat Panel */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-80 md:w-96 h-[500px] shadow-xl z-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="flex items-center gap-2 text-sm md:text-base">
              <MessageCircle className="h-5 w-5" />
              AI Store Assistant
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          
          <CardContent className="space-y-4 h-full flex flex-col p-4">
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto space-y-3">
              {conversation.length === 0 && (
                <div className="text-center text-muted-foreground p-4">
                  <Sparkles className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-sm">Hello! I'm your AI store assistant. How can I help you today?</p>
                </div>
              )}
              
              {conversation.map((msg, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg text-sm ${
                    msg.role === "user" 
                      ? "bg-blue-600 text-white ml-8" 
                      : "bg-gray-100 mr-8"
                  }`}
                >
                  {msg.content}
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask about your store..."
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} className="bg-blue-600 hover:bg-blue-700">
                  Send
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}
