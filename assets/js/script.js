const locale = window.localStorage;
const usersInfo = [];

function adminsAction(studentCard) {
  const student = studentCard[0];
  const studentInfo = {};

  studentInfo.name = student.attributes['data-user-name'].value;
  studentInfo.hw = student.querySelectorAll('ul li').length;


  usersInfo.push(studentInfo);

}

// !получение ip адреса


$('.student-card').wrap(`<div class="col-xxl-3 col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center mb-5"></div>`);
$('.student-card').append(`<div class="content">
<div class="person">
    <div class="person-avatar">

    </div>
    <h3 class="person-name"></h3>
</div>
<div class="person-hw">
    <h4 class="title">PERSON HW 🍋🍋🍋:</h4>
    <div class="accordion" id="accordionExample">
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
                <button class="accordion-button collapsed" type="button"
                    data-bs-toggle="collapse" data-bs-target="#collapseOne"
                    aria-expanded="false" aria-controls="collapseOne">
                    Home task's
                </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse"
                aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div class="accordion-body"></div>
            </div>
        </div>
    </div>
</div>
</div>`);
// for accordion
$('.person-hw .accordion').each(function (el) {
  const accordionBody = this.querySelector('.accordion-collapse');
  accordionBody.id += el;

  const button = this.querySelector('.accordion-button');
  button.dataset.bsTarget += el;
})

// ajax
$("[data-user-hw]").each(function () {
  const element = $(this);
  const accordionBtn = element.find('.accordion-button');
  const accordionBody = element.find('.accordion-body');

  $.ajax({
    beforeSend: function () {
      accordionBtn.append(`<div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div>`);
    },
    url: element.attr("data-user-hw"),
    dataType: "html",
    cache: false,
    success: function (data) {

      const temp = document.createElement('div');
      temp.insertAdjacentHTML('beforeend', data);

      const hws = temp.querySelector('ul');
      if (hws.querySelectorAll('li').length > 5) {
        hws.style.overflow = 'scroll';
        hws.style.maxHeight = '167px';
      }
      const avatar = temp.querySelector('img');
      const name = temp.querySelector('h3').textContent;

      avatar.classList.add('img-fluid');
      avatar.alt = 'Your avatar';

      element.find('.content .person .person-avatar').append(avatar);
      element.find('.content .person .person-name').append(name);

      accordionBtn.find('.spinner-border').remove();
      accordionBtn.append(`<img class="arrow" src="assets/img/pixel-arrow.svg">`);
      accordionBody.html(hws);

      // fetch('https://ipapi.co/json/')
      //   .then(d => d.json())
      //   .then(d => {
      //     if (d.ip === '217.196.161.150') {
      //       adminsAction(element);
      //     }
      //   });
    },
    error: function () {
      accordionBtn.find('.spinner-border').remove();
      accordionBtn.append(`<div class="error"><img src="assets/img/pixel-cross.svg" alt="error"></div>`);
      accordionBody.remove();
    }
  });
});


// scroll to top
const scrollUpButton = document.getElementById("scroll-up-button");

window.onscroll = function () {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollUpButton.style.display = "block";
  } else {
    scrollUpButton.style.display = "none";
  }

};
scrollUpButton.onclick = function () {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};

// Switcher
const switcher = document.querySelector('#switch');
const link = document.querySelector('#theme');

if (locale.getItem('theme') === 'light') {
  link.href = 'assets/css/variables-light.css';
} else if (locale.getItem('theme') === 'dark'){
  link.href = 'assets/css/variables-dark.css';
  switcher.checked = false;
}

switcher.addEventListener("change", function () {
  if (switcher.checked) {
    link.href = 'assets/css/variables-light.css';
    locale.setItem('theme', 'light');
  } else {
    link.href = 'assets/css/variables-dark.css';
    locale.setItem('theme', 'dark');
  }
});