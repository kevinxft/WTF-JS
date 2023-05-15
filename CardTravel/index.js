const card = document.querySelector(".card");
const BAR = 76;

function getClientPoint(screenX, screenY) {
  const clientX = screenX - window.screenX;
  const clienY = screenY - window.screenY - BAR;
  return [clientX, clienY];
}

function getScreenPoint(clientX, clientY) {
  const screenX = clientX + window.screenX;
  const screenY = clientY + window.screenY + BAR;
  return [screenX, screenY];
}

card.onmousedown = (e) => {
  let x = e.pageX - card.offsetLeft;
  let y = e.pageY - card.offsetTop;

  window.onmousemove = (e) => {
    const cx = e.pageX - x;
    const cy = e.pageY - y;
    card.style.left = cx + "px";
    card.style.top = cy + "px";
    channel.postMessage(getScreenPoint(cx, cy));
  };

  window.onmouseup = () => {
    window.onmousemove = null;
    window.onmouseup = null;
  };
};

const channel = new BroadcastChannel("card");

channel.onmessage = (e) => {
  const [cx, cy] = getClientPoint(...e.data);
  card.style.left = cx + "px";
  card.style.top = cy + "px";
};

const hiddenCard = new BroadcastChannel("hidden");

hiddenCard.onmessage = (e) => {
  card.style.left = "-1000px";
};

function hiddenOthers() {
  hiddenCard.postMessage("hidden");
}

hiddenOthers();
