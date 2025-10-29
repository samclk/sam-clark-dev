export const PreLoader = () => {
  return (
    <div id="pre-loader" className="bg-paper absolute inset-0 z-50 grid place-items-center">
      <div className="font-space-mono relative block text-sm uppercase">
        <span
          id="pre-loader-bar"
          style={{ clipPath: 'inset(0 100% 0 0)' }}
          className="bg-red absolute block h-full w-full"
        ></span>
        <span id="pre-loader-text" className="relative z-10 block opacity-0">
          CLK Development
        </span>
      </div>
    </div>
  );
};
