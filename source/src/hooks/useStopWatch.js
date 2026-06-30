import React from 'react'

export default function useStopwatch() {
  const [time, setTime] = React.useState(0)
  const [active, setActive] = React.useState(false)

  React.useEffect(() => {
    let interval = null

    if (active) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10)
      }, 10)
    } else {
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [active])

  const start = () => setActive(true)
  const reset = () => {
    setActive(false)
    setTime(0)
  }

  return { time, start, reset }
}
