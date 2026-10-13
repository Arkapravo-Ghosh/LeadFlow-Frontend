import Image from "next/image";

/** The decorative L/arrow mark shares its artwork with the browser favicon. */
export function BrandLogo() {
  return <Image src="/leadflow-logo.svg" width={32} height={32} alt="" aria-hidden unoptimized className="size-8 shrink-0" />;
}
