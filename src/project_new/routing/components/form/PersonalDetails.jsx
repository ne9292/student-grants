import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { save } from "../../../redux/RequestSlice";

// *** שינוי: הוספנו קבלת props כדי לקבל את השגיאות לאחר לחיצת שליחה ***
export const PersonalDetails = (props) => { 

    const dispatch = useDispatch();

    // המשתמש הרשום
    const current = useSelector(state => state.Users.current);

    // הבקשה הנוכחית
    const currentRequest = useSelector(state => state.Request.current);

    // שגיאות מקומיות (יוצגו רק ב-onBlur)
    const [errors, setErrors] = useState({});

    // *** שגיאות גלובליות שנשלחו מכפתור השליחה ***
    const submissionErrors = props.submissionErrors || {};


    // מילוי אוטומטי של שלושת השדות הראשונים
    useEffect(() => {
        dispatch(save({ group: "personal", name: "tz", value: current.tz }));
        dispatch(save({ group: "personal", name: "firstName", value: current.firstName }));
        dispatch(save({ group: "personal", name: "lastName", value: current.lastName }));
    }, [current]);


    // פונקציית בדיקת תקינות מקומית (onBlur)
    const validate = (name, value) => {

        // ❗ לא מבצעים בדיקה על שלושת הראשונים
        if (["tz", "firstName", "lastName"].includes(name)) return;

        let errorMsg = "";

        // בדיקות תקינות רק על השדות הנדרשים:
        // *** הסרנו את בדיקת החובה הראשונית (היא מטופלת בשליחה) ***
        // *** אנו בודקים תקינות רק אם יש ערך (כדי לא לצבוע באדום לפני כתיבה) ***
        
        if (value) {
            if (name === "adress" && !/^[A-Za-z\u0590-\u05FF\s]+$/.test(value))
                errorMsg = "הכנס אותיות בלבד";

            else if (name === "phone" && !/^\d{9,10}$/.test(value))
                errorMsg = "טלפון לא תקין";
        }


        // שמירת השגיאה המתאימה
        setErrors(prev => ({ ...prev, [name]: errorMsg }));
    };


    // שמירת ערכים + בדיקה
    const savePersonal = (event) => {
        const { name, value } = event.target;

        dispatch(save({ group: "personal", name, value }));
        // *** לא מפעילים validate בזמן כתיבה (onChange) כדי למנוע צביעה באדום תוך כדי הקלדה ***
        // validate(name, value);
    };

    
    // פונקציה לבדיקת השגיאה: קודם שגיאת שליחה, ואז שגיאת onBlur
    const getError = (fieldName) => {
        // שגיאה משליחה (צובע באדום):
        if (submissionErrors[`personal.${fieldName}`]) {
            return submissionErrors[`personal.${fieldName}`];
        }
        // שגיאת onBlur (יופיע רק אם יש טקסט ב-errors המקומי):
        if (errors[fieldName]) {
            return errors[fieldName];
        }
        return null;
    }


    return (
        <form className="personal-form">

            {/* ת"ז */}
            <input
                name="tz"
                value={currentRequest.personal.tz}
                placeholder="תעודת זהות"
                onChange={savePersonal}
                readOnly
            />


            {/* שם פרטי */}
            <input
                name="firstName"
                value={currentRequest.personal.firstName}
                placeholder="שם פרטי"
                onChange={savePersonal}
                readOnly
            />


            {/* שם משפחה */}
            <input
                name="lastName"
                value={currentRequest.personal.lastName}
                placeholder="שם משפחה"
                onChange={savePersonal}
                readOnly
            />


            {/* תאריך לידה */}
            <input
                name="dateOfBirth"
                type="date"
                value={currentRequest.personal.dateOfBirth}
                onChange={savePersonal}
                // *** הוספת קלאס error ***
                className={getError('dateOfBirth') ? 'input-error' : ''}
            />
            {getError('dateOfBirth') && <span className="error">{getError('dateOfBirth')}</span>}


            {/* כתובת */}
            <input
                name="adress"
                type="text"
                value={currentRequest.personal.adress}
                placeholder="כתובת"
                onChange={savePersonal}
                onBlur={(e) => validate(e.target.name, e.target.value)}
                // *** הוספת קלאס error ***
                className={getError('adress') ? 'input-error' : ''}
            />
            {getError('adress') && <span className="error">{getError('adress')}</span>}


            {/* טלפון */}
            <input
                name="phone"
                type="tel"
                value={currentRequest.personal.phone}
                placeholder="טלפון"
                onChange={savePersonal}
                onBlur={(e) => validate(e.target.name, e.target.value)}
                // *** הוספת קלאס error ***
                className={getError('phone') ? 'input-error' : ''}
            />
            {getError('phone') && <span className="error">{getError('phone')}</span>}

        </form>
    );
};