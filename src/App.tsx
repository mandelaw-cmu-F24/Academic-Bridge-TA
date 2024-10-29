import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import TaskSection from "./components/TaskSection";
import { Settings } from "lucide-react";
import RightPanel from "./components/RightPanel";
import { useAppSettings } from "./context/AppSettingsProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Messages from "./pages/Messages";
import "./i18n";

interface Task {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("https://dummyjson.com/todos?limit=15");
        const data = await response.json();
        setTasks(data.todos); //
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowSettings(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const { isDarkMode, setShowSettings } = useAppSettings();

  return (
    <BrowserRouter>
      <div
        className={`font-[family-name:var(--font-geist-sans)] min-h-screen flex ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
        } relative`}
      >
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <TopBar />
          {/* Task Section */}
          <Routes>
            <Route path="/" element={<TaskSection />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/documents" element={<Messages />} />
            <Route path="/files" element={<Messages />} />
            <Route path="/stats" element={<Messages />} />
          </Routes>
          {/* <TaskSection /> */}
          <button
            className="absolute bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
            onClick={() => setShowSettings(true)}
          >
            <Settings size={24} />
          </button>
          <RightPanel />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
