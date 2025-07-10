export default function Button({ children, className = "", variant = "primary", ...props }) {
  const base = "px-4 py-2 font-medium rounded-md transition focus:outline-none";
  const variants = {
    primary: "bg-purple-600 hover:bg-purple-700 text-white",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-800",
    success: "bg-green-600 hover:bg-green-700 text-white",
    outline: "border border-gray-300 bg-white hover:bg-gray-50 text-gray-800",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}