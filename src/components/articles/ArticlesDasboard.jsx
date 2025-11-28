// src/components/ArticlesDashboard.jsx
import { useMemo, useState } from "react";
import CreateArticleForm from "./CreateArticleForm";

const EMPTY_ARTICLE = {
  nombre: "",
  sku: "",
  descripcion: "",
  categoria: "Almacén",
  stock: "",
  lote: "",
  proveedor: "",
};

export default function ArticlesDashboard() {
  const [articles, setArticles] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formValues, setFormValues] = useState(EMPTY_ARTICLE);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const mode = editingId ? "edit" : "create";

  const totalPages = Math.max(
    1,
    Math.ceil((articles.length || 1) / itemsPerPage)
  );

  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return articles.slice(start, end);
  }, [articles, currentPage]);

  function handleCreateOrUpdate(values) {
    if (!editingId) {
      // Crear nuevo
      const newArticle = {
        id: crypto.randomUUID ? crypto.randomUUID() : Date.now(),
        createdAt: new Date().toISOString(),
        ...values,
      };
      setArticles((prev) => [newArticle, ...prev]);
    } else {
      // Actualizar existente
      setArticles((prev) =>
        prev.map((art) =>
          art.id === editingId ? { ...art, ...values } : art
        )
      );
    }

    // Resetear formulario
    setEditingId(null);
    setFormValues(EMPTY_ARTICLE);
  }

  function handleCancel() {
    setEditingId(null);
    setFormValues(EMPTY_ARTICLE);
  }

  function handleEditClick(article) {
    setEditingId(article.id);
    setFormValues({
      nombre: article.nombre,
      sku: article.sku,
      descripcion: article.descripcion,
      categoria: article.categoria,
      stock: article.stock,
      lote: article.lote,
      proveedor: article.proveedor,
    });

    // Opcional: subir al inicio del formulario
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function handleDeleteClick(id) {
    setArticles((prev) => {
      const updated = prev.filter((art) => art.id !== id);

      // Ajustar página si borras el último elemento de la página actual
      setCurrentPage((prevPage) => {
        const newTotalPages = Math.max(
          1,
          Math.ceil((updated.length || 1) / itemsPerPage)
        );
        return Math.min(prevPage, newTotalPages);
      });

      return updated;
    });

    if (editingId === id) {
      handleCancel();
    }
  }

  function handlePageChange(nextPage) {
    if (nextPage >= 1 && nextPage <= totalPages) {
      setCurrentPage(nextPage);
    }
  }

  return (
    <section className="space-y-6">
      {/* Header dentro del contenido del dashboard */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">
            Gestión de artículos
          </h1>
          <p className="text-sm text-slate-500">
            Crea, edita y administra los artículos de tu almacén.
          </p>
        </div>
      </header>

      {/* Formulario (crear / editar) */}
      <CreateArticleForm
        initialValues={formValues}
        mode={mode}
        onSubmit={handleCreateOrUpdate}
        onCancel={handleCancel}
      />

      {/* Tabla de artículos */}
      <section className="bg-white rounded-2xl border shadow-sm mt-8 overflow-hidden">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="font-semibold text-sm text-slate-900">
            Artículos registrados
          </h2>
          <span className="text-xs text-slate-500">
            {articles.length} artículo(s)
          </span>
        </div>

        {articles.length === 0 ? (
          <div className="p-6 text-sm text-slate-500">
            Aún no has agregado ningún artículo. Usa el formulario de arriba
            para crear el primero.
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50 text-left text-xs font-medium text-slate-500 uppercase tracking-wide">
                  <tr>
                    <th className="px-4 py-3">Nombre</th>
                    <th className="px-4 py-3">SKU</th>
                    <th className="px-4 py-3">Categoría</th>
                    <th className="px-4 py-3">Stock inicial</th>
                    <th className="px-4 py-3">Lote</th>
                    <th className="px-4 py-3">Proveedor</th>
                    <th className="px-4 py-3 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paginatedArticles.map((article) => (
                    <tr key={article.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-900">
                        {article.nombre}
                      </td>
                      <td className="px-4 py-3 text-slate-700">
                        {article.sku}
                      </td>
                      <td className="px-4 py-3 text-slate-700">
                        {article.categoria}
                      </td>
                      <td className="px-4 py-3 text-slate-700">
                        {article.stock}
                      </td>
                      <td className="px-4 py-3 text-slate-700">
                        {article.lote}
                      </td>
                      <td className="px-4 py-3 text-slate-700">
                        {article.proveedor}
                      </td>
                      <td className="px-4 py-3 text-right space-x-2">
                        <button
                          onClick={() => handleEditClick(article)}
                          className="inline-flex items-center rounded-lg border px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDeleteClick(article.id)}
                          className="inline-flex items-center rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Paginación */}
            {articles.length > itemsPerPage && (
              <div className="flex items-center justify-between px-4 py-3 border-t text-xs text-slate-600">
                <span>
                  Página {currentPage} de {totalPages}
                </span>
                <div className="inline-flex gap-1">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="h-8 px-3 rounded-lg border text-xs disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
                  >
                    Anterior
                  </button>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="h-8 px-3 rounded-lg border text-xs disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
                  >
                    Siguiente
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </section>
  );
}
