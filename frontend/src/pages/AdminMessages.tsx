import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { adminExtendedAPI } from '../services/api';
import toast, { Toaster } from 'react-hot-toast';
import {
  MessageSquare,
  Search,
  Mail,
  MailOpen,
  Reply,
  Trash2,
  Archive,
  Clock,
  User,
  X,
  Send,
} from 'lucide-react';

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied' | 'archived';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  user_id?: string;
  reply_message?: string;
  replied_at?: string;
  created_at: string;
}

const AdminMessages = () => {
  const { isDarkMode } = useTheme();
  const [messages, setMessages] = useState<Message[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyText, setReplyText] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    filterMessages();
  }, [searchQuery, statusFilter, priorityFilter, messages]);

  const fetchMessages = async () => {
    try {
      const { messages: data } = await adminExtendedAPI.getMessages();
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const filterMessages = () => {
    let filtered = [...messages];

    if (statusFilter !== 'all') {
      filtered = filtered.filter((msg) => msg.status === statusFilter);
    }

    if (priorityFilter !== 'all') {
      filtered = filtered.filter((msg) => msg.priority === priorityFilter);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (msg) =>
          msg.name.toLowerCase().includes(query) ||
          msg.email.toLowerCase().includes(query) ||
          msg.subject.toLowerCase().includes(query) ||
          msg.message.toLowerCase().includes(query)
      );
    }

    setFilteredMessages(filtered);
  };

  const handleStatusChange = async (messageId: string, newStatus: string) => {
    try {
      await adminExtendedAPI.updateMessageStatus(messageId, newStatus);
      setMessages(messages.map((msg) => (msg.id === messageId ? { ...msg, status: newStatus as any } : msg)));
      toast.success(`Message marked as ${newStatus}`);
    } catch (error) {
      toast.error('Failed to update message status');
    }
  };

  const handleReply = async () => {
    if (!selectedMessage || !replyText.trim()) {
      toast.error('Please enter a reply message');
      return;
    }

    setSending(true);
    try {
      await adminExtendedAPI.updateMessageStatus(selectedMessage.id, 'replied', replyText);
      setMessages(
        messages.map((msg) =>
          msg.id === selectedMessage.id
            ? { ...msg, status: 'replied', reply_message: replyText, replied_at: new Date().toISOString() }
            : msg
        )
      );
      toast.success('Reply sent successfully!');
      setSelectedMessage(null);
      setReplyText('');
    } catch (error) {
      toast.error('Failed to send reply');
    } finally {
      setSending(false);
    }
  };

  const handleDelete = async (messageId: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
      await adminExtendedAPI.deleteMessage(messageId);
      setMessages(messages.filter((msg) => msg.id !== messageId));
      toast.success('Message deleted');
      if (selectedMessage?.id === messageId) {
        setSelectedMessage(null);
      }
    } catch (error) {
      toast.error('Failed to delete message');
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'normal':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'low':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'unread':
        return <Mail className="w-4 h-4" />;
      case 'read':
        return <MailOpen className="w-4 h-4" />;
      case 'replied':
        return <Reply className="w-4 h-4" />;
      case 'archived':
        return <Archive className="w-4 h-4" />;
      default:
        return <Mail className="w-4 h-4" />;
    }
  };

  const unreadCount = messages.filter((msg) => msg.status === 'unread').length;

  if (loading) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className={`h-12 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} rounded`}></div>
            <div className={`h-96 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} rounded-xl`}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Toaster position="top-center" />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <MessageSquare className={`w-8 h-8 ${isDarkMode ? 'text-primary-400' : 'text-primary-600'}`} />
            <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Support Messages
            </h1>
            {unreadCount > 0 && (
              <span className="px-3 py-1 bg-red-500 text-white rounded-full text-sm font-semibold">
                {unreadCount} new
              </span>
            )}
          </div>
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
            Manage support requests from users
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                isDarkMode
                  ? 'bg-gray-800 border-gray-700 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-primary-500`}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={`px-4 py-2 rounded-lg border ${
              isDarkMode
                ? 'bg-gray-800 border-gray-700 text-white'
                : 'bg-white border-gray-300 text-gray-900'
            } focus:outline-none focus:ring-2 focus:ring-primary-500`}
          >
            <option value="all">All Status</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
            <option value="archived">Archived</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className={`px-4 py-2 rounded-lg border ${
              isDarkMode
                ? 'bg-gray-800 border-gray-700 text-white'
                : 'bg-white border-gray-300 text-gray-900'
            } focus:outline-none focus:ring-2 focus:ring-primary-500`}
          >
            <option value="all">All Priority</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="normal">Normal</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div className={`rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm overflow-hidden`}>
          {filteredMessages.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className={`w-16 h-16 mx-auto mb-4 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} />
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>No messages found</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredMessages.map((message) => (
                <div
                  key={message.id}
                  className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-750 cursor-pointer transition-colors ${
                    message.status === 'unread' ? 'bg-blue-50 dark:bg-blue-900/10' : ''
                  }`}
                  onClick={() => {
                    setSelectedMessage(message);
                    if (message.status === 'unread') {
                      handleStatusChange(message.id, 'read');
                    }
                  }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        {getStatusIcon(message.status)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className={`font-semibold truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {message.name}
                          </h3>
                          <span className={`px-2 py-0.5 rounded text-xs font-medium border ${getPriorityColor(message.priority)}`}>
                            {message.priority}
                          </span>
                        </div>
                        <p className={`text-sm truncate ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {message.email}
                        </p>
                        <p className={`font-medium mt-1 truncate ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {message.subject}
                        </p>
                        <p className={`text-sm mt-1 line-clamp-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                          {message.message}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                        {new Date(message.created_at).toLocaleDateString()}
                      </span>
                      <div className="flex items-center gap-2">
                        {message.status !== 'archived' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStatusChange(message.id, 'archived');
                            }}
                            className={`p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600`}
                            title="Archive"
                          >
                            <Archive className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(message.id);
                          }}
                          className="p-1 rounded hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`w-full max-w-2xl rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} max-h-[90vh] overflow-y-auto`}>
            <div className={`p-6 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {selectedMessage.subject}
                    </h2>
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(selectedMessage.priority)}`}>
                      {selectedMessage.priority}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm flex-wrap">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                        {selectedMessage.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                        {selectedMessage.email}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                        {new Date(selectedMessage.created_at).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h3 className={`text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Message:
                </h3>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} whitespace-pre-wrap`}>
                  {selectedMessage.message}
                </p>
              </div>

              {selectedMessage.reply_message && (
                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-green-900/20 border border-green-500' : 'bg-green-50 border border-green-200'}`}>
                  <h3 className={`text-sm font-semibold mb-2 ${isDarkMode ? 'text-green-400' : 'text-green-700'}`}>
                    Your Reply:
                  </h3>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} whitespace-pre-wrap`}>
                    {selectedMessage.reply_message}
                  </p>
                  <p className={`text-xs mt-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                    Sent on {new Date(selectedMessage.replied_at!).toLocaleString()}
                  </p>
                </div>
              )}

              {selectedMessage.status !== 'replied' && (
                <div>
                  <h3 className={`text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Reply to this message:
                  </h3>
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your reply here..."
                    rows={4}
                    className={`w-full px-3 py-2 rounded-lg border ${
                      isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-primary-500`}
                  />
                  <button
                    onClick={handleReply}
                    disabled={sending || !replyText.trim()}
                    className="mt-3 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    {sending ? 'Sending...' : 'Send Reply'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMessages;
