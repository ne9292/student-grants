
import { Main } from './form/Main'
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom"
import { useEffect } from 'react';
import Swal from 'sweetalert2' // <-- ייבוא SweetAlert2

export const Request = () => {

  const navigate = useNavigate();
  //המשתמש הנוכחי
  const current = useSelector(state => state.Users.current);
  //אם אין משתמש מחובר הוא לא יתן לו להיכנס ויעביר אותו להרשמה
  useEffect(() => {
    if (current.tz == null) {
      Swal.fire({
        icon: 'error',
        title:'!!!אופס',
        text: 'אינך מחובר למערכת',
        confirmButtonText: 'עבור להתחברות',
        confirmButtonColor: '#333333' // שימוש בצבע ה-accent שלך
      }).then(() => {
        navigate('/LogIn')
      })
    }
  }, [current, navigate]);

  return <>
  {/* המיין של הטופס */}
    <Main></Main>

  </>

}