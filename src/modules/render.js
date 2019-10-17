import Helpers from './helpers'

export default class Render {
    // static property

    constructor () {
        if (!!Render.instance) {
            return Render.instance;
        }
        // singleton
        this.dictionary = []
        this.scenes = 0
        this.start = 0
        this.currentScene = null

        this.survayBody = document.querySelector('.survay-table_body');
    }



    imutate ( dictionary, start ) {
        this.dictionary = dictionary
        this.scenes = this.dictionary.length
        // rendering
        this.currentScene = this.dictionary[start]

        this.wordsOutput;
        this.display();
    }


    display () {
        // call another module and run it
        this.word( this.currentScene.word )
            .translationsList( this.currentScene.translations )
            .drawing();
    }

    word ( word ) {
        document.querySelector('.word').innerHTML = word

        return this;
    }

    translationsList( translations ) {
        this.wordsOutput = Helpers.mixedOrder(translations)

        return this
    }

    drawing () {
        this.survayBody.innerHTML = '';
        
        this.wordsOutput.forEach(item => {
            Helpers.createElement('tr', item.translation, {
                'correct': item.correct,
            }, this.injectTriggersElement.bind(this));
        })
    }

    injectTriggersElement( el, translation ) {
        el.innerHTML = `<td colspan="2">` + translation + `</td>`;
        this.survayBody.appendChild(el);
    }
}