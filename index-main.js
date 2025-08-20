"use strict";

// прокрутка при клике
const menuLinks = document.querySelectorAll("a[data-goto]");
if (menuLinks.length > 0) {
  menuLinks.forEach((menuLink) => {
    menuLink.addEventListener("click", onMenuLinkClick);
  });

  function onMenuLinkClick(e) {
    const menuLink = e.target;
    if (
      menuLink.dataset.goto &&
      document.querySelector(menuLink.dataset.goto)
    ) {
      const gotoBlock = document.querySelector(menuLink.dataset.goto);
      const gotoBlockValue =
        gotoBlock.getBoundingClientRect().top + pageYOffset;

      window.scrollTo({
        top: gotoBlockValue,
        behavior: "smooth",
      });
      e.preventDefault();
    }
  }
}

// ************************бургер************************************************

// Get Modal
var modal = document.getElementById("myModal");

// Get pseudoelement to open Modal
var btn = document.getElementById("sized");

// Get the <span> element to close Modal
var span = document.getElementsByClassName("close")[0];

const closeLinks = document.querySelectorAll(".gray");
if (closeLinks.length > 0) {
  closeLinks.forEach((closeLink) => {
    closeLink.addEventListener("click", onMenuCloseLink);
  });

  function onMenuCloseLink(e) {
    e.preventDefault();
    modal.style.display = "none";
  }
}
// When user clicks button, open Modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When user clicks Close (x), close Modal
span.onclick = function () {
  modal.style.display = "none";
};

// When user clicks anywhere outside of the Modal, close Modal
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// ************************АНИМАЦИЯ************************************************
const animItems = document.querySelectorAll("._anim-items");

if (animItems.length > 0) {
  window.addEventListener("scroll", animOnScroll, { passive: true });
  function animOnScroll() {
    for (let i = 0; i < animItems.length; i++) {
      const animItem = animItems[i];
      const animItemHeight = animItem.offsetHeight;
      const animItemOffset = offset(animItem).top;
      const animStart = 4;

      let animItemPoint = window.innerHeight - animItemHeight / animStart;

      if (animItemHeight > window.innerHeight) {
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }

      if (
        pageYOffset > animItemOffset - animItemPoint &&
        pageYOffset < animItemOffset + animItemHeight
      ) {
        animItem.classList.add("_active");
      } else {
        animItem.classList.remove("_active");
      }
    }
  }
  function offset(el) {
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
  }
  setTimeout(() => {
    animOnScroll();
  }, 100);
}

// ************************СЛАЙДЕР НА ГЛАВНОМ ЭКРАНЕ****************************
const nextButton = document.querySelector(".next");
const nextMobileButton = document.querySelector(".next_mobile");
const prevMobileButton = document.querySelector(".previous_mobile");
var slides = document.querySelectorAll(".item");
var slideIndex = 1;
showSlides(slideIndex);

function plusSlide() {
  showSlides((slideIndex += 1));
}
nextButton.addEventListener("click", plusSlide);
nextMobileButton.addEventListener("click", plusSlide);
function minusSlide() {
  showSlides((slideIndex -= 1));
}
function currentSlide(n) {
  showSlides((slideIndex = n));
}
function showSlides(n) {
  var i;
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex - 1].style.display = "flex";
}

setInterval(plusSlide, 4000);

// ******************ПОП-АП Записаться на консультацию**********************
let body = document.querySelector("body");

let popupBg = document.querySelector(".popup__bg");
let popup = document.querySelector(".popup");
let openPopupButtons = document.querySelectorAll(".open-popup");
let closePopupButton = document.querySelector(".close-popup");

openPopupButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    popupBg.classList.add("active");
    popup.classList.add("active");
  });
});
closePopupButton.addEventListener("click", () => {
  popupBg.classList.remove("active");
  popup.classList.remove("active");
});
document.addEventListener("click", (e) => {
  if (e.target === popupBg) {
    popupBg.classList.remove("active");
    popup.classList.remove("active");
  }
});

// *************************ПОП-АП Отзывы**********************************
let openCommentsPopupBtn = document.querySelectorAll(".openCommentsPopupBtn");
let closeCommentsPopupBtn = document.querySelector(".closeCommentsPopupBtn");
let containerCommentsPopup = document.querySelector(".container-commentsPopup");
let commentsPopup = document.querySelector(".commentsPopup");

let scrollY = 0;

openCommentsPopupBtn.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    containerCommentsPopup.classList.add("active");
    commentsPopup.classList.add("active");

    scrollY = window.scrollY;
    const body = document.body;
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
  });
});

