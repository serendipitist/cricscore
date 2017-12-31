class ScoreCard extends HTMLElement {

  constructor() {
    super();
    this.shadow = this.createShadowRoot();
    this._stage = "Loading Match details ...";
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

  get stage() {
    return this._stage;
  }

  set stage(val) {
    this.setAttribute('stage', val);
  }

  static get observedAttributes() {
    return [ 'stage' ];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    var domNode  = this.shadow.querySelector('.card-content');
    if(name == 'stage') {
    let sequence = [this.countryScoreDetails, this.matchDetails, this.MatchImage];
    var i = 0;
    setInterval(function() {
    domNode.innerHTML = sequence[i++];
    if (i == sequence.length) i = 0;   // reset to first element if you've reached the end
      }, 4000);
    }
  }

  connectedCallback() {
    var template = `
      <style>
      .card-text {
        margin: 10px 0 30px 0;
      }
      .versus {
        color: red;
        font-weight: bold;
      }
      </style>
      <div class="score-container">
        <h1 class="card-text">Cricket Score Card</h1>
        <div id="y" class="card-content">${this.stage}</div>
      </div>
    `;
    this.shadow.innerHTML = template;
  }

}

window.customElements.define('score-card', ScoreCard);