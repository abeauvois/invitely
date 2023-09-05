import { Button } from "@/shadcn-components/ui/button";
import { TrashIcon } from "@radix-ui/react-icons";

export const DeleteButton = ({ onDelete, disabled = false }) => (
    <Button
        title="Supprimer"
        variant="destructive"
        size="icon"
        disabled={disabled}
        onClick={onDelete}>
        <TrashIcon className="w-6 h-6" />
    </Button>
)