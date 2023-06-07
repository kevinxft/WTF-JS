function Obj() {
  this.a = undefined;
}
Obj.prototype.p = "prototype";

const obj = new Obj();
Object.defineProperty(obj, "e", {
  value: undefined,
  enumerable: false,
});

// 对比undefined
// 弊端是如果属性值是undefined的话 例如Obj.a = unde
console.log("属性undefined-->");
console.log(obj.a !== undefined ? "存在" : "不存在");
console.log(obj.p !== undefined ? "存在" : "不存在");

// Object.keys(Obj)
console.log("Object.keys，不可枚举的话就检测不到-->");
console.log(Object.keys(obj).includes("a") ? "存在" : "不存在");
console.log(Object.keys(obj).includes("p") ? "存在" : "不存在");
console.log("[不可枚举]", Object.keys(obj).includes("e") ? "存在" : "不存在");

// Object.hasOwnProperty
console.log("Object.hasOwnProperty-->");
console.log(obj.hasOwnProperty("a") ? "存在" : "不存在");
console.log(obj.hasOwnProperty("p") ? "存在" : "不存在");

// in
console.log("in-->");
console.log("a" in obj ? "存在" : "不存在");
console.log("b" in obj ? "存在" : "不存在");
