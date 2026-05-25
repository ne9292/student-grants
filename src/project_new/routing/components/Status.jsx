import { AiOutlineHourglass, AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import "../../css/status.css";
import api from '../../../api'

export const Status = () => {
  const current = useSelector((state) => state.Users.current)
  const [lastRequest, setLastRequest] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();

  useEffect(() => {
    if (!current?.tz) {
      Swal.fire({
        icon: "error",
        title: "!!!אופס",
        text: "אינך מחובר למערכת",
        confirmButtonText: "עבור להתחברות",
        confirmButtonColor: "#222",
      }).then(() => navigate("/LogIn"));
      return;
    }

    // שליפת הבקשה האחרונה של המשתמש מהשרת
    const fetchMyRequest = async () => {
      try {
        const res = await api.get(`/requests/my/${current.tz}`)
        setLastRequest(res.data)
      } catch (err) {
        // אם אין בקשה — לא שגיאה
        if (err.response?.status !== 404) {
          console.error('שגיאה בשליפת הבקשה', err)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchMyRequest()
  }, [current, navigate]);

  const getIcon = () => {
    if (!lastRequest) return <AiOutlineHourglass size={80} color="#222" />;
    switch (lastRequest.status) {
      case "waiting": return <AiOutlineHourglass size={80} color="#999" />;
      case "allow": return <AiOutlineCheck size={80} color="#222" />;
      case "reject": return <AiOutlineClose size={80} color="#222" />;
      default: return null;
    }
  };

  if (loading) return <p style={{ textAlign: 'center' }}>טוען סטטוס...</p>

  return (
    <div className="statusWrapper">
      <div className="statusCard">
        <div className="statusIcon">{getIcon()}</div>
        {!lastRequest ? (
          <>
            <h2 className="statusTitle">אין בקשות להצגה</h2>
            <p className="statusDesc">
              ברגע שתשלחי בקשה, תוכלי לעקוב כאן אחרי כל שלב בתהליך.
            </p>
          </>
        ) : (
          <>
            {lastRequest.status === "waiting" && <h2 className="statusTitle">הבקשה בטיפול</h2>}
            {lastRequest.status === "allow" && <h2 className="statusTitle">הבקשה אושרה</h2>}
            {lastRequest.status === "reject" && <h2 className="statusTitle">הבקשה נדחתה</h2>}

            <p className="statusDesc">
              {lastRequest.status === "waiting" && "בקשתך נקלטה והיא עוברת בדיקה. נעדכן כאן ברגע שתתקבל החלטה."}
              {lastRequest.status === "allow" && `שמחים לבשר כי בקשתך נמצאה מתאימה. סכום המענק: ${lastRequest.amount || "לא מוזן"} ₪`}
              {lastRequest.status === "reject" && "לצערנו הבקשה לא עמדה בקריטריונים. באפשרותך להגיש ערעור."}
            </p>

            <div className="statusBtnRow">
              <button
                className="statusBtn"
                onClick={() => lastRequest?._id && navigate(`/ShowRequest/${lastRequest._id}`)}>
                צפייה בבקשה המלאה
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};