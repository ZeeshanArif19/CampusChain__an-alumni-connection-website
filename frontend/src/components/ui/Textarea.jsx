// src/components/ui/Textarea.jsx
export function Textarea({ className = "", ...props }) {
  return (
    <textarea
      className={`w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none bg-gray-50 ${className}`}
      {...props}
    />
  );
}
