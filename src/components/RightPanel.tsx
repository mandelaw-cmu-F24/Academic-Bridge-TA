import { CalendarDays, Handshake, Mic, Send, Star } from "lucide-react"
import { useAppSettings } from "../context/AppSettingsProvider";

const RightPanel = () => {
    const { isDarkMode, setShowSettings, showSettings } = useAppSettings();
    return (
        <div className={`fixed top-0 right-0 h-full ${isDarkMode ? "bg-slate-900" : "bg-white"} shadow-lg transition-transform duration-300 ${showSettings ? 'translate-x-0' : 'translate-x-full'} w-96`}>
           <div className={`w-full h-full flex flex-col py-4 px-6 overflow-y-auto`}>
            <div className="mb-6">
                <div className="flex justify-between items-center">
                <h2 className="text-base font-semibold">Project Overview</h2>
                <button 
                    onClick={() => setShowSettings(false)} 
                    className="text-gray-500 self-end mb-4 text-lg">
                    ✕
                </button>
                </div>
                <div className={`p-4 ${isDarkMode ? "bg-slate-800" : "bg-gray-100"}  flex flex-col gap-2 rounded-sm border-l-4 border-indigo-600`}>
                <div className=" flex flex-row items-center gap-2">
                    <CalendarDays size={16} color="gray" />
                    <p className="text-gray-500 text-sm">Timeline: <span className="font-medium">Apr 14 - May 7</span></p>
                </div>
                <div className="flex items-center">
                    <Handshake size={16} color="gray" />
                    <p className="text-gray-500 ml-2 text-sm mr-2">Team:</p>
                    <div className="flex -space-x-2">
                    {/* Team Avatars */}
                    <img src="/user.jpg" alt="team1" className="w-8 h-8 rounded-full" />
                    <img src="/user1.jpg" alt="team2" className="w-8 h-8 rounded-full" />
                    <img src="/user2.png" alt="team3" className="w-8 h-8 rounded-full" />
                    <img src="/user3.jpg" alt="team4" className="w-8 h-8 rounded-full" />
                    </div>
                </div>
                <div className="flex flex-row items-center gap-2">
                    <Star size={16} color="gray" />
                    <p className="text-gray-500 text-sm">Status: <span className="font-medium">In Progress</span></p>
                </div>
                </div>
            </div>

          {/* Team Chat Section */}
            <div className="flex-grow">
                <div className="flex flex-row items-center gap-2">
                <h2 className="text-lg font-semibold">TeamChat</h2>
                <p className="text-sm text-gray-500">24 April 2023</p>
                </div>
            <div className="mt-4">
              <div className="flex items-start space-x-2 mb-4">
                <img src="/user.jpg" alt="Rebeca Hosty" className="w-10 h-10 rounded-full" />
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <span className="font-semibold text-sm">Rebeca Hosty</span>
                    <span className="text-gray-500 text-xs ml-2">12:33 AM</span>
                  </div>
                  <p className={`text-sm p-2  ${isDarkMode ? "bg-slate-800 ": "bg-gray-100"} rounded-md`}>Have a great working week!</p>
                </div>
              </div>

              <div className="flex items-start space-x-2 mb-4">
                <img src="/user1.jpg" alt="Devid Mackurat" className="w-10 h-10 rounded-full" />
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <span className="font-semibold text-sm">Devid Mackurat</span>
                    <span className="text-gray-500 text-xs ml-2">12:33 AM</span>
                    <button className="ml-auto bg-blue-100 text-blue-500 px-2 py-1 rounded-md text-xs">Report</button>
                  </div>
                  <p className={`text-sm p-2  ${isDarkMode ? "bg-slate-800 ": "bg-gray-100"} rounded-md`}>Have a great working week!</p>
                </div>
              </div>

              <div className="flex items-start space-x-2 mb-4">
                <img src="/user2.png" alt="Kate Watson" className="w-10 h-10 rounded-full" />
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <span className="font-semibold text-sm">Kate Watson</span>
                    <span className="text-gray-500 text-xs ml-2">12:34 AM</span>
                  </div>
                  <p className={`text-sm p-2  ${isDarkMode ? "bg-slate-800 ": "bg-gray-100"} rounded-md`}>What do you think about new Team Section?</p>
                </div>
              </div>

              <div className="flex items-start space-x-2 mb-4">
                <img src="/user3.jpg" alt="Rebeca Hosty" className="w-10 h-10 rounded-full" />
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <span className="font-semibold text-sm">Rebeca Hosty</span>
                    <span className="text-gray-500 text-xs ml-2">12:35 AM</span>
                  </div>
                  <p className={`text-sm p-2  ${isDarkMode ? "bg-slate-800 ": "bg-gray-100"} rounded-md`}>I think it is going great!</p>
                </div>
              </div>

              <div className="flex items-start space-x-2 mb-4">
                <img src="/user2.png" alt="Kate Watson" className="w-10 h-10 rounded-full" />
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <span className="font-semibold text-sm">Kate Watson</span>
                    <span className="text-gray-500 text-xs ml-2">12:40 AM</span>
                  </div>
                  <p className={`text-sm p-2  ${isDarkMode ? "bg-slate-800 ": "bg-gray-100"} rounded-md`}>Okay, thanks for the tips!</p>
                </div>
              </div>

              <div className={`flex flex-row items-center ${isDarkMode ? "bg-slate-800" : "bg-gray-100"}  px-2 py-2 rounded-md mt-4`}>
                <input
                  type="text"
                  placeholder="Your messages..."
                  className={`w-full ${isDarkMode ? "bg-slate-800" : "bg-gray-100"} placeholder:text-sm`}
                />
                <div className="flex flex-row items-center gap-3">
                  <Mic size={18} color="gray" />
                  <Send size={18}  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default RightPanel;