import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import TaskSection from "./TaskSection";
import { AppSettingsProvider } from "../context/AppSettingsProvider";
import { I18nextProvider } from "react-i18next";
import i18n from "i18next";

// Add type definitions for extended matchers
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveClass(className: string): R;
    }
  }
}

// Mock the i18next configuration
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: "en" },
  }),
  I18nextProvider: ({ children }: { children: React.ReactNode }) => children,
}));

interface Task {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

const mockTasks: Task[] = [
  { id: 1, todo: "Task 1", completed: false, userId: 1 },
  { id: 2, todo: "Task 2", completed: true, userId: 1 },
  { id: 3, todo: "Task 3", completed: false, userId: 1 },
];

interface MockFetchResponse {
  ok: boolean;
  json: () => Promise<any>;
}

// Properly typed mock fetch implementation
const mockFetch = jest
  .fn()
  .mockImplementation(
    (
      input: RequestInfo | URL,
      init?: RequestInit
    ): Promise<MockFetchResponse> => {
      const url = typeof input === "string" ? input : input.toString();

      if (url === "https://dummyjson.com/todos?limit=15") {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ todos: mockTasks }),
        });
      }
      if (url.includes("/todos/add")) {
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              id: 4,
              todo: "New Task",
              completed: false,
              userId: 1,
            }),
        });
      }
      return Promise.reject(new Error("Not found"));
    }
  );

// Properly type the global fetch mock
global.fetch = mockFetch as unknown as typeof fetch;

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <AppSettingsProvider>
      <I18nextProvider i18n={i18n}>{component}</I18nextProvider>
    </AppSettingsProvider>
  );
};

describe("TaskSection Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders without crashing", async () => {
    renderWithProviders(<TaskSection />);

    await waitFor(() => {
      expect(screen.getByText("workspace")).toBeInTheDocument();
      expect(screen.getByText("website_design")).toBeInTheDocument();
    });
  });

  test("fetches and displays tasks on mount", async () => {
    renderWithProviders(<TaskSection />);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        "https://dummyjson.com/todos?limit=15"
      );
    });

    await waitFor(() => {
      mockTasks.forEach((task) => {
        expect(screen.getByText(task.todo)).toBeInTheDocument();
      });
    });
  });

  test("adds new task", async () => {
    renderWithProviders(<TaskSection />);

    await waitFor(() => {
      expect(screen.getByText("new_task")).toBeInTheDocument();
    });

    const newTaskButton = screen.getByText("new_task");
    fireEvent.click(newTaskButton);

    const input = screen.getByPlaceholderText("Enter new task");
    await userEvent.type(input, "New Task");

    const submitButton = screen.getByText("enter_task");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        "https://dummyjson.com/todos/add",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: expect.any(String),
        })
      );
    });
  });

  test("filters tasks", async () => {
    renderWithProviders(<TaskSection />);

    await waitFor(() => {
      expect(screen.getByText("completed")).toBeInTheDocument();
    });

    const completedTab = screen.getByText("completed");
    fireEvent.click(completedTab);

    await waitFor(() => {
      const completedTasks = mockTasks.filter((t) => t.completed);
      completedTasks.forEach((task) => {
        expect(screen.getByText(task.todo)).toBeInTheDocument();
      });

      const incompleteTasks = mockTasks.filter((t) => !t.completed);
      incompleteTasks.forEach((task) => {
        expect(screen.queryByText(task.todo)).not.toBeInTheDocument();
      });
    });
  });
});
