import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import {
  Bold,
  Italic,
  Underline,
  Highlighter,
  List,
  ListOrdered,
  Indent,
  Outdent,
  Save,
  Trash2,
  Edit,
  Clock,
  FileText,
} from 'lucide-react';
import { notesAPI } from '../services/api';
import toast, { Toaster } from 'react-hot-toast';

interface RichNoteEditorProps {
  summaryId: string;
}

const RichNoteEditor = ({ summaryId }: RichNoteEditorProps) => {
  const { isDarkMode } = useTheme();
  const [content, setContent] = useState('');
  const [highlights, setHighlights] = useState<any[]>([]);
  const [formatting, setFormatting] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#fef08a'); // yellow-200
  const [savedNotes, setSavedNotes] = useState<any[]>([]);
  const [currentNoteId, setCurrentNoteId] = useState<string | null>(null);
  const [showNotesList, setShowNotesList] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  const colors = [
    { name: 'Yellow', value: '#fef08a', class: 'bg-yellow-200' },
    { name: 'Green', value: '#bbf7d0', class: 'bg-green-200' },
    { name: 'Blue', value: '#bfdbfe', class: 'bg-blue-200' },
    { name: 'Pink', value: '#fbcfe8', class: 'bg-pink-200' },
    { name: 'Purple', value: '#e9d5ff', class: 'bg-purple-200' },
    { name: 'Orange', value: '#fed7aa', class: 'bg-orange-200' },
  ];

  useEffect(() => {
    loadNote();
    loadSavedNotes();
  }, [summaryId]);

  const loadNote = async () => {
    try {
      const { note } = await notesAPI.getNote(summaryId);
      if (note) {
        setContent(note.content || '');
        setHighlights(note.highlights || []);
        setFormatting(note.formatting || {});
        if (editorRef.current && note.content) {
          editorRef.current.innerHTML = note.content;
        }
      }
    } catch (error: any) {
      console.error('❌ Note load error:', error.message || error);
    } finally {
      setLoading(false);
    }
  };

  const loadSavedNotes = async () => {
    try {
      const { notes } = await notesAPI.getNotes(summaryId);
      setSavedNotes(notes || []);
    } catch (error: any) {
      console.error('❌ Saved notes error:', error.message || error);
      if (error.message === 'No active session') {
        toast.error('Please log in to access notes');
      }
    }
  };

  const handleSave = async () => {
    if (!content.trim()) {
      toast.error('Note cannot be empty');
      return;
    }

    setSaving(true);
    try {
      await notesAPI.saveNote(summaryId, content, highlights, formatting);
      
      // Clear the editor for a new note
      setContent('');
      setHighlights([]);
      setFormatting({});
      if (editorRef.current) {
        editorRef.current.innerHTML = '';
      }
      setCurrentNoteId(null);
      
      // Show success toast
      toast.success('✅ Note saved successfully!', {
        duration: 3000,
        icon: '💾',
      });
      
      // Reload the notes list
      await loadSavedNotes();
    } catch (error: any) {
      console.error('❌ Save error:', error.message || error);
      if (error.message === 'No active session') {
        toast.error('❌ Please log in to save notes');
      } else {
        toast.error('❌ Failed to save note');
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (noteId?: string) => {
    if (!confirm('Are you sure you want to delete this note?')) return;

    try {
      await notesAPI.deleteNote(noteId || currentNoteId || summaryId);
      if (!noteId) {
        setContent('');
        setHighlights([]);
        setFormatting({});
        setCurrentNoteId(null);
        if (editorRef.current) {
          editorRef.current.innerHTML = '';
        }
      }
      toast.success('🗑️ Note deleted successfully');
      await loadSavedNotes();
    } catch (error) {
      toast.error('Failed to delete note');
    }
  };

  const handleViewNote = (note: any) => {
    setContent(note.content || '');
    setHighlights(note.highlights || []);
    setFormatting(note.formatting || {});
    setCurrentNoteId(note.id);
    if (editorRef.current) {
      editorRef.current.innerHTML = note.content || '';
    }
    setShowNotesList(false);
    toast.success('📝 Note loaded');
  };

  const handleNewNote = () => {
    setContent('');
    setHighlights([]);
    setFormatting({});
    setCurrentNoteId(null);
    if (editorRef.current) {
      editorRef.current.innerHTML = '';
    }
    setShowNotesList(false);
    toast.success('📄 New note created');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  };

  const applyFormatting = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // Handle Tab key for proper indentation
    if (e.key === 'Tab') {
      e.preventDefault();
      if (e.shiftKey) {
        // Shift+Tab: Outdent
        document.execCommand('outdent', false);
      } else {
        // Tab: Indent
        document.execCommand('indent', false);
      }
      if (editorRef.current) {
        setContent(editorRef.current.innerHTML);
      }
    }
  };

  const highlightSelection = () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    if (range.toString().trim() === '') return;

    const span = document.createElement('span');
    span.style.backgroundColor = selectedColor;
    span.style.padding = '2px 0';
    span.style.borderRadius = '2px';
    
    try {
      range.surroundContents(span);
      
      // Save highlight
      const newHighlight = {
        text: range.toString(),
        color: selectedColor,
        timestamp: new Date().toISOString(),
      };
      setHighlights([...highlights, newHighlight]);
      
      if (editorRef.current) {
        setContent(editorRef.current.innerHTML);
      }
      
      selection.removeAllRanges();
      toast.success('Text highlighted!');
    } catch (error) {
      console.error('Error highlighting:', error);
      toast.error('Could not highlight selection');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />
      {/* Saved Notes List Toggle */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setShowNotesList(!showNotesList)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            isDarkMode
              ? 'bg-gray-700 hover:bg-gray-600 text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
          }`}
        >
          <FileText className="w-4 h-4" />
          Saved Notes ({savedNotes.length})
        </button>
        <button
          onClick={handleNewNote}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Save className="w-4 h-4" />
          New Note
        </button>
      </div>

      {/* Saved Notes List */}
      {showNotesList && (
        <div className={`rounded-xl p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
          <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Your Saved Notes
          </h3>
          {savedNotes.length === 0 ? (
            <div className="text-center py-8">
              <FileText className={`w-12 h-12 mx-auto mb-2 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} />
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                No saved notes yet. Create your first note!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {savedNotes.map((note) => (
                <div
                  key={note.id}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    currentNoteId === note.id
                      ? isDarkMode
                        ? 'border-primary-500 bg-primary-900/20'
                        : 'border-primary-500 bg-primary-50'
                      : isDarkMode
                      ? 'border-gray-700 hover:border-gray-600'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div
                        className={`text-sm mb-2 line-clamp-2 ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}
                        dangerouslySetInnerHTML={{
                          __html: note.content?.substring(0, 100) || 'Empty note',
                        }}
                      />
                      <div className="flex items-center gap-2 text-xs">
                        <Clock className="w-3 h-3" />
                        <span className={isDarkMode ? 'text-gray-500' : 'text-gray-500'}>
                          {formatDate(note.updated_at || note.created_at)}
                        </span>
                        {note.highlights?.length > 0 && (
                          <span className={`px-2 py-0.5 rounded ${isDarkMode ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-100 text-yellow-700'}`}>
                            {note.highlights.length} highlight{note.highlights.length > 1 ? 's' : ''}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewNote(note)}
                        className={`p-2 rounded-lg transition-colors ${
                          isDarkMode
                            ? 'hover:bg-gray-700 text-blue-400'
                            : 'hover:bg-blue-50 text-blue-600'
                        }`}
                        title="View/Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(note.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          isDarkMode
                            ? 'hover:bg-red-900/20 text-red-400'
                            : 'hover:bg-red-50 text-red-600'
                        }`}
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Editor */}
      <div className={`rounded-xl p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
      {/* Toolbar */}
      <div className={`flex flex-wrap items-center gap-2 p-3 rounded-lg mb-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
        {/* Text Formatting */}
        <div className="flex items-center gap-1 border-r pr-2 border-gray-300">
          <button
            onClick={() => applyFormatting('bold')}
            className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
            title="Bold"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            onClick={() => applyFormatting('italic')}
            className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
            title="Italic"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            onClick={() => applyFormatting('underline')}
            className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
            title="Underline"
          >
            <Underline className="w-4 h-4" />
          </button>
        </div>

        {/* Lists */}
        <div className="flex items-center gap-1 border-r pr-2 border-gray-300">
          <button
            onClick={() => applyFormatting('insertUnorderedList')}
            className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
            title="Bullet List"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={() => applyFormatting('insertOrderedList')}
            className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
            title="Numbered List"
          >
            <ListOrdered className="w-4 h-4" />
          </button>
        </div>

        {/* Indentation */}
        <div className="flex items-center gap-1 border-r pr-2 border-gray-300">
          <button
            onClick={() => applyFormatting('indent')}
            className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
            title="Indent (Tab)"
          >
            <Indent className="w-4 h-4" />
          </button>
          <button
            onClick={() => applyFormatting('outdent')}
            className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
            title="Outdent (Shift+Tab)"
          >
            <Outdent className="w-4 h-4" />
          </button>
        </div>

        {/* Font Size */}
        <div className="flex items-center gap-1 border-r pr-2 border-gray-300">
          <select
            onChange={(e) => applyFormatting('fontSize', e.target.value)}
            className={`px-2 py-1 rounded text-sm ${isDarkMode ? 'bg-gray-600 text-white' : 'bg-white text-gray-700'}`}
            title="Font Size"
          >
            <option value="3">Normal</option>
            <option value="1">Small</option>
            <option value="5">Large</option>
            <option value="7">Huge</option>
          </select>
        </div>

        {/* Highlighter */}
        <div className="flex items-center gap-2">
          <button
            onClick={highlightSelection}
            className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
            title="Highlight Selection"
          >
            <Highlighter className="w-4 h-4" />
          </button>
          <div className="flex gap-1">
            {colors.map((color) => (
              <button
                key={color.value}
                onClick={() => setSelectedColor(color.value)}
                className={`w-6 h-6 rounded ${color.class} ${
                  selectedColor === color.value ? 'ring-2 ring-primary-500' : ''
                }`}
                title={color.name}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={(e) => setContent(e.currentTarget.innerHTML)}
        onKeyDown={handleKeyDown}
        className={`min-h-[400px] p-4 rounded-lg border-2 focus:outline-none focus:border-primary-500 ${
          isDarkMode
            ? 'bg-gray-900 border-gray-600 text-gray-200'
            : 'bg-white border-gray-300 text-gray-900'
        }`}
        data-placeholder="Start taking notes... Select text to highlight it!"
        dir="ltr"
        style={{
          lineHeight: '1.8',
          fontSize: '16px',
          direction: 'ltr',
          textAlign: 'left',
          unicodeBidi: 'embed',
        }}
      />

      {/* Actions */}
      <div className="flex items-center justify-between mt-4">
        <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {highlights.length > 0 && `${highlights.length} highlight${highlights.length > 1 ? 's' : ''}`}
        </div>
        <div className="flex gap-3">
          {content && (
            <button
              onClick={() => handleDelete()}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          )}
          <button
            onClick={handleSave}
            disabled={saving || !content.trim()}
            className="flex items-center gap-2 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save Note'}
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default RichNoteEditor;
