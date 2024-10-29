import React, { createContext, useContext, useState, ReactNode } from "react";

interface AppSettingsContextProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  showSettings: boolean;
  setShowSettings: React.Dispatch<React.SetStateAction<boolean>>;
  toggleShowSettings: () => void;
}

const AppSettingsContext = createContext<AppSettingsContextProps | undefined>(undefined);

export const AppSettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDarkMode, setDarkMode] = useState(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);
  const toggleShowSettings = () => setShowSettings((prev) => !prev);

  return (
    <AppSettingsContext.Provider
      value={{
        isDarkMode,
        toggleDarkMode,
        showSettings,
        setShowSettings,
        toggleShowSettings,
      }}
    >
      {children}
    </AppSettingsContext.Provider>
  );
};

// Custom hook to access the context
export const useAppSettings = () => {
  const context = useContext(AppSettingsContext);
  if (!context) throw new Error("useAppSettings must be used within an AppSettingsProvider");
  return context;
};