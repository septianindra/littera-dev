import { configureStore } from '@reduxjs/toolkit'
import customersReducer from '../pages/customers/customerSlice'
import ItemsSlice from '../pages/items/ItemsSlice'
import packagesSlice from '../pages/packages/packagesSlice'
import participantReducer from '../pages/participant/participantSlice'

export default configureStore({
  reducer: {
    customers: customersReducer,
    participant: participantReducer,
    packages: packagesSlice,
    items: ItemsSlice,
  },
})
