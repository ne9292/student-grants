import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// מייל אישור קבלת בקשה
export const sendRequestConfirmation = async (toEmail, firstName) => {
    await transporter.sendMail({
        from: `"מערכת מענקים" <${process.env.EMAIL_USER}>`,
        to: toEmail,
        subject: 'בקשתך התקבלה במערכת',
        html: `
            <div style="direction:rtl; font-family:Arial">
                <h2>שלום ${firstName}!</h2>
                <p>בקשתך למענק התקבלה במערכת בהצלחה ✅</p>
                <p>הבקשה שלך נמצאת כעת בבדיקה ונעדכן אותך בהקדם.</p>
                <br/>
                <p>בברכה,<br/>מערכת מענקים לסטודנטים</p>
            </div>
        `
    });
};

// מייל אישור בקשה
export const sendRequestApproved = async (toEmail, firstName) => {
    await transporter.sendMail({
        from: `"מערכת מענקים" <${process.env.EMAIL_USER}>`,
        to: toEmail,
        subject: 'בקשתך אושרה!',
        html: `
            <div style="direction:rtl; font-family:Arial">
                <h2>שלום ${firstName}!</h2>
                <p>שמחים לבשר לך כי בקשתך למענק <strong>אושרה!</strong> 🎉</p>
                <p>הכסף יועבר לחשבונך בהקדם.</p>
                <br/>
                <p>בברכה,<br/>מערכת מענקים לסטודנטים</p>
            </div>
        `
    });
};

// מייל דחיית בקשה
export const sendRequestRejected = async (toEmail, firstName) => {
    await transporter.sendMail({
        from: `"מערכת מענקים" <${process.env.EMAIL_USER}>`,
        to: toEmail,
        subject: 'עדכון לגבי בקשתך',
        html: `
            <div style="direction:rtl; font-family:Arial">
                <h2>שלום ${firstName}!</h2>
                <p>לצערנו בקשתך למענק <strong>נדחתה</strong>.</p>
                <p>באפשרותך להגיש ערעור או לפנות אלינו לפרטים נוספים.</p>
                <br/>
                <p>בברכה,<br/>מערכת מענקים לסטודנטים</p>
            </div>
        `
    });
};