closeCommentsPopupBtn.addEventListener("click", () => {
  commentsPopup.classList.remove("active");
  containerCommentsPopup.classList.remove("active");
  const body = document.body;
  body.style.position = "";
  body.style.top = "";

  window.scrollTo(0, scrollY);
});

// ************************рендер ОТЗЫВЫ*****************

var commentsList = [];
const comments = document.querySelector(".comments");

class Comment {
  constructor(id, date, name, message) {
    this.id = id;
    this.date = date;
    this.name = name;
    this.message = message;
  }

  renderComment() {
    return `
                        <li class="comment" id="${this.id}">
                                <div class="comm">
                                <p class="text-under-comment">${this.name} <span class="gray">${this.date}</span></p>
                                <p>${this.message}</p>
                                </div>
                        </li>
                `;
  }
}

function renderCommentsList() {
  commentsList.forEach((comment) => {
    comments.innerHTML += new Comment(
      comment.id,
      comment.name,
      comment.date,
      comment.message
    ).renderComment();
  });
}

async function loadCommentsFromFile() {
  try {
    const response = await fetch("./comments.json");
    const data = await response.json();
    commentsList = data.map((item) => {
      return new Comment(item.id, item.name, item.date, item.message);
    });

    renderCommentsList();
    const listItems = comments.querySelectorAll("li");
    const paginationNumbers = document.getElementById("pagination-numbers");

    const nextButtonComments = document.getElementById("next-buttonComments");
    const prevButtonComments = document.getElementById("prev-buttonComments");

    const paginationLimit = 4;
    const pageCount = Math.ceil(listItems.length / paginationLimit);
    let currentPage = 1;

    const disableButton = (button) => {
      button.classList.add("disabled");
      button.setAttribute("disabled", true);
    };

    const enableButton = (button) => {
      button.classList.remove("disabled");
      button.removeAttribute("disabled");
    };

    const handlePageButtonsStatus = () => {
      if (currentPage === 1) {
        disableButton(prevButtonComments);
      } else {
        enableButton(prevButtonComments);
      }

      if (pageCount === currentPage) {
        disableButton(nextButtonComments);
      } else {
        enableButton(nextButtonComments);
      }
    };

    const handleActivePageNumber = () => {
      document.querySelectorAll(".pagination-number").forEach((button) => {
        button.classList.remove("active");
        const pageIndex = Number(button.getAttribute("page-index"));
        if (pageIndex == currentPage) {
          button.classList.add("active");
        }
      });
    };

    const appendPageNumber = (index) => {
      const pageNumber = document.createElement("button");
      pageNumber.className = "pagination-number";
      pageNumber.innerHTML = index;
      pageNumber.setAttribute("page-index", index);
      pageNumber.setAttribute("aria-label", "Page " + index);

      paginationNumbers.appendChild(pageNumber);
    };

    const getPaginationNumbers = () => {
      for (let i = 1; i <= pageCount; i++) {
        appendPageNumber(i);
      }
    };

    const setCurrentPage = (pageNum) => {
      currentPage = pageNum;

      handleActivePageNumber();
      handlePageButtonsStatus();

      const prevRange = (pageNum - 1) * paginationLimit;
      const currRange = pageNum * paginationLimit;

      listItems.forEach((item, index) => {
        item.classList.add("hidden");
        if (index >= prevRange && index < currRange) {
          item.classList.remove("hidden");
        }
      });
    };

    window.addEventListener("load", () => {
      getPaginationNumbers();
      setCurrentPage(1);

      prevButtonComments.addEventListener("click", () => {
        setCurrentPage(currentPage - 1);
      });

      nextButtonComments.addEventListener("click", () => {
        setCurrentPage(currentPage + 1);
      });

      document.querySelectorAll(".pagination-number").forEach((button) => {
        const pageIndex = Number(button.getAttribute("page-index"));

        if (pageIndex) {
          button.addEventListener("click", () => {
            setCurrentPage(pageIndex);
          });
        }
      });
    });
  } catch (error) {
    console.error("Ошибка при загрузке данных: ", error);
  }
}

loadCommentsFromFile();

// ************************рендер ПУБЛИКАЦИИ*****************

var postsList = [];
const posts = document.querySelector(".posts-card");
var postsPopupList = [];

class Post {
  constructor(id, titleMain, date, imagePathSmall, title) {
    this.id = id;
    this.titleMain = titleMain;
    this.date = date;
    this.imagePathSmall = imagePathSmall;
    this.title = title;
  }

