"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/app/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const isButtonDisabled = !email || !password;

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        localStorage.setItem("isAuth", "true");
        router.push("/home");
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        localStorage.setItem("isAuth", "true");
        router.push("/home");
      }
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-email":
          setError("メールアドレスの形式が正しくありません。");
          break;
        case "auth/user-disabled":
          setError("このアカウントは無効になっています。");
          break;
        case "auth/user-not-found":
          setError("ユーザーが見つかりません。");
          break;
        case "auth/wrong-password":
          setError("パスワードが間違っています。");
          break;
        case "auth/email-already-in-use":
          setError("このメールアドレスは既に使用されています。");
          break;
        case "auth/weak-password":
          setError("パスワードは6文字以上である必要があります。");
          break;
        default:
          setError("エラーが発生しました。もう一度お試しください。");
          break;
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/2 h-1/2 md:h-full bg-teal-600 flex items-center justify-start px-16">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold md:font-extrabold text-white mb-2">
            TaskGrid
          </h1>
          <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">
            タスク管理をもっと直感的に、効率的に。
          </h3>
          <p className="text-lg text-white opacity-75 md:block hidden">
            「時間管理のマトリクス」をご存じでしょうか？限られた時間の中で、タスクの優先順位を適切に決めることは、ビジネスパーソンにとって大きな課題です。
          </p>
          <p className="text-lg text-white opacity-75 mt-4">
            <strong>Grid Tasks</strong>{" "}
            は、タスクを「緊急度×重要度」で簡単に整理できるツールです。優先順位を瞬時に可視化し、効率的に仕事を進めることができます。
          </p>
        </div>
      </div>

      {/* 右側（フォーム） */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col items-center justify-center p-12">
        <form onSubmit={handleAuth} className="w-full">
          <h2 className="text-2xl font-bold mb-6 text-center">
            {isLogin ? "ログイン" : "アカウント登録"}
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <div className="w-full mb-4">
            <label
              htmlFor="email"
              className="text-sm font-normal text-gray-700 mb-2 block"
            >
              メールアドレス
            </label>
            <input
              id="email"
              type="email"
              placeholder="user@example.com"
              className="w-full px-6 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="w-full mb-6">
            <label
              htmlFor="password"
              className="text-sm font-normal text-gray-700 mb-2 block"
            >
              パスワード
            </label>
            <input
              id="password"
              type="password"
              placeholder="6文字以上で入力"
              className="w-full px-6 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full px-6 py-3 text-white rounded-lg focus:outline-none mb-4 ${
              isButtonDisabled
                ? "bg-teal-600/60"
                : "bg-teal-600 hover:bg-teal-700"
            }`}
            disabled={isButtonDisabled}
          >
            {isLogin ? "ログイン" : "アカウント作成"}
          </button>

          <p className="text-center text-gray-600">
            {isLogin
              ? "アカウントをお持ちでない方は"
              : "アカウントをお持ちの方は"}
            <button
              type="button"
              className="text-teal-600 hover:text-teal-700 ml-1 focus:outline-none"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "新規登録" : "ログイン"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
