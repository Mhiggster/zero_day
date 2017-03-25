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
 * @return undefind
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
 * @return undefind
 * @param event object
 */
elements.header.nav.addEventListener("click", (e) => {
    e.preventDefault();
    let target = e.target;
    if (target.tagName !== "a".toUpperCase()) return;
    let elName = target.getAttribute("data-block");
    funcs.showBlock(elName);
});