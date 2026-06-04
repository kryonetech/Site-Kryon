import React, { createContext, useContext, useState, ReactNode } from "react";
import LeadFormModal from "./components/LeadFormModal";

interface LeadModalContextType {
  openModal: (solution?: string) => void;
  closeModal: () => void;
}

const LeadModalContext = createContext<LeadModalContextType | undefined>(undefined);

export function LeadModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [defaultSolution, setDefaultSolution] = useState<string | undefined>(undefined);

  const openModal = (solution?: string) => {
    setDefaultSolution(solution);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <LeadModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <LeadFormModal isOpen={isOpen} onClose={closeModal} defaultSolution={defaultSolution} />
    </LeadModalContext.Provider>
  );
}

export function useLeadModal() {
  const context = useContext(LeadModalContext);
  if (context === undefined) {
    throw new Error("useLeadModal must be used within a LeadModalProvider");
  }
  return context;
}
