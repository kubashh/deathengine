import { Header } from "./Header"

export const Hierarchy = () => {
  return <div
    style={{
      backgroundColor: "black",
      gridColumn: "1 / span 1",
      gridRow: "2 / span 1"
    }}
  >
    <Header
      text="Hierarchy"
    />
  </div>
}