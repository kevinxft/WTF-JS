import { computed } from "vue";

export const useMaskBg = (props) => {
  return computed(() => {
    const canvas = document.createElement("canvas");
    const dpr = window.devicePixelRatio || 1;
    // 这是为了在高dpi下生成水印不会模糊
    console.log("dpr: ", dpr);
    const fontSize = props.fontSize * dpr;
    const font = fontSize + "px serif";
    const ctx = canvas.getContext("2d");

    const { width } = ctx.measureText(props.text);
    const canvasSize = Math.max(100, width) + props.gap * dpr;
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((Math.PI / 180) * -45);
    ctx.fillStyle = "rgba(0 ,0 ,0, 0.3)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = font;
    ctx.fillText(props.text, 0, 0);
    return {
      base64: canvas.toDataURL(),
      size: canvasSize,
      styleSize: canvasSize / dpr,
    };
  });
};
