import { useState } from "react"

export const useHover = () => {
  const [isHover, setIsHover] = useState(false)
  return [
    isHover,
    {
      onMouseEnter: () => setIsHover(true),
      onMouseLeave: () => setIsHover(false)
    }
  ]
}

export const useArrow = (main, haveChilds = true) => {
  const [open, setOpen] = useState(main)

  return [
    haveChilds ? (
      <div
        style={{
          cursor: `pointer`,
          width: 24,
          height: 24,
          textAlign: `center`,
          justifySelf: `center`,
          borderRadius: 12,
          transform: `rotate(${open ? 90 : 0}deg)`,
          transition: `transform 150ms`
        }}
        onClick={() => setOpen((prev) => !prev)}
        children={`>`}
      />
    ) : (
      <div style={{ marginLeft: 24 }} />
    ),
    open,
    setOpen
  ]
}

export const useRefresh = () => {
  const [, setState] = useState(false)
  return () => setState((prev) => !prev)
}

export const useConst = (value) => {
  const [state] = useState(value)
  return state
}
