import './App.css'
import { useState } from 'react'
import { DateTime } from 'luxon'
import Flag from 'react-world-flags'
import Dropdown from './components/Dropdown'
import { ITimezone } from './components/timeZones.interface'
import { getHour, getTimeZone } from './components/utils'
import IconArrowLink from './components/ArrowLink'

export default function App() {
  const [inputDateTime, setInputDateTime] = useState(
    DateTime.now().toFormat('HH:mm'),
  )
  const [timezone, setTimezone] = useState('UTC')

  const timezones: ITimezone[] = [
    { country: 'UTC', zone: 'UTC', flag: 'utc' },
    { country: 'Bolivia', zone: 'America/La_Paz', flag: 'bo' },
    {
      country: 'Argentina',
      zone: 'America/Argentina/Buenos_Aires',
      flag: 'ar',
    },
    { country: 'Chile', zone: 'America/Santiago', flag: 'cl' },
    { country: 'Perú', zone: 'America/Lima', flag: 'pe' },
    { country: 'México', zone: 'America/Mexico_City', flag: '🇲🇽' },
    { country: 'Colombia', zone: 'America/Bogota', flag: '🇨🇴' },
    { country: 'España', zone: 'Europe/Madrid', flag: '🇪🇸' },
    // { country: "Ecuador", zone: "America/Guayaquil", flag: "🇪🇨" },
    // { country: "Uruguay", zone: "America/Montevideo", flag: "🇺🇾" },
    // { country: "Venezuela", zone: "America/Caracas", flag: "🇻🇪" },
  ]

  const convertTime = (dateTime: string, targetZone: string) => {
    const date = DateTime.fromISO(dateTime, { zone: timezone })
    return date.setZone(targetZone).toFormat('HH:mm ZZZZ')
  }

  return (
    <div className="p-4 flex items-center flex-col">
      <h1 className="text-6xl mb-4">TimeZone Converter</h1>

      {/* Input Date */}
      <div className="flex justify-center items-center flex-row">
        <label className="mb-2">Hour:</label>
        <input
          name="date"
          type="time"
          value={inputDateTime}
          onChange={(e) => setInputDateTime(e.target.value)}
          required
          className="p-4 rounded-md text-center text-4xl"
        />

        {/* Current Country Time Zone */}
        <label className="block mb-2 mr-2 ml-4">Country:</label>
        <Dropdown
          timezones={timezones}
          selectedTimezone={timezone}
          onChange={setTimezone}
        />
      </div>

      {/* All countries time zones */}
      <h2 className="text-lg font-semibold mt-4">Time Zones</h2>
      <div className="flex justify-center items-center w-96">
        <ul className="mt-2 bg-zinc-700 p-4 rounded-md text-xl w-full">
          {timezones.map(({ country, zone, flag }) => (
            <li key={zone} className="mb-2">
              <div className="flex justify-content items-center">
                <div>
                  <span>{getHour(convertTime(inputDateTime, zone))}</span>
                  <span className="ml-1 text-xs">
                    {getTimeZone(convertTime(inputDateTime, zone))}
                  </span>
                </div>
                <Flag code={flag} className="w-6 h-4 mx-4" fallback={'🌍'} />
                {country}
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* Footer */}
      <footer className="absolute bottom-8 flex flex-col items-center">
        <p className="">Made By ⚡ Edson</p>
        <a
          className="text-gray-400 flex items-center group hover:text-gray-100 hover:transition-all"
          href="https://www.linkedin.com/in/edson-a%C3%B1awaya/"
          target="_blank"
          rel="noreferrer"
        >
          Linkedin
          <IconArrowLink />
        </a>
      </footer>
    </div>
  )
}
