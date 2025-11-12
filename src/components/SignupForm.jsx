import { useMemo, useState } from "react";

function usePasswordChecks(password) {
  return useMemo(() => {
    const minLen = password.length >= 8;
    const lower = /[a-z]/.test(password);
    const upper = /[A-Z]/.test(password);
    const number = /\d/.test(password);
    const symbol = /[^A-Za-z0-9]/.test(password);
    return {
      minLen,
      upperLower: upper && lower,
      numberSymbol: number && symbol,
      all: minLen && upper && lower && number && symbol,
    };
  }, [password]);
}

export default function SignupForm() {
  const [corpId, setCorpId] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const checks = usePasswordChecks(pwd);
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const canSubmit = corpId.trim() && emailOk && checks.all && !submitting;

  async function onSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;

    try {
      setSubmitting(true);
      
      alert("¡Cuenta creada!");
    } catch (err) {
      alert(err.message || "No se pudo registrar.");
    } finally {
      setSubmitting(false);
    }
  }

  const liClass = (ok) =>
    `text-xs leading-5 ${ok ? "text-green-600" : "text-slate-500"}`;

  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-md rounded-xl border bg-white p-6 shadow-sm"
    >
      <h1 className="text-center text-2xl font-bold mb-6">Crear cuenta</h1>

      <label className="block text-sm font-medium mb-1">
        Credencial corporativa
      </label>
      <input
        type="text"
        value={corpId}
        onChange={(e) => setCorpId(e.target.value)}
        placeholder=""
        className="mb-4 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-blue-500"
      />

      <label className="block text-sm font-medium mb-1">
        Correo electrónico
      </label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder=""
        className="mb-4 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-blue-500"
      />

      <label className="block text-sm font-medium mb-1">Contraseña</label>
      <input
        type="password"
        value={pwd}
        onChange={(e) => setPwd(e.target.value)}
        placeholder=""
        className="w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-blue-500"
      />

      {/* Reglas de contraseña */}
      <ul className="mt-2 space-y-1 pl-4 list-disc">
        <li className={liClass(checks.minLen)}>Debe contener 8 caracteres</li>
        <li className={liClass(checks.upperLower)}>
          Debe contener mayúsculas y minúsculas
        </li>
        <li className={liClass(checks.numberSymbol)}>
          Incluye números y símbolos
        </li>
      </ul>

      <p className="mt-4 text-[11px] text-slate-500">
        Al hacer clic en Registrarte, aceptas los{" "}
        <a className="underline" href="/legales/condiciones">Términos de uso</a>{" "}
        y reconoces el{" "}
        <a className="underline" href="/legales/privacidad">Aviso de privacidad</a>.
      </p>

      <button
        type="submit"
        disabled={!canSubmit}
        className="mt-4 w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50 hover:bg-blue-700 transition"
      >
        {submitting ? "Registrando..." : "Registrarte"}
      </button>
    </form>
  );
}
