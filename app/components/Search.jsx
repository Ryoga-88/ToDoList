"use client";

import { useState } from "react";

const Search = () => {
  const [inputText, setInputText] = useState("");
  const [todos, setToDos] = useState([
    { id: 1, text: "Simple enough to stick with." },
  ]);
  const handleChange = (e) => {
    setInputText(e.target.value);
  };
  const handleAdd = () => {
    if (inputText.trim() === "") return;
    setToDos([...todos, { id: todos.length + 1, text: inputText }]);
    setInputText("");
    console.log(todos);
  };

  return (
    <div className="mx-36 mb-4">
      <input
        type="text"
        value={inputText}
        onChange={handleChange}
        placeholder="Add ToDo Task."
        className="w-full px-4 py-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
      />
      <button
        onClick={handleAdd}
        className="bg-gray-50 text-xl text-slate-600 font-normal focus:border-gray-800 hover:bg-gray-300 px-4 py-2 mt-2 mb-6 rounded-xl"
      >
        ADD
      </button>
      <div className="flex flex-wrap space-x-4 content-start">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="bg-slate-100 p-4 border-slate-400 rounded-lg shadow-sm text-lg text-slate-600 font-bold hover:bg-slate-200 hover:border-slate-500 my-4"
          >
            {todo.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
