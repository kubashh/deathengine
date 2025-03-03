import { useEffect, useState } from "react"

export const DragData = () => {
  const [mouse, setMouse] = useState({})
  const data = window.editor.dragData

  const handleMouseMove = ({ clientX, clientY }) =>
    setMouse({ left: clientX + 3, top: clientY + 3 })

  const setDragData = (newData, event) => {
    window.editor.dragData = event?.button === 0 ? newData : undefined

    handleMouseMove(event || { clientX: 0, clientY: 0 })
  }

  window.editor.setDragData = setDragData

  useEffect(() => {
    if (!data) return

    window.addEventListener(`mousemove`, handleMouseMove)

    return () => window.removeEventListener(`mousemove`, handleMouseMove)
  })

  useEffect(() => {
    if (!data) return

    const handleMouseUp = () => setDragData()

    window.addEventListener(`mouseup`, handleMouseUp)

    return () => window.removeEventListener(`mouseup`, handleMouseUp)
  })

  return data ? (
    <div
      style={{
        position: `absolute`,
        zIndex: 5,
        backgroundColor: `rgba(0, 0, 0, 0.5)`,
        ...mouse
      }}
    >
      {data.name}
    </div>
  ) : null
}
