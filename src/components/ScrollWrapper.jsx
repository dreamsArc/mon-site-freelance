export default function ScrollWrapper({ children }) {
  return (
    <div className="w-full" style={{ WebkitOverflowScrolling: "touch", overflowY: "visible" }}>
      {children}
    </div>
  );
}
