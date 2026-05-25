import Draft from '../models/Draft.js';

// שמירת טיוטה
export const saveDraft = async (req, res) => {
    try {
        const { tz } = req.user; // שולף את הת.ז מהטוקן
        const { personal, family, study, bank } = req.body;// שולף את הנתונים מהבקשה

        // אם קיימת טיוטה למשתמש — עדכן אותה
        // אם לא קיימת — צור חדשה
        const draft = await Draft.findOneAndUpdate(
            { tz },
            { personal, family, study, bank },
            { upsert: true, new: true }
        );

        res.json({ message: 'הטיוטה נשמרה!', draft });
    } catch (err) {
        res.status(500).json({ message: 'שגיאה בשרת', error: err.message });
    }
};

// שליפת טיוטה
export const getDraft = async (req, res) => {
    try {
        const { tz } = req.user;
        const draft = await Draft.findOne({ tz });

        // אם אין טיוטה — מחזירים 404
        if (!draft) return res.status(404).json({ message: 'אין טיוטה' });

        res.json(draft);
    } catch (err) {
        res.status(500).json({ message: 'שגיאה בשרת', error: err.message });
    }
};

// מחיקת טיוטה
export const deleteDraft = async (req, res) => {
    try {
        const { tz } = req.user;
        await Draft.findOneAndDelete({ tz });
        res.json({ message: 'הטיוטה נמחקה!' });
    } catch (err) {
        res.status(500).json({ message: 'שגיאה בשרת', error: err.message });
    }
};