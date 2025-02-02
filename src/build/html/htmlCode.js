import { optymalizeHtml } from "./optymalizeHtml"

export const htmlCode = (js) => {
  const { author, description, gameName } = window.config

  const html0 = optymalizeHtml(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="author" content="${author}">
      <meta name="description" content="${description}">
      <meta name="keywords" content="${gameName}, ${author}">

      <title>${gameName}</title>

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

  return `${html0}${js}${html1}`
}