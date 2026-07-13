import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Bot } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function MessageBubble({ message }) {
  const isUser = message.role === 'user';
  if (!message.content && !message.tool_calls?.length) return null;

  return (
    <div className={cn('flex gap-2', isUser ? 'justify-end' : 'justify-start')}>
      {!isUser && (
        <div className="w-6 h-6 rounded-full bg-[#d4a853]/20 border border-[#d4a853]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
          <Bot className="w-3 h-3 text-[#d4a853]" />
        </div>
      )}
      <div className={cn('max-w-[85%]', isUser && 'flex flex-col items-end')}>
        {message.content && (
          <div className={cn(
            'rounded-2xl px-3.5 py-2.5 text-sm',
            isUser
              ? 'bg-[#1e3a5f] text-white rounded-br-sm'
              : 'bg-[#0a0f1e] border border-[#1e3a5f]/50 text-slate-200 rounded-bl-sm'
          )}>
            {isUser ? (
              <p className="leading-relaxed">{message.content}</p>
            ) : (
              <ReactMarkdown
                className="prose prose-sm prose-invert max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
                components={{
                  p: ({ children }) => <p className="my-1 leading-relaxed text-slate-200">{children}</p>,
                  ul: ({ children }) => <ul className="my-1 ml-4 list-disc text-slate-300">{children}</ul>,
                  ol: ({ children }) => <ol className="my-1 ml-4 list-decimal text-slate-300">{children}</ol>,
                  li: ({ children }) => <li className="my-0.5 text-slate-300">{children}</li>,
                  strong: ({ children }) => <strong className="font-semibold text-[#d4a853]">{children}</strong>,
                  h1: ({ children }) => <h1 className="text-base font-bold text-white my-1.5">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-sm font-bold text-white my-1.5">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-sm font-semibold text-[#d4a853] my-1">{children}</h3>,
                  code: ({ children }) => (
                    <code className="px-1 py-0.5 rounded bg-[#1e3a5f]/60 text-[#d4a853] text-xs">{children}</code>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-2 border-[#d4a853]/50 pl-3 my-2 text-slate-400 italic">{children}</blockquote>
                  ),
                  a: ({ children, ...props }) => (
                    <a {...props} target="_blank" rel="noopener noreferrer" className="text-[#d4a853] underline">{children}</a>
                  ),
                }}
              >
                {message.content}
              </ReactMarkdown>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
