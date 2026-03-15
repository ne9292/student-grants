import { useDispatch, useSelector } from "react-redux";
import { save } from "../../../redux/RequestSlice";

// *** שינוי: הוספנו קבלת props כדי לקבל את השגיאות לאחר לחיצת שליחה ***
export const FamilyDetails = (props) => { 
    //הבקשה הנוכחית שעליה נעבוד
    const currentRequest = useSelector(state => state.Request.current)
    const dispatch = useDispatch();

    // *** שגיאות גלובליות שנשלחו מכפתור השליחה ***
    const submissionErrors = props.submissionErrors || {};

    //currentRequestפונקציה ששומרת את פרטי המשפחה ב
    const savefamily = (event) => {
        dispatch(save({
            group: "family",
            name: event.target.name,
            value: event.target.value
        }));
    }

    // רנדור השגיאות
    const renderError = (fieldName) => {
        return submissionErrors[`family.${fieldName}`] ? <span className="error">{submissionErrors[`family.${fieldName}`]}</span> : null;
    }


    return <>
        <form action="">
            <input 
                name="parentsNames" 
                value={currentRequest.family.parentsNames} 
                onChange={savefamily} 
                type="text" 
                placeholder="שמות ההורים" 
                // *** הוספת קלאס error ***
                className={submissionErrors["family.parentsNames"] ? 'input-error' : ''}
            />
            {renderError('parentsNames')}

            <input 
                name="amountOfChildren" 
                value={currentRequest.family.amountOfChildren} 
                onChange={savefamily} 
                type="number" 
                placeholder="מספר הילדים" 
                // *** הוספת קלאס error ***
                className={submissionErrors["family.amountOfChildren"] ? 'input-error' : ''}
            />
            {renderError('amountOfChildren')}

            <input 
                name="amountOfChildrenOver19" 
                value={currentRequest.family.amountOfChildrenOver19} 
                onChange={savefamily} 
                type="number" 
                placeholder="מספר הילדים מעל גיל 19" 
                // *** הוספת קלאס error ***
                className={submissionErrors["family.amountOfChildrenOver19"] ? 'input-error' : ''}
            />
            {renderError('amountOfChildrenOver19')}
        </form>
        </>
}