import { useDispatch } from "react-redux"
import { setCurrent } from "../../redux/UserSlice"
import { useNavigate } from "react-router-dom"
import styles from '../../css/logInAndRegister.module.css'
import Swal from 'sweetalert2'
import { useState } from "react"
import api from '../../../api'

export const Register = () => {

    const [errors, setErrors] = useState({
        tz: "",
        firstName: "",
        lastName: "",
        password: "",
        email: ""
    })

    const validateField = (name, value) => {
        let msg = "";
        switch (name) {
            case "tz":
                if (!/^\d{9}$/.test(value))
                    msg = "תעודת זהות חייבת להכיל 9 ספרות";
                break;
            case "firstName":
            case "lastName":
                if (!/^[A-Za-zא-ת]+$/.test(value))
                    msg = "רק אותיות מותרות";
                break;
            case "password":
                if (value.length < 6)
                    msg = "סיסמה חייבת לפחות 6 תווים";
                break;
            case "email":
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
                     msg = "כתובת מייל לא תקינה";
    break;
        }
        setErrors(prev => ({ ...prev, [name]: msg }));
        return msg === "";
    };

    const handleBlur = (event) => {
        const { name, value } = event.target;
        const valid = validateField(name, value);
        if (!valid) event.target.focus();
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const send = async (event) => {
        event.preventDefault()
        if (errors.password === "" && errors.firstName === "" && errors.lastName === "" && errors.tz === "" && errors.email === ""){
            
            const user = {
                tz: event.target[0].value,
                firstName: event.target[1].value,
                lastName: event.target[2].value,
                password: event.target[3].value,
                email: event.target[4].value
            }

            try {
                // שליחה לשרת
                await api.post('/users/register', user)

                // כניסה אוטומטית אחרי הרשמה
                const res = await api.post('/users/login', {
                    tz: user.tz,
                    password: user.password
                })

                // שמירת token
                localStorage.setItem('token', res.data.token)

                // שמירה ב-Redux
                dispatch(setCurrent(res.data.user))

                Swal.fire({
                    icon: 'success',
                    title: '!!!איזה כיף',
                    text: 'התחברת בהצלחה',
                    confirmButtonText: 'עבור לדף הבית',
                    confirmButtonColor: '#333333'
                }).then(() => {
                    navigate('/Home')
                })

            } catch (err) {
                // אם המשתמש כבר קיים
                if (err.response?.status === 400) {
                    Swal.fire({
                        icon: 'error',
                        title: 'אופס! שגיאה',
                        text: 'משתמש קיים במערכת',
                        confirmButtonText: 'עבור להתחברות',
                        confirmButtonColor: '#333333'
                    }).then(() => {
                        navigate('/LogIn')
                    })
                }
            }
        }
    }

    return (
        <div className={styles.formContainer}>
            <div className={styles.formCard}>
                <h1 className={styles.title}>הרשמה למערכת</h1>
                <form className={styles.form} onSubmit={send}>
                    <label className={styles.label} htmlFor="t">תעודת זהות:</label>
                    <input className={styles.input} id="t" name="tz" placeholder="הכנס תעודת זהות" type="number" onBlur={handleBlur} required />
                    {errors.tz && <p className={styles.error}>{errors.tz}</p>}
                    <label className={styles.label} htmlFor="f">שם פרטי:</label>
                    <input className={styles.input} id="f" name="firstName" placeholder="הכנס שם פרטי" onBlur={handleBlur} required />
                    {errors.firstName && <p className={styles.error}>{errors.firstName}</p>}
                    <label className={styles.label} htmlFor="l">שם משפחה:</label>
                    <input className={styles.input} id="l" name="lastName" placeholder="הכנס שם משפחה" onBlur={handleBlur} required />
                    {errors.lastName && <p className={styles.error}>{errors.lastName}</p>}
                    <label className={styles.label} htmlFor="p">סיסמה:</label>
                    <input className={styles.input} id="p" name="password" placeholder="הכנס סיסמה" type="password" onBlur={handleBlur} required />
                    {errors.password && <p className={styles.error}>{errors.password}</p>}
                    <label className={styles.label} htmlFor="e">אימייל:</label>
                    <input className={styles.input} id="e" name="email" placeholder="הכנס אימייל" type="email" onBlur={handleBlur} required />
                    {errors.email && <p className={styles.error}>{errors.email}</p>}
                    <button className={styles.submitButton} type='submit'>הרשם והיכנס</button>
                </form>
            </div>
        </div>
    );
}