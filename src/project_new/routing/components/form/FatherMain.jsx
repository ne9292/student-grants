import { Father } from "./Father"
import { PersonalDetails } from "./PersonalDetails"
import { FamilyDetails } from "./FamilyDetails"
import { StudyDetails } from "./StudyDetails"
import { BankDetails } from "./BankDetails"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { loadDraft } from "../../../redux/RequestSlice"
import api from "../../../../api"


export const FatherMain=()=>{
    const dispatch = useDispatch()
    //כשהמשתמש נכנס הוא מנסה לטעון טיוטה שכבר יש לו 
     useEffect(() => {
        // פונקציה אסינכרונית שמבצעת את הבקשה לשרת לקבלת הטיוטה
        const fetchDraft = async () => {
            try {
                //שולח בקשה לקבל את פונקצית שליפת הטיוטה מהשרת
                const res = await api.get('/drafts')
                //הוא קורא לפונקציה מהשרת שמעדכנת את הסטייט של הטיוטה עם הנתונים שהתקבלו מהשרת
                dispatch(loadDraft(res.data))
            } catch (err) {
                console.log('אין טיוטה קיימת')
            }
        }
        fetchDraft()
    }, [])
    return<>
    <Father>
        <PersonalDetails></PersonalDetails>
        <FamilyDetails></FamilyDetails>
        <StudyDetails></StudyDetails>
        <BankDetails></BankDetails>
    </Father>
    </>
}