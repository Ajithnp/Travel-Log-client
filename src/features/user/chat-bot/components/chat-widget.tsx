import { useEffect, useRef, useState } from 'react';
import { Bot, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatMessage } from './chat-message';
import { ChatInput } from './chat-input';
import { useChat } from '../hooks/ai-chat';

export function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const { messages, sendMessage, isPending, clearChat } = useChat();
    const bottomRef = useRef<HTMLDivElement>(null);
  

    useEffect(() => {
        if (isOpen) {
            bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isOpen]);

    if (!isOpen) {
        return (
            <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-1 pointer-events-none">
               
                <div 
                    onClick={() => setIsOpen(true)}
                    className="bg-white/95 backdrop-blur-sm border border-emerald-100 px-3 py-1.5 rounded-xl shadow-lg text-xs font-semibold text-emerald-800 flex items-center gap-1.5 cursor-pointer pointer-events-auto hover:bg-emerald-50 transition-all duration-200 animate-bounce mb-1 border-b-2"
                >
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>Ask AI Assistant 💬</span>
                </div>
                <button
                    onClick={() => setIsOpen(true)}
                    className="p-4 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 text-white shadow-xl hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center group focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 pointer-events-auto"
                    aria-label="Open AI Assistant"
                >
                    <div className="relative">
                        <Bot size={26} className="group-hover:rotate-12 transition-transform duration-300" />
                        <span className="absolute -top-1.5 -right-1.5 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                    </div>
                </button>
            </div>
        );
    }

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col h-[550px] w-[calc(100vw-32px)] sm:w-[400px]
                    border rounded-2xl shadow-2xl overflow-hidden bg-white transition-all duration-300">

         
            <div className="flex items-center justify-between
                      px-4 py-3 bg-emerald-500 text-white flex-shrink-0">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white/20 rounded-full
                          flex items-center justify-center">
                        <Bot size={18} />
                    </div>
                    <div>
                        <p className="font-semibold text-sm">TravelLog Assistant</p>
                        <p className="text-xs text-emerald-100">
                            {isPending ? 'Typing...' : 'Online'}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-1">
                  
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={clearChat}
                        className="text-white hover:bg-white/20 h-8 w-8"
                        title="Clear chat"
                    >
                        <Trash2 size={16} />
                    </Button>

                   
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsOpen(false)}
                        className="text-white hover:bg-white/20 h-8 w-8"
                        title="Close chat"
                    >
                        <X size={18} />
                    </Button>
                </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                    {messages.map((message) => (
                        <ChatMessage key={message.id} message={message} />
                    ))}

                   
                    {isPending && (
                        <div className="flex gap-2">
                            <div className="w-8 h-8 rounded-full bg-emerald-500
                              flex items-center justify-center flex-shrink-0">
                                <Bot size={16} className="text-white" />
                            </div>
                            <div className="bg-gray-100 rounded-2xl rounded-tl-none px-4 py-3">
                                <div className="flex gap-1 items-center h-4">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                        style={{ animationDelay: '0ms' }} />
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                        style={{ animationDelay: '150ms' }} />
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                        style={{ animationDelay: '300ms' }} />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Auto scroll anchor */}
                    <div ref={bottomRef} />
                </div>
            </ScrollArea>

            <ChatInput onSend={sendMessage} isPending={isPending} />
        </div>
    );
}