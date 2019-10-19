import Render from './render'

export default class {
    constructor () {
        this.survayBody = this.renderInstance().queryParentBody();
        this.range = [];
    }

    /**
     *
     *
     * @returns
     */
    renderInstance () {
        return new Render;
    }

    chosenEventListener () {
        document.querySelector('.pagination-list').addEventListener('click', (e) => {
            let event = e || event, target = event.target;
            if (target.tagName.toLowerCase() !== 'a') return
            // remove from greeting and adding to trainer
            document.querySelector('.greeting').classList.remove('showing');
            document.querySelector('.trainer').classList.add('showing');
            

            this.range = target.innerHTML.split(' - '); 
            this.renderInstance().imutate(parseInt(this.range[0]) - 1, parseInt(this.range[1]) - 1);

            this.docking()
        })
    }

    /**
     *
     *
     */
    docking () {
        this.survayBody.addEventListener('click', this.selectEvent.bind(this))
    }

    /**
     *
     *
     * @param {*} e
     */
    selectEvent (e) {
        let event = e || event, target = event.target;
        if (target.tagName.toLowerCase() !== 'td') return

        this.selectCheck(target)
            ? this.successTick(target)
            : this.dangerTick(target);
    }

    /**
     *
     *
     * @param {*} target
     * @returns
     */
    selectCheck ( target ) {
        return JSON.parse(target.parentElement.getAttribute('correct'))
        target.parentElement.classList.add('has-background-success')
    }

    /**
     *
     *
     * @param {*} target
     */
    dangerTick ( target ) {
        target.parentElement.classList.add('has-background-danger')

        // if doesn't correct choise select the correct row line
        this.survayBody.querySelector(`[correct="true"]`)
            .classList.add('has-background-success')

        this.tick();

        this.renderInstance().incorrect++;
        this.renderInstance().score();
    }

    /**
     *
     *
     * @param {*} target
     */
    successTick ( target ) {
        target.parentElement.classList.add('has-background-success')
        this.tick()
        this.renderInstance().correct++;
        this.renderInstance().score();
    }

    /**
     *
     *
     */
    tick () {
        setTimeout(this.tickRunner.bind(this), 1000);
    }

    /**
     *
     *
     * @returns
     */
    tickRunner () {
        if (this.renderInstance().start === this.renderInstance().dictionary.slice(parseInt(this.range[0]) - 1, parseInt(this.range[1]) - 1).length - 1) {
            return this.renderInstance().trainingEnd();
        }
        ++this.renderInstance().start;
        // i need the call imutate with new RANGE
        this.renderInstance().imutate(parseInt(this.range[0]) - 1, parseInt(this.range[1]) - 1)
    }
}