"use client"

import * as React from "react"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"

import { Button } from "@/ui-components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui-components/ui/dropdown-menu"


interface Props{
  updateFromDropdown:(newCat:string)=>void
}
export default function DropdownMenuRadioGroupDemo({updateFromDropdown}:Props) {
  const [category, setCategory] = React.useState("All")
  updateFromDropdown(category)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="text-base font-semibold">{category}<span className="material-symbols-outlined">
                        keyboard_arrow_down
                    </span></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-background">
        <DropdownMenuLabel>I&apos;m looking for</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={category} onValueChange={setCategory}>
          <DropdownMenuRadioItem value="All">Everything</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Break Fast">Break Fast</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Lunch">Lunch</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Dinner">Dinner</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Snacks">Snacks</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
