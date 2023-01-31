function findLastMark(el) {
  return el >= 60 && typeof el === 'number';
}

function marksUsage(data) {
  const usersArray = [];
  const dataArray = data.result;

  dataArray.forEach(student => {
    const temp = {};
    temp.name = student.shift();
    temp.marks = [];
    for (let i = 0; i <= student.findLastIndex(findLastMark); i++) {
      temp.marks.push(student[i]);
    }
    usersArray.push(temp);
  });

  $('.student-card').each(function (index) {
    const userName = this.getAttribute('data-user-name');
    const personMarks = usersArray.find((el) => el.name === userName).marks;

    const li = this.querySelectorAll('ul li');
    for (let i = 0; i < personMarks.length && i < li.length; i++) {
      li[i].insertAdjacentHTML('beforeend', `<span class="mark">${personMarks[i]}</span>`);
      
      const mark = li[i].querySelector('.mark');
      
      let color = 'white';
      if (mark.textContent <= 60) color = 'red';
      else if (mark.textContent <= 80) color = 'orange';
      
      mark.style.color = color;
    }
  });
}

fetch('https://script.google.com/macros/s/AKfycbwRQgiNqT2jT3ILAE3kPxjJ8qgtz4w6KHk9ew37kIV-UbclbrUCgUgOSjVUWf3EzLbMtA/exec')
  .then(d => d.json())
  .then(d => marksUsage(d));