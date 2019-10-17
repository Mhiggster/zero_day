import axios from 'axios'
import Render from './render'
import Actions from './actions'

export default class {

    constructor () {
        this.render = new Render
        this.actions = new Actions
    }

    bootDictionary () {
        return  axios.get(location.href + '/src/data/words.json');
    } 

    run () {
        this.greeting();
        this.init();
    }

    greeting () {
        
    }

    async  init () {
        // boot a dictionary
        this.dictionary = await this.bootDictionary();

        // render the HTML to render the html data i passed the data from file
        this.render.imutate(this.dictionary.data)

        this.actions.docking()
    }
}