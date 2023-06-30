function findLastMark(el) {
  return typeof el === 'number' || el === '-';
}

const deleteForm = () => {
  $('.send-hw-form').remove();
  $('body').removeClass('overflow-no-scroll');
};

const sendBtnClick = (e) => {
  const lessonNum = e.target.previousElementSibling.textContent.match(/\d+/);
  const studentName = e.target.closest('.student-card').dataset.userName;

  const formTemplate = `
  <div class="send-hw-form">
    <div class="container">
      <div class="send-hw-form-modal">
        <button class="close-form"></button>
        <h3>Відправити дз №${lessonNum}?</h3>
        <h4>Коментар:</h4>
        <textarea placeholder="Напишіть щось тут(опціонально)..."></textarea>
        <button class="accept-sending-hw">Надіслати</button>
      </div>
    </div>
  
  </div>`;
  const body = document.querySelector('body');
  body.insertAdjacentHTML('beforeend', formTemplate);
  body.classList.add('overflow-no-scroll');

  $('.send-hw-form').click((e) => {
    const target = e.target;
    if (
      target.classList.contains('close-form') ||
      target.classList.contains('send-hw-form')
    ) {
      $(target.closest('.send-hw-form')).fadeOut(200, deleteForm);
      return;
    } else if (target.classList.contains('accept-sending-hw')) {
      const inputText = document.querySelector('.send-hw-form textarea').value;
      $.ajax({
        url: '../assets/php/botMsg.php',
        method: 'POST',
        data: {
          text: `Студент ${studentName} надсилає ${lessonNum} дз\nКоментар: ${inputText}`,
        },
        success: function (response) {
          alert('Відправлено!');
        },
        error: function (xhr, status, error) {
          alert('Щось пішло не так(');
        },
      });
      $(target.closest('.send-hw-form')).fadeOut(200, deleteForm);
    }
  });
};

const addBtnToHW = (card) => {
  const marksList = $(card).find('ul li');

  marksList.each(function () {
    const mark =
      this.querySelector('span') === null ? null : $(this).find('span').text();
    $(this).find('button').remove();
    if (mark == 100 || mark == '-') return;

    const button = document.createElement('button');
    button.classList.add('send-hw');
    mark == 0 || mark == null ? null : button.classList.add('send-again');
    // button.title = mark == 0 || mark == null ? 'Сдати дз' : 'Повторно відправити дз';
    
    // mark == 0 || mark == null ? button.insertAdjacentHTML('beforeend', doneSVG) : button.insertAdjacentHTML('beforeend', retrySVG);
    // const button = `<button class="send-hw${mark == 0 || mark == null ? '' : ' send-again'}"></button>`;
    
    $(this).find('a').after(button);
    $(button).click(sendBtnClick);
    
  });
};

const hoverBtn = () => {
  $('.send-hw').off('**');
  const hoverBtnTitle = `<div class="button-hover-title"></div>`;
  $('.send-hw').on('mouseover', (e) => {

    const studCard = $(e.target.closest('.student-card'));
    const cardPosX = Math.round(studCard.position().left + studCard.width());
    const posY = e.originalEvent.clientY;

    $('body').append(hoverBtnTitle);
    $('.button-hover-title').css('top', posY - $('.button-hover-title').height()/2);
    $('.button-hover-title').css('left', cardPosX);
    $('.button-hover-title').text(e.target.classList.contains('send-again') ? 'Пересдати дз' : 'Сдати дз');
  });

  $('.send-hw').on('mousemove', (e) => {
    const posY = e.originalEvent.clientY;

    $('.button-hover-title').css('top', posY - $('.button-hover-title').height()/2);
  });


  $('.send-hw').on('mouseout', (e) => {
    $('.button-hover-title').remove();
  });
}

function marksUsage(data) {
  const usersArray = [];
  const dataArray = data.result;

  dataArray.forEach((student) => {
    const temp = {
      name: student.shift(),
      marks: [],
    };
    for (let i = 0; i <= student.findLastIndex(findLastMark); i++) {
      temp.marks.push(student[i]);
    }
    usersArray.push(temp);
  });

  $('.student-card').each(function () {
    const userName = this.getAttribute('data-user-name').trim().split(' ');
    if (userName.length !== 2) return;
    let personMarks = usersArray.find((el) => {
      if (el.name.includes(userName[0]) && el.name.includes(userName[1]))
        return true;
    });
    if (personMarks === undefined) {
      return;
    }
    personMarks = personMarks.marks;

    const li = this.querySelectorAll('ul li');

    for (let i = 0; i < li.length; i++) {
      if (li[i].innerText === '') continue;
      const lessonCount = +li[i].innerText.match(/\d+/) - 1;

      if (lessonCount < personMarks.length) {
        if (li[i].querySelector('.mark') === null) {
          li[i].insertAdjacentHTML('beforeend', `<span class="mark"></span>`);
        }

        const mark = li[i].querySelector('.mark');
        if (lessonCount === -1) {
          mark.style.color = 'red';
          mark.textContent = '-';
          continue;
        }

        if (mark.textContent !== personMarks[lessonCount]) {
          mark.innerText = personMarks[lessonCount];

          let color = 'white';
          if (+mark.textContent <= 60 || mark.textContent === '-')
            color = 'red';
          else if (+mark.textContent <= 80) color = 'orange';

          mark.style.color = color;
        }
      }
    }
    addBtnToHW(this);
  });
  if (window.innerWidth >= 640) {
    hoverBtn();
  }
}
const connectLink = $('[data-connection]').attr('data-connection');

fetch(connectLink)
  .then((d) => d.json())
  .then((d) => marksUsage(d));

setInterval(() => {
  fetch(connectLink)
    .then((d) => d.json())
    .then((d) => marksUsage(d));
}, 60000);
