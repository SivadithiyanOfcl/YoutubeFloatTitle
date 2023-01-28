var newDiv = document.createElement("div");
var newElement = document.createElement("p");

newDiv.setAttribute("id", "draggable");
newDiv.setAttribute("class", "box");
newElement.setAttribute("class", "vidtitle");

newDiv.appendChild(newElement);
document.body.appendChild(newDiv);

function updateHeading(vidtitle) {
    newElement.textContent = vidtitle;
}

dragElement(document.getElementById("draggable"));

function dragElement(elmnt) {

  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.target.tagName === "TITLE") {
            var videoTitle = mutation.target.textContent;
            videoTitle = videoTitle.replace('- YouTube','');
            updateHeading(videoTitle);
        }
    });
});

var title = document.querySelector("title");
try {
  observer.observe(title, { subtree: true, characterData: true, childList: true });
}
catch(err) {
  let videoTitle = "YouTube"
  updateHeading(videoTitle);
}
