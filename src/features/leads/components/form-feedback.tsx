import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function FormFeedback({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <Alert variant="destructive" role="alert">
      <AlertTitle>Couldn’t save</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
