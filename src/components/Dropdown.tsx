import { useState } from 'react'
import Flag from 'react-world-flags'
import { ITimezone } from './timeZones.interface'

export default function Dropdown({
  timezones,
  selectedTimezone,
  onChange,
}: {
  timezones: ITimezone[]
  selectedTimezone: string
  onChange: (zone: string) => void
}) {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (zone: string) => {
    onChange(zone)
    setIsOpen(false)
  }

  return (
    <div className="relative w-48">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full bg-zinc-700 text-white p-2 rounded-md"
      >
        <div className="flex items-center">
          <Flag
            code={timezones.find((tz) => tz.zone === selectedTimezone)?.flag}
            className="w-6 h-4 mr-2"
            fallback={'🌍'}
          />
          {timezones.find((tz) => tz.zone === selectedTimezone)?.country}
        </div>
        <span className="text-sm">▼</span>
      </button>

      {isOpen && (
        <ul className="absolute top-full mt-1 w-full bg-zinc-800 text-white rounded-md shadow-lg">
          {timezones.map(({ country, zone, flag }) => (
            <li
              key={zone}
              onClick={() => handleSelect(zone)}
              className="flex items-center p-2 hover:bg-zinc-600 cursor-pointer"
            >
              <div className="flex flex-row items-center">
                <Flag code={flag} className="w-6 h-4 mr-2" fallback={'🌍'} />
                {country}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
