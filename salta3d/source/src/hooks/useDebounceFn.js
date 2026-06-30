import React from 'react'

/**
 * Debounce a function
 * @param pulse
 * @param fn
 * @param delay
 */
export default function useDebounceFn(pulse, fn, delay = 500) {
  const callbackRef = React.useRef(fn)
  React.useLayoutEffect(() => {
    callbackRef.current = fn
  })

  // reset the timer to call the fn everytime the pulse value changes
  React.useEffect(() => {
    const timerId = setTimeout(fn, delay)
    return () => clearTimeout(timerId)
  }, [pulse, delay])
}
