class CustomZip extends HTMLElement {
  zipValue = '';
  _MAIL_URL = "https://script.google.com/macros/s/AKfycbwehBME6R4s_mucT-VSTiDdMzuGfess33Oba3YYFyazxJraQZqthYFc9VqZFmbPOKwS/exec";
  _MAIL_EMPTY_URL = "https://script.google.com/macros/s/AKfycbzbfQdLrKgRDxFGPe-uDJT3sMaHjiJLlsZdp1PFEzKcA1D4Za5v4ip-fCadYJpem0k-TA/exec";
  constructor() {
    super();
    this.zipInput = this.querySelector('#zip');
    this.leaveMail = this.querySelector('.leave-mail');
    this.mailInput = this.querySelector('.mail-input');

    this.successMessage = this.querySelector('.success-message');
    this.specialMessage = this.querySelector('.special-message');
    this.errorMessage = this.querySelector('.error-message');
    this.emptyMessage = this.querySelector('.error-empty');
    this.validMessage = this.querySelector('.valid-message');

    this.buyBtn = document.querySelector('.custom-buy-btn button');
  }

  connectedCallback() {
    this.la1 = this.dataset.la1;
    this.la2 = this.dataset.la2;
    this.sf1 = this.dataset.sf1;
    this.sf2 = this.dataset.sf2;
    this.zipInput.addEventListener('focusout', this.checkZip.bind(this))
    this.leaveMail.querySelector('.mail-group button').addEventListener('click', this.sendMail.bind(this))
  }

  checkZip() {
    this.hideMessage();
    this.hideLeaveMail();
    this.initDatePick();

    if (!this.zipInput.value) {
      this.emptyMessage.classList.remove('message-hidden');
      return;
    }

    if (! /(^\d{5}$)/.test(this.zipInput.value)) {
      this.validMessage.classList.remove('message-hidden');
      return;
    }

    if (this.la1.split(',').some(e => e.trim() == this.zipInput.value)) {
      this.dataset.state = 'la'
      this.successMessage.classList.remove('message-hidden');
      document.querySelector('.date-picker').classList.remove('event-pointer_disabled');
      publish(PUB_SUB_EVENTS.zipUpdate, 'la');
    } else if (this.la2.split(',').some(e => e.trim() == this.zipInput.value)) {
      this.dataset.state = 'la'
      this.specialMessage.classList.remove('message-hidden');
      this.showLeaveMail();
      publish(PUB_SUB_EVENTS.zipUpdate, 'la');
    } else if (this.sf1.split(',').some(e => e.trim() == this.zipInput.value)) {
      this.dataset.state = 'sf'
      this.successMessage.classList.remove('message-hidden');
      document.querySelector('.date-picker').classList.remove('event-pointer_disabled');
      publish(PUB_SUB_EVENTS.zipUpdate, 'sf');
    } else if (this.sf2.split(',').some(e => e.trim() == this.zipInput.value)) {
      this.dataset.state = 'sf'
      this.specialMessage.classList.remove('message-hidden');
      this.showLeaveMail();
      publish(PUB_SUB_EVENTS.zipUpdate, 'sf');
    } else {
      this.errorMessage.classList.remove('message-hidden');
      this.showLeaveMail();
    }
  }

  hideMessage() {
    this.emptyMessage.classList.add('message-hidden');
    this.successMessage.classList.add('message-hidden');
    this.specialMessage.classList.add('message-hidden');
    this.errorMessage.classList.add('message-hidden');
    this.validMessage.classList.add('message-hidden');
  }

  hideLeaveMail() {
    this.leaveMail.classList.remove('d-show')
  }

  showLeaveMail() {
    this.leaveMail.classList.add('d-show')
  }

  initDatePick() {
    document.querySelector('.date-picker').classList.add('event-pointer_disabled');
    document.querySelector('.calendar-message').classList.remove('error-show');
  }

  sendMail() {
    let isMail = !!this.mailInput.value;
    let _isNotSpecialMessage = document.querySelector('.special-message.message-hidden');
    let _url = _isNotSpecialMessage ? this._MAIL_EMPTY_URL : this._MAIL_URL;
    let data = isMail 
      ? {date: Date.now(), email: this.mailInput.value, zip: this.zipInput.value}
      : {date: Date.now(), zip: this.zipInput.value}

    fetch(_url, {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then(() => {
      if(isMail) this.leaveMail.querySelector('.success-message').classList.remove('message-hidden');
    });
    
  }
}

if (!customElements.get('custom-zip')) {
  customElements.define('custom-zip', CustomZip)
}



