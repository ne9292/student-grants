import React, { useState } from "react";
import '../../../css/form.css'
import { useSelector } from "react-redux"
import api from "../../../../api"

export const Father = (props) => {
    const currentRequest = useSelector(state => state.Request.current)
    const child = React.Children.toArray(props.children);
    const [num, setNum] = useState(0);
    const [submissionErrors, setSubmissionErrors] = useState({});

    const saveDraft = async () => {
        try {
            await api.post('/drafts', currentRequest)
        } catch (err) {
            console.log('שגיאה בשמירת טיוטה', err)
        }
    }

    const prev = async () => {
        await saveDraft()
        if (num > 0) setNum(num - 1)
    }

    const next = async () => {
        await saveDraft()
        if (num < child.length - 1) setNum(num + 1)
    }

    const currentChild = () => {
        return React.cloneElement(child[num], {
            submissionErrors,
            setSubmissionErrors,
            navigateToStep: setNum
        });
    }

    return (
        <div className="contenerForm">
            <h1 className="form-header">
                טופס בקשה ממוחשב לקבלת מענק סיוע
            </h1>
            <div className="selectForm">
                {child.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setNum(i)}
                        className={`select ${i === num ? 'active' : ''}`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
            <div className="currentChild">
                {currentChild()}
            </div>
            <div className="button-group">
                {num > 0 && (
                    <button className='btn btn-secondary' onClick={prev}>חזור</button>
                )}
                {num < child.length - 1 && (
                    <button className='btn btn-primary' onClick={next}>הבא</button>
                )}
            </div>
        </div>
    )
}
