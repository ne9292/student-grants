import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import '../../css/viewRequest.css'
import api from '../../../api'

export const ViewRequest = () => {
    const [waitingRequest, setWaitingRequest] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    // שליפת הבקשות מהשרת
    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const res = await api.get('/requests')
                setWaitingRequest(res.data)
            } catch (err) {
                console.error('שגיאה בשליפת הבקשות', err)
            } finally {
                setLoading(false)
            }
        }
        fetchRequests()
    }, [])

    const show = (id) => {
        navigate(`/Show/${id}`)
    }

    if (loading) return <p style={{ textAlign: 'center' }}>טוען בקשות...</p>

    return (
        <div className="contenerForm view-request-container">
            <h1>בקשות הממתינות לאישור</h1>
            {waitingRequest.length === 0 ? (
                <p>אין בקשות ממתינות לאישור.</p>
            ) : (
                <div className="requests-list">
                    {waitingRequest.map(req => (
                        <div key={req._id} className="request-card">
                            <div className="details-group">
                                <p className="detail-item"><strong>שם מלא:</strong> {req.personal.firstName} {req.personal.lastName}</p>
                                <p className="detail-item"><strong>ת.ז.:</strong> {req.personal.tz}</p>
                            </div>
                            <button
                                onClick={() => show(req._id)}
                                className="btn btn-primary btn-view"
                            >
                                לצפייה בבקשה
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}