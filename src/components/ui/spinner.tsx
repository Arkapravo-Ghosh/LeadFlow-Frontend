import { cn } from "cn"
import { RiLoaderLine } from "@remixicon/react"

/** Theme-compatible activity indicator; callers can hide decorative instances. */
function Spinner({ className, ...props }: React.ComponentProps<typeof RiLoaderLine>) {
  return (
    <RiLoaderLine data-slot="spinner" role="status" aria-label="Loading" className={cn("size-4 animate-spin motion-reduce:animate-none", className)} {...props} />
  )
}

export { Spinner }
