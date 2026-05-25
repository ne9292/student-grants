
import LogoImg from '../css/לוגו חדש.png';
import { NavLink, useNavigate } from 'react-router-dom'
import styles from '../css/navAndHome.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../redux/UserSlice'



export const Nav = () => {
    // המשתמש הנוכחי
    const current = useSelector(state => state.Users.current)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isAuthenticated = current && current.tz;
    const isAdmin = current?.isAdmin === true;

    const activeClass = ({ isActive }) =>
        isActive ? styles.activeLink : styles.link;

    const handleLogout = () => {
        localStorage.removeItem('token')
        dispatch(logout());
        navigate('/Home');
    }

    return (
        <nav className={styles.navBar}
            style={{ padding:1 }} >
            <div
                className={styles.logo}
                style={{ marginLeft: '20px' }} // הזזה שמאלה
            >
                <img
                    src={LogoImg}
                    alt="Student Grants Logo"
                    style={{ height: '60px', width: 'auto', margin: 0, padding: 0, paddingTop: 5 }}
                />
            </div>

<div className={styles.links}>
                {!isAdmin && <NavLink to="/Home" className={activeClass}>בית</NavLink>}
                {!isAdmin && <NavLink to="/Request" className={activeClass}> הגשת בקשה</NavLink>}
                {!isAdmin && <NavLink to="/Status" className={activeClass}>סטטוס בקשה</NavLink>}
                {isAdmin && <NavLink to="/ViewRequest" className={activeClass}>הצגת בקשות</NavLink>}
                {isAuthenticated ? (
                    <button
                        onClick={handleLogout}
                        className={styles.logoutButton}>יציאה</button> ) : (
                    <NavLink to="/LogIn" className={activeClass}>התחברות</NavLink>
                )}
            </div>
        </nav>
    )
}