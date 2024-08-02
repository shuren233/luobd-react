import {legacy_createStore} from 'redux'
import reducer from "@/store/reducer";
export default legacy_createStore(reducer)