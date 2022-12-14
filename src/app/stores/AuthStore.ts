import {makeAutoObservable} from "mobx";
import {authAPI, LoginParamsType} from "../../api/todolists-api";


type InitialStateType = {
    isLoggedIn: boolean
}

class AuthStore {

    constructor() {
        makeAutoObservable(this)
    }

    initialState: InitialStateType = {
        isLoggedIn: false
    }

    setIsLoggedIn(value: boolean){
    this.initialState = {...this.initialState,isLoggedIn:value}

    }

    async login(data: LoginParamsType) {
        try {
            const res = await authAPI.login(data)
            if (res.data.resultCode === 0) {
                this.setIsLoggedIn(true)
            }
        } catch (e) {
        } finally {
        }
    }

    async loginOut() {
        try {
            const res = await authAPI.logout()
            if (res.data.resultCode === 0) {
                this.setIsLoggedIn(false)
            }
        } catch (e) {
        } finally {
        }
    }

}

// const StoreContext = createContext<Auth>(new Auth());
//
//
// const StoreProvider: FC<{ store: Auth }> = ({children, store}) => (
//     <StoreContext.Provider value={store}> {children} </StoreContext.Provider>
// );
//
// const useAuthStore = () => {
//     return useContext(StoreContext);
// }
// export {Auth, StoreProvider, useAuthStore};
export default AuthStore;