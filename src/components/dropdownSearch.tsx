import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { allTimeZones } from './util/allTimeZonesParsed'
import { ITimezone } from './timeZones.interface'

export function DropDownSearch({
  setValue,
  value,
}: {
  setValue: (value: any) => void
  value: ITimezone[]
}) {
  const [open, setOpen] = React.useState(false)

  const toggleSelection = (selectedZone: ITimezone) => {
    const isSelected = value.some((tz) => tz.zone === selectedZone.zone)

    if (isSelected) {
      setValue(value.filter((tz) => tz.zone !== selectedZone.zone))
    } else {
      setValue([...value, selectedZone])
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between bg-zinc-700 hover:bg-zinc-600"
        >
          Select more countries...
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search country..." className="h-9" />
          <CommandList className="bg-zinc-700">
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {allTimeZones.map((timeZone) => (
                <CommandItem
                  key={timeZone.zone}
                  value={timeZone.country}
                  onSelect={() => toggleSelection(timeZone)}
                >
                  {timeZone.country}
                  <Check
                    className={cn(
                      'ml-auto',
                      value.some((tz) => tz.zone === timeZone.zone)
                        ? 'opacity-100'
                        : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
