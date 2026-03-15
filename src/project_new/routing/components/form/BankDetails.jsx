import { useDispatch, useSelector } from "react-redux";
import { save } from "../../../redux/RequestSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../../css/form.css'
import Swal from 'sweetalert2'
import api from '../../../../api'

const validateAll = (request) => {
    let errors = {};
    // *** בדיקות תקינות לכל השדות (כולל אלו שלא נבדקו ב-onBlur) ***
    if (!request.personal.dateOfBirth) errors["personal.dateOfBirth"] = "שדה חובה";
    if (!request.personal.adress) errors["personal.adress"] = "שדה חובה";
    else if (!/^[A-Za-z\u0590-\u05FF\s]+$/.test(request.personal.adress)) errors["personal.adress"] = "הכנס אותיות בלבד";
    if (!request.personal.phone) errors["personal.phone"] = "שדה חובה";
    else if (!/^\d{9,10}$/.test(request.personal.phone)) errors["personal.phone"] = "טלפון לא תקין";
    if (!request.family.parentsNames) errors["family.parentsNames"] = "שדה חובה";
    if (request.family.amountOfChildren === '' || request.family.amountOfChildren === undefined || request.family.amountOfChildren < 0) errors["family.amountOfChildren"] = "חובה לציין מספר ילדים";
    if (request.family.amountOfChildrenOver19 === '' || request.family.amountOfChildrenOver19 === undefined || request.family.amountOfChildrenOver19 < 0) errors["family.amountOfChildrenOver19"] = "שדה חובה";
    if (!request.study.trend) errors["study.trend"] = "שדה חובה";
    if (request.study.tuition === '' || request.study.tuition === undefined || request.study.tuition <= 0) errors["study.tuition"] = "שדה חובה";
    if (request.study.years === '' || request.study.years === undefined || request.study.years <= 0) errors["study.years"] = "שדה חובה";
    if (!request.bank.accountOwner) errors["bank.accountOwner"] = "שדה חובה";
    if (!request.bank.accountTz || String(request.bank.accountTz).length !== 9) errors["bank.accountTz"] = "ת\"ז לא תקינה (9 ספרות)";
    if (!request.bank.bankName) errors["bank.bankName"] = "בחר בנק";
    if (!request.bank.branch) errors["bank.branch"] = "שדה חובה";
    if (!request.bank.accountNumber) errors["bank.accountNumber"] = "שדה חובה";
    return errors;
};

export const BankDetails = (props) => {
    const dispatch = useDispatch();
    const [isChecked, setIsChecked] = useState(false)
    const navigate = useNavigate();
    const currentRequest = useSelector(state => state.Request.current)
    const submissionErrors = props.submissionErrors || {};
    const setSubmissionErrors = props.setSubmissionErrors;
    const navigateToStep = props.navigateToStep;

    const saveBank = (event) => {
        const { name, value } = event.target;
        dispatch(save({ group: "bank", name, value }));
        if (submissionErrors[`bank.${name}`] && setSubmissionErrors) {
            setSubmissionErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[`bank.${name}`];
                return newErrors;
            });
        }
    }

    const send = async (event) => {
        event.preventDefault();
        const errors = validateAll(currentRequest);
        if (setSubmissionErrors) setSubmissionErrors(errors);

        if (Object.keys(errors).length > 0) {
            Swal.fire({
                icon: 'error',
                title: 'שגיאה',
                text: 'נא מלא/י את כל השדות הנדרשים כראוי לפני השליחה.',
                confirmButtonText: 'סגור',
                confirmButtonColor: '#333333'
            });
            if (Object.keys(errors).some(key => key.startsWith('personal.')) && navigateToStep) { navigateToStep(0); return; }
            if (Object.keys(errors).some(key => key.startsWith('family.')) && navigateToStep) { navigateToStep(1); return; }
            if (Object.keys(errors).some(key => key.startsWith('study.')) && navigateToStep) { navigateToStep(2); return; }
            return;
        }

        if (setSubmissionErrors) setSubmissionErrors({});

        try {
            await api.post('/requests', currentRequest)
            // מחיקת הטיוטה אחרי שליחה מוצלחת
            await api.delete('/drafts')
            Swal.fire({
                icon: 'success',
                title: 'הטופס נשלח בהצלחה',
                text: 'המתן לאישור המנהל',
                confirmButtonText: 'סגור',
                confirmButtonColor: '#333333'
            }).then(() => navigate('/Home'))
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'שגיאה בשליחה',
                text: 'נסי שוב מאוחר יותר',
                confirmButtonColor: '#333333'
            })
        }
    }

    const renderError = (fieldName) => {
        return submissionErrors[`bank.${fieldName}`] ? <span className="error">{submissionErrors[`bank.${fieldName}`]}</span> : null;
    }

    return <>
        <form onSubmit={send}>
            <input name="accountOwner" value={currentRequest.bank.accountOwner} type="text" onChange={saveBank} placeholder="בעל החשבון" className={submissionErrors["bank.accountOwner"] ? 'input-error' : ''} />
            {renderError('accountOwner')}
            <input name="accountTz" value={currentRequest.bank.accountTz} onChange={saveBank} type="number" placeholder="מספר תעודת זהות" className={submissionErrors["bank.accountTz"] ? 'input-error' : ''} />
            {renderError('accountTz')}
            <select name="bankName" value={currentRequest.bank.bankName} onChange={saveBank} className={submissionErrors["bank.bankName"] ? 'input-error' : ''}>
                <option value="" disabled>בחר בנק</option>
                <option value="bank_hapoalim">בנק הפועלים</option>
                <option value="mercantile">מרכנתיל</option>
            </select>
            {renderError('bankName')}
            <input name="branch" value={currentRequest.bank.branch} onChange={saveBank} type="text" placeholder="מספר סניף" className={submissionErrors["bank.branch"] ? 'input-error' : ''} />
            {renderError('branch')}
            <input name="accountNumber" value={currentRequest.bank.accountNumber} onChange={saveBank} type="text" placeholder="מספר חשבון" className={submissionErrors["bank.accountNumber"] ? 'input-error' : ''} />
            {renderError('accountNumber')}
            <div className="checkbox-container">
                <input id="declaration" onChange={(e) => setIsChecked(e.target.checked)} type="checkbox" />
                <label htmlFor="declaration">אני מצהיר/ה שכל הפרטים שמסרתי נכונים</label>
            </div>
            <button disabled={!isChecked} type="submit" className="btn btn-submit">שליחת הטופס</button>
        </form>
    </>
}