/**
 * Просиходит Валидация и Запись Данных в Базу
 * 
 * Оффтоп
 * -----------------------------------------
 * localStorage возрощает null при пустом значений
 */


import elements from "./query.js"
import helpers from "./helpers.js"

import validate from "./validator.js"

let methods = {};
    

/**
 * Запись Пользователя в Базу Данных
 * 
 * @param json
 */
methods.createUser = (data) => {
    localStorage.setItem("users", data);
};


/**
 * Валидация
 * -------------------------------------------------
 * 
 * Сборка Данных
 * -------------------------------------------------
 * Собираю все данные с Формы. Генерирую ID и Время
 * Делаю Запрос К баззе Для Генерация Правильного Массива
 * 
 * @param object
 */
methods.validateAndCollectData = (parnetBlock) => {
    let getOldData,
        dataArr,
        userData,
        data = {};

    // 1 Сбор Данных
    if (parnetBlock.className === "register") {
        data.id = helpers.guid();
        data.name = parnetBlock.querySelector("[data-id=name]").value.trim();
        data.email = parnetBlock.querySelector("[data-id=email]").value.trim();
        data.password = parnetBlock.querySelector("[data-id=password]").value.trim();
        data.retypePassword = parnetBlock.querySelector("[data-id=r-password]").value.trim();
    } else {
        data.email = parnetBlock.querySelector("[data-id=email]").value.trim();
        data.password = parnetBlock.querySelector("[data-id=password]").value.trim();
    }
   
    


    

    // 2 Поиск Старрых Данных Если есть
    getOldData = JSON.parse(localStorage.getItem("users"));
    dataArr = (getOldData) ? getOldData : [];
    

    // 3 Валидация
    // Пропускам Валидацию
    validate.make(data);
    // Отображаем ошибки если есть
    validate.showError(parnetBlock);
    // Прерываем запись если есть ошибки
    if(validate.getError()) return;
    return;
    // Прежде что бы что то добовлять в Массив нужно сперва проийти валидацию
    dataArr.push(data);
    userData = JSON.stringify(dataArr);

    // Запись Данных ID, Имя, Email, Password, ..Time Возможно
    methods.createUser(userData);
};

/**
 * Находим Блок Оправителя / Родителя.
 * 
 * @param event object
 */
elements.section.content.addEventListener("click", (e) => {
    e.preventDefault();
    let target = e.target;
    if (target.tagName !== "button".toUpperCase()) return;
    let parnetBlock = target.parentElement.parentElement;
    methods.validateAndCollectData(parnetBlock);
});


