"use strict" // строгий режим

// прокрутка при клике
const menuLinks = document.querySelectorAll('a[data-goto]');
if(menuLinks.length > 0) {
        menuLinks.forEach(menuLink => {
                menuLink.addEventListener("click", onMenuLinkClick);
        });

        function onMenuLinkClick(e) {
                const menuLink = e.target;
                // проверка на наличие нужного блока
                if(menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)){
                        const gotoBlock = document.querySelector(menuLink.dataset.goto);
                        // высчитывание размеров экрана и прокрутки
                        const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset;

                        window.scrollTo({
                                top: gotoBlockValue,
                                behavior: "smooth"
                        });
                        e.preventDefault();
                }
        }
}
// ************************бургер************************************************

// Get Modal
var modal = document.getElementById('myModal');
    
// Get pseudoelement to open Modal
var btn = document.getElementById("sized");

// Get the <span> element to close Modal
var span = document.getElementsByClassName("close")[0];

const closeLinks = document.querySelectorAll(".gray");
if(closeLinks.length > 0) {
        closeLinks.forEach(closeLink => {
                closeLink.addEventListener("click", onMenuCloseLink);
        });

        function onMenuCloseLink (e) {
                e.preventDefault();
                modal.style.display = "none";
                };
}
// When user clicks button, open Modal
btn.onclick = function() {
   modal.style.display = "block";
//    const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
//                 body.style.position = 'fixed';
//                 body.style.top = `-${scrollY}`;
   };

// When user clicks Close (x), close Modal
span.onclick = function() {
   modal.style.display = "none";
//    const scrollY = body.style.top;
//         body.style.position = '';
//         body.style.top = '';
//         window.scrollTo(0, parseInt(scrollY || '0') * -1);
   };


// When user clicks anywhere outside of the Modal, close Modal
 window.onclick = function(event) {
    if (event.target == modal) {
       modal.style.display = "none";
//        const scrollY = body.style.top;
//        body.style.position = '';
//        body.style.top = '';
//        window.scrollTo(0, parseInt(scrollY || '0') * -1);
       }
    }

// ************************АНИМАЦИЯ************************************************
const animItems = document.querySelectorAll('._anim-items');

if(animItems.length > 0){
        // событие на окно браузера
        window.addEventListener('scroll', animOnScroll);
        function animOnScroll(){
                for(let i=0; i<animItems.length; i++){
                        const animItem = animItems[i];
                        // определяем высоту объекта
                        const animItemHeight = animItem.offsetHeight;
                        // получаем позицию объекта относительно верха
                        const animItemOffset = offset(animItem).top;
                        // устанавливаем коэффициент
                        const animStart = 4;

                        // настраиваем старт анимации
                        // опред. высоту окна браузера
                        let animItemPoint = window.innerHeight - animItemHeight / animStart;

                        // если высота анимированного объекта больше окна браузера
                        if (animItemHeight > window.innerHeight){
                                animItemPoint = window.innerHeight - window.innerHeight / animStart;
                        }

                        // для того, чтобы мы могли повторно анимировать объект
                        if((pageYOffset > animItemOffset-animItemPoint) && pageYOffset < (animItemOffset+animItemHeight)){
                                animItem.classList.add('_active');
                        }else{
                                animItem.classList.remove('_active');
                        }
                }
        }
        function offset(el){
                const rect = el.getBoundingClientRect(),
                // получаем данные о прокрученных пикселях
                scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
                scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
        }
        setTimeout(() => {animOnScroll();}, 300);
}


// ************************СЛАЙДЕР НА ГЛАВНОМ ЭКРАНЕ****************************
const nextButton = document.querySelector('.next');
const nextMobileButton = document.querySelector('.next_mobile');
const prevMobileButton = document.querySelector('.previous_mobile');
const prevButton = document.querySelector('.prev');
const pointNextButton = document.querySelector('.point-next');
var slides = document.querySelectorAll(".item");
var slideIndex = 1;
showSlides(slideIndex);

