import { TypeInput } from "./TypeInput"

export const InspectorSection = ({ text, remove, childs, element }) => (
  <div
    style={{
      paddingBottom: 8,
      borderBottom: `2px #111 solid`,
      margin: `16px 0 0 12px`
    }}
  >
    <div className="flex">
      <h1
        style={{ marginBottom: 5, borderLeft: `2px solid black` }}
        children={text}
      />
      {remove ? (
        <input
          type="button"
          value="Remove"
          style={{
            marginBottom: 5,
            borderLeft: `2px solid black`,
            fontSize: 16,
            margin: `auto 12px auto auto`,
            backgroundColor: `black`
          }}
          onClick={remove}
        />
      ) : null}
    </div>
    {childs?.map((props) => (
      <TypeInput key={props.access} {...props} />
    ))}
    {element}
  </div>
)
