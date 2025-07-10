// src/components/ui/CategoryButton.jsx
export function CategoryButton({ icon: Icon, label, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center border-2 rounded-xl px-6 py-4 transition ${
        selected
          ? "border-purple-600 bg-purple-50"
          : "border-gray-200 bg-gray-50 hover:bg-gray-100"
      }`}
    >
      <Icon className="w-6 h-6 mb-2" />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}
