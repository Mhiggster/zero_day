import Render from './render'

export default class {
    renderInstance () {
        return new Render;
    }

    docking () {
        this.renderInstance().queryParentBody().addEventListener('click', e => {
            let event = e || event, target = event.target;
            if ( target.tagName.toLowerCase() !== 'td' ) return

            this.selectCheck(target)
                ? this.successTick(target)
                : this.dangerTick(target);
        })
    }

    selectCheck ( target ) {
        return JSON.parse(target.parentElement.getAttribute('correct'))
        target.parentElement.classList.add('has-background-success')
    }


    dangerTick ( target ) {
        target.parentElement.classList.add('has-background-danger')

        // if doesn't correct choise select the correct row line
        this
            .renderInstance()
            .queryParentBody()
            .querySelector(`[correct="true"]`)
            .classList.add('has-background-success')

        this.tick();
    }

    successTick ( target ) {
        target.parentElement.classList.add('has-background-success')
        this.tick()
    }

    tick () {
        setTimeout(() => {
            ++this.renderInstance().start;
            this.renderInstance().imutate(this.renderInstance().dictionary)
        }, 1100);
    }
}