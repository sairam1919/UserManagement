import { combineReducers } from 'redux';
import NotificationReducer from './NotificationReducer'

const rootReducer = combineReducers({
    NotificationCount: NotificationReducer,
})

export default rootReducer