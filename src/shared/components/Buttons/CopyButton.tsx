import { Button } from "@/shadcn-components/ui/button";
import { CopyIcon } from "@radix-ui/react-icons";

export const CopyButton = ({ onCopy, title = "Copier" }) => (
    <Button
        size="icon"
        title={title}
        onClick={onCopy}>
        <CopyIcon className="w-6 h-6" />
    </Button>
)