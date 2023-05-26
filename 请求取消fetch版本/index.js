const URL = "https://api.github.com/search/repositories?q=";
const input = document.querySelector("input");
const result = document.querySelector(".result");

let controller = null;
input.oninput = async () => {
  controller && controller.abort();
  // 取消请求的关键
  controller = new AbortController();
  const q = input.value.trim();
  if (q) {
    const resp = await fetch(URL + q, {
      signal: controller.signal,
    }).then((resp) => resp.json());
    createItems(resp.items);
  } else {
    result.innerHTML = "";
  }
};

function createItems(items) {
  result.innerHTML = "";
  let list = items.map((item) => {
    return `<a href="${item.clone_url}">${item.name} - ${item.description}</a>`;
  });
  result.innerHTML = list.join("");
}
