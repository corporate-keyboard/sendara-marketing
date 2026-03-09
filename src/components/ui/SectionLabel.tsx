export default function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-body text-xs uppercase tracking-[3px] font-medium text-sendara-teal">
      {children}
    </span>
  );
}
