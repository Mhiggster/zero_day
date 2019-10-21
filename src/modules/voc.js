import axios from 'axios'
import Render from './render'
import Actions from './actions'
import Helpers from './helpers'
/**
 * Appliction entry point
 *
 * @export
 * @class Voc
 */
export default class Voc {

    /**
     * Creates an instance of Voc.
     * 
     * @memberof Voc
     */
    constructor () {
        this.render = new Render
        this.actions = new Actions
    }

    /**
     * fetch several data from json files
     *
     * @returns
     * @memberof Voc
     */
    fetchDictionary () {
        return  axios.get(location.href + '/src/data/words.json');
    } 

    /**
     * Run the Application
     *
     * @memberof Voc
     */
    async run () {
        // boot a dictionary
        this.dictionary = await this.fetchDictionary();

        this.render.greeting(this.dictionary.data);
        this.render.paginationRender();

        this.actions.chosenEventListener();
    }
}