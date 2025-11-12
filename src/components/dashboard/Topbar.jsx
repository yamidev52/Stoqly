import { Bell, Search, ChevronDown } from "lucide-react";

export default function Topbar() {
  return (
    <header className="sticky top-0 z-10 bg-white border-b">
      <div className="h-16 px-4 md:px-6 lg:px-8 flex items-center gap-4">
        {/* Buscador */}
        <div className="flex-1">
          <div className="flex items-center gap-2 bg-white border rounded-lg px-3 py-2 max-w-xl">
            <Search size={18} className="text-slate-400"/>
            <input
              className="flex-1 text-sm outline-none placeholder:text-slate-400"
              placeholder="Busca o teclea un comando..."
            />
          </div>
        </div>

        {/* Notificaciones + usuario */}
        <button className="relative p-2 rounded-full hover:bg-slate-100">
          <Bell size={18}/>
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-amber-400"></span>
        </button>

        <div className="flex items-center gap-3">
          <img src="https://i.pravatar.cc/40?img=3" className="h-8 w-8 rounded-full" alt="avatar"/>
          <span className="hidden sm:block text-sm">Fernando</span>
          <ChevronDown size={18} className="text-slate-500"/>
        </div>
      </div>
    </header>
  );
}
