import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { save } from "../../../redux/RequestSlice";

export const PersonalDetails = (props) => {
    const dispatch = useDispatch();
    const current = useSelector(state => state.Users.current);
    const currentRequest = useSelector(state => state.Request.current);
    const [errors, setErrors] = useState({});
    const submissionErrors = props.submissionErrors || {};

    useEffect(() => {
        dispatch(save({ group: "personal", name: "tz", value: current.tz }));
        dispatch(save({ group: "personal", name: "firstName", value: current.firstName }));
        dispatch(save({ group: "personal", name: "lastName", value: current.lastName }));
    }, [current]);

    const validate = (name, value) => {
        if (["tz", "firstName", "lastName"].includes(name)) return;

        let errorMsg = "";
        if (value) {
            if (name === "adress" && !/^[A-Za-z֐-׿\s]+$/.test(value))
                errorMsg = "הכנס אותיות בלבד";
            else if (name === "phone" && !/^\d{9,10}$/.test(value))
                errorMsg = "טלפון לא תקין";
        }

        setErrors(prev => ({ ...prev, [name]: errorMsg }));
    };

    const savePersonal = (event) => {
        const { name, value } = event.target;
        dispatch(save({ group: "personal", name, value }));
    };

    const getError = (fieldName) => {
        if (submissionErrors[`personal.${fieldName}`])
            return submissionErrors[`personal.${fieldName}`];
        if (errors[fieldName])
            return errors[fieldName];
        return null;
    }

    return (
        <form className="personal-form">
            <input
                name="tz"
                value={currentRequest.personal.tz}
                placeholder="תעודת זהות"
                onChange={savePersonal}
                readOnly
            />
            <input
                name="firstName"
                value={currentRequest.personal.firstName}
                placeholder="שם פרטי"
                onChange={savePersonal}
                readOnly
            />
            <input
                name="lastName"
                value={currentRequest.personal.lastName}
                placeholder="שם משפחה"
                onChange={savePersonal}
                readOnly
            />
            <input
                name="dateOfBirth"
                type="date"
                value={currentRequest.personal.dateOfBirth}
                onChange={savePersonal}
                className={getError('dateOfBirth') ? 'input-error' : ''}
            />
            {getError('dateOfBirth') && <span className="error">{getError('dateOfBirth')}</span>}
            <input
                name="adress"
                type="text"
                value={currentRequest.personal.adress}
                placeholder="כתובת"
                onChange={savePersonal}
                onBlur={(e) => validate(e.target.name, e.target.value)}
                className={getError('adress') ? 'input-error' : ''}
            />
            {getError('adress') && <span className="error">{getError('adress')}</span>}
            <input
                name="phone"
                type="tel"
                value={currentRequest.personal.phone}
                placeholder="טלפון"
                onChange={savePersonal}
                onBlur={(e) => validate(e.target.name, e.target.value)}
                className={getError('phone') ? 'input-error' : ''}
            />
            {getError('phone') && <span className="error">{getError('phone')}</span>}
        </form>
    );
};
