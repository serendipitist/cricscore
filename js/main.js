class ScoreCard extends HTMLElement {

  constructor() {
    super();

    this.shadow = this.createShadowRoot();
    this._stage = 0;
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


  get renderSequence() {
    console.log(document);
    let sequence = [this.countryScoreDetails, this.matchDetails, this.MatchImage];
    return sequence;
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
        <div id="y" class="card-content">${this.renderSequence[0]}</div>
      </div>
    `;
    this.shadow.innerHTML = template;
  }

}

window.customElements.define('score-card', ScoreCard);