/* Функция увеличивает индекс на 1, показывает следующий слайд*/
function plusSlide() {
    showSlides(slideIndex += 1);
}
nextButton.addEventListener('click', plusSlide);
prevButton.addEventListener('click', minusSlide);
pointNextButton.addEventListener('click', plusSlide);
nextMobileButton.addEventListener('click', plusSlide);
prevMobileButton.addEventListener('click', minusSlide);
/* Функция уменьшяет индекс на 1, показывает предыдущий слайд*/
function minusSlide() {
    showSlides(slideIndex -= 1);  
}
/* Устанавливает текущий слайд */
function currentSlide(n) {
    showSlides(slideIndex = n);
}
/* Основная функция слайдера */
function showSlides(n) {
    var i;
    if (n > slides.length) {
      slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "flex";
}

setInterval(plusSlide, 4000);


// ******************ПОП-АП Записаться на консультацию**********************
let body = document.querySelector ('body');

let popupBg = document.querySelector('.popup__bg'); // Фон попап окна
let popup = document.querySelector('.popup'); // Само окно
let openPopupButtons = document.querySelectorAll('.open-popup'); // Кнопки для показа окна
let closePopupButton = document.querySelector('.close-popup'); // Кнопка для скрытия окна

var form = document.querySelector("#form");


var personName = document.querySelector("#form-name");
var personMessage = document.querySelector("#form-message");

// инициализируем маску и intlTelInput (флаги стран)
const inputPhone = document.querySelector("#phone");
const orderBtn = document.querySelector(".order-btn");

intlTelInput(inputPhone, {
        initialCountry: "ru",
        preferredCountries: ['ru', 'by', 'ua'],
        separateDialCode: true,
        nationalMode: false,
        // hiddenInput: "full",
        // utilsScript: "//cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.3/js/utils.js"
});


const mask = new IMask(inputPhone,  {
        mask: '(000)000-00-00',
        lazy: false,
})
inputPhone.addEventListener("click", () => {
        mask.updateValue("");
      }); 

personName.addEventListener("input", inputPhoneHandler);
inputPhone.addEventListener("input", inputPhoneHandler);
personMessage.addEventListener("input", inputPhoneHandler);
// включение-отключение кнопки 
function inputPhoneHandler(){
        if(personName.value.length > 0 && mask.masked.unmaskedValue && personMessage.value.length > 0) {
                orderBtn.classList.add('order-btn--active');
        }else {orderBtn.classList.remove('order-btn--active');}
}

// оформление заказа
orderBtn.addEventListener("click", sendEmailTelegram);
// отправка формы  в бот
const TELEGRAM_BOT_TOKEN = '5937729381:AAEaLNAOPgViFHp573hqj4WT4_J9TucRNRQ';
const TELEGRAM_CHAT_ID = '@ForSiteGritsenko';
const API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`

// запрет на отправку формы при нажатии на клавишу Enter
form.addEventListener('keydown', function(event) {
        if(event.keyCode == 13) {
                event.preventDefault();
        }
});

async function sendEmailTelegram(event) {
        event.preventDefault();
        // console.log(form)

        const formSendResult = document.querySelector('.form__send-result')
        formSendResult.textContent = '';

        // деструктуризация {...}
        const { name, phone = mask.masked.unmaskedValue, message } = Object.fromEntries(new FormData(form).entries());
        // console.log( { name, phone, message } )

        const text = `Заявка от ${name}\nТелефон: ${phone} \nСообщение: ${message}`;
        // console.log(text)

        try {
                orderBtn.textContent = 'Отправляем заявку...';

                const response = await fetch(API, {
                method: "POST",
                headers: {
                        'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                        chat_id: TELEGRAM_CHAT_ID,
                        text,
                })
                })
                
                if (response.ok) {
                formSendResult.textContent = 'Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.';
                form.reset()

                } else {
                throw new Error(response.statusText);
                }

        } catch (error) {
                console.error(error);
                formSendResult.textContent = 'Анкета не отправлена! Попробуйте позже.';
                formSendResult.style.color = 'red';

        } finally {
                orderBtn.textContent = 'Записаться на прием';
                orderBtn.classList.remove('order-btn--active');
                form.reset()
        }
}




// открытие поп-апа
openPopupButtons.forEach((button) => { // Перебираем все кнопки
  button.addEventListener('click', (e) => { // Для каждой вешаем обработчик событий на клик
        e.preventDefault(); // Предотвращаем дефолтное поведение браузера
                popupBg.classList.add('active'); // Добавляем класс 'active' для фона
                popup.classList.add('active'); // И для самого окна

                const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
                body.style.position = 'fixed';
                body.style.top = `-${scrollY}`;

        })
});
// закрытие поп-апа с крестика
closePopupButton.addEventListener('click',() => { // Вешаем обработчик на крестик
        popupBg.classList.remove('active'); // Убираем активный класс с фона
        popup.classList.remove('active'); // И с окна

        const scrollY = body.style.top;
        body.style.position = '';
        body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);

});

// закрытие поп-апа с фона
document.addEventListener('click', (e) => { // Вешаем обработчик на весь документ
        if(e.target === popupBg) { // Если цель клика - фон, то:
                popupBg.classList.remove('active'); // Убираем активный класс с фона
                popup.classList.remove('active'); // И с окна

                const scrollY = body.style.top;
                body.style.position = '';
                body.style.top = '';
                window.scrollTo(0, parseInt(scrollY || '0') * -1);

        }
});
window.addEventListener('scroll', () => {
        document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
      });




// *************************ПОП-АП Отзывы**********************************
let openCommentsPopupBtn = document.querySelectorAll('.openCommentsPopupBtn'); // Кнопки для показа окна
let closeCommentsPopupBtn = document.querySelector('.closeCommentsPopupBtn'); // Кнопки для закрытия окна
let containerCommentsPopup = document.querySelector('.container-commentsPopup'); // Само окно
let commentsPopup = document.querySelector('.commentsPopup'); // Фон попап окна

// открытие поп-апа
openCommentsPopupBtn.forEach((button) => { // Перебираем все кнопки
        button.addEventListener('click', (e) => { // Для каждой вешаем обработчик событий на клик
              e.preventDefault(); // Предотвращаем дефолтное поведение браузера
              containerCommentsPopup.classList.add('active'); // И с окна
              commentsPopup.classList.add('active'); // И с окна

              const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
                // const body = document.body;
                body.style.position = 'fixed';
                body.style.top = `-${scrollY}`;
        });
});

// закрытие поп-апа с крестика
closeCommentsPopupBtn.addEventListener('click',() => { // Вешаем обработчик на крестик
        commentsPopup.classList.remove('active'); // И с окна
        containerCommentsPopup.classList.remove('active'); // И с окна

        const scrollY = body.style.top;
        body.style.position = '';
        body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);

});
// ************************рендер ОТЗЫВЫ*****************

var commentsList = [];
const comments = document.querySelector('.comments');
// console.log(comments)


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
        try{
                const response = await fetch("/comments.json");
                const data = await response.json();
                commentsList = data.map((item) => {
                        return new Comment(
                                item.id,
                                item.name,
                                item.date,
                                item.message);
                });
                // console.log(commentsList);

                renderCommentsList();
                const listItems = comments.querySelectorAll("li");
                // console.log(listItems  )
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

var postsList = []; // массив для списка постов (маленьких)
const posts = document.querySelector('.posts-card'); // получаем доступ к блоку, куда будем рендерить посты
var postsPopupList = []; //массив для списка постов (развернутых - попап)

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
                                        <img class="post-item-img" src="${this.imagePathSmall}" alt=""/>
                                </div>
                                <p class="titleMain">${this.titleMain}</p>
                                <p class="title">${this.title.slice(0,100)}...</p>
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
        try{
                const response = await fetch("/publications.json");
                const data = await response.json();
                postsList = data.map((item) => {
                        return new Post(
                                item.id,
                                item.titleMain,
                                item.date,
                                item.imagePathSmall,
                                item.title);
                });
                postsPopupList = data.map((item) => {
                        return new PostPopup(
                                item.id,
                                item.titleMain,
                                item.date,
                                item.imagePath,
                                item.title,
                                item.message,
                                item.quote);
                });
                // console.log(postsList);

                renderPostsList();
                const listPostItems = posts.querySelectorAll("li");
                // console.log(listPostItems)
                const nextButtonPosts = document.getElementById("next-buttonPosts");
                var openPostPopupBtn = document.querySelectorAll('.open-btn'); // Кнопки для показа окна
                let currentPage = 1;
                var paginationLimit = 3;
                var itemsForModal; //переменная для сохранения нужной публикации при клике
                
                const setCurrentPage = (pageNum) => {
                        currentPage = pageNum;

// определяем ширину экрана и в зависимости от ширины выводим нужное количество маленьких публикаций
                        const setPaginationLimit = () => {
                                if(document.documentElement.clientWidth >= 1024){
                                        paginationLimit = 3;
                                        currentPage = pageNum;
                                        const prevRange = (pageNum - 1) * paginationLimit;
                                        const currRange = pageNum * paginationLimit;

                                        listPostItems.forEach((item, index) => {
                                                item.classList.add("hidden");
                                                if (index >= prevRange && index < currRange) {
                                                item.classList.remove("hidden");
                                                }
                                        });
        
                                }else if(document.documentElement.clientWidth > 789 && document.documentElement.clientWidth < 1024){
                                        paginationLimit = 2;
                                        currentPage = pageNum;
                                        const prevRange = (pageNum - 1) * paginationLimit;
                                        const currRange = pageNum * paginationLimit;

                                        listPostItems.forEach((item, index) => {
                                                item.classList.add("hidden");
                                                if (index >= prevRange && index < currRange) {
                                                item.classList.remove("hidden");
                                                }
                                        });
                                }else if(document.documentElement.clientWidth < 790){
                                        paginationLimit = 3;
                                        currentPage = pageNum;
                                        const prevRange = (pageNum - 1) * paginationLimit;
                                        const currRange = pageNum * paginationLimit;

                                        listPostItems.forEach((item, index) => {
                                                item.classList.add("hidden");
                                                if (index >= prevRange && index < currRange) {
                                                item.classList.remove("hidden");
                                                }
                                        });
                                };
                                
                        };
                        const prevRange = (pageNum - 1) * paginationLimit;
                        const currRange = pageNum * paginationLimit;

                        listPostItems.forEach((item, index) => {
                                item.classList.add("hidden");
                                if (index >= prevRange && index < currRange) {
                                item.classList.remove("hidden");
                                }
                        });
                        window.addEventListener('resize', setPaginationLimit);
                };
                // кнопка "Показать еще"
                window.addEventListener("load", () => {
                        setCurrentPage(1);

                        nextButtonPosts.addEventListener("click", () => {
                                if(currentPage < Math.ceil(listPostItems.length/paginationLimit)){
                                        setCurrentPage(currentPage + 1);
                                }else if(currentPage == (Math.ceil(listPostItems.length/paginationLimit))){
                                        setCurrentPage(currentPage - (Math.ceil(listPostItems.length/paginationLimit)-1));
                                }
                        });
                });

                // открытие поп-апа Публикации
                openPostPopupBtn.forEach((button) => { // Перебираем все кнопки
                        button.addEventListener('click', (e) => { // Для каждой вешаем обработчик событий на клик
                                e.preventDefault(); // Предотвращаем дефолтное поведение браузера
                                containerPostPopup.classList.add('active'); // Окно
                                postPopupBg.classList.add('active'); // Фон

                                // переменная для получения id при клике на публикацию
                                let postIdOnclick;
                                postIdOnclick = e.currentTarget.id;
                                itemsForModal = postsPopupList.filter((item) => item.id == postIdOnclick);

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

                                const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
                                body.style.position = 'fixed';
                                body.style.top = `-${scrollY}`;
                        });
                });

        } catch (error) {
                console.error("Ошибка при загрузке данных: ", error);
        }
}

loadPostsFromFile();


// ************************попап ПУБЛИКАЦИЯ*****************

let closePostPopupBtn = document.querySelector('.closePostsPopupBtn'); // Кнопки для закрытия окна
let containerPostPopup = document.querySelector('.container_postsPopup'); // Само окно
let postPopupBg = document.querySelector('.postsPopup'); // Фон попап окна


// закрытие поп-апа с крестика
closePostPopupBtn.addEventListener('click',() => { // Вешаем обработчик на крестик
        postPopupBg.classList.remove('active'); // И с окна
        containerPostPopup.classList.remove('active'); // И с окна

        const scrollY = body.style.top;
        body.style.position = '';
        body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);

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
                                                        <p class="margin-top-post"  s > <b>Сергей Гриценко</b> </p>
                                                        <p  class="vrach-kineziolog">Врач-кинезиолог</p>
                                                        </div>
                                                        <p class="quote" >${this.quote}</p>
                                                </div>
                                                <img class="img-quotation-marks" src="/images/quotation-marks.png" alt=""/>
                                                <img class="img-quotation-marks-for-mobile" src="/images/quotation-marks.png" alt=""/>
                                        </div>
                                </div>
                        </div>
                `;
        }
}


