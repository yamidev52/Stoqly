import { useState } from "react";

export default function LoginForm() {
  const [identifier, setIdentifier] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = identifier.trim() && !submitting;

  async function onSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;
  
    try {
      setSubmitting(true);
      await new Promise((res) => setTimeout(res, 1000)); // simula carga
  
      // ✅ Redirige al dashboard
      window.location.href = "/app";
    } catch (err) {
      alert("Error al iniciar sesión");
    } finally {
      setSubmitting(false);
    }
  }
  

  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-md rounded-xl border bg-white p-6 shadow-sm"
    >
      <div className="space-y-1">
        <label htmlFor="identifier" className="text-sm font-medium">
          E-mail o credencial corporativa
        </label>
        <input
          id="identifier"
          type="text"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          className="w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-blue-500"
          placeholder=""
        />
      </div>

      <button
        type="submit"
        disabled={!canSubmit}
        className="mt-5 w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50 transition"
      >
        {submitting ? "Procesando..." : "Continuar"}
      </button>

      <div className="mt-3 text-center">
        <a
          href="/auth/crear-cuenta"
          className="text-sm font-semibold text-blue-700 hover:underline"
        >
          Crear cuenta
        </a>
      </div>

      {/* Divider “o” */}
      <div className="my-5 flex items-center gap-3 text-slate-400">
        <div className="h-px flex-1 bg-slate-200" />
        <span className="text-xs">o</span>
        <div className="h-px flex-1 bg-slate-200" />
      </div>

      <button
        type="button"
        onClick={() => alert("Abrir flujo de QR (mock)")}
        className="w-full rounded-md border px-4 py-2 text-sm hover:bg-slate-50 transition"
      >
        Iniciar sesión con QR
      </button>
    </form>
  );
}
