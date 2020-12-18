let now = new Date();
let month = now.getMonth();
let year  = now.getFullYear();

let data = {
  month_all : month,
  year_all : year,
  day_base : ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'],
  month_base : ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
  color_base : ['rgba(27, 181, 153, 1)', 'maroon', 'springgreen', 'rgb(89, 18, 20)', 'rgb(42, 135, 45)', 'rgb(245, 223, 77)', 'rgb(147, 149, 151)', 'rgb(71, 194, 102)', 'rgb(255, 44, 7)'],

  start() {
    let time = new Date();
    let day     = time.getDay();
    let date    = time.getDate();
    let month   = time.getMonth();
    let year    = time.getFullYear();

    document.getElementById("year-number").innerHTML = year;
    document.getElementById('month-name').innerHTML = data.month_base[month];
    data.updateTime();
    data.updateNowTime();
  },
  updateNowTime() {
    let time = new Date();
    let h       = time.getHours().toString();
    let m       = time.getMinutes().toString();
    let s       = time.getSeconds().toString();
    let day     = time.getDay();
    let date    = time.getDate();
    let month   = time.getMonth();
    let year    = time.getFullYear();
    if (h.length < 2) h = "0" + h;    
    if (m.length < 2) m = "0" + m;    
    if (s.length < 2) s = "0" + s;

    document.getElementById("time-now-clock").innerHTML = `${h} : ${m} : ${s}`;
    document.getElementById("time-now-date").innerHTML = `${date} ${this.month_base[month]} ${year} | ${this.day_base[day]}`; 
    data.checkNowDay();
  },
  updateTime() {
    document.getElementById("date-box").innerHTML = " ";
    data.month_base.forEach((element, index) => {
      if (document.getElementById('month-name').innerHTML == element) {
        let selectDate = new Date(data.year_all, index, 1);
        for (k = 1; k < selectDate.getDay(); k++) {
          document.getElementById("date-box").innerHTML += "<div></div>";
        }
        let lastDate = new Date(data.year_all, index + 1, 0);
        for (i = 1; i < lastDate.getDate() + 1; i++) {
          document.getElementById("date-box").innerHTML += "<div>" + i + "</div>";
        }
      }
    });
  },
  checkNowDay() {
    let time = new Date();
    let d = time.getDate();
    let m = time.getMonth();
    let y = time.getFullYear();

    if (document.getElementById("year-number").innerHTML == y && 
        document.getElementById("month-name").innerHTML == this.month_base[m]) {
      let one = document.querySelectorAll("#date-box > div");
      for (let elem of one) {
        if (elem.innerHTML == d) elem.style = "border: 1.9px solid #666666";
      }
    }
  }
};
document.body.style.backgroundColor = data.color_base[Math.floor(Math.random() * data.color_base.length)];
data.start();

document.getElementById("month-back-btn").addEventListener('click', (e) => {
  data.month_all--;
  if (data.month_all <= -1) data.month_all = 11;
  document.getElementById('month-name').innerHTML = data.month_base[data.month_all];
  data.updateTime();
});
document.getElementById("month-next-btn").addEventListener('click', (e) => {
  data.month_all++;
  if (data.month_all > 11) data.month_all = 0;
  document.getElementById('month-name').innerHTML = data.month_base[data.month_all];
  data.updateTime();
});
document.getElementById("year-back-btn").addEventListener('click', (e) => {
  data.year_all--;
  document.getElementById('year-number').innerHTML = data.year_all;
  data.updateTime();
});
document.getElementById("year-next-btn").addEventListener('click', (e) => {
  data.year_all++;
  document.getElementById('year-number').innerHTML = data.year_all;
  data.updateTime();
});

let int = setInterval(() => { data.updateNowTime(); }, 950);
