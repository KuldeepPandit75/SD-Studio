export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="project-layout"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100dvh",
        overflow: "hidden",
        zIndex: 9999,
      }}
    >
      {children}
    </div>
  );
}
