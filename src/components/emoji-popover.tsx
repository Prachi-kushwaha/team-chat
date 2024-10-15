import { useState } from "react";
import Picker,{BaseEmoji} from "@emoji-mart/react"
import data from "@emoji-mart/data"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "./ui/popover"

  import { TooltipProvider,Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";

  interface EmojiPopoverProps{
      children:React.ReactNode
      hint?:string
      onEmojiSelect:(emoji:BaseEmoji)=>void
  }


  export const EmojiPopover = ({children, hint="Emoji", onEmojiSelect}:EmojiPopoverProps)=>{
   const [popoverOpen, setPopoverOpen] = useState(false)
   const [tooltipOpen, setTooltipOpen] = useState(false)

    const onSelect = (emoji:BaseEmoji)=>{
    onEmojiSelect(emoji) 
     setPopoverOpen(false)

     setTimeout(()=>{
        setTooltipOpen(false)
     }, 5000)
   } 

   return (
    <TooltipProvider >
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <Tooltip open={tooltipOpen} onOpenChange={setTooltipOpen} delayDuration={50}>
                <PopoverTrigger asChild>
                    <TooltipTrigger asChild>
                        {children}
                    </TooltipTrigger>
                    </PopoverTrigger>
                    <TooltipContent className="bg-black text-white border border-white/5">
                        <p className="font-medium text-xs">{hint}</p>
                        </TooltipContent>
                
            </Tooltip>
            <PopoverContent>
                <Picker data={data} onEmojiSelect={onSelect}/>
            </PopoverContent>
        </Popover>
    </TooltipProvider>
   )
  }
