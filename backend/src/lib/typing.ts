
type Simple = string | number | boolean | null

type JsonObject = {[key: string]: Json}

type Json = Simple | Json[] | JsonObject | undefined

type TypingObject = {[key: string]: Typing}

type Typing = {
  isArray: boolean,
  keyType?: Typing[],
  type: TypingObject | Typing[] | string
} | string

const mergeType = (array: Json[], path: string): Typing[] => {
  const arrs = array.filter(v => Array.isArray(v)) as Json[][]
  const objs = array.filter(v =>
    typeof v === 'object' && v !== null && !Array.isArray(v)
  ) as JsonObject[]
  const rest = array.filter(v => typeof v !== 'object' || v === null) as Simple[]
  let target = [...new Set(rest.map(v => getType(v, path)))]

  if (arrs.length) {
    target = [{
      isArray: true,
      type: mergeType(arrs.reduce((pre, cur) => pre.concat(cur), []), `${path}[]`),
    }, ...target]
  }

  if (objs.length) {
    const keys = objs.map(obj => Object.entries(obj).map(e => e[0])).flat()
    const ks = [...new Set(keys)]
    const newType: TypingObject = {}
    ks.forEach(k => {
      const vs = objs.map(obj => obj[k])
      newType[k] = {
        isArray: false,
        type: mergeType(vs, `${path}.${k}`),
      }
    })
    target = [{
      isArray: false,
      type: newType,
    }, ...target]
  }

  return target
}

const singleIndent = '  '
const getIndents = (indent: number) => {
  let str = ''
  for (let i = 0; i < indent; i++) str += singleIndent
  return str
}

export const getType = (json: Json | undefined, path: string): Typing => {
  if (json === null) return 'null'
  if (json === undefined) return 'undefined'
  if (Array.isArray(json)) {
    return {
      isArray: true,
      type: mergeType(json, `${path}[]`)
    }
  }
  if (typeof json === 'object') {
    const tar: TypingObject = {}
    Object.entries(json).forEach(([k, v]) => {
      tar[k] = getType(v, `${path}.${k}`)
    })
    return {
      isArray: false,
      type: tar,
    }
  }
  return typeof json
}

export const getTypingList = (typing: Typing, indent = 0): string => {
  if (typeof typing === 'string')
    return `${typing}`

  const nextIndent = typing.keyType ? indent + 1 : indent

  let theType = typeof typing.type === 'string' ? typing.type
    : Array.isArray(typing.type) ? typing.type.map(t =>
      getTypingList(t, nextIndent)
    ).filter(x => x !== 'undefined').join(' | ') || 'never[]'
    : `{\n${Object.entries(typing.type).map(([k, v]) => {
      const indexing = typeof v !== 'string' && v.isArray && !v.keyType ? `[]` : ''
      const optional = typeof v !== 'string' && Array.isArray(v.type)
        && v.type.find(t => t === 'undefined') ? '?' : ''
      return `${getIndents(nextIndent)}${singleIndent}${k}${optional}${indexing}: ${
        getTypingList(v, nextIndent + 1)
      }\n`
    }).join('')}${getIndents(nextIndent)}}`

  if (typing.keyType) {
    theType = `{\n${getIndents(indent + 1)}[${
      typing.keyType.map(t => getTypingList(t, indent + 1)).join(' | ')
    }]: ${theType}\n${getIndents(indent)}}`
  }

  return theType;
}
