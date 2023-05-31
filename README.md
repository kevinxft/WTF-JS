# WTF-JS
一些值得学的JS代码
[在线预览地址](https://kevinxft.github.io/WTF-JS/)

## Question 1
- 优先级
- Object.values的输出顺序
```js
const obj = {
  a: 0
}
obj['1'] = 0
obj[++obj.a] = obj.a++
const values = Object.values(obj)
obj[values[1]] = obj.a
console.log(obj)
```
<details>
  <summary>answer</summary>

  ```js
    { 1: 1, 2: 2, a: 2 } // 注意输出的顺序也有讲究
  ```
  </p>
</details>


