"use client"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip"

interface HintProps {
  label: string;
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  delayDuration?: number;
}

export const Hint = ({
  label,
  children,
  side = "bottom",
  align = "center",
  delayDuration = 300
}: HintProps) => {
    return (
        <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <div className="inline-block">
            {children}
          </div>
        </TooltipTrigger>
        <TooltipContent side={side} align={align}>
          <p className="text-xs font-semibold">{label}</p>
        </TooltipContent>
      </Tooltip>
      )
}
