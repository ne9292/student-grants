# מערכת מענקים לסטודנטים — Student Grants System

מערכת Full-Stack לניהול בקשות מענק סיוע לסטודנטים.  
הסטודנט מגיש בקשה דרך טופס מרובה שלבים, והמנהל מאשר או דוחה — עם התראות במייל בכל שלב.

---

## תוכן עניינים

- [ארכיטקטורה](#ארכיטקטורה)
- [Client — student-grants-client](#client--student-grants-client)
- [Server — student-grants-server](#server--student-grants-server)
- [התקנה והרצה](#התקנה-והרצה)
- [API Reference](#api-reference)
- [משתני סביבה](#משתני-סביבה)

---

## ארכיטקטורה

```
student-grants-client/   ← React 19 + Redux + React Router
student-grants-server/   ← Node.js + Express 5 + MongoDB (Mongoose)
```

- הקליינט רץ על `http://localhost:3000`
- השרת רץ על `http://localhost:5000`
- תקשורת דרך REST API עם JWT לאימות

---

## Client — student-grants-client

### טכנולוגיות

| חבילה | גרסה | שימוש |
|---|---|---|
| React | 19.2 | UI framework |
| React Router DOM | 7.10 | ניתוב |
| Redux Toolkit | 2.11 | ניהול State |
| Axios | 1.13 | HTTP requests |
| React-Toastify | 11 | התראות |
| SweetAlert2 | 11 | חלונות אישור |
| React Icons / Heroicons | — | אייקונים |

### מבנה תיקיות

```
src/
├── App.js                  # נקודת כניסה, מגדיר כותרת דף
├── api.js                  # הגדרת Axios + interceptor לטוקן
├── app/
│   ├── Main.jsx            # עוטף את כל האפליקציה (Provider, Router, AuthLoader)
│   ├── redux/
│   │   ├── Store.jsx       # הגדרת Redux store
│   │   ├── UserSlice.js    # state של המשתמש המחובר
│   │   └── RequestSlice.js # state של הבקשה הנוכחית
│   ├── routing/
│   │   ├── Routing.jsx     # הגדרת כל הנתיבים
│   │   ├── Nav.jsx         # סרגל ניווט עם הרשאות
│   │   └── components/
│   │       ├── Home.jsx        # דף הבית
│   │       ├── LogIn.jsx       # כניסה למערכת
│   │       ├── Register.jsx    # הרשמה
│   │       ├── Request.jsx     # עמוד הגשת בקשה
│   │       ├── Status.jsx      # צפייה בסטטוס הבקשה
│   │       ├── ViewRequest.jsx # רשימת בקשות למנהל
│   │       ├── Show.jsx        # פרטי בקשה + אישור/דחייה (מנהל)
│   │       ├── Chat/
│   │       │   └── ChatWindow.jsx
│   │       └── form/
│   │           ├── Father.jsx         # מנהל רב-שלבי של הטופס
│   │           ├── FatherMain.jsx     # טעינת טיוטה + הרכבת הטופס
│   │           ├── PersonalDetails.jsx  # שלב 1 — פרטים אישיים
│   │           ├── FamilyDetails.jsx    # שלב 2 — פרטי משפחה
│   │           ├── StudyDetails.jsx     # שלב 3 — פרטי לימודים
│   │           ├── BankDetails.jsx      # שלב 4 — פרטי בנק + שליחה
│   │           └── ShowRequest.jsx      # צפייה בבקשה שהוגשה
│   └── css/                # קבצי עיצוב לפי קומפוננטה
```

### Redux State

```js
{
  Users: {
    current: {           // המשתמש המחובר
      tz: string,
      firstName: string,
      lastName: string,
      isAdmin: boolean
    }
  },
  Request: {
    current: {           // הטופס הנוכחי בעבודה
      personal: { tz, firstName, lastName, dateOfBirth, adress, phone },
      family:   { parentsNames, amountOfChildren, amountOfChildrenOver19 },
      study:    { trend, tuition, years },
      bank:     { accountOwner, accountTz, bankName, branch, accountNumber }
    }
  }
}
```

### נתיבים (Routes)

| נתיב | קומפוננטה | הרשאה |
|---|---|---|
| `/` , `/Home` | `Home` | ציבורי |
| `/LogIn` | `LogIn` | ציבורי |
| `/Register` | `Register` | ציבורי |
| `/Request` | `Request` | מחובר |
| `/Status` | `Status` | מחובר |
| `/ShowRequest/:id` | `ShowRequest` | מחובר |
| `/ViewRequest` | `ViewRequest` | מנהל בלבד |
| `/Show/:id` | `Show` | מנהל בלבד |

### אימות (Auth)

- הטוקן נשמר ב-`localStorage` תחת המפתח `token`
- Axios interceptor מוסיף אוטומטית `Authorization: Bearer <token>` לכל בקשה
- בטעינת האפליקציה — `AuthLoader` בודק אם קיים טוקן ומשחזר את session המשתמש מ-`GET /api/users/me`
- ניווט מותנה לפי `isAuthenticated` (בדיקה שקיים `current.tz`)

### שמירת טיוטה

בכל מעבר בין שלבי הטופס (קדימה / אחורה), הטופס נשמר אוטומטית כטיוטה בשרת.  
בכניסה לדף הטופס, הטיוטה הקיימת נטענת חזרה ל-Redux.

---

## Server — student-grants-server

### טכנולוגיות

| חבילה | גרסה | שימוש |
|---|---|---|
| Express | 5.2 | Web framework |
| Mongoose | 9.3 | MongoDB ODM |
| jsonwebtoken | 9.0 | JWT |
| bcrypt | 6.0 | הצפנת סיסמאות |
| nodemailer | 8.0 | שליחת מיילים |
| cors | 2.8 | Cross-Origin |
| dotenv | 17.3 | משתני סביבה |
| joi | 18.0 | ולידציה |

### מבנה תיקיות

```
student-grants-server/
├── server.js           # הגדרת Express, חיבור MongoDB, רישום routes
├── .env                # משתני סביבה (לא מועלה ל-git)
├── models/
│   ├── User.js         # סכמת משתמש
│   ├── Request.js      # סכמת בקשת מענק
│   └── Draft.js        # סכמת טיוטה
├── routes/
│   ├── userRoutes.js   # /api/users
│   ├── requestRoutes.js # /api/requests
│   └── draftRoutes.js  # /api/drafts
├── controllers/
│   ├── userController.js
│   ├── requestController.js
│   └── draftController.js
├── middleware/
│   └── auth.js         # requireAuth, requireAdmin
└── utils/
    └── mailer.js       # פונקציות שליחת מייל
```

### מודלים (MongoDB Schemas)

#### User
```js
{
  tz:        String  (required, unique),  // תעודת זהות
  firstName: String  (required),
  lastName:  String  (required),
  password:  String  (required),          // מוצפן עם bcrypt (10 rounds)
  email:     String  (default: ''),
  isAdmin:   Boolean (default: false)
}
```

#### Request
```js
{
  personal: {
    tz, firstName, lastName, dateOfBirth, adress, phone
  },
  family: {
    parentsNames, amountOfChildren, amountOfChildrenOver19
  },
  study: {
    trend, tuition (Number), years (Number)
  },
  bank: {
    accountOwner, accountTz, bankName, branch, accountNumber
  },
  status: 'waiting' | 'allow' | 'reject'  (default: 'waiting'),
  timestamps: true  // createdAt, updatedAt
}
```

#### Draft
```js
{
  tz:       String (required, unique),   // תעודת זהות המשתמש
  personal: Object (default: {}),
  family:   Object (default: {}),
  study:    Object (default: {}),
  bank:     Object (default: {}),
  timestamps: true
}
```

### Middleware

**`requireAuth`** — מאמת JWT מה-header `Authorization: Bearer <token>`.  
מוסיף `req.user` עם פרטי המשתמש המפוענחים.

**`requireAdmin`** — בודק ש-`req.user.isAdmin === true`. מחזיר 403 אם לא.

---

## API Reference

### משתמשים — `/api/users`

| Method | Endpoint | הרשאה | תיאור |
|---|---|---|---|
| POST | `/register` | ציבורי | הרשמת משתמש חדש |
| POST | `/login` | ציבורי | כניסה + קבלת JWT |
| GET | `/me` | מחובר | פרטי המשתמש הנוכחי |

**POST `/register`**
```json
Body: { "tz": "123456789", "firstName": "ישראל", "lastName": "ישראלי", "password": "1234", "email": "user@mail.com" }
Response: { "message": "user registered" }
```

**POST `/login`**
```json
Body: { "tz": "123456789", "password": "1234" }
Response: { "token": "...", "user": { "tz", "firstName", "lastName", "isAdmin" } }
```

---

### בקשות מענק — `/api/requests`

| Method | Endpoint | הרשאה | תיאור |
|---|---|---|---|
| POST | `/` | מחובר | הגשת בקשה חדשה |
| GET | `/my/:tz` | מחובר | הבקשה האחרונה של המשתמש |
| GET | `/:id` | מחובר | בקשה לפי ID |
| GET | `/` | מנהל | כל הבקשות הממתינות |
| PUT | `/allow/:id` | מנהל | אישור בקשה |
| PUT | `/reject/:id` | מנהל | דחיית בקשה |

**POST `/`**
```json
Body: {
  "personal": { "tz", "firstName", "lastName", "dateOfBirth", "adress", "phone" },
  "family":   { "parentsNames", "amountOfChildren", "amountOfChildrenOver19" },
  "study":    { "trend", "tuition", "years" },
  "bank":     { "accountOwner", "accountTz", "bankName", "branch", "accountNumber" }
}
Response: { "message": "request saved", "request": { ... } }
```

---

### טיוטות — `/api/drafts`

| Method | Endpoint | הרשאה | תיאור |
|---|---|---|---|
| POST | `/` | מחובר | שמירה/עדכון טיוטה |
| GET | `/` | מחובר | שליפת הטיוטה הקיימת |
| DELETE | `/` | מחובר | מחיקת הטיוטה |

---

### שליחת מיילים

המערכת שולחת מיילים ב-3 אירועים:

| אירוע | פונקציה |
|---|---|
| הגשת בקשה | `sendRequestConfirmation(email, firstName)` |
| אישור בקשה | `sendRequestApproved(email, firstName)` |
| דחיית בקשה | `sendRequestRejected(email, firstName)` |

המיילים נשלחים דרך Gmail SMTP עם עיצוב RTL בעברית.

---

## משתני סביבה

צור קובץ `.env` בתוך `student-grants-server/`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/grants_db
JWT_SECRET=your_secret_key_here
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
```

> לשליחת מיילים דרך Gmail יש להפעיל **App Password** בחשבון Google.

---

## התקנה והרצה

### דרישות מוקדמות
- Node.js 18+
- MongoDB מותקן ורץ מקומית

### 1. התקנת Client
```bash
cd student-grants-client
npm install
npm start
```
האפליקציה תיפתח על `http://localhost:3000`

### 2. התקנת Server
```bash
cd student-grants-server
npm install
```
צור קובץ `.env` כמפורט למעלה, ואז:
```bash
npm start
```
השרת יעלה על `http://localhost:5000`

### 3. בדיקת תקינות השרת
```
GET http://localhost:5000/api/health
```

---

## זרימת משתמש

### סטודנט
1. הרשמה עם ת"ז, שם, סיסמה ומייל
2. כניסה למערכת → קבלת JWT
3. מילוי טופס בקשה ב-4 שלבים (הטופס נשמר כטיוטה בין השלבים)
4. שליחת הבקשה → קבלת מייל אישור
5. צפייה בסטטוס הבקשה

### מנהל
1. כניסה עם חשבון שיש לו `isAdmin: true` ב-MongoDB
2. צפייה ברשימת הבקשות הממתינות
3. אישור / דחיית בקשה → הסטודנט מקבל מייל
