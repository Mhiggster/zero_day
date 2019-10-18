import Helpers from './helpers'

export default class Render {

    /**
     * Creates an instance of Render.
     * @memberof Render
     */
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
        this.chunk = 20
        this.rangeSplit = ''
        this.rangePagination = []

        Render.instance = this;
    }

    /**
     *
     *
     * @returns
     * @memberof Render
     */
    queryParentBody () {
        return document.querySelector('.survay-table_body');
    }

    /**
     * rendering the greeting section
     *
     * @param {*} dictionary
     * @memberof Render
     */
    greeting( dictionary ) {
        this.dictionary = dictionary

        // TO DO: add check if item lenght will be one
        Helpers.chunk(this.dictionary, this.chunk).map((item, index) => {
            this.rangeSplit = `${(item.length * index) + 1} - ${(index + 1) * item.length}`;
            if (item.length !== this.chunk) {
                this.rangeSplit = `${this.dictionary.length - (item.length - 1)} - ${this.dictionary.length}`;
            }
            this.rangePagination.push(this.rangeSplit);
        })
    }

    paginationRender () {
        document.querySelector('.pagination-list').innerHTML = '';
        this.rangePagination.forEach(item => {
            Helpers.createElement('li', item, 
                {}, (el, value) => {
                    el.innerHTML = `<a class="pagination-link">${item}</a>`;
                    document.querySelector('.pagination-list').appendChild(el);
            })
        });
    }

    /**
     *
     *
     * @memberof Render
     */
    imutate () {
        // scenes lenngth
        this.scenes = this.dictionary.length
        // rendering
        this.currentScene = this.dictionary[this.start]

        this.display();
    }

    /**
     *
     *
     * @memberof Render
     */
    display () {
        this
          .word( this.currentScene.word )
          .translationsList( this.currentScene.translations )
          .drawing();
    }

    /**
     * Render the main word
     *
     * @param {*} word
     * @returns
     * @memberof Render
     */
    word ( word ) {
        document.querySelector('.word').innerHTML = word

        return this;
    }

    /**
     *
     *
     * @memberof Render
     */
    score () {
        document.querySelector('.score').innerHTML = `<span class="has-text-success">${this.correct}</span>/<span class="has-text-danger">${this.incorrect}</span>`;
    }

    /**
     * get shaful words
     *
     * @param {*} translations
     * @returns
     * @memberof Render
     */
    translationsList( translations ) {
        this.wordsOutput = Helpers.mixedOrder(translations)

        return this
    }

    /**
     * drawing the traslatbale words lists
     *
     * @memberof Render
     */
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

    /**
     *
     *
     * @param {*} el
     * @param {*} translation
     * @memberof Render
     */
    injectTriggersElement( el, translation ) {
        el.innerHTML = `<td colspan="2">${translation}</td>`;
        this.queryParentBody().appendChild(el);
    }

    /**
     *
     *
     * @memberof Render
     */
    trainingEnd () {
        this.queryParentBody().innerHTML = `
            <tr><td colspan="2"><h3>Тренировка окончена</h3></td></tr>
            <tr><td colspan="2"><h5>Правильных: ${this.correct}</h5></td></tr>
            <tr><td colspan="2"><h5>Неправильных: ${this.incorrect}</h5></td></tr>
            `;
    }
}