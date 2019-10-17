import Render from './render'

export default class {
    constructor () {
        this.survayBody = this.renderInstance().queryParentBody();
    }

    renderInstance () {
        return new Render;
    }

    docking () {
        this.survayBody.addEventListener('click', this.selectEvent.bind(this))
    }

    selectEvent (e) {
        let event = e || event, target = event.target;
        if (target.tagName.toLowerCase() !== 'td') return

        this.selectCheck(target)
            ? this.successTick(target)
            : this.dangerTick(target);
    }

    selectCheck ( target ) {
        return JSON.parse(target.parentElement.getAttribute('correct'))
        target.parentElement.classList.add('has-background-success')
    }


    dangerTick ( target ) {
        target.parentElement.classList.add('has-background-danger')

        // if doesn't correct choise select the correct row line
        this.survayBody.querySelector(`[correct="true"]`)
            .classList.add('has-background-success')

        this.tick();

        this.renderInstance().incorrect++;
        this.renderInstance().score();
    }

    successTick ( target ) {
        target.parentElement.classList.add('has-background-success')
        this.tick()
        this.renderInstance().correct++;
        this.renderInstance().score();
    }

    tick () {
        setTimeout(this.tickRunner.bind(this), 600);
    }

    tickRunner () {
        if (this.renderInstance().start === this.renderInstance().dictionary.length - 1) {
            return this.renderInstance().trainingEnd();
        }
        ++this.renderInstance().start;
        this.renderInstance().imutate(this.renderInstance().dictionary)
    }
}