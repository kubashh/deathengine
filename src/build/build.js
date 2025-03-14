import { htmlCode } from "./htmlCode"
import { downloadFile } from "../lib/utils"
import { config } from "../lib/consts"

export const build = () =>
  downloadFile(`${config.gameName}.html`, htmlCode(), true)

export const test = () => {
  const myWindow = window.open()
  myWindow.document.write(htmlCode())
}
