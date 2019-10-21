export default class Helpers {
    static randomProperty ( obj ) {
        var keys = Object.keys(obj)
        return obj[keys[keys.length * Math.random() << 0]];
    }

    static mixedOrder( words ) {
        var currentIndex = words.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = words[currentIndex];
            words[currentIndex] = words[randomIndex];
            words[randomIndex] = temporaryValue;
        }

        return words;
    }

    static createElement(name, index, options, action) {
        if (!(name || options)) return;

        let el = document.createElement(name);

        if (options) {
            for (let key in options) {
                el.setAttribute(key, options[key]);
            }
        }

        action(el, index);
    }

    static chunk ( array, chunk ) {
        var R = [];
        for (var i = 0; i < array.length; i += chunk)
            R.push(array.slice(i, i + chunk));
        return R;
    }
}