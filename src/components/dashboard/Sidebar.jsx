import { Package, BarChart3, Settings, FolderTree, FileText, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function Sidebar() {
  const [openMov, setOpenMov] = useState(true);

  const Item = ({ icon: Icon, label, active }) => (
    <a
      href="#"
      className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-slate-100 ${active ? "bg-slate-100 font-semibold" : "text-slate-700"}`}
    >
      <Icon size={18} />
      <span>{label}</span>
    </a>
  );

  return (
    <aside className="hidden md:flex w-64 shrink-0 border-r bg-white">
      <div className="p-4 w-full flex flex-col">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 mb-6">
          <img src="/stoqly.svg" className="h-8 w-8" alt="Stoqly" />
          <span className="text-2xl font-bold tracking-tight text-slate-800">Stoqly</span>
        </a>

        {/* Grupo Movimientos */}
        <button
          onClick={() => setOpenMov(v => !v)}
          className="flex items-center justify-between w-full px-2 py-2 text-left text-slate-700"
        >
          <span className="flex items-center gap-3 font-semibold">
            <FolderTree size={18}/> Movimientos
          </span>
          <ChevronDown className={`transition ${openMov ? "rotate-180" : ""}`} size={18}/>
        </button>
        {openMov && (
          <div className="space-y-2 pl-2 mt-2">
            <Item icon={FileText} label="Crear Artículo" />
            <Item icon={FileText} label="Editar Artículo" />
          </div>
        )}

        <div className="mt-4 space-y-1">
          <Item icon={Package} label="Artículos" />
          <Item icon={BarChart3} label="Reportes" />
        </div>

        <div className="mt-auto pt-6 border-t">
          <a href="#" className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:text-slate-900">
            <Settings size={18}/> Configuración
          </a>
        </div>
      </div>
    </aside>
  );
}
