/**
 * Тут Будут Храниться все запросы к DOM узлам. 
 * Возможно это все в будущем уйдет в Хэлпер
 * По возможности добовлять только Глобальные Запросы.
 * 
 * ---------------------------------------------
 * Сперва идет: Обьект -> Найменование Блока - > Сам Элемент
 */

let elements = {
    header: {
        nav: document.querySelector(".nav"),
    },
    section: {
        content: document.querySelector(".content"),
    }
};


export default elements;