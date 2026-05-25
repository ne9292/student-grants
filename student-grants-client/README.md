# Student Grants - מענקי סיוע לסטודנטים

מערכת מקוונת להגשת בקשות מענק סיוע לסטודנטים, כולל ניהול בקשות עבור מנהלים.

## טכנולוגיות

- **React 19** עם React Router v7
- **Redux Toolkit** לניהול state
- **Axios** לתקשורת עם השרת
- **SweetAlert2** להתראות
- **JWT** לאימות משתמשים

## תכונות

### משתמש רגיל
- הרשמה והתחברות עם אימות JWT
- טופס הגשת בקשה רב-שלבי (פרטים אישיים, משפחה, לימודים, בנק)
- שמירת טיוטה אוטומטית בכל מעבר בין שלבים
- מעקב אחר סטטוס הבקשה
- צ'אט עם נציג

### מנהל
- צפייה בכל הבקשות הממתינות
- אישור או דחיית בקשות

## התקנה והרצה

```bash
cd student-grants-client
npm install
npm start
```

השרת צריך לרוץ על `http://localhost:5000`.

## מבנה הפרויקט

```
src/
├── app/
│   ├── redux/          # Store, UserSlice, RequestSlice
│   └── routing/
│       ├── Nav.jsx
│       ├── Routing.jsx
│       └── components/
│           ├── form/   # טופס רב-שלבי
│           ├── Chat/   # צ'אט עם נציג
│           └── ...
├── api.js              # הגדרת Axios + JWT interceptor
└── App.js
```
