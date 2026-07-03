import { useState,type  KeyboardEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Loader2 } from 'lucide-react';

interface Props {
  onSend: (message: string) => void;
  isPending: boolean;
}

export function ChatInput({ onSend, isPending }: Props) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim() || isPending) return;
    onSend(input);
    setInput('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex gap-2 items-end p-3 border-t bg-white">
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask about trips, prices, destinations..."
        className="resize-none min-h-[44px] max-h-[120px] text-sm"
        rows={1}
        disabled={isPending}
      />
      <Button
        onClick={handleSend}
        disabled={!input.trim() || isPending}
        size="icon"
        className="flex-shrink-0 bg-emerald-500 hover:bg-emerald-600"
      >
        {isPending
          ? <Loader2 size={18} className="animate-spin" />
          : <Send size={18} />
        }
      </Button>
    </div>
  );
}