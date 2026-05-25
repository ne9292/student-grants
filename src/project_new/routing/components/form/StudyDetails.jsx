import { useDispatch, useSelector } from "react-redux";
import { save } from "../../../redux/RequestSlice";

// *** שינוי: הוספנו קבלת props כדי לקבל את השגיאות לאחר לחיצת שליחה ***
export const StudyDetails = (props) => {
    const dispatch = useDispatch();
    //הבקשה הנוכחית שעליה נעבוד
    const currentRequest = useSelector(state => state.Request.current)

    // *** שגיאות גלובליות שנשלחו מכפתור השליחה ***
    const submissionErrors = props.submissionErrors || {};

    //currentRequestפונקציה ששומרת את פרטי הלימוד ב
    const saveStudy = (event) => {
        dispatch(save({
            group: "study",
            name: event.target.name,
            value: event.target.value
        }));
    }

    // רנדור השגיאות
    const renderError = (fieldName) => {
        return submissionErrors[`study.${fieldName}`] ? <span className="error">{submissionErrors[`study.${fieldName}`]}</span> : null;
    }


    return <>
        <form action="">

            <input 
                name="trend" 
                value={currentRequest.study.trend} 
                type="text" 
                onChange={saveStudy} 
                placeholder="מגמה" 
                // *** הוספת קלאס error ***
                className={submissionErrors["study.trend"] ? 'input-error' : ''}
            />
            {renderError('trend')}

            <input 
                name="tuition" 
                value={currentRequest.study.tuition} 
                type="number" 
                onChange={saveStudy} 
                placeholder="שכר לימוד שנתי" 
                // *** הוספת קלאס error ***
                className={submissionErrors["study.tuition"] ? 'input-error' : ''}
            />
            {renderError('tuition')}

            <input 
                name="years" 
                value={currentRequest.study.years} 
                type="number" 
                onChange={saveStudy} 
                placeholder="שנות לימוד" 
                // *** הוספת קלאס error ***
                className={submissionErrors["study.years"] ? 'input-error' : ''}
            />
            {renderError('years')}
        </form>
        </>
}