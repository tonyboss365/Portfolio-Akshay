import { ReactNode } from "react";

interface SectionProps {
  title: string;
  children: ReactNode;
  id?: string;
}

export function Section({ title, children, id }: SectionProps) {
  return (
    <section id={id} className="mb-20">
      <div className="flex items-center gap-4 mb-8">
        <span className="text-xs font-mono text-blue-600">FIG_000.{title.toUpperCase()}</span>
        <div className="flex-grow h-px bg-gray-200" />
      </div>
      <div>{children}</div>
    </section>
  );
}
