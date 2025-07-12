import React, { useState, useEffect } from "react";
import { Check, X, FileText, Type } from "lucide-react";

import { translations } from "./translations";
import type { Todo } from "./types";

interface Props {
  editingTodo: Todo | null;
  language: string;
  onSave: (title: string, description: string) => void;
  onCancel: () => void;
}

const TodoForm: React.FC<Props> = ({
  editingTodo,
  language,
  onSave,
  onCancel,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const t = (key: string) =>
    translations[language as keyof typeof translations][
      key as keyof (typeof translations)["en"]
    ] || key;

  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title);
      setDescription(editingTodo.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [editingTodo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave(title.trim(), description.trim());
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/30">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            {editingTodo ? (
              <FileText className="w-8 h-8 text-white" />
            ) : (
              <Type className="w-8 h-8 text-white" />
            )}
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {editingTodo ? t("editTodo") : t("addTodo")}
          </h2>
          <p className="text-gray-600">
            {editingTodo
              ? "Update your task details"
              : "Create a new task to stay organized"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
              {t("title")} *
            </label>
            <div className="relative">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t("titlePlaceholder")}
                className="w-full px-6 py-4 bg-white/60 border rounded-2xl border-blue-500 text-lg"
                required
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
              {t("description")}
            </label>
            <div className="relative">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t("descriptionPlaceholder")}
                rows={5}
                className="w-full px-6 py-4 bg-white/60 border  rounded-2xl border-blue-500  text-lg "
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-3 px-4 py-2 bg-blue-500 text-white rounded-2xl  font-semibold text-lg"
            >
              <Check className="w-6 h-6" />
              {t("save")}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-white/60 text-gray-700 rounded-2xl hover:bg-white/80 border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-lg backdrop-blur-sm"
            >
              <X className="w-6 h-6" />
              {t("cancel")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoForm;
