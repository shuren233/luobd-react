
const defaultStore:StoreDetail = {num: 20,token:''}
export default (state=defaultStore,action:{type:string,data:string}) => {
    const newState = {...state}
    switch (action.type) {
        case 'setToken':
            newState.token = action.data;
            break;
    }
    return newState;
}


