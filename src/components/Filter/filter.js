import React from 'react'
import locations from '../../areas'
import './filter.css'
import { URL } from '../../config'

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: 'publish_date',
      by: 'DESC',
      categories: [],
      area: '',
      city: '',
      salary: [0, 10000],
      date: '10'
    }
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleByChange = this.handleByChange.bind(this);
    this.handleAreaChange = this.handleAreaChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.onCategoryClick = this.onCategoryClick.bind(this);
    this.handleSalaryChange = this.handleSalaryChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.filter = this.filter.bind(this);
  }

  //filter jobs
  filter() {
    const {order, by, categories, area, city, salary, date} = this.state;
    this.props.filterJobs(order, by, categories, area, city, date, salary);
  }

  //handle sort by change
  async handleSelectChange(event) {
    await this.setState({order: event.target.value});
    this.filter();
  }

  //handle order by change
  async handleByChange(event) {
    if (event.target.checked) await this.setState({by: 'ASC'})
    else await this.setState({by: 'DESC'})
    this.filter();
  }

  //handle area change
  async handleAreaChange(event) {
    await this.setState({area: event.target.value})
  }

  //handle city change
  async handleCityChange(event) {
    await this.setState({city: event.target.value})
  }

  //hanlde category click
  async onCategoryClick(event) {
    event = event.target;
    if (event.src === `${URL}/images/${event.id}.png`) {
      event.src = `../images/${event.id}+.png`;
      await this.setState(state => ({
          categories: [...state.categories, event.id]
      }));
    } else {
      event.src = `../images/${event.id}.png`
      await this.setState({categories: this.state.categories.filter((cat) => {
          return cat !== event.id
      })});
    }
  }

  //hanle salary range change
  async handleSalaryChange(event) {
    let value = event.target.value;
    if (!(value > 0)) value = 0;
    if (isNaN(value) || value < 0) console.log('nan');;
    if (event.target.id === "min") {
      await this.setState({salary: [parseInt(value), this.state.salary[1]]})
    } else {
      if (value < this.state.salary[0]) value = this.state.salary[0];
      await this.setState({salary: [this.state.salary[0], parseInt(value)]})
    }
  }

  //handle since change
  async handleDateChange(event) {
    await this.setState({date: event.target.value})
  }

  render() {
    return(
      <div id="filter">
        <select onChange={this.handleSelectChange} className="select" defaultValue={'DEFAULT'}>
          <option value="DEFAULT" disabled hidden>מיין לפי</option>
          <option value="category">קטגוריה</option>
          <option value="salary">שכר</option>
          <option value="expiry_date">תאריך תפוגה</option>
          <option value="area">אזור</option>
          <option value="city">עיר </option>
          <option value="publish_date">תאריך פרסום</option>
        </select>

        <input type="checkbox" id="ASC" onChange={this.handleByChange}/>
        <label id="lol" htmlFor="ASC">
          <div id="knob"></div>
          <div id="down">יורד</div>
          <div id="up">עולה</div>
        </label>

        <p>אזור</p>
        <input type="search" list="areas" onChange={this.handleAreaChange}/>
        <datalist id="areas">
        {
          locations.AREAS.map((area) => {
            return <option value={area} key={area}/>
          })
        }
        </datalist>

        <p>עיר</p>
        <input type="search" list="cities" onChange={this.handleCityChange}/>
        <datalist id="cities">
        {
          this.state.area ?
          locations.CITIES[this.state.area].map((city) => {
            return <option value={city} key={city}/>
          })
          : <option value='יש לבחור אזור'/>
        }
        </datalist>

        <p>קטגוריות</p>
        <div className="cates">
          <div className="catext">
            <span>הובלות</span>
            <img src="../images/cat01.png" alt="הובלות" title="הובלות" className="cat" id="cat01" onClick={this.onCategoryClick} />
          </div>
          <div className="catext">
            <span>ייעוץ</span>
            <img src="../images/cat02.png" alt="ייעוץ" title="ייעוץ" className="cat" id="cat02" onClick={this.onCategoryClick} />
          </div>
          <div className="catext">
            <span>כתיבה</span>
            <img src="../images/cat03.png" alt="כתיבה" title="כתיבה" className="cat" id="cat03" onClick={this.onCategoryClick} />
          </div>
          <div className="catext">
            <span>אחר</span>
            <img src="../images/cat04.png" alt="אחר" title="אחר" className="cat" id="cat04" onClick={this.onCategoryClick} />
          </div>
          <div className="catext">
            <span>הדרכה</span>
            <img src="../images/cat06.png" alt="הדרכה" title="הדרכה" className="cat" id="cat06" onClick={this.onCategoryClick} />
          </div>
          <div className="catext">
            <span>וידאו</span>
            <img src="../images/cat07.png" alt="וידאו" title="וידאו" className="cat" id="cat07" onClick={this.onCategoryClick} />
          </div>
          <div className="catext">
            <span>לימודים</span>
            <img src="../images/cat08.png" alt="לימודים" title="לימודים" className="cat" id="cat08" onClick={this.onCategoryClick} />
          </div>
          <div className="catext">
            <span>מוסיקה</span>
            <img src="../images/cat09.png" alt="מוסיקה" title="מוסיקה" className="cat" id="cat09" onClick={this.onCategoryClick} />
          </div>
          <div className="catext">
            <span>ציור</span>
            <img src="../images/cat10.png" alt="ציור" title="ציור" className="cat" id="cat10" onClick={this.onCategoryClick} />
          </div>
          <div className="catext">
            <span>קניות</span>
            <img src="../images/cat11.png" alt="קניות" title="קניות" className="cat" id="cat11" onClick={this.onCategoryClick} />
          </div>
          <div className="catext">
            <span>שליחויות</span>
            <img src="../images/cat12.png" alt="שליחויות" title="שליחויות" className="cat" id="cat12" onClick={this.onCategoryClick} />
          </div>
          <div className="catext">
            <span>תיקונים</span>
            <img src="../images/cat13.png" alt="תיקונים" title="תיקונים" className="cat" id="cat13" onClick={this.onCategoryClick} />
          </div>
          <div className="catext">
            <span>תכנות</span>
            <img src="../images/cat14.png" alt="תכנות" title="תכנות" className="cat" id="cat14" onClick={this.onCategoryClick} />
          </div>
          <div className="catext">
            <span>תמיכה</span>
            <img src="../images/cat15.png" alt="תמיכה" title="תמיכה" className="cat" id="cat15" onClick={this.onCategoryClick} />
          </div>
        </div>

        <p>שכר</p>
        <input
          type="number"
          onChange={this.handleSalaryChange}
          id="min"
          placeholder="מינימום"
          className="num"
        />
        <input
          type="number"
          onChange={this.handleSalaryChange}
          id="max"
          placeholder="מקסימום"
          className="num"
        />

        <p>פורסם ב</p>
        <select onChange={this.handleDateChange} className="date">
          <option value="10">כל זמן</option>
          <option value="1">24 שעות אחרונות</option>
          <option value="3">שלושה ימים אחרונים</option>
          <option value="7">שבוע אחרון</option>
        </select>

        <button onClick={this.filter} className="button filter">סנן</button>
      </div>
    )
  }
}

export default Filter;
