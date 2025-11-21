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
} from 'lucide-react';
import { notesAPI } from '../services/api';
import toast from 'react-hot-toast';

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
  }, [summaryId]);

  const loadNote = async () => {
    try {
      const { note } = await notesAPI.getNote(summaryId);
      if (note) {
        setContent(note.content || '');
        setHighlights(note.highlights || []);
        setFormatting(note.formatting || {});
      }
    } catch (error) {
      console.error('Error loading note:', error);
    } finally {
      setLoading(false);
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
      toast.success('Note saved successfully!');
    } catch (error) {
      toast.error('Failed to save note');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this note?')) return;

    try {
      await notesAPI.deleteNote(summaryId);
      setContent('');
      setHighlights([]);
      setFormatting({});
      toast.success('Note deleted successfully');
    } catch (error) {
      toast.error('Failed to delete note');
    }
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
        onInput={(e) => setContent(e.currentTarget.innerHTML)}
        onKeyDown={handleKeyDown}
        dangerouslySetInnerHTML={{ __html: content }}
        className={`min-h-[400px] p-4 rounded-lg border-2 focus:outline-none focus:border-primary-500 ${
          isDarkMode
            ? 'bg-gray-900 border-gray-600 text-gray-200'
            : 'bg-white border-gray-300 text-gray-900'
        }`}
        data-placeholder="Start taking notes... Select text to highlight it!"
        style={{
          lineHeight: '1.8',
          fontSize: '16px',
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
              onClick={handleDelete}
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
  );
};

export default RichNoteEditor;