// ************************кнопка НАВЕРХ*****************
const btnUp = {
        el: document.querySelector('.btn-up'),
        show() {
          // удалим у кнопки класс btn-up_hide
                this.el.classList.remove('btn-up_hide'); 
        },
        hide() {
          // добавим к кнопке класс btn-up_hide
                this.el.classList.add('btn-up_hide');
        },
        addEventListener() {
          // при прокрутке содержимого страницы
                window.addEventListener('scroll', () => {
            // определяем величину прокрутки
                const scrollY = window.scrollY || document.documentElement.scrollTop;
            // если страница прокручена больше чем на 400px, то делаем кнопку видимой, иначе скрываем
                scrollY > 400 ? this.show() : this.hide();
                });
          // при нажатии на кнопку .btn-up
                document.querySelector('.btn-up').onclick = () => {
            // переместим в начало страницы
                window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
                });
                }
        }
}
btnUp.addEventListener();



// ************************СЛАЙДЕР СЕРТИФИКАТЫ****************************
var diplomSlides = new Swiper('.diplom-slides', {
        navigation:{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
        },
        pagination:{
                el: '.swiper-pagination',
                type: "bullets",
                clickable: true,
                dynamicBullets: true,
                dynamicMainBullets: 3,
        },

        // slideToClickedSlide: true,
        // loop: true,
        // loopedSlice: 3,
        spaceBetween: 50,

        // переключение клавиатурой
        keyboard:{
                enabled: true,
                onlyInViewport: true,
                pageUpDown:true,
        },
        // мышкой
        mousewheel:{
                sensitivity: 1,
        },

        // slidesPerGroup: 3,
        autoHeight: true,
        initialSlide: 0,

        breakpoints:{
                480: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                },
                pagination:{
                        dynamicMainBullets: 3,
                },
        },
        breakpoints:{
                780: {
                        slidesPerView: 1.5,
                        spaceBetween: 10,
                }
        },
        breakpoints:{
                1098: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                }
        },
        breakpoints:{
                1200: {
                        slidesPerView: 4,
                        spaceBetween: 30,
                }
        },


});
