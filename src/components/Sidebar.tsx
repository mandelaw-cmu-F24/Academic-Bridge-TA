import { FileChartLine, FileText, FolderClosed, House, Mail, Plus, Settings, User } from "lucide-react"
import { useAppSettings } from "../context/AppSettingsProvider";
import { Link} from 'react-router-dom';

const Sidebar = () => {
    const { isDarkMode } = useAppSettings();
    return (
        <div className={`w-20 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-4 flex flex-col items-center border-r border-gray-200`}>
        <img
          src="/user-profile.png"
          alt="Profile"
          width={200}
          height={200}
          className="rounded-full justify-center"
        />
        <div className="w-full flex flex-col h-[90vh] overflow-hidden items-center justify-between">
          <div className="flex self-start flex-col space-y-2">
            <Link to="/" className={`flex items-center justify-center w-10 h-10 ${isDarkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-200'} rounded-full`}>
              <House size={18} />
            </Link>
            <Link to="/messages" className={`flex items-center justify-center w-10 h-10 ${isDarkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-200'} rounded-full`}>
              <Mail size={18} />
            </Link>
            <Link to="/documents" className={`flex items-center justify-center w-10 h-10 ${isDarkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-200'} rounded-full`}>
              <FileText size={18} />
            </Link>
            <Link to="/files" className={`flex items-center justify-center w-10 h-10 ${isDarkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-200'} rounded-full`}>
              <FolderClosed size={18} />
            </Link>
            <Link to="/stats" className={`flex items-center justify-center w-10 h-10 ${isDarkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-200'} rounded-full`}>
              <FileChartLine size={18} />
            </Link>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <img src="/user.jpg" alt="team1" className="w-6 h-6 rounded-full" />
            <img src="/user1.jpg" alt="team2" className="w-6 h-6 rounded-full" />
            <img src="/user2.png" alt="team3" className="w-6 h-6 rounded-full" />
            <div className={`border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} p-1 rounded-full`}>
              <Plus size={16} />
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <a href="#" className={`flex items-center justify-center w-10 h-10 ${isDarkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-200'} rounded-full`}>
              <Settings size={20} />
            </a>
            <a href="#" className={`flex items-center justify-center w-10 h-10 ${isDarkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-200'} rounded-full`}>
              <User size={20} />
            </a>
          </div>
        </div>
      </div>
    )
}

export default Sidebar