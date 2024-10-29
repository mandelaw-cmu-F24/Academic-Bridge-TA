import {
  ChevronDown,
  Link as Link3,
  EllipsisVertical,
  LayoutGrid,
  LockKeyholeOpen,
  Menu,
  MessageCircleMore,
  Plus,
  SlidersHorizontal,
  Dot,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useAppSettings } from "../context/AppSettingsProvider";
import { useTranslation } from "react-i18next";
// import LanguageSwitcher from "./LanguageSwitcher";

interface Task {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

const TaskSection = () => {
  const { isDarkMode } = useAppSettings();
  const { t, i18n } = useTranslation(["home", "main"]);
  const [showModalInfo, setShowModal] = useState<string>("all");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [isEditingTask, setIsEditingTask] = useState<Task | null>(null);
  const [newTask, setNewTask] = useState<string>("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("https://dummyjson.com/todos?limit=15");
        const data = await response.json();
        setTasks(data.todos); // Set the tasks in the state
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const filteredTasks = () => {
    if (showModalInfo === "completed") {
      return tasks.filter((task) => task.completed === true);
    } else if (showModalInfo === "all") {
      return tasks;
    }

    return [];
  };

  const addTask = async () => {
    try {
      const response = await fetch("https://dummyjson.com/todos/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          todo: newTask,
          completed: false,
          userId: 1, // default userId
        }),
      });
      const task = await response.json();
      setTasks([...tasks, task]);
      setIsAddingTask(false);
      setNewTask("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await fetch(`https://dummyjson.com/todos/${id}`, {
        method: "DELETE",
      });
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const updateTask = async (taskToUpdate: Task) => {
    try {
      const response = await fetch(
        `https://dummyjson.com/todos/${taskToUpdate.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            todo: taskToUpdate.todo,
            completed: taskToUpdate.completed,
          }),
        }
      );
      const updatedTask = await response.json();
      setTasks(
        tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
      );
      setIsEditingTask(null); // Close edit mode after saving
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div
      className={`flex overflow-y-auto h-[90vh] flex-col gap-6 p-6 relative ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center space-x-4">
            <span className="text-sm text-gray-500">{t("workspace")} </span>
            <h2 className="text-sm font-semibold">{t("creative_design")}</h2>
          </div>
          <h1 className="font-semibold text-xl">{t("website_design")}</h1>
        </div>
        <div className="flex flex-col items-end">
          <h1 className="text-sm font-semibold">{t("from_date")}</h1>
          <p className="text-xs flex flex-row items-center text-gray-500">
            <Dot size={36} color="green" />
            {t("updated_time")}
          </p>
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-2 items-center">
          <LockKeyholeOpen size={16} />
          <p className="text-sm font-semibold">{t("limited_access")}</p>
          <ChevronDown size={16} />
          <div className="w-[1px] h-6 bg-slate-300"></div>
          <div className="flex -space-x-2">
            {/* Team Avatars */}
            <img src="/user.jpg" alt="team1" className="w-7 h-7 rounded-full" />
            <img
              src="/user1.jpg"
              alt="team2"
              className="w-7 h-7 rounded-full"
            />
            <img
              src="/user2.png"
              alt="team3"
              className="w-7 h-7 rounded-full"
            />
            <img
              src="/user3.jpg"
              alt="team4"
              className="w-7 h-7 rounded-full"
            />
          </div>
          <div className="border border-gray-300 bg-[#4F48A8] p-1 rounded-full">
            <Plus size={16} color="white" />
          </div>
        </div>
        <div className="flex flex-row items-center gap-3">
          <Link3 size={18} color="#4F48A8" />
          <div className="w-[1px] h-6 bg-slate-300"></div>
          <div className="p-1 bg-[#4F48A8] rounded-md">
            <Menu size={18} color="white" />
          </div>
          <LayoutGrid size={18} color="gray" />
        </div>
      </div>
      <div
        className={`${
          isDarkMode
            ? "bg-gray-900 shadow-slate-950"
            : "bg-white shadow-slate-100"
        } shadow-md rounded-md  w-full md:w-[98%] flex flex-col md:flex-row justify-between px-2`}
      >
        <div className="flex flex-col md:flex-row w-full md:w-[60%]">
          <div
            className={`${
              showModalInfo === "all" ? "border-[#4F48A8] border-b-4" : ""
            } w-full md:w-[25%] py-2 md:py-4 px-2 md:px-4 flex flex-row items-center gap-2 md:gap-4 cursor-pointer`}
            onClick={() => setShowModal("all")}
          >
            <h1 className="text-xs md:text-sm font-semibold">
              {t("all_tasks")}
            </h1>
            <p
              className={`text-xs  h-6 text-center w-6 flex items-center justify-center ${
                isDarkMode
                  ? "bg-gray-700 text-white"
                  : "bg-gray-200 text-gray-500"
              }  rounded-full`}
            >
              {tasks.length}
            </p>
          </div>
          <div
            className={`${
              showModalInfo === "completed" ? "border-[#4F48A8] border-b-4" : ""
            } w-full md:w-[25%] py-2 md:py-4 px-2 md:px-4 flex flex-row items-center gap-2 md:gap-4 cursor-pointer`}
            onClick={() => setShowModal("completed")}
          >
            <h1 className="text-xs md:text-sm font-semibold">
              {t("completed")}
            </h1>
            <p
              className={`text-xs  h-6 text-center w-6 flex items-center justify-center ${
                isDarkMode
                  ? "bg-gray-700 text-white"
                  : "bg-gray-200 text-gray-500"
              }  rounded-full`}
            >
              {tasks.filter((task) => task.completed).length}
            </p>
          </div>
          <div
            className={`${
              showModalInfo === "todo" ? "border-[#4F48A8] border-b-4" : ""
            } w-full md:w-[25%] py-2 md:py-4 px-2 md:px-4 flex flex-row items-center gap-2 md:gap-4 cursor-pointer`}
            onClick={() => setShowModal("todo")}
          >
            <h1 className="text-xs md:text-sm font-semibold">{t("to_do")}</h1>
            <p
              className={`text-xs  h-6 text-center w-6 flex items-center justify-center ${
                isDarkMode
                  ? "bg-gray-700 text-white"
                  : "bg-gray-200 text-gray-500"
              }  rounded-full`}
            >
              {tasks.filter((task) => !task.completed).length}
            </p>
          </div>
          <div
            className={`${
              showModalInfo === "progress" ? "border-[#4F48A8] border-b-4" : ""
            } w-full md:w-[25%] py-2 md:py-4 px-2 md:px-4 flex flex-row items-center gap-2 md:gap-4 cursor-pointer`}
            onClick={() => setShowModal("progress")}
          >
            <h1 className="text-xs md:text-sm font-semibold">
              {t("in_progress")}
            </h1>
            <p
              className={`text-xs  h-6 text-center w-6 flex items-center justify-center ${
                isDarkMode
                  ? "bg-gray-700 text-white"
                  : "bg-gray-200 text-gray-500"
              }  rounded-full`}
            >
              0
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-center mt-2 md:mt-0">
          <div className="border p-2 border-slate-300 rounded-md flex flex-row gap-2 items-center">
            <SlidersHorizontal size={16} />
            <p className="text-xs">{t("filter_sort")}</p>
          </div>
          <button
            onClick={() => setIsAddingTask(true)}
            className="border p-2 border-slate-300 rounded-md flex flex-row gap-2 items-center"
          >
            <Plus size={16} />
            <p className="text-xs">{t("new_task")}</p>
          </button>
        </div>
      </div>

      {isAddingTask && (
        <div className="flex flex-col gap-2">
          <div className="">
            <h2 className="text-sm">{t("add_task")}</h2>
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Enter new task"
              className="p-2 rounded-md bg-gray-100"
            />
          </div>
          <div className="flex flex-row gap-2">
            <button
              onClick={addTask}
              className="bg-blue-500 text-white p-2 rounded"
            >
              {t("enter_task")}
            </button>
            <button
              onClick={() => setIsAddingTask(false)}
              className="text-gray-500"
            >
              {t("cancel")}
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {filteredTasks().map((task) => (
          <div
            key={task.id}
            className={`${
              isDarkMode ? "bg-gray-800" : "bg-white"
            } flex flex-col p-4 rounded-lg shadow-sm`}
          >
            <div className="flex flex-row items-center justify-between">
              <p
                className={`text-xs p-1   ${
                  isDarkMode ? "bg-gray-700" : "bg-[#EDF8F4]"
                } rounded-md ${
                  task.completed ? `text-[#5EA28B] ` : `text-[#BE9770]`
                }`}
              >
                {task.completed ? "Completed" : "To do"}
              </p>
              <div className="flex flex-row items-center gap-x-2">
                <button onClick={() => deleteTask(task.id)}>
                  <Trash2 size={18} />
                </button>
                <EllipsisVertical size={18} />
              </div>
            </div>
            <img
              src="/tree-task.jpg"
              width={400}
              height={400}
              className="rounded-md mt-2"
              alt="Task image"
            />

            {isEditingTask?.id === task.id ? (
              <>
                <input
                  type="text"
                  value={isEditingTask.todo}
                  onChange={(e) =>
                    setIsEditingTask({ ...isEditingTask, todo: e.target.value })
                  }
                  className="text-sm p-1 font-light mt-2"
                />
                <button
                  onClick={() => updateTask(isEditingTask)}
                  className="p-1 w-[50%] mt-1 bg-blue-500 rounded-md text-white"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <span
                  onClick={() => setIsEditingTask(task)}
                  className="text-base font-semibold mt-2"
                >
                  {task.todo}
                </span>
                {/* <button onClick={() => deleteTask(task.id)}>Delete</button> */}
              </>
            )}
            <p className="text-gray-500 text-xs sm:text-sm">Landing page UI</p>
            <div className="flex flex-row justify-between items-center mt-2">
              <div className="flex -space-x-2">
                {/* Team Avatars */}
                <img
                  src="/user.jpg"
                  alt="team1"
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded-full"
                />
                <img
                  src="/user1.jpg"
                  alt="team2"
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded-full"
                />
                <img
                  src="/user2.png"
                  alt="team3"
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded-full"
                />
              </div>
              <div className="flex flex-row items-center gap-1 text-xs">
                <MessageCircleMore size={18} color="gray" />
                <p className="text-gray-500">3</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskSection;
