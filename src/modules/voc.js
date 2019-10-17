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

    async run () {
        this.dictionary = await this.bootDictionary();

        this.render.imutate(this.dictionary.data, 0)

        this.actions.docking(this.dictionary.data, this.render.start)

    }
}