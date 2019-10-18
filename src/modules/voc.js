import axios from 'axios'
import Render from './render'
import Actions from './actions'
import Helpers from './helpers'

export default class {

    constructor () {
        this.render = new Render
        this.actions = new Actions
    }

    fetchDictionary () {
        return  axios.get(location.href + '/src/data/words.json');
    } 

    run () {
        this.chosenSurvey()
        // this.init();
    }

    async chosenSurvey () {
        // boot a dictionary
        this.dictionary = await this.fetchDictionary();

        this.render.greeting(this.dictionary.data);
        this.render.paginationRender();

        this.actions.chosenEventListener();
    }


    init () {
        
        
        // render the HTML to render the html data i passed the data from file
        this.render.imutate()

        this.actions.docking()
    }
}