import { Button } from "@/shadcn-components/ui/button";
import { CopyIcon } from "@radix-ui/react-icons";

export const CopyButton = ({ onCopy }) => (
    <Button
        size="icon"
        onClick={onCopy}>
        <CopyIcon className="w-6 h-6" />
    </Button>
)