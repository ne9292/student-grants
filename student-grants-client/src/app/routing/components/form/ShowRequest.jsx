import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import '../../../css/viewRequest.css'
import api from '../../../../api'

export const ShowRequest = () => {

    let navigate = useNavigate()
    const { id } = useParams()
    const [request, setRequest] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchRequest = async () => {
            try {
                const res = await api.get(`/requests/${id}`)
                setRequest(res.data)
            } catch (err) {
                console.error('שגיאה בשליפת הבקשה', err)
            } finally {
                setLoading(false)
            }
        }
        fetchRequest()
    }, [id])

    if (loading) return <p style={{ textAlign: 'center' }}>טוען בקשה...</p>

    if (!request) {
        return (
            <div className="contenerForm" style={{ textAlign: 'center', color: 'var(--color-accent)' }}>
                <h2>הבקשה לא נמצאה.</h2>
                <button onClick={() => navigate('/Status')} className="btn btn-primary">חזור לסטטוס</button>
            </div>
        );
    }

    return (
        <div className="contenerForm show-request-container">
            <h1>פרטי הבקשה המלאים</h1>

            <div className="detail-section">
                <h2>פרטים אישיים</h2>
                <div className="detail-grid">
                    <p><strong>ת״ז:</strong> {request.personal.tz}</p>
                    <p><strong>שם פרטי:</strong> {request.personal.firstName}</p>
                    <p><strong>שם משפחה:</strong> {request.personal.lastName}</p>
                    <p><strong>תאריך לידה:</strong> {request.personal.dateOfBirth}</p>
                    <p><strong>כתובת:</strong> {request.personal.adress}</p>
                    <p><strong>טלפון:</strong> {request.personal.phone}</p>
                </div>
            </div>

            <div className="detail-section">
                <h2>פרטי משפחה</h2>
                <div className="detail-grid">
                    <p><strong>שמות ההורים:</strong> {request.family.parentsNames}</p>
                    <p><strong>מספר ילדים:</strong> {request.family.amountOfChildren}</p>
                    <p><strong>ילדים מעל 19:</strong> {request.family.amountOfChildrenOver19}</p>
                </div>
            </div>

            <div className="detail-section">
                <h2>פרטי לימודים</h2>
                <div className="detail-grid">
                    <p><strong>מגמה:</strong> {request.study.trend}</p>
                    <p><strong>שכר לימוד:</strong> {request.study.tuition}</p>
                    <p><strong>שנות לימוד:</strong> {request.study.years}</p>
                </div>
            </div>

            <div className="detail-section">
                <h2>פרטי בנק</h2>
                <div className="detail-grid">
                    <p><strong>בעל החשבון:</strong> {request.bank.accountOwner}</p>
                    <p><strong>ת״ז בעל החשבון:</strong> {request.bank.accountTz}</p>
                    <p><strong>שם הבנק:</strong> {request.bank.bankName}</p>
                    <p><strong>סניף:</strong> {request.bank.branch}</p>
                    <p><strong>מספר חשבון:</strong> {request.bank.accountNumber}</p>
                </div>
            </div>
        </div>
    );
}