import { Father } from "./Father"
import { PersonalDetails } from "./PersonalDetails"
import { FamilyDetails } from "./FamilyDetails"
import { StudyDetails } from "./StudyDetails"
import { BankDetails } from "./BankDetails"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { loadDraft } from "../../../redux/RequestSlice"
import api from "../../../../api"

export const FatherMain = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchDraft = async () => {
            try {
                const res = await api.get('/drafts')
                dispatch(loadDraft(res.data))
            } catch (err) {
                console.log('אין טיוטה קיימת')
            }
        }
        fetchDraft()
    }, [])

    return (
        <Father>
            <PersonalDetails />
            <FamilyDetails />
            <StudyDetails />
            <BankDetails />
        </Father>
    )
}
