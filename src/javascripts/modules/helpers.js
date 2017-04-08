/**
 * Тут Будут Храниться все Вспомогательный Функций или классы.
 * Создание Элемента, Время итд
 */


/**
 * Extends
 * 
 * Expample
 * ------------------------------
 * extend({}, objA, objB);
 */
let extend = function(out) {
  out = out || {};

  for (let i = 1; i < arguments.length; i++) {
    if (!arguments[i])
      continue;

    for (let key in arguments[i]) {
      if (arguments[i].hasOwnProperty(key))
        out[key] = arguments[i][key];
    }
  }

  return out;
};


let guid = () => {
  let s4 = () => {
          return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}



module.exports = {
	extend: extend,
  guid: guid,
};