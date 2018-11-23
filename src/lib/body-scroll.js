// @flow
// Adopted and modified solution from Bohdan Didukh (2017)
// https://stackoverflow.com/questions/41594997/ios-10-safari-prevent-scrolling-behind-a-fixed-overlay-and-maintain-scroll-posi

import { isMobile } from './ua'

let firstTargetElement = null
let allTargetElements = []
let documentListenerAdded = false
let initialClientY = -1
let previousBodyOverflowSetting
let previousBodyPaddingRight

const preventDefault = rawEvent => {
  const e = rawEvent || window.event
  if (e.preventDefault) e.preventDefault()

  return false
}
const passiveOpts = { passive: false }

const setOverflowHidden = options => {
  // Setting overflow on body/documentElement synchronously in Desktop Safari slows down
  // the responsiveness for some reason. Setting within a setTimeout fixes this.
  setTimeout(() => {
    // If previousBodyPaddingRight is already set, don't set it again.
    if (previousBodyPaddingRight === undefined) {
      const reserveScrollBarGap = !!options && options.reserveScrollBarGap === true
      const doc = document.documentElement
      const scrollBarGap = window.innerWidth - doc.clientWidth

      if (reserveScrollBarGap && scrollBarGap > 0) {
        previousBodyPaddingRight = document.body.style.paddingRight
        document.body.style.paddingRight = `${scrollBarGap}px`
      }
    }
    // If previousBodyOverflowSetting is already set, don't set it again.
    if (previousBodyOverflowSetting === undefined) {
      previousBodyOverflowSetting = document.body.style.overflow
      document.body.style.overflow = 'hidden'
    }
  })
}

const restoreOverflowSetting = () => {
  // Setting overflow on body/documentElement synchronously in Desktop Safari slows down
  // the responsiveness for some reason. Setting within a setTimeout fixes this.
  setTimeout(() => {
    if (previousBodyPaddingRight !== undefined) {
      document.body.style.paddingRight = previousBodyPaddingRight
      // Restore previousBodyPaddingRight to undefined so setOverflowHidden knows it
      // can be set again.
      previousBodyPaddingRight = undefined
    }

    if (previousBodyOverflowSetting !== undefined) {
      document.body.style.overflow = previousBodyOverflowSetting
      // Restore previousBodyOverflowSetting to undefined
      // so setOverflowHidden knows it can be set again.
      previousBodyOverflowSetting = undefined
    }
  })
}

// https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#Problems_and_solutions
const isTargetElementTotallyScrolled = targetElement =>
  targetElement
    ? targetElement.scrollHeight - targetElement.scrollTop <= targetElement.clientHeight
    : false

const handleScroll = (event, targetElement) => {
  const clientY = event.targetTouches[0].clientY - initialClientY

  if (targetElement && targetElement.scrollTop === 0 && clientY > 0) {
    // element is at the top of its scroll
    return preventDefault(event)
  }

  if (isTargetElementTotallyScrolled(targetElement) && clientY < 0) {
    // element is at the top of its scroll
    return preventDefault(event)
  }

  event.stopPropagation()
  return true
}

export const clearAllBodyScrollLocks = () => {
  if (isMobile()) {
    // Clear all allTargetElements ontouchstart/ontouchmove handlers, and the references
    allTargetElements.forEach(targetElement => {
      targetElement.ontouchstart = null
      targetElement.ontouchmove = null
    })

    if (documentListenerAdded) {
      document.removeEventListener('touchmove', preventDefault, passiveOpts)
      documentListenerAdded = false
    }
    allTargetElements = []
    // Reset initial clientY
    initialClientY = -1
  } else {
    restoreOverflowSetting()
    firstTargetElement = null
  }
}

export const disableBodyScroll = (targetElement, options) => {
  if (isMobile()) {
    // targetElement must be provided, and disableBodyScroll must not have been
    // called on this targetElement before.
    if (targetElement && !allTargetElements.includes(targetElement)) {
      allTargetElements = [...allTargetElements, targetElement]
      targetElement.ontouchstart = event => {
        if (event.targetTouches.length === 1) {
          // detect single touch
          initialClientY = event.targetTouches[0].clientY
        }
      }
      targetElement.ontouchmove = event => {
        if (event.targetTouches.length === 1) {
          // detect single touch
          handleScroll(event, targetElement)
        }
      }
      if (!documentListenerAdded) {
        document.addEventListener('touchmove', preventDefault, { passive: false })
        documentListenerAdded = true
      }
    }
  } else {
    setOverflowHidden(options)
    if (!firstTargetElement) firstTargetElement = targetElement
  }
}

export const enableBodyScroll = targetElement => {
  if (isMobile()) {
    targetElement.ontouchstart = null
    targetElement.ontouchmove = null
    allTargetElements = allTargetElements.filter(element => element !== targetElement)
    if (documentListenerAdded && allTargetElements.length === 0) {
      document.removeEventListener('touchmove', preventDefault, passiveOpts)
      documentListenerAdded = false
    }
  } else if (firstTargetElement === targetElement) {
    restoreOverflowSetting()
    firstTargetElement = null
  }
}

// 禁止 body 滚动
export function lockScroll (el, bool) {
  if (bool === true) {
    disableBodyScroll(el)
  } else {
    enableBodyScroll(el)
  }
}
