import { Bell, Moon, Search, SunDim } from "lucide-react"
import { useAppSettings } from "../context/AppSettingsProvider";
import { useTranslation } from "react-i18next";

const TopBar = () => {
    const { isDarkMode, toggleDarkMode } = useAppSettings();
    const { t, i18n } = useTranslation(['home', 'main']);

    const onClickLanguageChange = (e: any) => {
      const language = e.target.value;
      i18n.changeLanguage(language); //change the language
    }
    return (
        <div className={`p-4 border-b border-gray-200 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} flex justify-between items-center`}>
          <div className={`flex justify-between items-center ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-full px-4 py-2 w-72`}>
            <input
              type="text"
              placeholder="Search"
              className={`ml-2 bg-transparent focus:outline-none ${isDarkMode ? 'text-white' : 'text-gray-900'} text-sm w-full`}
            />
            <Search size={18} className={isDarkMode ? 'text-gray-500' : 'text-gray-500'} />
          </div>
          <div className="flex items-center space-x-6">
            <select className="custom-select" style={{width: 140, backgroundColor: "rgb(229 231 235);"}} onChange={onClickLanguageChange}>
              <option value="en" >English</option>
              <option value="fr" >French</option>
            </select>
            <button onClick={toggleDarkMode} className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 hover:bg-gray-900' : 'bg-gray-100 hover:bg-gray-200'}`}>
              {isDarkMode ? (
                <SunDim size={20} />
              ) : (
                <Moon size={20} />
              )}
            </button>
            <button className={`relative p-2 rounded-full ${isDarkMode ? 'bg-gray-700 hover:bg-gray-900' : 'bg-gray-100 hover:bg-gray-200'}`}>
              <Bell size={20} />
              <span className="absolute top-1 right-1 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </div>
    )
}
export default TopBar