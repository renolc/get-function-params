const getParams = require('./index')
const assert = require('assert')
const deepEqual = assert.deepEqual
assert.deepEqual = (actual, expected) => {
  actual
    .filter((i) => typeof i.default === 'function')
    .forEach((i) => i.default = i.default.toString())
  expected
    .filter((i) => typeof i.default === 'function')
    .forEach((i) => i.default = i.default.toString())

  actual
    .filter((i) => typeof i.default === 'object')
    .map((i) => i.default)
    .forEach((i) => {
      Object.keys(i).forEach((j) => {
        if (typeof i[j] === 'function') i[j] = i[j].toString()
      })
    })
  expected
    .filter((i) => typeof i.default === 'object')
    .map((i) => i.default)
    .forEach((i) => {
      Object.keys(i).forEach((j) => {
        if (typeof i[j] === 'function') i[j] = i[j].toString()
      })
    })

  return deepEqual(actual, expected)
}

assert.deepEqual(getParams(function(){}), [])
assert.deepEqual(getParams(function(a){}), [{ param: 'a' }])
assert.deepEqual(getParams(function(a,b){}), [{ param: 'a' },{ param: 'b' }])
assert.deepEqual(getParams(function(a,/*bork*/b){}), [{ param: 'a' },{ param: 'b' }])
assert.deepEqual(getParams(function(a,/*bork*/b/*bork*/){}), [{ param: 'a' },{ param: 'b' }])
assert.deepEqual(getParams(function(a,b=true,c){}), [{ param: 'a' },{ param: 'b', default: true },{ param: 'c' }])
assert.deepEqual(getParams(function(a,b={}){}), [{ param: 'a' },{ param: 'b', default: {} }])
assert.deepEqual(getParams(function(a,b={c:true,d:false}){}), [{ param: 'a' },{ param: 'b', default: {c:true,d:false} }])
assert.deepEqual(getParams(function(a,b=function(){}){}), [{ param: 'a' },{ param: 'b', default: function(){} }])

assert.deepEqual(getParams(()=>{}), [])
assert.deepEqual(getParams((a)=>{}), [{ param: 'a' }])
assert.deepEqual(getParams((a,b)=>{}), [{ param: 'a' },{ param: 'b' }])
assert.deepEqual(getParams((a,/*bork*/b)=>{}), [{ param: 'a' },{ param: 'b' }])
assert.deepEqual(getParams((a,/*bork*/b/*bork*/)=>{}), [{ param: 'a' },{ param: 'b' }])
assert.deepEqual(getParams((a,b=true,c)=>{}), [{ param: 'a' },{ param: 'b', default: true },{ param: 'c' }])
assert.deepEqual(getParams((a,b={})=>{}), [{ param: 'a' },{ param: 'b', default: {} }])
assert.deepEqual(getParams((a,b={c:true,d:false})=>{}), [{ param: 'a' },{ param: 'b', default: {c:true,d:false} }])
assert.deepEqual(getParams((a,b=function(){})=>{}), [{ param: 'a' },{ param: 'b', default: function(){} }])

assert.deepEqual(getParams(function(a=function(b=false,c=true){}){}), [{ param: 'a', default: function(b=false,c=true){} }])
assert.deepEqual(getParams(function(a=(b=false,c=true)=>{}){}), [{ param: 'a', default: (b=false,c=true)=>{} }])
assert.deepEqual(getParams((a=function(b=false,c=true){})=>{}), [{ param: 'a', default: function(b=false,c=true){} }])
assert.deepEqual(getParams((a=(b=false,c=true)=>{})=>{}), [{ param: 'a', default: (b=false,c=true)=>{} }])

assert.deepEqual(getParams((a,b={c:true,d:false},c={z:'test,}',y:()=>false,x:'hello},){'})=>{}), [{ param: 'a' },{ param: 'b', default:{c:true,d:false} },{ param: 'c', default: {z:'test,}',y:()=>false,x:'hello},){'} }])
assert.deepEqual(getParams(function(a){return')'}), [{ param: 'a' }])
assert.deepEqual(getParams((a)=>')'), [{ param: 'a' }])
assert.deepEqual(getParams(function(a,b){return (1==2)}), [{ param: 'a' },{ param: 'b' }])
assert.deepEqual(getParams((a)=>(1)), [{ param: 'a' }])
assert.deepEqual(getParams((a)=>(b)=>(3)), [{ param: 'a' }])