import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Area, AreaChart } from "recharts";

const series = Array.from({length: 12}).map((_, i) => {
  const base = 700 + Math.round(Math.sin(i/2)*80);
  return { name: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i], in: base+120, out: base-140 };
});

export default function LineCard() {
  return (
    <div className="bg-white rounded-xl border p-4">
      <div className="text-sm text-slate-500 mb-2">Entradas / Salidas de Artículos</div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={series}>
            <defs>
              <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.25"/>
                <stop offset="100%" stopColor="currentColor" stopOpacity="0"/>
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#e5e7eb" />
            <XAxis dataKey="name" tickLine={false} axisLine={false}/>
            <YAxis tickLine={false} axisLine={false}/>
            <Tooltip />
            <Area dataKey="in" strokeWidth={2} fill="url(#g1)" />
            <Area dataKey="out" strokeWidth={2} fillOpacity={0}/>
            <Line dataKey="out" strokeWidth={2}/>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
