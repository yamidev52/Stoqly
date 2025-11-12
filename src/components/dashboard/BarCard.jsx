import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Jan", count: 1200 }, { name: "Feb", count: 800 }, { name: "Mar", count: 1600 },
  { name: "Apr", count: 1100 }, { name: "May", count: 1400 }, { name: "Jun", count: 1000 },
  { name: "Jul", count: 1500 }, { name: "Aug", count: 900 },  { name: "Sep", count: 1300 },
  { name: "Oct", count: 1200 }, { name: "Nov", count: 700 },  { name: "Dec", count: 1000 },
];

export default function BarCard() {
  return (
    <div className="bg-white rounded-xl border p-4">
      <div className="text-sm text-slate-500 mb-2">Registros de Artículos</div>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={22}>
            <CartesianGrid vertical={false} stroke="#e5e7eb"/>
            <XAxis dataKey="name" tickLine={false} axisLine={false}/>
            <YAxis tickLine={false} axisLine={false}/>
            <Tooltip cursor={{ fill: "rgba(2,6,23,0.04)" }}/>
            <Bar dataKey="count" radius={[6,6,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
