const wait = async (time) => await new Promise((r) => setTimeout(r, time))
const wait0 = async () => new Promise((r) => setTimeout(r))

const now = () => window.performance.now()

const isFirstUpperCase = ([letter]) =>
  `ABCDEFGHIJKLMNOPRQSTUWXYZ`.includes(letter)

const deepCopy = (data) => {
  if (typeof data === `function`) {
    return data
  }

  if (Array.isArray(data)) {
    return data.reduce((old, val) => [...old, val], [])
  }

  if (typeof data === `object`) {
    const newObj = {}

    for (const key in data) {
      newObj[key] = deepCopy(data[key])
    }

    return newObj
  }

  return data
}

const loadScene = (scene) => {
  currentScene = new GameObject(deepCopy(scene))
}
