import type { Directive } from 'vue'

// 自定义指令 -> 水波纹动画效果
export const vRipple: Directive = {
  mounted(el: HTMLElement) {
    el.addEventListener('click', (e: any) => {
      const ripple = document.createElement('div')
      ripple.classList.add('ripple')
      el.appendChild(ripple)
      setTimeout(() => {
        el.removeChild(ripple)
      }, 500)
    })
  },
}
