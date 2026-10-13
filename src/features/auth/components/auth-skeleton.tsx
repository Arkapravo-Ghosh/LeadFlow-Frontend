import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { PASSWORD_HINT, USERNAME_HINT } from "../form-copy";
import type { AuthMode } from "../schemas";

/** Match form dimensions without rendering controls before session resolution. */
export function AuthSkeleton({ mode }: { mode: AuthMode }) {
  const signup = mode === "signup";
  return <div role="status" aria-live="polite" aria-busy="true" aria-label={signup ? "Loading sign-up form" : "Loading sign-in form"}>
    <FieldGroup className="gap-6" aria-hidden="true">
      {(signup ? [USERNAME_HINT, PASSWORD_HINT, null] : [null, null]).map((hint, index) =>
        <Field key={index}>
          <Skeleton className="h-5 max-w-28" />
          <Skeleton className="h-10 w-full" />
          {hint && <FieldDescription>{hint}</FieldDescription>}
        </Field>,
      )}
      <Skeleton className="flex h-10 w-full items-center justify-center"><Spinner aria-hidden="true" /></Skeleton>
    </FieldGroup>
  </div>;
}
