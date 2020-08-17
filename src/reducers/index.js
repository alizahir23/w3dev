import loggedReducer from '../reducers/isLogged'
import { combineReducers } from 'redux'

const rootReducers = combineReducers({
    loggedReducer
})

export default rootReducers