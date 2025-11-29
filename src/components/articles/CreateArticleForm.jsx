import { useEffect, useState } from "react";

const EMPTY_VALUES = {
  nombre: "",
  sku: "",
  descripcion: "",
  categoria: "Almacén",
  stock: "",
  lote: "",
  proveedor: "",
};

export default function CreateArticleForm({
  initialValues = EMPTY_VALUES,
  mode = "create",
  onSubmit,
  onCancel,
}) {
  const [nombre, setNombre] = useState(initialValues.nombre);
  const [sku, setSku] = useState(initialValues.sku);
  const [descripcion, setDescripcion] = useState(initialValues.descripcion);
  const [categoria, setCategoria] = useState(initialValues.categoria);
  const [stock, setStock] = useState(initialValues.stock);
  const [lote, setLote] = useState(initialValues.lote);
  const [proveedor, setProveedor] = useState(initialValues.proveedor);

  useEffect(() => {
    setNombre(initialValues.nombre ?? "");
    setSku(initialValues.sku ?? "");
    setDescripcion(initialValues.descripcion ?? "");
    setCategoria(initialValues.categoria ?? "Almacén");
    setStock(initialValues.stock ?? "");
    setLote(initialValues.lote ?? "");
    setProveedor(initialValues.proveedor ?? "");
  }, [initialValues]);

  function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      nombre,
      sku,
      descripcion,
      categoria,
      stock,
      lote,
      proveedor,
    };
    if (onSubmit) onSubmit(payload);
  }

  const isEditMode = mode === "edit";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-6">

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl border border-slate-300 p-6 shadow-sm"
      >
        <h1 className="text-xl font-bold text-slate-900 mb-4">
          {isEditMode ? "Editar artículo" : "Agregar artículo"}
        </h1>

        <div className="space-y-4">

          {/* Nombre */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-1">
              Nombre del Artículo:
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ingresa el nombre del artículo..."
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* SKU */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-1">
              SKU:
            </label>
            <input
              type="text"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              placeholder="Ingresa el SKU..."
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-1">
              Descripción:
            </label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              rows="4"
              placeholder="Ingresa una descripción..."
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 resize-none placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Categoría */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-1">
              Categoría:
            </label>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:ring-2 focus:ring-blue-500"
            >
              <option>Almacén</option>
              <option>Electrónica</option>
              <option>Ropa</option>
              <option>Oficina</option>
            </select>
          </div>

          {/* Stock */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-1">
              Cantidad Inicial del Stock:
            </label>
            <input
              type="number"
              min="0"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="Ingresa la cantidad..."
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Lote */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-1">
              Lote:
            </label>
            <input
              type="text"
              value={lote}
              onChange={(e) => setLote(e.target.value)}
              placeholder="Ingresa el no. del Lote..."
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Proveedor */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-1">
              Proveedor:
            </label>
            <input
              type="text"
              value={proveedor}
              onChange={(e) => setProveedor(e.target.value)}
              placeholder="Ingresa el proveedor..."
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Botones */}
        <div className="mt-6 flex gap-3 justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="h-10 px-4 rounded-lg border border-slate-400 text-sm text-slate-800 bg-white hover:bg-slate-100"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="h-10 px-4 rounded-lg bg-blue-600 text-sm font-semibold text-white hover:bg-blue-700"
          >
            {isEditMode ? "Actualizar artículo" : "Guardar artículo"}
          </button>
        </div>
      </form>

      {/* PREVIEW */}
      <aside className="bg-white rounded-2xl border border-slate-300 p-5 shadow-sm">
        <header className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-slate-900">
            {nombre || "Nombre del Artículo"}
          </h2>
          <span className="text-xs px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-300">
            {isEditMode ? "EDITANDO" : "NUEVO"}
          </span>
        </header>

        <dl className="space-y-2 text-sm">
          <div>
            <dt className="font-semibold text-slate-800">SKU:</dt>
            <dd className="text-slate-900">{sku || "*********"}</dd>
          </div>
          <div>
            <dt className="font-semibold text-slate-800">Descripción:</dt>
            <dd className="text-slate-900">
              {descripcion ||
                "Lorem ipsum dolor sit amet consectetur. Sem donec ornare hendrerit odio senectus."}
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-slate-800">Categoría:</dt>
            <dd className="text-slate-900">{categoria}</dd>
          </div>
          <div>
            <dt className="font-semibold text-slate-800">
              Cantidad Inicial del Stock:
            </dt>
            <dd className="text-slate-900">{stock || "—"}</dd>
          </div>
          <div>
            <dt className="font-semibold text-slate-800">Lote:</dt>
            <dd className="text-slate-900">{lote || "—"}</dd>
          </div>
          <div>
            <dt className="font-semibold text-slate-800">Proveedor:</dt>
            <dd className="text-slate-900">{proveedor || "—"}</dd>
          </div>
        </dl>
      </aside>
    </div>
  );
}
