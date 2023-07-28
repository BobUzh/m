class CustomZip extends HTMLElement {
  zipValue = '';
  _MAIL_URL = "https://script.google.com/macros/s/AKfycbwehBME6R4s_mucT-VSTiDdMzuGfess33Oba3YYFyazxJraQZqthYFc9VqZFmbPOKwS/exec";
  _MAIL_EMPTY_URL = "https://script.google.com/macros/s/AKfycbwXwihdgUPVMYRakQYN4Qw0wp1j9jZYLvse-IEzVk8-hn8C8mE7vSHeUYrZaJUsONWHqA/exec";
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
    this.zipInput.addEventListener('focusout', this.checkZip.bind(this))
    this.leaveMail.querySelector('.mail-group button').addEventListener('click', this.sendMail.bind(this))
  }

  checkZip() {
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
      this.successMessage.style.display = 'block'
      publish(PUB_SUB_EVENTS.zipUpdate, 'la');
    } else if (this.la2.split(',').some(e => e.trim() == this.zipInput.value)) {
      this.dataset.state = 'la'
      this.specialMessage.style.display = 'block'
      this.showLeaveMail();
      publish(PUB_SUB_EVENTS.zipUpdate, 'la');
    } else if (this.sf1.split(',').some(e => e.trim() == this.zipInput.value)) {
      this.dataset.state = 'sf'
      this.successMessage.style.display = 'block'
      publish(PUB_SUB_EVENTS.zipUpdate, 'sf');
    } else if (this.sf2.split(',').some(e => e.trim() == this.zipInput.value)) {
      this.dataset.state = 'sf'
      this.specialMessage.style.display = 'block'
      this.showLeaveMail();
      publish(PUB_SUB_EVENTS.zipUpdate, 'sf');
    } else {
      this.errorMessage.style.display = 'block';
      if (this.buyBtn) this.buyBtn.setAttribute("disabled", "");
      this.sendMail();
    }

  }

  hideMessage() {
    this.successMessage.style.display = 'none';
    this.specialMessage.style.display = 'none';
    this.errorMessage.style.display = 'none';
  }

  hideLeaveMail() {
    this.leaveMail.classList.remove('d-show')
  }

  showLeaveMail() {
    this.leaveMail.classList.add('d-show')
  }

  sendMail() {
    let isMail = !!this.mailInput.value;
    let _url = isMail ? this._MAIL_URL : this._MAIL_EMPTY_URL;
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
      if(isMail) this.leaveMail.querySelector('.success-message').style.display = 'block'
    });
    
  }
}

if (!customElements.get('custom-zip')) {
  customElements.define('custom-zip', CustomZip)
}



