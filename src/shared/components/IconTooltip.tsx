import { Button } from "@/components/ui/button"
import {
  Tooltip as ShadcnToolTip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { InfoIcon } from "./Icons/InfoIcon"

export function IconTooltip({label, icon, children}) {

  const config = {icon: {className: "h-4 w-4"}};

  return (
    <TooltipProvider>
      <div className="flex items-center gap-2">     
        <ShadcnToolTip>
          {label}
          <TooltipTrigger>

            {/* ADD MORE ICONS HERE */}
              {icon === "info" ? <InfoIcon {...config.icon}/> : <>[i]</>}

            {/* END OF ICON SECTION */}

          </TooltipTrigger>
          <TooltipContent>
            {children}
          </TooltipContent>
        </ShadcnToolTip>
      </div>
    </TooltipProvider>
  )
}
