import { type StateCreator, create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ITimezone } from '../timeZones.interface'

export interface ITimeZoneStore {
  selectedTimezones: ITimezone[]
  setSelectedTimezones: (selectedTimezones: ITimezone[]) => void
}
const timeZoneStore: StateCreator<ITimeZoneStore> = (set) => ({
  selectedTimezones: [
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
  ],
  setSelectedTimezones: (selectedTimezones) =>
    set(() => ({ selectedTimezones })),
})

export const useTimeZoneStore = create<ITimeZoneStore>()(
  persist(timeZoneStore, {
    name: 'timezone-store',
    partialize: (state) => ({
      selectedTimezones: state.selectedTimezones,
    }),
  }),
)
