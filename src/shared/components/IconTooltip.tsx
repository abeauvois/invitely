import { Button } from "@/components/ui/button"
import {
  Tooltip as ShadcnToolTip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { InfoCircledIcon } from "@radix-ui/react-icons"
import { MessageBox } from "./MessageBox"

export function IconTooltip({ label, icon, title, message }) {

  const config = { icon: { className: "h-4 w-4" } };

  return (
    <TooltipProvider>
      <div className="flex items-center gap-2">
        <ShadcnToolTip>
          {label}
          <TooltipTrigger>

            {/* ADD MORE ICONS HERE */}
            {icon === "info" ? <InfoCircledIcon {...config.icon} /> : <>(i)</>}

            {/* END OF ICON SECTION */}

          </TooltipTrigger>
          <TooltipContent className="max-w-sm">
            <MessageBox title={title} message={message} />
          </TooltipContent>
        </ShadcnToolTip>
      </div>
    </TooltipProvider>
  )
}
