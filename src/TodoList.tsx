import React from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Check,
  Target,
  CheckCircle,
  Clock,
} from "lucide-react";

import { translations } from "./translations";
import type { Todo } from "./types";

interface Props {
  todos: Todo[];
  filter: string;
  searchTerm: string;
  language: string;
  onFilterChange: (filter: string) => void;
  onSearchChange: (term: string) => void;
  onAddTodo: () => void;
  onEditTodo: (todo: Todo) => void;
  onDeleteTodo: (id: number) => void;
  onToggleTodo: (id: number) => void;
}

const TodoList: React.FC<Props> = ({
  todos,
  filter,
  searchTerm,
  language,
  onFilterChange,
  onSearchChange,
  onAddTodo,
  onEditTodo,
  onDeleteTodo,
  onToggleTodo,
}) => {
  const t = (key: string) =>
    translations[language as keyof typeof translations][
      key as keyof (typeof translations)["en"]
    ] || key;

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch =
      todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      todo.description.toLowerCase().includes(searchTerm.toLowerCase());

    if (filter === "completed") return matchesSearch && todo.completed;
    if (filter === "pending") return matchesSearch && !todo.completed;
    return matchesSearch;
  });

  const totalTodos = todos.length;
  const completedTodos = todos.filter((todo) => todo.completed).length;
  const pendingTodos = totalTodos - completedTodos;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className=" bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/30 hover:shadow-xl hover:bg-white/80 transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center ">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-800">
                {totalTodos}
              </div>
              <div className="text-gray-600 font-medium">{t("totalTasks")}</div>
            </div>
          </div>
        </div>
        <div className=" bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/30 hover:shadow-xl hover:bg-white/80 transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center ">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">
                {completedTodos}
              </div>
              <div className="text-gray-600 font-medium">
                {t("completedTasks")}
              </div>
            </div>
          </div>
        </div>
        <div className=" bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/30 hover:shadow-xl hover:bg-white/80 transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center ">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600">
                {pendingTodos}
              </div>
              <div className="text-gray-600 font-medium">
                {t("pendingTasks")}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/30">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={t("searchPlaceholder")}
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/60 border  rounded-xl border-blue-500 "
              />
            </div>
          </div>

          <div className="flex gap-3">
            {["all", "pending", "completed"].map((filterType) => (
              <button
                key={filterType}
                onClick={() => onFilterChange(filterType)}
                className={`px-6 py-3 rounded-xl font-semibold ${
                  filter === filterType
                    ? "bg-blue-500 text-white shadow-lg "
                    : "bg-white/60 text-gray-700 hover:bg-white/80 border border-white/30"
                }`}
              >
                {t(filterType)}
              </button>
            ))}
          </div>

          <button
            onClick={onAddTodo}
            className="flex items-center gap-3 px-6 py-3 bg-green-500 text-white rounded-xl 00 shadow-lg font-semibold"
          >
            <Plus className="w-5 h-5" />
            {t("addTodo")}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredTodos.length === 0 ? (
          <div className="text-center py-16 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/30">
            <div className="w-20 h-20 bg-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Plus className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-3">
              {t("noTasks")}
            </h3>
            <p className="text-gray-500 mb-8 text-lg">{t("noTasksDesc")}</p>
            <button
              onClick={onAddTodo}
              className="px-8 py-4 bg-blue-500 text-white rounded-xl  shadow-lg font-semibold text-lg"
            >
              {t("addTodo")}
            </button>
          </div>
        ) : (
          filteredTodos.map((todo) => (
            <div
              key={todo.id}
              className="group bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/30 hover:shadow-xl hover:bg-white/80 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <button
                  onClick={() => onToggleTodo(todo.id)}
                  className={`mt-1 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${
                    todo.completed
                      ? "bg-green-500 border-green-500 text-white shadow-lg "
                      : "border-gray-300 hover:border-green-500 hover:bg-green-50"
                  }`}
                >
                  {todo.completed && <Check className="w-4 h-4" />}
                </button>

                <div className="flex-1">
                  <h3
                    className={`font-semibold text-lg transition-all duration-300 ${
                      todo.completed
                        ? "line-through text-gray-500"
                        : "text-gray-800 group-hover:text-gray-900"
                    }`}
                  >
                    {todo.title}
                  </h3>
                  {todo.description && (
                    <p
                      className={`text-sm mt-2 transition-all duration-300 ${
                        todo.completed
                          ? "line-through text-gray-400"
                          : "text-gray-600"
                      }`}
                    >
                      {todo.description}
                    </p>
                  )}
                  <p className="text-xs text-gray-400 mt-3 font-medium">
                    Created: {todo.createdAt}
                  </p>
                </div>

                <div className="flex gap-2 ">
                  <button
                    onClick={() => onEditTodo(todo)}
                    className="p-3 text-blue-500 hover:bg-blue-50 rounded-xl "
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onDeleteTodo(todo.id)}
                    className="p-3 text-red-500 hover:bg-red-50 rounded-xl "
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList;
