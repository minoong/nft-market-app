import Hangeul from './index'

describe('Hangeul', () => {
 it('자음/모음 분리', async () => {
  const hangeul = new Hangeul()

  expect(hangeul.dissemble('비트코인', true)).toStrictEqual([
   ['ㅂ', 'ㅣ'],
   ['ㅌ', 'ㅡ'],
   ['ㅋ', 'ㅗ'],
   ['ㅇ', 'ㅣ', 'ㄴ'],
  ])
  expect(hangeul.dissemble('비트코인')).toStrictEqual(['ㅂ', 'ㅣ', 'ㅌ', 'ㅡ', 'ㅋ', 'ㅗ', 'ㅇ', 'ㅣ', 'ㄴ'])
  expect(hangeul.dissemble('ㄳ')).toStrictEqual(['ㄱ', 'ㅅ'])
  expect(hangeul.dissemble('ㄲ')).toStrictEqual(['ㄲ'])
 })
})
