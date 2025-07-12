import { useEffect, useState } from "react";
import { translations } from "./translations";
import { Globe2 } from "lucide-react";
import TodoList from "./TodoList";
import type { Todo } from "./types";
import TodoForm from "./TodoForm";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentView, setCurrentView] = useState("list");
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [language, setLanguage] = useState("en");

  const t = (key: string) =>
    translations[language as keyof typeof translations][
      key as keyof (typeof translations)["en"]
    ] || key;

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    const savedLanguage = localStorage.getItem("language");

    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const handleSaveTodo = (title: string, description: string) => {
    if (editingTodo) {
      setTodos(
        todos.map((todo) =>
          todo.id === editingTodo.id ? { ...todo, title, description } : todo
        )
      );
    } else {
      const newTodo: Todo = {
        id: Date.now(),
        title,
        description,
        completed: false,
        createdAt: new Date().toLocaleDateString(),
      };
      setTodos([...todos, newTodo]);
    }

    setCurrentView("list");
    setEditingTodo(null);
  };

  const handleDeleteTodo = (id: number) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTodos(todos.filter((todo) => todo.id !== id));
    }
  };

  const handleToggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleAddTodo = () => {
    setEditingTodo(null);
    setCurrentView("form");
  };

  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
    setCurrentView("form");
  };

  const handleCancel = () => {
    setCurrentView("list");
    setEditingTodo(null);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="sticky top-0 z-50 bg-white p-4 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            {t("appTitle")}
          </h1>
          <p className="text-gray-600 text-sm font-medium">
            Stay organized, achieve more, live better
          </p>
        </div>
        <button
          onClick={() => setLanguage(language === "en" ? "ml" : "en")}
          className="group flex items-center gap-3 px-4 py-3 bg-white/60 hover:bg-white/80 backdrop-blur-sm rounded-xl border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Globe2 className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
          <span className="text-sm font-semibold text-gray-700">
            {language === "en" ? "English" : "മലയാളം"}
          </span>
        </button>
      </div>

      <div className="relative max-w-5xl mx-auto px-6 py-8">
        {currentView === "list" ? (
          <TodoList
            todos={todos}
            filter={filter}
            searchTerm={searchTerm}
            language={language}
            onFilterChange={setFilter}
            onSearchChange={setSearchTerm}
            onAddTodo={handleAddTodo}
            onEditTodo={handleEditTodo}
            onDeleteTodo={handleDeleteTodo}
            onToggleTodo={handleToggleTodo}
          />
        ) : (
          <TodoForm
            editingTodo={editingTodo}
            language={language}
            onSave={handleSaveTodo}
            onCancel={handleCancel}
          />
        )}
      </div>
    </div>
  );
}

export default App;
