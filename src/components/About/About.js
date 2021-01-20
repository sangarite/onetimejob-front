import React from 'react'
import logo from '../../images/logo.png'
import { Link } from 'react-router-dom'
import './About.css'

export default function About() {
    return (
      <div id='about'>
        <p>השתמשתם פעם בכוס חד פעמית, לשתייה קרה או חמה?</p>
        <p>קבלתם כוס חדשה, שתיתם, נהניתם ו.. גמרתם איתה לתמיד?</p>
        <h3 className='text'>גם עבודה יכולה להיות חד פעמית,</h3>
        <h3 className='text'>חדשה, מעניינת, מתגמלת ו.. קצרה!!</h3>
        <p><img src={logo} id='logo' alt='wow'/> הוקם עבור כל המעסיקים המחפשים עובדים לתקופות קצרות.</p>
        <p>כמו מה למשל, אתם שואלים?</p>
        <p>כמו ניהול תוכנית זמנית, הקמת פרויקט זמני קטן, הקלדת ספר, מילוי מקום,</p>
        <p>או כל עבודה אחרת הקשורה לתקופות מסוימות בשנה:</p>
        <p>אריזת חנוכיות בערב חנוכה, מכירת תחפושות לקראת פורים ועוד</p>
        <p><img src={logo} id='logo' alt='wow'/> הוקם עבור כל העובדים המחפשים תעסוקה לטווח קצר.</p>
        <p>עובדים רבים מחפשים תעסוקה קטנה עד ש...</p>
        <p>עד שיעבור גל הקורונה והם יחזרו לעבודתם הקבועה</p>
        <p>עד שימצאו עבודה במקצוע אותו רכשו</p>
        <p>עד שיבריאו, עד שיעברו דירה, עד שיתחתנו וכד'</p>
        <h3 className='text'>מעסיק יקר! עובד נמרץ!</h3>
        <p>אם אתה אחד כזה שעונה על התאור הנ"ל,</p>
        <p>זו ההזדמנות שלך להירשם לאתר שלנו.</p>
        <p>לחיצה אחת והכסף בדרך אליך.</p>
        <Link to='/register'>להרשמה לחצו כאן</Link>
        <Link to='/jobs'>לצפיה בעבודות לחצו כאן</Link>
        <h2 className='text'>ג'וב זה one time!</h2>
      </div>
    )
}