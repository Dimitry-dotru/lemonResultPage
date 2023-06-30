const locale = window.localStorage;

function adminsAction() {
  $(".student-card").each(function () {
    const unPassedHws = $(this)
      .find('li:has(>a[href*="HOMEWORK"]) .mark')
      .filter(function () {
        return $(this).text() === "0";
      });
    if (unPassedHws.length) {
      console.log(
        `${$(this).attr("data-user-name")} имеет такие непроверенные домашки:`
      );
      unPassedHws.each(function () {
        console.log($(this).prev().text());
      });
      console.log("\n\n");
    }
  });
}

document.querySelector(".func").addEventListener("click", adminsAction);

$(".student-card").wrap(
  `<div class="col-xxl-3 col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center mb-5"></div>`
);
$('.student-card').on('mouseover', (e) => {
  const studentCard = e.target.closest('.student-card');
  studentCard.classList.add('z-index-3');
});
$('.student-card').on('mouseout', (e) => {
  const studentCard = e.target.closest('.student-card');
  studentCard.classList.remove('z-index-3');
});
$(".student-card").append(`<div class="content">
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
$(".person-hw .accordion").each(function (el) {
  const accordionBody = this.querySelector(".accordion-collapse");
  accordionBody.id += el;

  const button = this.querySelector(".accordion-button");
  button.dataset.bsTarget += el;
});

// ajax
$("[data-user-hw]").each(function () {
  const element = $(this);
  const accordionBtn = element.find(".accordion-button");
  const accordionBody = element.find(".accordion-body");

  $.ajax({
    beforeSend: function () {
      accordionBtn.append(
        `<div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div>`
      );
    },
    url: element.attr("data-user-hw"),
    dataType: "html",
    cache: false,
    success: function (data) {
      const temp = document.createElement("div");
      temp.insertAdjacentHTML("beforeend", data);

      const link = temp.querySelectorAll("a");
      link.forEach((el) => (el.target = "_blank"));

      const hws = temp.querySelector("ul");
      if (hws.querySelectorAll("li").length > 5) {
        hws.style.overflow = "scroll";
        hws.style.maxHeight = "167px";
      }
      const avatar = temp.querySelector("img");
      const name = temp.querySelector("h3").textContent;
      avatar.classList.add("img-fluid");
      avatar.onerror = function () {
        avatar.src = "avatars/avatarError.webp";
        avatar.alt = "Error loading img";
      };
      avatar.alt = "Your avatar";

      element.find(".content .person .person-avatar").append(avatar);
      element.find(".content .person .person-name").append(name);

      accordionBtn.find(".spinner-border").remove();
      accordionBtn.append(
        `<img class="arrow" src="../assets/img/pixel-arrow.svg">`
      );
      accordionBody.html(hws);
    },
    error: function () {
      accordionBtn.find(".spinner-border").remove();
      accordionBtn.append(
        `<div class="error"><img src="../assets/img/pixel-cross.svg" alt="error"></div>`
      );
      accordionBody.remove();
    },
  });
});

// scroll to top
const scrollUpButton = document.getElementById("scroll-up-button");

window.onscroll = function () {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    $(scrollUpButton).fadeIn(200);
  } else {
    $(scrollUpButton).fadeOut(200);
  }
};
scrollUpButton.onclick = function () {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};

// Switcher
const switcher = document.querySelector("#switch");
const link = document.querySelector("#theme");

if (locale.getItem("theme") === "light") {
  link.href = "../assets/css/variables-light.css";
} else if (locale.getItem("theme") === "dark") {
  link.href = "../assets/css/variables-dark.css";
  switcher.checked = false;
}
switcher.addEventListener("change", function () {
  if (switcher.checked) {
    link.href = "../assets/css/variables-light.css";
    locale.setItem("theme", "light");
  } else {
    link.href = "../assets/css/variables-dark.css";
    locale.setItem("theme", "dark");
  }
});
