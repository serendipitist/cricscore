class ScoreCard extends HTMLElement {

  constructor() {
    super();

    this.shadow = this.createShadowRoot();
    this._complete = 0;
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
    var innerBar = this.shadow.querySelector('.progress-bar-inner');

    switch(name) {
      case 'complete':
        this._complete = parseInt(newVal, 10) || 0;

        innerBar.style.width = this.complete + '%';
        innerBar.innerHTML = this.complete + '%';
    }
  }

  connectedCallback() {
    var template = `
      <style>
        .progress-bar {
          width: 50%;
          height: 30px;
          background-color: #EDF2F4;
          border-radius: 5px;
          color: #FFF;
        }
        .progress-bar-inner {
          height: 100%;
          line-height: 30px;
          background: #2B2D42;
          text-align: center;
          border-radius: 5px;
          transition: width 0.25s;
        }
      </style>
      <div class="progress-bar">
        <div class="progress-bar-inner">${this.complete}%</div>
      </div>
    `;

    this.shadow.innerHTML = template;
  }

}

dragElement(document.getElementById("container"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById("header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById("header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    //elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

p.addEventListener('click', function init() {
    p.removeEventListener('click', init, false);
    p.className = p.className + ' resizable';
    var resizer = document.createElement('div');
    resizer.className = 'resizer';
    p.appendChild(resizer);
    resizer.addEventListener('mousedown', initDrag, false);
}, false);

var startX, startY, startWidth, startHeight;

function initDrag(e) {
   startX = e.clientX;
   startY = e.clientY;
   startWidth = parseInt(document.defaultView.getComputedStyle(p).width, 10);
   startHeight = parseInt(document.defaultView.getComputedStyle(p).height, 10);
   document.documentElement.addEventListener('mousemove', doDrag, false);
   document.documentElement.addEventListener('mouseup', stopDrag, false);
}

function doDrag(e) {
   p.style.width = (startWidth + e.clientX - startX) + 'px';
   p.style.height = (startHeight + e.clientY - startY) + 'px';
}

window.customElements.define('score-card', ScoreCard);