"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import Navbar from "../components/Navbar";
import { auth } from "@/app/firebase";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  orderBy,
  updateDoc,
} from "firebase/firestore";

const CATEGORIES = {
  IMPORTANT_URGENT: "important-urgent",
  IMPORTANT_NOT_URGENT: "important-not-urgent",
  NOT_IMPORTANT_URGENT: "not-important-urgent",
  NOT_IMPORTANT_NOT_URGENT: "not-important-not-urgent",
};

const Home = () => {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const db = getFirestore();

  const loadTodos = async (userId) => {
    try {
      if (!userId) return;

      const todosRef = collection(db, "todos");
      const q = query(
        todosRef,
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
      );

      const querySnapshot = await getDocs(q);
      const todosList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTodos(todosList);
    } catch (error) {
      console.error("Error loading todos:", error);
    }
  };

  useEffect(() => {
    const checkAuthAndLoadTodos = async () => {
      try {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
          if (user) {
            setUser(user);
            await loadTodos(user.uid);
          } else {
            redirect("/login");
          }
        });

        return () => unsubscribe();
      } catch (error) {
        console.error("Authentication error:", error);
        redirect("/login");
      }
    };

    checkAuthAndLoadTodos();
  }, []);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const addToDo = async () => {
    if (!text.trim() || !user) return;

    try {
      const todoRef = collection(db, "todos");
      const newTodo = {
        text: text.trim(),
        userId: user.uid,
        createdAt: new Date().toISOString(),
        category: CATEGORIES.NOT_IMPORTANT_NOT_URGENT,
      };

      await addDoc(todoRef, newTodo);
      setText("");
      await loadTodos(user.uid);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const deleteTodo = async (todoId) => {
    try {
      await deleteDoc(doc(db, "todos", todoId));
      await loadTodos(user.uid);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const updateCategory = async (todoId, newCategory) => {
    try {
      if (newCategory === CATEGORIES.IMPORTANT_URGENT) {
        const importantUrgentTodos = todos.filter(
          (todo) => todo.category === CATEGORIES.IMPORTANT_URGENT
        );

        if (importantUrgentTodos.length >= 3) {
          setError("重要かつ緊急なタスクは3つまでです。優先度をつけましょう。");
          return;
        }
      }

      // エラーメッセージをクリア
      setError("");

      const todoRef = doc(db, "todos", todoId);
      await updateDoc(todoRef, {
        category: newCategory,
      });
      await loadTodos(user.uid);
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const TodoItem = ({ todo, category }) => (
    <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-100 flex flex-col gap-2">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-800">{todo.text}</p>
          <p className="text-xs text-gray-500 mt-1">
            {new Date(todo.createdAt).toLocaleString()}
          </p>
        </div>
        <button
          onClick={() => deleteTodo(todo.id)}
          className="text-teal-600 hover:text-teal-700 ml-2 text-3xl"
        >
          ×
        </button>
      </div>
      <div className="flex gap-2 mt-2">
        {category !== CATEGORIES.IMPORTANT_URGENT && (
          <button
            onClick={() => updateCategory(todo.id, CATEGORIES.IMPORTANT_URGENT)}
            className="text-xs bg-blue-500 text-white px-2 py-1 rounded font-bold"
          >
            重要◎/緊急◎
          </button>
        )}
        {category !== CATEGORIES.IMPORTANT_NOT_URGENT && (
          <button
            onClick={() =>
              updateCategory(todo.id, CATEGORIES.IMPORTANT_NOT_URGENT)
            }
            className="text-xs bg-green-500 text-white px-2 py-1 rounded font-bold"
          >
            重要◎/緊急×
          </button>
        )}
        {category !== CATEGORIES.NOT_IMPORTANT_URGENT && (
          <button
            onClick={() =>
              updateCategory(todo.id, CATEGORIES.NOT_IMPORTANT_URGENT)
            }
            className="text-xs bg-yellow-500 text-white px-2 py-1 rounded font-bold"
          >
            重要×/緊急◎
          </button>
        )}
        {category !== CATEGORIES.NOT_IMPORTANT_NOT_URGENT && (
          <button
            onClick={() =>
              updateCategory(todo.id, CATEGORIES.NOT_IMPORTANT_NOT_URGENT)
            }
            className="text-xs bg-gray-500 text-white px-2 py-1 rounded font-bold"
          >
            重要×/緊急×
          </button>
        )}
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center mt-20 md:mt-8">
        <div className="relative w-11/12 md:w-3/5 mb-2">
          <textarea
            className="w-full h-14 resize-none outline-none p-4 border border-gray-200 rounded-2xl"
            placeholder="タスクを追加しましょう"
            value={text}
            onChange={handleTextChange}
          />
          <button
            className="absolute top-3 right-4 bg-teal-600 hover:bg-teal-700 text-white w-8 h-8 flex items-center justify-center rounded-full z-20 text-2xl font-extrabold"
            onClick={addToDo}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 10.6667L12 4M12 4L19 10.6667M12 4V20"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        {error && (
          <div className="w-11/12 md:w-3/5 mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        <div className="w-11/12 md:w-3/5 grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="border border-gray-200 rounded-lg p-4 min-h-[200px] md:min-h-[300px]">
            <h2 className="text-lg font-semibold mb-4 text-slate-500">
              重要かつ緊急である
            </h2>
            <div className="space-y-2">
              {todos
                .filter((todo) => todo.category === CATEGORIES.IMPORTANT_URGENT)
                .map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    category={CATEGORIES.IMPORTANT_URGENT}
                  />
                ))}
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4 min-h-[200px] md:min-h-[300px]">
            <h2 className="text-lg font-semibold mb-4 text-slate-500">
              重要である・緊急でない
            </h2>
            <div className="space-y-2">
              {todos
                .filter(
                  (todo) => todo.category === CATEGORIES.IMPORTANT_NOT_URGENT
                )
                .map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    category={CATEGORIES.IMPORTANT_NOT_URGENT}
                  />
                ))}
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4 min-h-[200px] md:min-h-[300px]">
            <h2 className="text-lg font-semibold mb-4 text-slate-500">
              重要でない・緊急である
            </h2>
            <div className="space-y-2">
              {todos
                .filter(
                  (todo) => todo.category === CATEGORIES.NOT_IMPORTANT_URGENT
                )
                .map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    category={CATEGORIES.NOT_IMPORTANT_URGENT}
                  />
                ))}
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4 min-h-[200px] md:min-h-[300px]">
            <h2 className="text-lg font-semibold mb-4 text-slate-500">
              重要でない・緊急でない
            </h2>
            <div className="space-y-2">
              {todos
                .filter(
                  (todo) =>
                    todo.category === CATEGORIES.NOT_IMPORTANT_NOT_URGENT
                )
                .map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    category={CATEGORIES.NOT_IMPORTANT_NOT_URGENT}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
