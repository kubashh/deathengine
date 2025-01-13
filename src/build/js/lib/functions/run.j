let gameTime = 1

let ms = 1000 / 60 / gameTime
let updatesLegit = 0
let framesLegit = 0

const setGameTime = (newTime) => {
  gameTime = newTime
  ms = 1000 / 60 / gameTime
  lastTime = now()
}

let lastTime = now()
const run = async () => {
  start()

  let timer = now()
  let frames = 0
  let updates = 0
  let delta = 0
  while(true) {
    const nowTime = now()
    delta += (nowTime - lastTime) / ms
    if(delta > 60) {
      delta = 60
    }
    lastTime = nowTime
    while(delta >= 1) {
      update()
      updates++
      delta--
    }
    render()
    frames++

    if(now() - timer > 1000) {
      timer += 1000
      updatesLegit = updates
      framesLegit = frames
      updates = 0
      frames = 0
    }

    await wait0()
  }
}