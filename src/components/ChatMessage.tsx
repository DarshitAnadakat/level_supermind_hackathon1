import React from 'react';
import { Message } from '../types';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.role === 'assistant';

  return (
    <div className={`flex gap-4 p-6 ${isBot ? 'bg-gray-50' : 'bg-white'}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 
        ${isBot ? 'bg-purple-600' : 'bg-blue-600'}`}>
        {isBot ? (
          <Bot className="w-5 h-5 text-white" />
        ) : (
          <User className="w-5 h-5 text-white" />
        )}
      </div>
      <div className="flex-1">
        <div className="font-medium mb-1">{isBot ? 'Analytics Assistant' : 'You'}</div>
        <div className="text-gray-700 whitespace-pre-wrap">{message.content}</div>
      </div>
    </div>
  );
}