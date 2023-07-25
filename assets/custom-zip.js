class CustomZip extends HTMLElement {
  zipValue = '';
  constructor() {
    super();
    console.log('==')
    console.log(this)
    this.zipInput = this.querySelector('#zip');
    this.leaveMail = this.querySelector('.leave-mail');
    this.mailInput = this.querySelector('.mail-input');
    this.successMessage = this.querySelector('.success-message');
    this.specialMessage = this.querySelector('.special-message');
    this.errorMessage = this.querySelector('.error-message');
    this.emptyMessage = this.querySelector('.error-empty');
    this.buyBtn = document.querySelector('.custom-buy-btn button');
  }

  connectedCallback() {
    this.la1 = this.dataset.la1;
    this.la2 = this.dataset.la2;
    this.sf1 = this.dataset.sf1;
    this.sf2 = this.dataset.sf2;
    this.querySelector('.input-group button').addEventListener('click', this.checkZip.bind(this))
    this.leaveMail.querySelector('.mail-group button').addEventListener('click', this.sendMail.bind(this))
    console.log('connectedCallback')
  }

  checkZip() {
    console.log('=1=1=1=1=1=11=')
    this.hideMessage();
    this.hideLeaveMail();
    if (this.buyBtn) this.buyBtn.removeAttribute("disabled");

    if (!this.zipInput.value) {
      this.emptyMessage.classList.add('error-show');
      return;
    }

    this.emptyMessage.classList.remove('error-show');

    if (this.la1.split(',').some(e => e.trim() == this.zipInput.value)) {
      this.dataset.state = 'la'
      console.log('la1')
      this.successMessage.style.display = 'block'
      publish(PUB_SUB_EVENTS.zipUpdate, 'la');
    } else if (this.la2.split(',').some(e => e.trim() == this.zipInput.value)) {
      this.dataset.state = 'la'
      console.log('la2')
      this.specialMessage.style.display = 'block'
      // this.leaveMail.style.display = 'block';
      publish(PUB_SUB_EVENTS.zipUpdate, 'la');
    } else if (this.sf1.split(',').some(e => e.trim() == this.zipInput.value)) {
      this.dataset.state = 'sf'
      console.log('sf1')
      this.successMessage.style.display = 'block'
      publish(PUB_SUB_EVENTS.zipUpdate, 'sf');
      // this.leaveMail.style.display = 'block'
    } else if (this.sf2.split(',').some(e => e.trim() == this.zipInput.value)) {
      this.dataset.state = 'sf'
      console.log('sf2')
      this.specialMessage.style.display = 'block'
      // this.leaveMail.style.display = 'block'
      publish(PUB_SUB_EVENTS.zipUpdate, 'sf');
    } else {
      console.log('selsef2')
      this.errorMessage.style.display = 'block';
      console.log('Sorry')
      console.log(this.buyBtn)
      if (this.buyBtn) this.buyBtn.setAttribute("disabled", "");
      // this.leaveMail.style.display = 'block'
    }

  }

  hideMessage() {
    this.successMessage.style.display = 'none';
    this.specialMessage.style.display = 'none';
    this.errorMessage.style.display = 'none';
  }

  hideLeaveMail() {
    this.leaveMail.style.display = 'none';
  }

  sendMail() {
    console.log(this.mailInput.value);
    // fetch('contact#sendUserMail', {
    //   method: 'POST',

    // })
    
  }
}

if (!customElements.get('custom-zip')) {
  customElements.define('custom-zip', CustomZip)
}



