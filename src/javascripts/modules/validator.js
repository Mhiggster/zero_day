import rules from "./rules.js"


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
			"Пароли не совпадают",
		],
	}
};



export default {
	_error: {
		name: null,
		email: null,
		password: null,
		retypePassword: null,
	}, 
	make(data) {
		// тут у нас по сути строки
		if (data.name.length === _rules.pattern.name) {
			this.setError("name", _rules.error.name);
		}

		if (data.email.search(_rules.pattern.email) === -1) {
			this.setError("email", _rules.error.email[0]);
		}

		// if (data.email === "Email From DataBase") {
		// 	this.setError("email", _rules.error.email[1]);
		// }

		if (data.email.length === _rules.pattern.name) {
			this.setError("email", _rules.error.email[2]);
		}

		if (data.password < _rules.pattern.password) {
			this.setError("password", _rules.error.password[0]);
		}
		
	},
	setError(key, value) {
		// Нужно Обнулить Ошибки
		this._error[key] = value;
	},
	getError() {
		return this._error;
	},

}