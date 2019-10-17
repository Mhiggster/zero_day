import Helpers from './helpers'

export default class Render {
    // static property

    constructor () {
        // singleton
        if (!!Render.instance) return Render.instance;

        this.dictionary = [];
        this.scenes = 0
        this.start = 0
        this.currentScene = null
        this.wordsOutput; // for shuffle words

        this.correct = 0
        this.incorrect = 0

        Render.instance = this;
    }

    queryParentBody () {
        return document.querySelector('.survay-table_body');
    }

    imutate ( dictionary ) {
        // instance the voc data
        this.dictionary = dictionary
        // scenes lenngth
        this.scenes = this.dictionary.length
        // rendering
        this.currentScene = this.dictionary[this.start]

        this.display();
    }


    display () {
        this
          .word( this.currentScene.word )
          .translationsList( this.currentScene.translations )
          .drawing();
    }

    // render the main word
    word ( word ) {
        document.querySelector('.word').innerHTML = word

        return this;
    }


    score () {
        document.querySelector('.score').innerHTML = `<span class="has-text-success">${this.correct}</span>/<span class="has-text-danger">${this.incorrect}</span>`;
    }

    // get shaful words
    translationsList( translations ) {
        this.wordsOutput = Helpers.mixedOrder(translations)

        return this
    }

    // drawing the traslatbale words lists
    drawing () {
        // reset the scene
        this.queryParentBody().innerHTML = '';
        
        // rendering the words
        this.wordsOutput.forEach(item => {
            Helpers.createElement('tr', item.translation, {
                'correct': item.correct,
            }, this.injectTriggersElement.bind(this));
        })
    }

    injectTriggersElement( el, translation ) {
        el.innerHTML = `<td colspan="2">${translation}</td>`;
        this.queryParentBody().appendChild(el);
    }


    trainingEnd () {
        this.queryParentBody().innerHTML = `
            <tr><td colspan="2"><h3>Тренировка окончена</h3></td></tr>
            <tr><td colspan="2"><h5>Правильных: ${this.correct}</h5></td></tr>
            <tr><td colspan="2"><h5>Неправильных: ${this.incorrect}</h5></td></tr>
            `;
1    }

}