import React from 'react';

interface ModalProps {
  isDarkMode: boolean;
  show: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal = ({ isDarkMode, show, onClose, onSubmit, title, children }: ModalProps) => {
  if (!show) return null;

  return (
    <div className="fixed top-20 right-8 z-50 w-full max-w-md">
      <div className={`rounded-xl shadow-2xl border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="px-6 pt-5 pb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
            <button
              onClick={onClose}
              className={`rounded-lg p-1 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            >
              <svg className={`w-6 h-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {children}
        </div>
        <div className={`px-6 py-4 flex gap-3 justify-end ${isDarkMode ? 'bg-gray-750' : 'bg-gray-50'}`}>
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-lg font-medium ${isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}`}
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
