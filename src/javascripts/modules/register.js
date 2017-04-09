/**
 * Просиходит Валидация и Запись Данных в Базу
 * 
 * Оффтоп
 * -----------------------------------------
 * localStorage возрощает null при пустом значений
 */


import elements from "./query.js"
import helpers from "./helpers.js"
import view from "./view.js"
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
 * Авторизация Пользователя
 * 
 */
methods.authUser = (data) => {
    let usersData;

    usersData = JSON.parse(localStorage.getItem("users"));

    for (let i = 0, len = usersData.length; i < len; i++) {
        if(usersData[i].email === data.email &&
           usersData[i].password === data.password
        ) {
            return usersData[i];
        }
        
    }

    return false;
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
    if(!validate.getError()) return;

    if (parnetBlock.className === "register") {
        // Прежде что бы что то добовлять в Массив нужно сперва проийти валидацию
        dataArr.push(data);
        userData = JSON.stringify(dataArr);

        // Запись Данных ID, Имя, Email, Password, ..Time Возможно
        return methods.createUser(userData);
    }

    /**
     * Login
     * Здесь по идее надо пустить вторую валидацию
     */


    /**
     * 1 Делаем Запрос к базе
     * 2 Ищем совпадение с Данными.
     * 3 В результате Успеха, скрываем блок login/register Открываем блок 
     * logout / Profile
     */
    if( methods.authUser(data) ) {
        // Через модуль view отобразить что нибудь
        view.showProfile(methods.authUser(data), parnetBlock);
    }
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


