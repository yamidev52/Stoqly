import { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "stoqly:articles";

const ArticlesContext = createContext(null);

function loadFromStorage() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveToStorage(articles) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
  } catch {
    // ignore
  }
}

export function ArticlesProvider({ children }) {
  const [articles, setArticles] = useState([]);

  // Cargar al inicio
  useEffect(() => {
    setArticles(loadFromStorage());
  }, []);

  // Guardar cada cambio
  useEffect(() => {
    saveToStorage(articles);
  }, [articles]);

  function addArticle(data) {
    const id =
      (typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : Date.now().toString()) + Math.random().toString(16).slice(2);

    const now = new Date().toISOString();

    const article = {
      id,
      name: data.name,
      sku: data.sku,
      description: data.description,
      category: data.category,
      initialStock: Number(data.initialStock || 0),
      lote: data.lote,
      provider: data.provider,
      createdAt: now,
      updatedAt: now,
    };

    setArticles((prev) => [...prev, article]);
    return article;
  }

  function updateArticle(id, updates) {
    const now = new Date().toISOString();
    setArticles((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              ...updates,
              initialStock:
                updates.initialStock !== undefined
                  ? Number(updates.initialStock)
                  : a.initialStock,
              updatedAt: now,
            }
          : a
      )
    );
  }

  function deleteArticle(id) {
    setArticles((prev) => prev.filter((a) => a.id !== id));
  }

  const value = useMemo(
    () => ({
      articles,
      addArticle,
      updateArticle,
      deleteArticle,
      getArticleById: (id) => articles.find((a) => a.id === id) || null,
    }),
    [articles]
  );

  return (
    <ArticlesContext.Provider value={value}>
      {children}
    </ArticlesContext.Provider>
  );
}

export function useArticles() {
  const ctx = useContext(ArticlesContext);
  if (!ctx) {
    throw new Error(
      "useArticles debe usarse dentro de <ArticlesProvider> (envuelve tu layout del dashboard)."
    );
  }
  return ctx;
}
