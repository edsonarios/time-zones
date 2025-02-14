import './App.css'
import { useState } from 'react'
import { DateTime } from 'luxon'
import Flag from 'react-world-flags'
import Dropdown from './components/Dropdown'
import { ITimezone } from './components/timeZones.interface'
import { getHour, getTimeZone } from './components/utils'
import IconArrowLink from './components/ArrowLink'
import IconClipBoard from './components/clipBoard'
import IconCheck from './components/check'
import { DropDownSearch } from './components/dropdownSearch'

export default function App() {
  const [selectedTimezones, setSelectedTimezones] = useState<ITimezone[]>([
    { country: 'UTC', zone: 'UTC', flag: 'utc' },
    { country: 'Bolivia', zone: 'America/La_Paz', flag: 'bo' },
    {
      country: 'Argentina',
      zone: 'America/Argentina/Buenos_Aires',
      flag: 'ar',
    },
    { country: 'Chile', zone: 'America/Santiago', flag: 'cl' },
    { country: 'Perú', zone: 'America/Lima', flag: 'pe' },
    { country: 'México', zone: 'America/Mexico_City', flag: 'mx' },
    { country: 'Colombia', zone: 'America/Bogota', flag: 'co' },
    { country: 'España', zone: 'Europe/Madrid', flag: 'es' },
  ])
  const [inputDateTime, setInputDateTime] = useState(
    DateTime.now().toFormat('HH:mm'),
  )
  const [timezone, setTimezone] = useState('UTC')
  const [copied, setCopied] = useState(false)

  const convertTime = (
    dateTime: string,
    targetZone: string,
    simple = false,
  ) => {
    const date = DateTime.fromISO(dateTime, { zone: timezone })
    return date.setZone(targetZone).toFormat(`HH:mm${!simple ? ' ZZZZ' : ''}`)
  }

  const getFormattedTimeText = () => {
    return selectedTimezones
      .map(
        ({ country, zone }) =>
          `${convertTime(inputDateTime, zone, true)} ${country}`,
      )
      .join(', ')
  }

  const copyToClipboard = () => {
    const textToCopy = getFormattedTimeText()
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="p-4 flex items-center flex-col h-100vh">
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
          timezones={selectedTimezones}
          selectedTimezone={timezone}
          onChange={setTimezone}
        />
        <button
          className="p-2 bg-blue-500 hover:bg-blue-600 rounded-md ml-2"
          onClick={() => {
            setInputDateTime(DateTime.now().setZone(timezone).toFormat('HH:mm'))
          }}
        >
          Now
        </button>
      </div>

      {/* All countries time zones */}
      <section className="flex flex-row items-start w-full">
        <div className="w-4/5 flex flex-col items-center">
          <h2 className="text-lg font-semibold mt-4">Time Zones</h2>
          <div className="flex justify-center items-center w-96">
            <ul className="mt-2 bg-zinc-700 p-4 rounded-md text-xl w-full">
              {selectedTimezones.map(({ country, zone, flag }) => (
                <li key={zone} className="mb-2">
                  <div className="flex justify-content items-center">
                    <div>
                      <span>{getHour(convertTime(inputDateTime, zone))}</span>
                      <span className="ml-1 text-xs">
                        {getTimeZone(convertTime(inputDateTime, zone))}
                      </span>
                    </div>
                    <Flag
                      code={flag}
                      className="w-6 h-4 mx-4"
                      fallback={'🌍'}
                    />
                    {country}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-1/5 flex flex-col items-center">
          <h2 className="text-lg font-semibold mt-4">More TimeZones</h2>
          <DropDownSearch
            value={selectedTimezones}
            setValue={setSelectedTimezones}
          />
        </div>
      </section>

      {/* Field to copi time-zones */}
      <div className="mt-6 flex flex-col items-center w-full space-y-1 ">
        <div className="w-full max-w-lg flex justify-between items-center">
          <label className="mb-2">Text:</label>
          <button
            onClick={copyToClipboard}
            className="p-2 bg-zinc-500 text-white rounded-md hover:bg-zinc-600"
          >
            {copied ? (
              <div className="flex items-center">
                <IconCheck className="size-4" />
                <span className="text-xs ml-0.5">Copiado</span>
              </div>
            ) : (
              <div className="flex items-center">
                <IconClipBoard className="size-4" />
                <span className="text-xs ml-0.5">Copiar</span>
              </div>
            )}
          </button>
        </div>
        <div className="flex w-full max-w-lg bg-zinc-600 text-white p-2 rounded-md">
          <textarea
            value={getFormattedTimeText()}
            readOnly
            className="bg-transparent text-white w-full border-none focus:outline-none"
          />
        </div>
      </div>
      {/* Footer */}
      <footer className="mt-8 flex flex-col items-center">
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
