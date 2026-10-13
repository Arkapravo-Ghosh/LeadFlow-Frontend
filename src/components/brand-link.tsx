import Link from "next/link";
import { BrandLogo } from "./brand-logo";

/** A consistent home link across public pages and the private workspace. */
export function BrandLink() {
  return <Link href="/" className="flex items-center gap-3 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring">
    <BrandLogo /><span className="text-lg font-semibold tracking-tight">LeadFlow</span>
  </Link>;
}
