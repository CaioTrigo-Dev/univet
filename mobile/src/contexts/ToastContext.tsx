import React, { createContext, useContext, useState, useCallback } from 'react';
import { Toast, ToastType } from '../components/molecules/Toast';

interface ToastContextType {
  show: (message: string, type?: ToastType) => void;
  hide: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

/**
 * ToastProvider
 * Provedor global para exibição de notificações (Toasts).
 */
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  const show = useCallback((message: string, type: ToastType = 'success') => {
    setToast({ message, type });
    // Esconde automaticamente após 3 segundos
    setTimeout(() => {
      setToast(null);
    }, 3000);
  }, []);

  const hide = useCallback(() => {
    setToast(null);
  }, []);

  return (
    <ToastContext.Provider value={{ show, hide }}>
      {children}
      {toast && <Toast message={toast.message} type={toast.type} onHide={hide} />}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context;
};