  renderPost() {
    return `
                        <li class="post-item open-btn" id="${this.id}">
                                <div class="div-for-img-small-post">
                                        <img class="post-item-img" src="${
                                          this.imagePathSmall
                                        }" alt=""/>
                                </div>
                                <p class="titleMain">${this.titleMain}</p>
                                <p class="title">${this.title.slice(
                                  0,
                                  100
                                )}...</p>
                                <p class="date uppercase">${this.date}</p>
                                </div>
                        </li>
                `;
  }
}

function renderPostsList() {
  postsList.forEach((post) => {
    posts.innerHTML += new Post(
      post.id,
      post.titleMain,
      post.date,
      post.imagePathSmall,
      post.title
    ).renderPost();
  });
}

async function loadPostsFromFile() {
  try {
    const response = await fetch("./publications.json");
    const data = await response.json();
    postsList = data.map((item) => {
      return new Post(
        item.id,
        item.titleMain,
        item.date,
        item.imagePathSmall,
        item.title
      );
    });
    postsPopupList = data.map((item) => {
      return new PostPopup(
        item.id,
        item.titleMain,
        item.date,
        item.imagePath,
        item.title,
        item.message,
        item.quote
      );
    });

    renderPostsList();
    const listPostItems = posts.querySelectorAll("li");
    const nextButtonPosts = document.getElementById("next-buttonPosts");
    var openPostPopupBtn = document.querySelectorAll(".open-btn");
    let currentPage = 1;
    var paginationLimit = 3;
    var itemsForModal;

    const setCurrentPage = (pageNum) => {
      currentPage = pageNum;

      const setPaginationLimit = () => {
        if (document.documentElement.clientWidth >= 1024) {
          paginationLimit = 3;
          const prevRange = (pageNum - 1) * paginationLimit;
          const currRange = pageNum * paginationLimit;

          listPostItems.forEach((item, index) => {
            item.classList.add("hidden");
            if (index >= prevRange && index < currRange) {
              item.classList.remove("hidden");
            }
          });
        } else if (
          document.documentElement.clientWidth > 789 &&
          document.documentElement.clientWidth < 1024
        ) {
          paginationLimit = 2;
          const prevRange = (pageNum - 1) * paginationLimit;
          const currRange = pageNum * paginationLimit;

          listPostItems.forEach((item, index) => {
            item.classList.add("hidden");
            if (index >= prevRange && index < currRange) {
              item.classList.remove("hidden");
            }
          });
        } else if (document.documentElement.clientWidth < 790) {
          paginationLimit = 3;
          const prevRange = (pageNum - 1) * paginationLimit;
          const currRange = pageNum * paginationLimit;

          listPostItems.forEach((item, index) => {
            item.classList.add("hidden");
            if (index >= prevRange && index < currRange) {
              item.classList.remove("hidden");
            }
          });
        }
      };
      const prevRange = (pageNum - 1) * paginationLimit;
      const currRange = pageNum * paginationLimit;

      listPostItems.forEach((item, index) => {
        item.classList.add("hidden");
        if (index >= prevRange && index < currRange) {
          item.classList.remove("hidden");
        }
      });
      window.addEventListener("resize", setPaginationLimit);
    };

    window.addEventListener("load", () => {
      setCurrentPage(1);

      nextButtonPosts.addEventListener("click", () => {
        if (currentPage < Math.ceil(listPostItems.length / paginationLimit)) {
          setCurrentPage(currentPage + 1);
        } else if (
          currentPage == Math.ceil(listPostItems.length / paginationLimit)
        ) {
          setCurrentPage(
            currentPage -
              (Math.ceil(listPostItems.length / paginationLimit) - 1)
          );
        }
      });
    });

    openPostPopupBtn.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        containerPostPopup.classList.add("active");
        postPopupBg.classList.add("active");

        scrollY = window.scrollY;
        const body = document.body;
        body.style.position = "fixed";
        body.style.top = `-${scrollY}px`;

        let postIdOnclick;
        postIdOnclick = e.currentTarget.id;
        itemsForModal = postsPopupList.filter(
          (item) => item.id == postIdOnclick
        );

        itemsForModal.forEach((postIdOnclick) => {
          containerPostPopup.innerHTML = new PostPopup(
            postIdOnclick.id,
            postIdOnclick.titleMain,
            postIdOnclick.date,
            postIdOnclick.imagePath,
            postIdOnclick.title,
            postIdOnclick.message,
            postIdOnclick.quote
          ).renderPostPopup();
        });
      });
    });
  } catch (error) {
    console.error("Ошибка при загрузке данных: ", error);
  }
}

loadPostsFromFile();

// ************************попап ПУБЛИКАЦИЯ*****************

