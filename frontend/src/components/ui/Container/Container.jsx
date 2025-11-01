const Container = ({ children, size = "md", title }) => {
  const sizes = {
    sm: "max-w-md",
    md: "max-w-4xl",
    lg: "max-w-7xl",
  };

  return (
    <div
      className={`min-h-screen bg-[var(--nmda-bg)] text-[var(--nmda-text)] flex flex-col items-center px-6 py-10 transition-colors duration-300`}
    >
      {title && (
        <h1 className="text-2xl font-semibold mb-6 text-[var(--nmda-primary)]">
          {title}
        </h1>
      )}
      <div className={`${sizes[size]} w-full`}>{children}</div>
    </div>
  );
};

export default Container;