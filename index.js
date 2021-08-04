const hr = document.querySelector("#hr");
const mn = document.querySelector("#mn");
const s = document.querySelector("#s");

setInterval( ()=> {
    let day = new Date();
    let hh = day.getHours()*30;
    let mm = day.getMinutes()*6;
    let ss = day.getSeconds()*6;
    let ms = day.getMilliseconds()*6;

    hr.style.transform = `rotateZ(${hh+mm/12}deg)`;
    mn.style.transform = `rotateZ(${mm+ss/60}deg)`;
    s.style.transform = `rotateZ(${ss+ms/1000}deg)`;
});