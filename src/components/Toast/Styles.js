let toastStyles = {
  container:
    "fixed top-2 left-1/2 -translate-x-1/2 z-[1000] flex flex-col gap-2.5",
  base: "flex items-center py-3 px-4 rounded-lg shadow-lg min-w-[300px] max-w-2xl text-white animate-slide-in-right",
  type: {
    success: "bg-green-900",
    warning: "bg-yellow-800",
    error: "bg-red-900",
    info: "bg-cyan-800",
  },
  icon: "mr-3 text-xl flex-shrink-0",
  message: "flex-grow text-xl font-semibold",
};

export default toastStyles;
