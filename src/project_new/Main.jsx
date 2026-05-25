import { BrowserRouter } from "react-router-dom"
import { Routing } from "./routing/Routing"
import { Nav } from "./routing/Nav"
import { Provider } from "react-redux"
import store from "./redux/Store"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setCurrent } from "./redux/UserSlice"
import api from "../api"

const AuthLoader = ({ onDone }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        const loadUser = async () => {
            const token = localStorage.getItem('token')
            if (!token) {
                onDone()
                return
            }
            try {
                const res = await api.get('/users/me')
                dispatch(setCurrent({
                    tz: res.data.tz,
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    isAdmin: res.data.isAdmin
                }))
            } catch (err) {
                localStorage.removeItem('token')
            } finally {
                onDone()
            }
        }
        loadUser()
    }, [])

    return null
}

export const Main = () => {
    const [ready, setReady] = useState(false)

    return <>
        <Provider store={store}>
            <BrowserRouter>
                <AuthLoader onDone={() => setReady(true)} />
                {ready && <>
                    <Nav />
                    <Routing />
                </>}
            </BrowserRouter>
        </Provider>
    </>
}