let closePostPopupBtn = document.querySelector(".closePostsPopupBtn");
let containerPostPopup = document.querySelector(".container_postsPopup");
let postPopupBg = document.querySelector(".postsPopup");

closePostPopupBtn.addEventListener("click", () => {
  postPopupBg.classList.remove("active");
  containerPostPopup.classList.remove("active");
  const body = document.body;
  body.style.position = "";
  body.style.top = "";

  window.scrollTo(0, scrollY);
});

class PostPopup {
  constructor(id, titleMain, date, imagePath, title, message, quote) {
    this.id = id;
    this.titleMain = titleMain;
    this.date = date;
    this.imagePath = imagePath;
    this.title = title;
    this.message = message;
    this.quote = quote;
  }

  renderPostPopup() {
    return `
                        <div  id="${this.id}" class="modal-container_postsPopup">
                                <div class="head-post ">
                                        <div class="title-head-post ">
                                                <h1 class="titleMainHead">${this.titleMain}</h1>
                                                <p class="date uppercase">${this.date}</p>
                                        </div>
                                        <div class="repost">
                                                <p class="date inPopup">Поделиться статьей:</p>
                                                <div class="repost-icon">
                                                        <a href="https://vk.com/share.php?url=https://www.dr-gritsenko.com" target="_blank" rel="noreferrer"><img src="/images/vk.png" alt=""/></a>
                                                        <a href="https://connect.ok.ru/offer?url=https://www.dr-gritsenko.com&title=DR.GRITSENKO&imageUrl=images/mandala.png"  target="_blank" rel="noreferrer"><img src="/images/ok.png" alt="" /></a>
                                                        <a href="http://twitter.com/share?https://www.dr-gritsenko.com"  target="_blank" rel="noreferrer"><img src="/images/twitter.png" alt="" /></a>
                                                        <a href="https://telegram.me/share/url?url=https://www.dr-gritsenko.com"  target="_blank" rel="noreferrer"><img src="/images/telegramm.png" alt="" /></a>
                                                </div>
                                        </div>
                                </div>
                                <div class="head-img">
                                        <img src="${this.imagePath}" alt=""/>
                                </div>
                                <div class="main-post">
                                        <h2 class="title-main-post">${this.title}</h2>
                                        <p class="item-message">${this.message}</p>
                                </div>
                                <div class="div-for-quote">
                                        <div class="quote-post">
                                                <div tyle="border-radius: 50px;">
                                                        <img class="post-portret" src="/images/post-portret.jpg" tyle="border-radius: 50%;" alt=""/>
                                                        <p class="margin-top-post"> <b>Сергей Гриценко</b> </p>
                                                        <p class="vrach-kineziolog">Врач-кинезиолог</p>
                                                </div>
                                                <p class="quote">${this.quote}</p>
                                        </div>
                                        <img class="img-quotation-marks" src="/images/quotation-marks.png" alt=""/>
                                        <img class="img-quotation-marks-for-mobile" src="/images/quotation-marks.png" alt=""/>
                                </div>
                        </div>
                `;
  }
}

// ************************кнопка НАВЕРХ*****************
const btnUp = {
  el: document.querySelector(".btn-up"),
  show() {
    this.el.classList.remove("btn-up_hide");
  },
  hide() {
    this.el.classList.add("btn-up_hide");
  },
  init() {
    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      scrollY > 400 ? this.show() : this.hide();
    });
    this.el.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
  },
};
btnUp.init();

// ************************СЛАЙДЕР СЕРТИФИКАТЫ****************************

fetch("./certificates.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Не удалось загрузить JSON");
    }
    return response.json();
  })
  .then((data) => {
    const swiperWrapper = document.getElementById("swiper-wrapper");
    data.certificates.forEach((certificate) => {
      const slide = document.createElement("div");
      slide.classList.add("swiper-slide");
      const img = document.createElement("img");
      img.classList.add("certificate-slide");
      img.src = certificate.src;
      img.alt = "";
      slide.appendChild(img);
      swiperWrapper.appendChild(slide);
    });

    // Инициализация Swiper
    const diplomSlides = new Swiper(".diplom-slides", {
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
        clickable: true,
        dynamicBullets: true,
        dynamicMainBullets: 3,
      },
      spaceBetween: 50,
      keyboard: {
        enabled: true,
        onlyInViewport: true,
        pageUpDown: true,
      },
      mousewheel: {
        sensitivity: 1,
      },
      autoHeight: true,
      breakpoints: {
        480: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
        780: {
          slidesPerView: 1.5,
          spaceBetween: 10,
        },
        1098: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      },
    });
  })
  .catch((error) => console.error("Error loading JSON:", error));
