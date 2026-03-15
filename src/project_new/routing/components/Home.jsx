import ChatImg from "../../css/messenger.png";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from '../../css/navAndHome.module.css';  
import { ChatWindow } from "./Chat/ChatWindow";
import { LockClosedIcon, PencilAltIcon, ClockIcon } from '@heroicons/react/solid'; // ייבוא אייקונים מודרניים

// נתוני עדויות פיקטיביות
const testimonials = [
    { name: "מאיה ל.", text: "התהליך היה מהיר ופשוט! קיבלתי אישור למענק שבועיים אחרי שהגשתי. תודה רבה על הסיוע המדהים!", city: "תל אביב" },
    { name: "איתי כ.", text: "אני רגיל לבירוקרטיה, אבל הטופס כאן באמת היה קל למילוי. אהבתי את האפשרות לעקוב אחר הסטטוס בכל רגע.", city: "ירושלים" },
    { name: "נועה ד.", text: "חשוב לי שהנתונים שלי יהיו מאובטחים, והמערכת הזו נתנה לי הרגשה של שקט נפשי. שירות מצוין!", city: "חיפה" },
];

export const Home = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);

    const users = useSelector(u => u.Users.current);
    const name = users && users.firstName ? users.firstName : 'אורח/ת';
    const isAuthenticated = !!users.tz;
    const navigate = useNavigate();

    const handleStartRequest = () => {
        if (isAuthenticated) {
            // אם המשתמש מחובר, נשלח לדף הגשת בקשה
            navigate('/Request')
        } else {
            // אם המשתמש לא מחובר, נשלח להרשמה
            navigate('/LogIn')
        }
    };

    return (
        <>
        <div className={styles.homeContainer}>
            
            {/* ☁️ Hero Section */}
            <div className={styles.heroSection}>
                <div className={styles.heroTitleContainer}>
                    <h1 className={styles.heroTitle}>
                        {isAuthenticated ? `שלום, ${name} אנחנו כאן כדי לעזור` : 'מענקי סיוע לסטודנטים | 2025'}
                    </h1>
                    <p className={styles.heroTagline}>
                        .הגש את בקשת המענק שלך באופן מקוון, פשוט ומאובטח
                    </p>
                    
                    <button 
                        className={styles.ctaButton} 
                        onClick={handleStartRequest}
                    >
                        {isAuthenticated ? 'הגשת בקשה למענק' : 'התחבר והתחל עכשיו'}
                    </button>
                    
                    {!isAuthenticated && (
                        <p className={styles.subtext}>
                            <span className={styles.boldText}>.על מנת לשמור את הנתונים שלך</span>, נדרשת כניסה או הרשמה
                        </p>
                    )}
                </div>
            </div>

            {/* 🗂️ Content Grid */}
<h2 className={styles.mainContentTitle}>?למה להגיש דרכנו</h2>
            <div className={styles.contentGrid}>
                
                <div className={styles.card}>
                    <div className={styles.iconHeader}>
                      <LockClosedIcon className="h-6 w-6 text-gray-900" /> {/* הקטנת האייקון */}
                        <h2 className={styles.cardTitle}>אבטחת מידע מרבית</h2>
                    </div>
                    <p className={styles.description}>
                        הנתונים האישיים, הפיננסיים והלימודיים שלך מוצפנים ונשמרים בהתאם לסטנדרטים המחמירים ביותר.
                    </p>
                </div>
                
                <div className={styles.card}>
                    <div className={styles.iconHeader}>
                        <PencilAltIcon className="h-12 w-12 text-gray-900" />
                        <h2 className={styles.cardTitle}>טופס רב-שלבי פשוט</h2>
                    </div>
                    <p className={styles.description}>
                        תהליך ההגשה מחולק לשלבים קצרים וברורים. המערכת שומרת את התקדמותך אוטומטית בכל שלב.
                    </p>
                </div>

                <div className={styles.card}>
                    <div className={styles.iconHeader}>
                        <ClockIcon className="h-12 w-12 text-gray-900" />
                        <h2 className={styles.cardTitle}>סטטוס עדכני תמיד</h2>
                    </div>
                    <p className={styles.description}>
                        אין צורך לחכות. לאחר השליחה, ניתן לעקוב מיידית אחר סטטוס הבקשה שלך.
                    </p>
                </div>

            </div>

            {/* 💬 Testimonials */}
            <h2 className={styles.mainContentTitle}>הסטודנטים ממליצים</h2>
            <div className={styles.testimonialsGrid}>
                {testimonials.map((t, index) => (
                   <div key={index} className={styles.testimonialCard}>
    <span className={styles.quoteIcon}>❝</span>
    <p className={styles.testimonialText}>{t.text}</p>
    <p className={styles.testimonialAuthor}>
        {t.name} | {t.city}
    </p>
</div>
                ))}
            </div>

            {/* 📚 About */}
            <div className={styles.aboutSection}>
                <h2 className={styles.aboutTitle}>אודות המערכת</h2>
                <p className={styles.aboutText}>
                    מערכת זו פותחה במטרה להקל על סטודנטים בדרכם האקדמית על ידי פישוט תהליך קבלת הסיוע הכלכלי.  
                    אנו מחויבים לשקיפות מלאה ולשירות מהיר ויעיל.  
                    <br/>לכל שאלה נוספת, ניתן לפנות אלינו לאחר הכניסה למערכת.
                </p>
            </div>

        </div>

        {/* 💬 חלון הצ'אט */}
        {isChatOpen && <ChatWindow onClose={() => setIsChatOpen(false)} />}

        {/* כפתור צ'אט */}
        <button 
    onClick={() => setIsChatOpen(true)}
    style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        background: "#FFFFFF",      // רקע לבן
        border: "2px solid #000000", // מסגרת שחורה
        cursor: "pointer",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "8px"              // כדי שלא ייחתך
    }}
>
    <img 
        src={ChatImg} 
        alt="robot"
        style={{
            width: "32px",
            height: "32px",
            objectFit: "contain"
        }}
    />
</button>

        </>
    );
};
