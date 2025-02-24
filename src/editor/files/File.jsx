import { useState } from "react"
import { useHover } from "../../lib/useHover"
import { isFirstUpperCase } from "../../lib/isFirstUpperCase"
import { openScene } from "../../lib/openScene"

export const File = ({ old, file, name, main, deep = 0 }) => {
  const [open, setOpen] = useState(main)
  const hover = useHover({ color: `#555` })

  const isFolder = file.type === `folder`

  const onClick = () => {
    window.editor.setInspector(<div
      style={{
        margin: 12
      }}
    >
      <h2>File</h2>
      <div>{`Type: ${file.type}`}</div>
      <div>{`Name: ${name}`}</div>
    </div>)
  }

  const onContextMenu = ({ pageX, pageY }) => {
    const newArrElement = (name, type) => [name, () => {
      window.editor.setNameInput([``, (newText) => {
        file[newText] = {
          type
        }

        setOpen(true)
        window.editor.reloadFiles()
      }])
    }, isFolder]

    window.editor.setContextMenu({
      x: pageX,
      y: pageY,
      arr: [
        newArrElement(`New file`, `txt`),
        newArrElement(`New folder`, `folder`),
        newArrElement(`New scene`, `scene`),
        [`Rename`, () => {
          window.editor.setNameInput([name, (newText) => {
            if(name === newText) {
              return
            }

            if(old[newText]) {
              console.error(`Error`)
            } else {
              delete old[name]
              old[newText] = file
              window.editor.reloadFiles()
            }
          }])
        }, name !== `files`],
        [`Delete`, () => {
          delete old[name]
          window.editor.reloadFiles()
        }, name !== `files`]
      ]
    })
  }

  const onMouseDown = () => {
    window.editor.dragData = {
      from: `files`,
      old,
      file,
      name
    }
  }

  const onMouseUp = () => {
    if(!isFolder) {
      return
    }

    const { dragData } = window.editor

    if(dragData?.from !== `files` || dragData.name === name || file[dragData.name]) {
      return
    }

    file[dragData.name] = dragData.file
    if(dragData.old) {
      delete dragData.old[dragData.name]
    }
    window.editor.dragData = {}
    window.editor.reloadFiles()
  }

  return <>
    <div
      style={{
        cursor: `pointer`,
        marginLeft: deep * 10,
        display: `flex`,
        flexDirection: `row`
      }}
      onContextMenu={onContextMenu}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onDoubleClick={() => {
        if(file.type === `scene`) {
          openScene(name)
        }
      }}
    >
      {isFolder && <div
        style={{
          width: 24,
          height: 24,
          textAlign: `center`,
          justifySelf: `center`,
          borderRadius: 12,
          transform: `rotate(${open ? 90 : 0}deg)`,
          transition: `transform 150ms`
        }}
        onClick={() => {
          isFolder && setOpen(!open)
        }}
      >
        {`>`}
      </div>}
      <div
        {...hover}
        style={{
          marginLeft: file.type !== `folder` && 24,
          ...hover.style
        }}
        onClick={onClick}
      >{name}</div>
    </div>
    {isFolder && open && file.type !== `scene` && Object.entries(file)
      .filter(([key]) => isFirstUpperCase(key))
      .map(([key, value]) => <File
        old={file}
        file={value}
        name={key}
        key={key}
        deep={deep + 1}
      />
    )}
  </>
}