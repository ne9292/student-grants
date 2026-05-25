import { useState } from "react";
import styles from "./Chat.module.css";

export const ChatWindow = ({ onClose }) => {
    const [messages, setMessages] = useState([
        { from: "agent", text: "שלום! איך אפשר לעזור?" }
    ]);
    const [input, setInput] = useState("");

    const sendMessage = () => {
        if (!input.trim()) return;

        setMessages(prev => [...prev, { from: "user", text: input }]);
        
        // כאן אפשר לשלוח לשרת / בוט / נציג אמיתי
        setTimeout(() => {
            setMessages(prev => [...prev, { from: "agent", text: "קיבלתי! נציג יחזור אליך בהקדם 😊" }]);
        }, 600);

        setInput("");
    };

    return (
        <div className={styles.chatContainer}>
            <div className={styles.chatHeader}>
                <span>צ'אט עם נציג</span>
                <button onClick={onClose}>✖</button>
            </div>

            <div className={styles.messages}>
                {messages.map((m, i) => (
                    <div 
                        key={i} 
                        className={m.from === "user" ? styles.userMsg : styles.agentMsg}
                    >
                        {m.text}
                    </div>
                ))}
            </div>

            <div className={styles.inputBar}>
                <input 
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="כתוב הודעה..."
                />
                <button onClick={sendMessage}>שלח</button>
            </div>
        </div>
    );
};