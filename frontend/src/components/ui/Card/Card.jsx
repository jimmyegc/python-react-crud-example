const Card = ({ title, children }) => {
  return (
    <div className="bg-[var(--nmda-card)] border border-[var(--nmda-border)] rounded-2xl shadow-md p-6 transition-colors duration-300">
      {title && (
        <h2 className="text-lg font-semibold mb-3 text-[var(--nmda-text)]">
          {title}
        </h2>
      )}
      <div className="text-[var(--nmda-text)]">{children}</div>
    </div>
  );
};


export default Card; 