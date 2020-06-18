test('test common',()=>{
  expect(2+2).toBe(4)
  expect(2+2).not.toBe(5)
})

test('test to be boolean',()=>{
  expect(1).toBeTruthy()
  expect(0).toBeFalsy()
})

test('test number',()=>{
  expect(4).toBeGreaterThan(3)
  expect(3).toBeLessThan(4)
})

test('test object',()=>{ //注意tobe是全相等 如果是引用类型应该用toequal
  expect({name:'viking'}).toEqual({name:'viking'})
})