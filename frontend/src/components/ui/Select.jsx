// src/components/ui/Select.jsx
export function Select({ children, className = "", ...props }) {
  return (
    <select
      className={`w-full px-4 py-2 rounded-md border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-purple-500 focus:outline-none ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}
