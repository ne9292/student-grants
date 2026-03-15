// קובץ: Father.jsx
import React, { useState } from "react";
import '../../../css/form.css'
import { useSelector } from "react-redux"
import api from "../../../../api"

export const Father=(props)=>{
    // הבקשה הנוכחית שעליה נעבוד
    const currentRequest = useSelector(state => state.Request.current)

    // מערך של כל הילדים
    let child=React.Children.toArray(props.children);
    const [num,setNum] = useState(0);
    // *** נוסף: שמירת השגיאות מהשלב האחרון. מתחיל ריק. ***
    const [submissionErrors, setSubmissionErrors] = useState({}); 

const prev = async () => {
    await saveDraft() // ← שמור לפני מעבר
    if (num > 0) setNum(num - 1)
}

const next = async () => {
    await saveDraft() // ← שמור לפני מעבר
    if (num < child.length - 1) setNum(num + 1)
}
//פונקצית שמירה
    const saveDraft = async () => {
    try {
        //הולכת לשרת וקוראת לפונקציה ששומרת את הטיוטה
        await api.post('/drafts', currentRequest)
    } catch (err) {
        console.log('שגיאה בשמירת טיוטה', err)
    }
}

    {/* מציג את מה שבחור עכשיו */}
    const currentChild=()=>{
        // *** שינוי: מעביר את setSubmissionErrors ו-submissionErrors כ-props לילד הנוכחי ***
        return React.cloneElement(child[num], { 
            submissionErrors: submissionErrors,
            setSubmissionErrors: setSubmissionErrors,
            // נדרש: פונקציה שתאפשר לנווט לשלב מסוים מ-BankDetails
            navigateToStep: setNum 
        });
    }
    

    return<>
    <div className="contenerForm">
    <h1 className="form-header">
            טופס בקשה ממוחשב לקבלת מענק סיוע
        </h1>
        <div className="selectForm">
            {/* מציג 4 כפתורים שכשלוחצים זה מעביר שלב */}
            {/* {child.map((x,i)=><button onClick={()=>setNum(i)} className='select'>{i+1}</button>)} */}
            {child.map((x,i)=>(
                <button 
                    key={i} 
                    onClick={()=>setNum(i)} 
                    // *** הוספת הקלאס ACTIVE ***
                    className={`select ${i === num ? 'active' : ''}`}
                >
                    {i+1}
                </button>
            ))}
        </div>
        <div className="currentChild">
            {/* מציג את מה שבחור עכשיו */}
            {currentChild()}
        </div >
        <div className="button-group">
            {num>0 && (
        <button className='btn btn-secondary' onClick={prev}>חזור</button>)}
        {num < child.length-1 && (
        <button className='btn btn-primary' onClick={next}>הבא</button>)}
        </div>
    </div>
    </>

}