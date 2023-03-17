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
    const userName = this.getAttribute('data-user-name').trim();
    let personMarks = usersArray.find((el) => el.name === userName);
    if (personMarks === undefined) {
      return;
    }
    personMarks = personMarks.marks;

    const li = this.querySelectorAll('ul li');

    for (let i = 0; i < li.length; i++) {
      const lessonCount = (+li[i].innerText.match(/\d+/)) - 1;
      if (lessonCount < personMarks.length) {
        li[i].insertAdjacentHTML('beforeend', `<span class="mark">${personMarks[lessonCount]}</span>`);
        
        const mark = li[i].querySelector('.mark');
        
        let color = 'white';
        if (mark.textContent <= 60) color = 'red';
        else if (mark.textContent <= 80) color = 'orange';
        
        mark.style.color = color;
      }
    }
  });
}

fetch('https://script.google.com/macros/s/AKfycbwHHYQ6z8ULxteJtCKcq4oGCDGSSrjlsRkPU8QaSLxOYCl_q0rfO46n0jJsCJ4kamUq/exec')
  .then(d => d.json())
  .then(d => marksUsage(d));