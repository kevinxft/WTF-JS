const colorValue = document.querySelector(".color-value");
const colorPicker = document.querySelector(".color-picker");
const colorPreview = document.querySelector(".color-preview");

https: colorPicker.addEventListener("click", async () => {
  //developer.mozilla.org/en-US/docs/Web/API/EyeDropper
  const dropper = new EyeDropper();
  console.log(dropper);

  try {
    const result = await dropper.open();
    console.log(result);
    colorPreview.style.backgroundColor = colorValue.textContent =
      result.sRBGHex;
  } catch (error) {
    console.error(error);
  }
});
