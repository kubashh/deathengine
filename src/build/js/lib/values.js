import { importFile, joinFiles } from "../fn/joinAndImport"

export const values = joinFiles(
  await importFile(await import("./values/canvas.j"))
)