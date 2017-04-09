/**
 * Здест Будет происходить визулизация Login / Register
 * По сути Все что тут будет происходить это по очередная Визуализация
 * Блоков. При кликабельности Пунктов меню.
 * Возможно в будущем Добавлю еще функционал
 * 
 * Оффтоп Для себя.
 * ------------------------------------------------------------
 * Нет смысла Экспортировать Анонимную функцию. Модуль сам скроет.
 */



import elements from "./query.js"

let funcs = {},
    oldElement;




/**
 * Вспомогательная функция: для elements.header.nav
 * Скрывает и Показывает Активный Блок
 * 
 * @return undefined
 * @param string
 */
funcs.showBlock = (elName) => {
    let contentBlock = elements.section.content.querySelector("." + elName);
    contentBlock.classList.remove("hide");

    if (oldElement) {
        if (oldElement === contentBlock) return;
        oldElement.classList.add("hide");
    }
    oldElement = contentBlock;
};

/**
 * Здесь Идет лищь Нахождения Нужного Блока.
 * И его Визуализаций
 * 
 * @return undefined
 * @param object
 */
elements.header.nav.addEventListener("click", (e) => {
    e.preventDefault();
    let target = e.target;
    if (target.tagName !== "a".toUpperCase()) return;
    let elName = target.getAttribute("data-block");
    funcs.showBlock(elName);
});



/**
 * ShowE Error
 * Здесь Идет визуализация ошибок
 * 
 * Получаем Ошибки
 * Ищем нужный блок для Ошибок
 * Отображаем эти ошибки
 * 
 * @param object
 * 
 */
funcs.showError = (errors, parentBlock) => {
    let registerBlock,
        errorEl,
        errArr,
        newErrArr,
        outputErr;

    // Заменяем имя елемента на имя класса если он есть
    errArr = Object.keys(errors);

    // тут луче сделать копию
    errorEl = errArr.indexOf("retypePassword");

    newErrArr = errArr.slice(0, errorEl);


    if (errorEl !== -1) {
        newErrArr[errorEl] = "r-password";
    }

    /**
     * Сперва Запись в елемент
     * Позже Выявления
     */
    for (let i = 0, len = newErrArr.length; i < len; i++) {
        try {
            outputErr = parentBlock
                .querySelector("[data-id=" + newErrArr[i] + "]")
                .parentElement
                .querySelector(".text-danger");
        } catch(e) {
            // Записать в log_file или localStorage.
            // console.error(e);
            continue;
        }
        outputErr.innerHTML = errors[errArr[i]];
        outputErr.classList.remove("hide");
    }
    // console.log(registerBlock);
}

/**
 * Отображает Блок профилья
 */
funcs.showProfile = (userData, parentBlock) => {
    let profileBlock,
        userList,
        userDataArr = [];

    profileBlock = parentBlock.nextElementSibling;

    /**
     * 1) Я должен Скрыть Блок register/logout и меню тоже
     * 2) В меню открыть logout
     * 3) В Блоке Информацию о пользователе
     */
    Array.prototype.forEach.call(elements.header.nav.querySelectorAll("li"), (el) => {
        if (el.querySelector("a").getAttribute("data-block") !== "profile") {
            return el.classList.add("hide");
        } 
        el.classList.remove("hide");
    });



    parentBlock.classList.add("hide");
    profileBlock.classList.remove("hide");


    // Добовим инофрмацию Пользователя
    userList = profileBlock
        .querySelector("tbody")
        .querySelector("tr")
        .querySelectorAll("td");

    for(let key in userData) {
        if (key === "id") {
            userData[key] = userData[key].slice(0, 5);
        }
        userDataArr.push(userData[key]);
    }

    for(let i = 0, len = userList.length; i < len; i++ ) {
        userList[i].innerHTML = userDataArr[i];
    }
    // Находим блок tbody c tr
    // И по циклу через AppendChild Пройдемся по все пунктам
}


funcs.showAllUsers = () => {
    console.log("I'm Gonna Show You SomeThing Beautiful");
}

export default {
    showError: funcs.showError,
    showProfile: funcs.showProfile,
}