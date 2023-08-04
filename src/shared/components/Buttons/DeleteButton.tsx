import { Button } from "@/components/ui/button";
import { BinIcon } from "../Icons/BinIcon";

export const DeleteButton = ({ onDelete }) => (
    <Button
        variant="destructive"
        onClick={onDelete}>
        <BinIcon />
    </Button>
)