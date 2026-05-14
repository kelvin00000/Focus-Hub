const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-#0A1A2F backdrop-blur-sm">
      <div className="flex gap-2">
        <div className="h-3 w-3 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-3 w-3 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-3 w-3 bg-white rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
