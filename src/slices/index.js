import { combineReducers } from 'redux'

import profilesReducer from './profiles'

const rootReducer = combineReducers({
  profiles: profilesReducer,
})

export default rootReducer