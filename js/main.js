class ScoreCard extends HTMLElement {

  constructor() {
    super();

    this.shadow = this.createShadowRoot();
    this._complete = "Loading Match details ...";
  }

  get countryScoreDetails() {
    return "INDIA 187"+ "/" + "7" + " (20 Overs) " + `<span class="versus">VS</span>` + " " + "SRI LANKA 140" + "(18 overs)";
  }

  get matchDetails() {
    const details = "Sri Lanka in India, 3 T20 International Series, 2017 Time: 13:30 (GMT) | 19:00 (Local time) - 24 Dec 2017";
    return details;
  }

  get MatchImage() {
    return `<picture>
          <source media="(min-width: 650px)" srcset="./cricket.jpeg">
          <source media="(min-width: 465px)" srcset="./cricket.jpeg">
          <img src="./cricket.jpeg" alt="cricket" style="width:auto;">
         </picture>`;
  }

  get complete() {
    return this._complete;
  }

  set complete(val) {
    this.setAttribute('complete', val);
  }

  static get observedAttributes() {
    return [ 'complete' ];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    var domNode  = this.shadow.querySelector('.card-content');

        if(name == 'complete') {
        let sequence = [this.countryScoreDetails, this.matchDetails, this.MatchImage];
        var i = 0;  // the index of the current item to show
        setInterval(function() {            // setInterval makes it run repeatedly
        domNode.innerHTML = sequence[i++];    // get the item and increment
        if (i == sequence.length) i = 0;   // reset to first element if you've reached the end
        }, 4000);
    }
  }

  get renderSequence() {

  }



  connectedCallback() {
    var template = `
      <style>
      .card-text {
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      </style>
      <div class="score-container">
        <h1 class="card-text">Cricket Score Card</h1>
        <div id="y" class="card-content">${this.complete}</div>
      </div>
    `;
    this.shadow.innerHTML = template;
  }

}

window.customElements.define('score-card', ScoreCard);