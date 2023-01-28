$('.person-hw .accordion').each(function(el) {
    //! сделать селектор Jquery!!!!
    const accordionBody = this.querySelector('.accordion-collapse');
    accordionBody.id += el;

    const button = this.querySelector('.accordion-button');
    button.dataset.bsTarget += el;

})

$("[data-user-hw]").each(function() {
    const element = $(this);
    const accordionBtn = element.parent().parent().find('.accordion-button');

    $.ajax({
        beforeSend: function() {
            accordionBtn.append(`<div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div>`);
        },
        url: element.attr("data-user-hw"),
        dataType: "html",
        cache: false,
        success: function(data){
            accordionBtn.find('.spinner-border').remove();
            accordionBtn.append(`<img class="arrow" src="assets/img/pixel-arrow.svg">`);
            element.html(data);
        },
        error: function(){
            accordionBtn.find('.spinner-border').remove();
            accordionBtn.append(`<div class="error">&#10006;</div>`);
            element.parent().remove();
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