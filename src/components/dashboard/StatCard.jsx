export default function StatCard({ icon, title, value, badge }) {
    const Icon = icon;
    return (
      <div className="bg-white rounded-xl border p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2 text-slate-500">
            <Icon size={18}/>
            <span className="text-sm">{title}</span>
          </div>
          {badge && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              {badge}
            </span>
          )}
        </div>
        <div className="mt-3 text-3xl font-extrabold tracking-tight">{value}</div>
      </div>
    );
  }
  