import { useRouteError } from "react-router-dom";
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/shadcn-components/ui/alert"
import { AlertTriangleIcon } from "lucide-react"

export function ErrorBoundary() {
    let error = useRouteError();
    console.error(error);
    return (
        <section className="page">
            <Alert className="bg-popover">
                <AlertTriangleIcon className="h-4 w-4" />
                <AlertTitle>Une erreur s'est produite</AlertTitle>
                <AlertDescription className="italic">
                    {error.toString()}
                </AlertDescription>
            </Alert>
        </section>
    )
}