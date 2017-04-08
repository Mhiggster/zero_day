import rules from "./rules.js"
import helpers from "./helpers.js"
import view from "./view.js"


let _rules = {
	pattern: {
		name: 0,
		email: /^(\w+)@(\w{1,})\.(com|ru|org)$/i,
		password: 6,
	},
	error: {
		name: "Вы не ввели Имя",
		email: [
			"Ваш Email Не Коретен",
			"Такой Email уже существует",
			"Вы не ввели Email",
		],
		password: [
			"Вы не ввели Пароль или 6 символо",
		],
		retypePassword: [
			"Вы не ввели повторно пароль Пароль",
			"Пароли не совпадают",
		],
	}
};


/**
 * Над этой часть надо подумать.
 */

export default {
	_default_error: {
		name: null,
		email: null,
		password: null,
		retypePassword: null,
	},
	_error: {},
	_getError: false,
	make(data) {
		// Обнуляем ошибки
		this._error = {};

		/**
		 * Валидация для Имени
		 */
		if (typeof data.name === "string") {
			if (data.name.length == _rules.pattern.name) {
				this._error.name = _rules.error.name;
			}
		}

		/**
		 * Валидация для Email
		 */
		if (typeof data.email === "string") {
			if (data.email.search(_rules.pattern.email) === -1) {
				this._error.email = _rules.error.email[0];
			}

			// if (data.email === "Email From DataBase") {
			// 	this.setError("email", _rules.error.email[1]);
			// }

			if (data.email.length === _rules.pattern.name) {
				this._error.email = _rules.error.email[2];
			}
		}


		/**
		 * Валидация для Password
		 */
		if (typeof data.password === "string") {
			if (data.password < _rules.pattern.password) {
				this._error.password = _rules.error.password[0];
			}

			if (data.retypePassword < _rules.pattern.password) {
				this._error.retypePassword = _rules.error.retypePassword[0];
			}

			if (data.retypePassword !== data.password) {
				this._error.retypePassword = _rules.error.retypePassword[1];
			}
		}
		
	},
	setError() {
		return helpers.extend({}, this._default_error, this._error);
	},
	showError(parnetBlock) {
		view.showError(this.setError(), parnetBlock);
	},
	getError() {
		/**
		 * Последняя Проверка для Регистраций
		 * Если все ключи равны null. То валидация прошла успешно
		 */
		let setHash = this.setError();

		// Скрипт работает не правильно
		// Сделать Эту часть
		for(let key in setHash) {

			setHash[key] === null
		}
		// console.log(this._getError);
	},

}