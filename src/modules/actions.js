import Render from './render'

export default class {
    constructor () {
        this.survayBody = document.querySelector('.survay-table_body');
        this.render = new Render
        this.start = 0;
    }

    docking (data) {
        this.survayBody.addEventListener('click', e => {
            let event = e || event, target = event.target;
            if ( target.tagName.toLowerCase() !== 'td' ) return
            
            if ( !JSON.parse(target.parentElement.getAttribute('correct')) ) {
                target.parentElement.classList.add('has-background-danger')

                this.survayBody.querySelector(`[correct="true"]`).classList.add('has-background-success')
                setTimeout(() => {
                    this.render.imutate(data, ++this.start)
                }, 1100);
            }

            if ( JSON.parse(target.parentElement.getAttribute('correct')) ) {
                target.parentElement.classList.add('has-background-success')
            }

        })
    }
}