import React from 'react'
import logo from './../images/logo.png'
import { Link } from 'react-router-dom'

import './About.css'
export default function About()
{
    return(
      <div className="topSpace">
      <p >?השתמשתם פעם בכוס חד פעמית, לשתייה קרה או חמה
        <br />
        ?קבלתם כוס חדשה, שתיתם, נהניתם ו.. גמרתם איתה לתמיד
        <br></br>            
        <h3 className="text">,גם עבודה יכולה להיות חד פעמית  <br />
      !!חדשה, מעניינת, מתגמלת ו.. קצרה</h3>
    
     <image src={logo} id="logo" alt="wow">זו התמונה</image><br />
.הוקם עבור כל המעסיקים המחפשים עובדים לתקופות קצרות  <br />
?כמו מה למשל, אתם שואלים
<br />
,כמו ניהול תוכנית זמנית, הקמת פרויקט זמני קטן, הקלדת ספר, מילוי מקום<br /> 
:או כל עבודה אחרת הקשורה לתקופות מסוימות בשנה
<br />
אריזת חנוכיות בערב חנוכה, מכירת תחפושות לקראת פורים ועוד
<br /> <image src={logo} id="logo" alt="wow">זו התמונה</image><br />
.הוקם עבור כל העובדים המחפשים תעסוקה לטווח קצר
<br />
..עובדים רבים מחפשים תעסוקה קטנה עד ש
<br />עד שיעבור גל הקורונה והם יחזרו לעבודתם הקבועה<br />
עד שימצאו עבודה במקצוע אותו רכשו<br />
'עד שיבריאו, עד שיעברו דירה, עד שיתחתנו וכדו<br /><br />
<h3 className="text">!מעסיק יקר! עובד נמרץ
</h3>
,אם אתה אחד כזה שעונה על התאור הנ"ל
<br />
.זו ההזדמנות שלך להרשם באתר שלנו <br />
.לחיצה אחת והכסף בדרך אליך<br />
<br /> <Link to="/register" id="link">להרשמה לחצו כאן</Link>  
<br /><Link to='/jobs'>לצפייה בעבודות לחצו כאן</Link><br />
<h2 className="text">!job זה one time</h2>
      
      </p>
    </div>
    )
}
