import { Button } from "@/shadcn-components/ui/button";
import { TrashIcon } from "@radix-ui/react-icons";

export const DeleteButton = ({ onDelete }) => (
    <Button
        variant="destructive"
        size="icon"
        onClick={onDelete}>
        <TrashIcon className="w-6 h-6" />
    </Button>
)