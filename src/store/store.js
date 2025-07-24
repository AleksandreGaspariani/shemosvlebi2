import { configureStore } from '@reduxjs/toolkit'
import eventsReducer from './slices/eventsSlice'
import filtersReducer from './slices/filtersSlice'

export const store = configureStore({
  reducer: {
    events: eventsReducer,
    filters: filtersReducer,
  },
})

export default store
