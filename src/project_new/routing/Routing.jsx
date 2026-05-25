
import { Route, Routes } from "react-router-dom"
import { Home } from "./components/Home"
import { LogIn } from "./components/LogIn"
import { Register } from "./components/Register"
import { Request } from "./components/Request"
import { Status } from "./components/Status"
import { ViewRequest } from "./components/ViewRequest"
import { Show } from "./components/Show"
import {ShowRequest} from "../routing/components/form/ShowRequest"

export const Routing = () => {
    return (
        <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="Home" element={<Home></Home>}></Route>
            <Route path="LogIn" element={<LogIn></LogIn>}>  </Route>
            <Route path="Register" element={<Register></Register>}></Route>
            <Route path="Request" element={<Request></Request>}></Route>
            <Route path="Status" element={<Status></Status>}></Route>
            <Route path="ViewRequest" element={<ViewRequest></ViewRequest>}></Route>
            <Route path="/Show/:id" element={<Show></Show>}></Route>
            <Route path="/ShowRequest/:id" element={<ShowRequest></ShowRequest>}></Route>

        </Routes>
    )
}