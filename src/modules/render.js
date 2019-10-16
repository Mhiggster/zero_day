export default class {
    constructor () {
        this.dictionary = []
        this.scenes = 0
        this.start = 0
        this.currentScene = null
    }


    imutate ( dictionary ) {
        this.dictionary = dictionary
        this.scenes = this.dictionary.length
        // rendering
        this.currentScene = this.dictionary[this.start]
        this.display(this.currentScene);
    }


    display ( currentScene ) {
        this.word( currentScene.word )
        this.translationsList( currentScene.translations )
    }

    word ( word ) {
        document.querySelector('.word').innerHTML = word
    }

    translationsList( translations ) {
        
    }
}