import Image from "next/image";

interface LogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  showByline?: boolean;
}

export default function Logo({ variant = "light", size = "md", showByline = false }: LogoProps) {
  const sizes = {
    sm: { width: 140, height: 28 },
    md: { width: 180, height: 36 },
    lg: { width: 220, height: 44 },
  };

  const bylineSizes = {
    sm: { width: 140, height: 33 },
    md: { width: 180, height: 42 },
    lg: { width: 220, height: 52 },
  };

  const dims = showByline ? bylineSizes[size] : sizes[size];

  const src = showByline
    ? variant === "light" ? "/sendara-by-omnex-white.svg" : "/sendara-by-omnex-dark.svg"
    : variant === "light" ? "/sendara-logo-white.svg" : "/sendara-logo-dark.svg";

  return (
    <Image
      src={src}
      alt="Sendara"
      width={dims.width}
      height={dims.height}
      priority
    />
  );
}
