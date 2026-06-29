import LenisProvider from "@/src/components/LenisProvider/LenisProvider";

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        /* Hide scrollbar for Chrome, Safari and Opera */
        ::-webkit-scrollbar {
          display: none;
        }
        /* Hide scrollbar for IE, Edge and Firefox */
        html, body {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
      <div className="project-layout">
        <LenisProvider infinite>
          {children}
        </LenisProvider>
      </div>
    </>
  );
}
