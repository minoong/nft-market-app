import * as _ from 'lodash'

export const STATIC_VARS = {
 /* Disassembled 초성(onset) */
 CHO: ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'],
 /* Disassembled 중성(nucleus) */
 JUNG: [
  'ㅏ',
  'ㅐ',
  'ㅑ',
  'ㅒ',
  'ㅓ',
  'ㅔ',
  'ㅕ',
  'ㅖ',
  'ㅗ',
  ['ㅗ', 'ㅏ'],
  ['ㅗ', 'ㅐ'],
  ['ㅗ', 'ㅣ'],
  'ㅛ',
  'ㅜ',
  ['ㅜ', 'ㅓ'],
  ['ㅜ', 'ㅔ'],
  ['ㅜ', 'ㅣ'],
  'ㅠ',
  'ㅡ',
  ['ㅡ', 'ㅣ'],
  'ㅣ',
 ],
 /* Desassembled 종성(coda) */
 JONG: [
  '',
  'ㄱ',
  'ㄲ',
  ['ㄱ', 'ㅅ'],
  'ㄴ',
  ['ㄴ', 'ㅈ'],
  ['ㄴ', 'ㅎ'],
  'ㄷ',
  'ㄹ',
  ['ㄹ', 'ㄱ'],
  ['ㄹ', 'ㅁ'],
  ['ㄹ', 'ㅂ'],
  ['ㄹ', 'ㅅ'],
  ['ㄹ', 'ㅌ'],
  ['ㄹ', 'ㅍ'],
  ['ㄹ', 'ㅎ'],
  'ㅁ',
  'ㅂ',
  ['ㅂ', 'ㅅ'],
  'ㅅ',
  'ㅆ',
  'ㅇ',
  'ㅈ',
  'ㅊ',
  'ㅋ',
  'ㅌ',
  'ㅍ',
  'ㅎ',
 ],
 /* 유니코드 한글 시작 위치 */
 HANGUL_OFFSET: 0xac00,
 /* 자음 */
 CONSONANTS: [
  'ㄱ',
  'ㄲ',
  'ㄳ',
  'ㄴ',
  'ㄵ',
  'ㄶ',
  'ㄷ',
  'ㄸ',
  'ㄹ',
  'ㄺ',
  'ㄻ',
  'ㄼ',
  'ㄽ',
  'ㄾ',
  'ㄿ',
  'ㅀ',
  'ㅁ',
  'ㅂ',
  'ㅃ',
  'ㅄ',
  'ㅅ',
  'ㅆ',
  'ㅇ',
  'ㅈ',
  'ㅉ',
  'ㅊ',
  'ㅋ',
  'ㅌ',
  'ㅍ',
  'ㅎ',
 ],
 /* Assembled 초성 */
 COMPLETE_CHO: ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'],
 /* Assembled 중성 */
 COMPLETE_JUNG: ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'],
 /* Assembled 종성 */
 COMPLETE_JONG: [
  '',
  'ㄱ',
  'ㄲ',
  'ㄳ',
  'ㄴ',
  'ㄵ',
  'ㄶ',
  'ㄷ',
  'ㄹ',
  'ㄺ',
  'ㄻ',
  'ㄼ',
  'ㄽ',
  'ㄾ',
  'ㄿ',
  'ㅀ',
  'ㅁ',
  'ㅂ',
  'ㅄ',
  'ㅅ',
  'ㅆ',
  'ㅇ',
  'ㅈ',
  'ㅊ',
  'ㅋ',
  'ㅌ',
  'ㅍ',
  'ㅎ',
 ],
 /* 복잡한 자음: [ 자음1, 자음2, 자음1 + 자음2 ] */
 COMPLEX_CONSONANTS: [
  ['ㄱ', 'ㅅ', 'ㄳ'],
  ['ㄴ', 'ㅈ', 'ㄵ'],
  ['ㄴ', 'ㅎ', 'ㄶ'],
  ['ㄹ', 'ㄱ', 'ㄺ'],
  ['ㄹ', 'ㅁ', 'ㄻ'],
  ['ㄹ', 'ㅂ', 'ㄼ'],
  ['ㄹ', 'ㅅ', 'ㄽ'],
  ['ㄹ', 'ㅌ', 'ㄾ'],
  ['ㄹ', 'ㅍ', 'ㄿ'],
  ['ㄹ', 'ㅎ', 'ㅀ'],
  ['ㅂ', 'ㅅ', 'ㅄ'],
 ],
 /* 복잡한 모음: [모음1, 모음2, 모음1 + 모음2] */
 COMPLEX_VOWELS: [
  ['ㅗ', 'ㅏ', 'ㅘ'],
  ['ㅗ', 'ㅐ', 'ㅙ'],
  ['ㅗ', 'ㅣ', 'ㅚ'],
  ['ㅜ', 'ㅓ', 'ㅝ'],
  ['ㅜ', 'ㅔ', 'ㅞ'],
  ['ㅜ', 'ㅣ', 'ㅟ'],
  ['ㅡ', 'ㅣ', 'ㅢ'],
 ],
}

