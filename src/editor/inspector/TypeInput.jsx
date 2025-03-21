import { useState } from "react"
import { addSpaceBeforeUpper } from "../../lib/utils"
import { numbers } from "../../lib/consts"
import { useRefresh } from "../../lib/hooks"

const inputPropsBool = ({ object, access, refresh }) => ({
  type: `checkbox`,
  checked: object[access],
  style: {
    accentColor: `green`,
    backgroundColor: `black`,
    background: `black`
  },
  onChange: ({ target }) => {
    object[access] = target.checked
    refresh()
  },
  label: { style: {} }
})

const NumberInput = ({ object, access }) => {
  const [currentNumber, setCurrentNumber] = useState(object[access])

  return {
    type: `text`,
    value: currentNumber,
    onChange: ({ target: { value } }) => {
      let dot = false
      for (const char of value) {
        // Is includes allow chars
        if (!`${numbers}.`.includes(char)) return

        // Double dot check
        if (char === `.`) {
          if (dot) return
          dot = true
        }
      }

      let newNumber = Number(value) || 0
      let set = true
      if (value[value.length - 1] === `.`) {
        set = false
      } else {
        object[access] = newNumber
      }

      setCurrentNumber(set ? newNumber : value)
    }
  }
}

const StringInput = ({ object, access, refresh }) => ({
  type: `text`,
  value: object[access],
  onChange: ({ target: { value } }) => {
    object[access] = value
    refresh()
  }
})

export const TypeInput = (props) => {
  const refresh = useRefresh()

  props = { refresh, ...props }

  let myInput
  switch (typeof props.object[props.access]) {
    case `boolean`:
      myInput = inputPropsBool(props)
      break
    case `number`:
      myInput = NumberInput(props)
      break
    default:
      myInput = StringInput(props)
  }

  const { label } = myInput

  if (label) {
    delete myInput.label
  }

  const id = Math.random().toString(10).slice(2)

  return (
    <div
      className="flex"
      style={{ margin: 2, justifyContent: `space-between` }}
    >
      <div>{addSpaceBeforeUpper(props.access)}</div>
      <input id={id} {...myInput} />
      {label ? <label htmlFor={id} {...label}></label> : null}
    </div>
  )
}
