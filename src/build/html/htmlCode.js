import { config } from "../../lib/consts"
import { jsCode } from "../js/jsCode"
import { optymalizeHtml } from "./optymalizeHtml"

export const htmlCode = () => {
  const html0 = optymalizeHtml(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="author" content="${config.author}">
      <meta name="description" content="${config.description}">
      <meta name="keywords" content="${config.gameName}, ${config.author}">

      <title>${config.gameName}</title>

      <style>
        html, body {
          background-color:black;
          margin:0;
          border:0;
          padding:0;
          user-select:none;
          width:100vw;
          height:100vh;
          overflow:hidden;
        }
        canvas {
          display:block;
        }
      </style>
    </head>
    <body>
      <canvas></canvas>

      <script>
  `)
  const html1 = optymalizeHtml(`
      </script>
    </body>
    </html>
  `)

  return `${html0}${jsCode()}${html1}`
}
