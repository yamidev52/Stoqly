export default function Button({ children, onClick }) {
    return (
      <button
        onClick={onClick}
        className="rounded-xl px-4 py-2 font-semibold bg-indigo-500 hover:bg-indigo-600 transition"
      >
        {children}
      </button>
    );
  }
  