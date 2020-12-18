# css loading

效果图: <img src="./images/loadings.gif" width="400">

## 圆形 loading

```html
<button>loading</button>
```

```css
button {
  opacity: 0.5;
  cursor: default;
  pointer-events: none;
  margin: 50px auto;
  display: block;
}

button:before {
  content: '';
  display: inline-block;
  width: 1em;
  height: 1em;
  margin-right: 0.5em;
  color: orange;
  border: 1px solid orange;
  border-radius: 50%;
  vertical-align: -10%;
  clip-path: polygon(0% 0%, 100% 0%, 100% 30%, 0% 30%);
  animation: rotate 1s linear infinite;
}

@keyframes rotate {
  from {
      transform: rotatez(0deg);
  }
  to {
      transform: rotatez(360deg);
  }
}
```

## 点 loading

```html
<div class="loading-box">
  <div class="loading">
    <div class="loading-item"></div>
    <div class="loading-item"></div>
    <div class="loading-item"></div>
  </div>
</div>
```

```css
.loading-box {
  overflow: hidden;
  width: 100px;
  height: 50px;
  margin: 50px auto;
  background-color: #eee;
  border-radius: 5px;
}

.loading {
  height: 34px;
  margin-top: 13px;
  text-align: center;
}

.loading-item {
  display: inline-block;
  width: 12px;
  height: 12px;
  background: #4b9cdb;
  border-radius: 50%;
}

@keyframes loading-run {
  0% {
    width: 12px;
    height: 12px;
  }
  50% {
    width: 16px;
    height: 16px;
  }
  100% {
    width: 12px;
    height: 12px;
  }
}

.loading-item:nth-child(1) {
  animation: loading-run 1.5s ease 0s infinite;
}

.loading-item:nth-child(2) {
  animation: loading-run 1.5s ease 0.5s infinite;
}

.loading-item:nth-child(3) {
  animation: loading-run 1.5s ease 1s infinite;
}
```