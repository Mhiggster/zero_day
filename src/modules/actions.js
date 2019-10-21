import Render from './render'
/**
 * In this class we have to run only event action for our application
 *
 * @export
 * @class Actions
 */
export default class Actions {
    /**
     *Creates an instance of Actions.
     * @memberof Actions
     */
    constructor () {
        this.surveyBody = this.renderInstance().queryParentBody();
        this.range = [];
    }

    /**
     * Create Singleton Render Instance
     *
     * @returns Render
     * @memberof Actions
     */
    renderInstance () {
        return new Render;
    }

    /**
     * Bind events with pagination list
     *
     * @memberof Actions
     */
    chosenEventListener () {
        document
            .querySelector( '.pagination-list' )
            .addEventListener( 'click', this.activateSurvey.bind( this ) );
    }

    /**
     * Activate Survey and display voc table
     *
     * @param {*} e
     * @memberof Actions
     */
    activateSurvey ( e ) {
        let event = e || event, target = event.target;
        if (target.tagName.toLowerCase() !== 'a') return

        document.querySelector('.greeting').classList.remove('showing');
        document.querySelector('.trainer').classList.add('showing');

        this.range = target.innerHTML.split(' - ');
        this.rangeCaching = parseInt(this.range[0]) - 1, parseInt(this.range[1]) - 1;
        this.renderInstance().imutate(this.rangeCaching);

        this.docking()
    }

    /**
     * Docking with Survey Table
     *
     * @memberof Actions
     */
    docking () {
        this.surveyBody.addEventListener('click', this.selectEvent.bind(this))
    }

    /**
     * Chose the right or incorrect word
     *
     * @param {*} e
     * @memberof Actions
     */
    selectEvent (e) {
        let event = e || event, target = event.target;
        if (target.tagName.toLowerCase() !== 'td') return

        this.selectCheck(target)
            ? this.successTick(target)
            : this.dangerTick(target);
    }

    /**
     * Check Words correct
     *
     * @param {*} target
     * @returns
     * @memberof Actions
     */
    selectCheck ( target ) {
        return JSON.parse(target.parentElement.getAttribute('correct'))
    }

    /**
     * Inccorect Counter
     *
     * @param {*} target
     * @memberof Actions
     */
    dangerTick ( target ) {
        target.parentElement.classList.add('has-background-danger')

        // if doesn't correct choise select the correct row line
        this.surveyBody.querySelector(`[correct="true"]`)
            .classList.add('has-background-success')

        this.tick();

        this.renderInstance().incorrect++;
        this.renderInstance().score();
    }

    /**
     * Correct Counter
     *
     * @param {*} target
     * @memberof Actions
     */
    successTick ( target ) {
        target.parentElement.classList.add('has-background-success')
        this.tick()
        this.renderInstance().correct++;
        this.renderInstance().score();
    }

    /**
     * Transition to the next scene
     *
     * @memberof Actions
     */
    tick () {
        setTimeout(this.tickRunner.bind(this), 1000);
    }

    /**
     * Transition Runner
     *
     * @returns
     * @memberof Actions
     */
    tickRunner () {
        if (this.renderInstance().start === this.renderInstance().dictionary.slice(this.rangeCaching).length - 1) {
            return this.renderInstance().trainingEnd();
        }
        ++this.renderInstance().start;
        // i need the call imutate with new RANGE
        this.renderInstance().imutate(this.rangeCaching);
    }
}