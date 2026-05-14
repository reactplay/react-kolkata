import { cn } from "@/lib/utils";

interface ArchitecturalCornerProps {
  className?: string;
  size?: number;
}

export const ArchitecturalCorner = ({ className, size = 8 }: ArchitecturalCornerProps) => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden select-none">
      <span
        className={cn(
          "absolute -top-px -left-px z-10 block border-t border-l border-white/20",
          className
        )}
        style={{ width: size, height: size }}
      />
      <span
        className={cn(
          "absolute -right-px -bottom-px z-10 block border-r border-b border-white/20",
          className
        )}
        style={{ width: size, height: size }}
      />
    </div>
  );
};
