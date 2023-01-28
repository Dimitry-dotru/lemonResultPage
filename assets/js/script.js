$('.person-hw .accordion').each(function(el) {
    const accordionBody = this.querySelector('.accordion-collapse');
    accordionBody.id += el;

    const button = this.querySelector('.accordion-button');
    button.dataset.bsTarget += el;

})

$("[data-user-hw]").each(function() {
    const element = $(this);
    const accordionBtn = element.find('.accordion-button');
    const accordionBody = element.find('.accordion-body');

    $.ajax({
        beforeSend: function() {
            accordionBtn.append(`<div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div>`);
        },
        url: element.attr("data-user-hw"),
        dataType: "html",
        cache: false,
        success: function(data){
            const temp = document.createElement('div');
            temp.insertAdjacentHTML('beforeend', data);
            
            const hws = temp.querySelector('ul');
            const avatar = temp.querySelector('img');
            const name = temp.querySelector('h3').textContent;

            avatar.classList.add('img-fluid');
            avatar.alt = 'Your logo';

            element.find('.content .person .person-avatar').append(avatar);
            element.find('.content .person .person-name').append(name);

            accordionBtn.find('.spinner-border').remove();
            accordionBtn.append(`<img class="arrow" src="assets/img/pixel-arrow.svg">`);
            accordionBody.html(hws);

            
        },
        error: function(){
            accordionBtn.find('.spinner-border').remove();
            accordionBtn.append(`<div class="error"><img src="assets/img/pixel-cross.svg" alt="error"></div>`);
            accordionBody.remove();
        }
    });
});

// Get the scroll-up-button
var scrollUpButton = document.getElementById("scroll-up-button");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollUpButton.style.display = "block";
  } else {
    scrollUpButton.style.display = "none";
  }
};

// When the user clicks on the button, scroll to the top of the document
scrollUpButton.onclick = function() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};

// Switcher
var switch = document.querySelector("#switch");
switch.addEventListener("change", function() {
  if (switch.checked) {
    console.log("Switch is on");
  } else {
    console.log("Switch is off");
  }
});
