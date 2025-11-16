export const toastContainerStyle =
  "fixed top-2 left-1/2 -translate-x-1/2 z-[1000] flex flex-col gap-2.5";

export const toastBaseStyle =
  "flex items-center py-3 px-4 rounded-lg shadow-lg min-w-[300px] max-w-md text-white animate-slide-in-right";

export const toastTypeStyles = {
  success: "bg-green-900",
  warning: "bg-yellow-800",
  error: "bg-red-900",
  info: "bg-cyan-800",
};

export const toastIconStyle = "mr-3 text-xl flex-shrink-0";

export const toastMessageStyle = "flex-grow text-xl font-semibold";

export const toastCloseButtonStyle =
  "ml-4 bg-transparent border-none p-0 text-white cursor-pointer text-base opacity-70 transition-opacity duration-200 hover:opacity-100";