class Hangeul {
 #CONSONANTS_HASH

 #CHO_HASH

 #JUNG_HASH

 #JONG_HASH

 #COMPLEX_CONSONANTS_HASH

 #COMPLEX_VOWELS_HASH

 constructor() {
  this.#CONSONANTS_HASH = this.#makeHash(STATIC_VARS.CONSONANTS)
  this.#CHO_HASH = this.#makeHash(STATIC_VARS.COMPLETE_CHO)
  this.#JUNG_HASH = this.#makeHash(STATIC_VARS.COMPLETE_JUNG)
  this.#JONG_HASH = this.#makeHash(STATIC_VARS.COMPLETE_JONG)

  this.#COMPLEX_CONSONANTS_HASH = this.#makeComplexHash(STATIC_VARS.COMPLEX_CONSONANTS)
  this.#COMPLEX_VOWELS_HASH = this.#makeComplexHash(STATIC_VARS.COMPLEX_VOWELS)
 }

 #makeHash(array: string[]) {
  const hash = array.reduce(
   (originPrev, val, idx) => {
    const prev = { ...originPrev }
    if (!val) return prev

    prev[val.charCodeAt(0)] = idx

    return prev
   },
   { 0: 0 } as { [key: number]: number },
  )

  return hash
 }

 #makeComplexHash(array: string[][]) {
  const hash = array.reduce(
   (originPrev, [consonantFirst, consonantMiddle, consonantMerge]) => {
    const prev = { ...originPrev }
    const [first, middle, merge] = _.map([consonantFirst, consonantMiddle, consonantMerge], (val) => val.charCodeAt(0))

    if (typeof prev[first] === 'undefined') {
     prev[first] = {}
    }
    prev[first][middle] = merge
    return prev
   },
   {} as {
    [key: number]: {
     [key: number]: number
    }
   },
  )

  return hash
 }

 #isConsonant(c: number): boolean {
  return typeof this.#CONSONANTS_HASH[c] !== 'undefined'
 }

 #isCho(c: number): boolean {
  return typeof this.#CHO_HASH[c] !== 'undefined'
 }

 #isJung(c: number): boolean {
  return typeof this.#JUNG_HASH[c] !== 'undefined'
 }

 #isJong(c: number): boolean {
  return typeof this.#JONG_HASH[c] !== 'undefined'
 }

 #isHangeul(c: number): boolean {
  return c >= 0xac00 && c <= 0xd7a3
 }

 #isJungJoinable(front: number, rear: number): number | false {
  return this.#COMPLEX_VOWELS_HASH[front]?.[rear] ?? false
 }

 #isJongJoinable(front: number, rear: number): number | false {
  return this.#COMPLEX_CONSONANTS_HASH[front]?.[rear] ?? false
 }

 dissemble(originString: string | string[], isGroupping = false) {
  const string = [originString].flat(Infinity).join('')
  const result = _.reduce(
   [...string],
   (prev, curr) => {
    const code = curr.charCodeAt(0)
    const temp: string[] = []
    let result: string[][] = [...prev]

    if (this.#isHangeul(code)) {
     const offsetCode = code - STATIC_VARS.HANGUL_OFFSET
     const jong = offsetCode % 28
     const jung = ((offsetCode - jong) / 28) % 21
     const cho = parseInt(String((offsetCode - jong) / 28 / 21), 10)
     temp.push(STATIC_VARS.CHO[cho])

     temp.push(...[STATIC_VARS.JUNG[jung]].flat())

     if (jong > 0) {
      temp.push(...[STATIC_VARS.JONG[jong]].flat())
     }
    } else if (this.#isConsonant(code)) {
     const r = this.#isCho(code) ? STATIC_VARS.CHO[this.#CHO_HASH[code]] : STATIC_VARS.JONG[this.#JONG_HASH[code]]

     temp.push(...[r].flat())
    } else if (this.#isJung(code)) {
     const r = STATIC_VARS.JUNG[this.#JUNG_HASH[code]]

     temp.push(...[r].flat())
    } else {
     temp.push(curr)
    }

    if (isGroupping) result.push(temp)
    else result = result.concat(temp)

    return result
   },
   [] as string[][],
  )

  return result
 }
}

export default Hangeul
