"use client";
import { signUp, useSession, signOut } from "@/lib/auth-client";
import { useState } from "react";

export default function Home() {
  const { data: session, isPending } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  if (isPending) return <div>Chargement...</div>;

  if (session) {
    return (
      <div className="p-10">
        <h1 className="text-2xl font-bold mb-4">
          Bonjour, {session.user.name} ! 👋
        </h1>
        <p className="mb-4">Tu es connecté avec : {session.user.email}</p>
        <button
          onClick={() => signOut()}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Se déconnecter
        </button>
      </div>
    );
  }

  return (
    <div className="p-10 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Créer un compte (Test DB)</h1>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded text-black"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded text-black"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded text-black"
        />
        <button
          onClick={async () => {
            await signUp.email({
              email,
              password,
              name,
              callbackURL: "/",
            });
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          S&apos;inscrire (Création automatique DB)
        </button>
      </div>
    </div>
  );
}
