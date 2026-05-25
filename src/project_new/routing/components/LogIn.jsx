import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setCurrent } from "../../redux/UserSlice"
import styles from '../../css/logInAndRegister.module.css'
import Swal from 'sweetalert2'
import api from "../../../api"


export let LogIn = () => {

    let dispatch = useDispatch()
    let navigate = useNavigate()

    //useSelector- פונקציה מובנת שהופכת לנו את כל הנתונים מהרדיוסר לנתונים זמינים פה
    let users = useSelector(state => state.Users.UsersList)

    //פונקציה ששומרת את פרטי המשתמש בקוררנט של הבקשה
    let send =async (event) => {
        event.preventDefault()
        let tz = event.target[0].value
        let pwd = event.target[1].value
        try{
            //שליחת בקשת התחברות לשרת
            const res = await api.post('/users/login', { tz, password: pwd });
            // שמירת הטוקן והפרטים ב-localStorage
            localStorage.setItem('token', res.data.token);
            // שמירת פרטי המשתמש ב-Redux
            dispatch(setCurrent(res.data.user));
            if(res.data.user.isAsmin)
                navigate('/ViewRequest')
            else
                navigate('/Home')
        }
        catch(err){
            // אם יש שגיאה (משתמש לא נמצא או סיסמה שגויה), נציג הודעה מתאימה        
            if(err.response?.status===404){
              Swal.fire({
                    icon: 'error',
                    title: 'אופס! שגיאה',
                    text: 'המשתמש לא נמצא במערכת',
                    showCancelButton: true,
                    confirmButtonText: 'עבור להרשמה',
                    cancelButtonText: 'נסה שוב',
                    confirmButtonColor: '#333333',
                    cancelButtonColor: '#CCCCCC'
                }).then((result) => {
                    if (result.isConfirmed)
                        navigate('/Register')
                })  
            }
            // אם הסיסמה שגויה
            else if(err.response?.status===401){
                 Swal.fire({
                    icon: 'error',
                    title: 'סיסמה שגויה',
                    text: 'אנא נסי שוב',
                    confirmButtonColor: '#333333'
                })
        }

    }
}
    let Register = () => {
        navigate('/Register')
    }

    return (
        <div className={styles.formContainer}>
            <div className={styles.formCard}>
                <h1 className={styles.title}>כניסת משתמש</h1>
                <form className={styles.form} onSubmit={send}>
                    <label className={styles.label} htmlFor='T'>תעודת זהות:</label>
                    <input className={styles.input} id='T' name="tz" placeholder="הכנס תעודת זהות" type="number" />
                    <label className={styles.label} htmlFor='P'>סיסמה:</label>
                    <input className={styles.input} id='P' name="password" placeholder="הכנס סיסמה" type="password" />
                    <button className={styles.submitButton} type="submit">היכנס</button>
                </form>
                <button className={styles.secondaryButton} onClick={Register}>אם אין לך חשבון **(להרשמה)** </button>
            </div>
        </div>
    );
}