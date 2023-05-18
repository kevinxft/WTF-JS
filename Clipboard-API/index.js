const text1 = document.querySelector(".text1");
const text2 = document.querySelector(".text2");
const text3 = document.querySelector(".text3");

text1.addEventListener("copy", (e) => {
  e.preventDefault();
  console.log("👿禁止复制");
  // 往剪切板写内容
  navigator.clipboard.writeText("👿禁止复制");
});

text2.addEventListener("copy", async (e) => {
  navigator.clipboard
    .readText()
    .then((data) => {
      console.log("copy value: " + data);
      navigator.clipboard.writeText(data + " 🤡小丑竟是我自己！");
    })
    .catch((e) => console.log("用户禁止读取剪切板"));
});

text3.addEventListener("paste", (e) => {
  console.log(e);
  if (e.clipboardData.files.length > 0) {
    e.preventDefault();
    const file = e.clipboardData.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (e) => {
      console.log(e.target.result);
      const img = document.createElement("img");
      img.style.width = "200px";
      img.style.objectFit = "cover";
      img.src = e.target.result;
      text3.appendChild(img);
    };
  }
});
