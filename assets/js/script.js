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