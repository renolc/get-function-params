const getParams = require('./index')

const stringEqual = function (actual, expected) {
  actual = JSON.stringify(actual)
  expected = JSON.stringify(expected)
  if (actual !== expected) throw new Error(['Expected', expected, 'but got', actual].join(' '))
}

// basic
stringEqual(getParams(function(){}), [])
stringEqual(getParams(function(a){}), [{ param: 'a' }])
stringEqual(getParams(function(a,b){}), [{ param: 'a' },{ param: 'b' }])
stringEqual(getParams(function(a,/*bork*/b){}), [{ param: 'a' },{ param: 'b' }])
stringEqual(getParams(function(a,/*bork*/b/*bork*/){}), [{ param: 'a' },{ param: 'b' }])

// default args
stringEqual(getParams(function(a,b=true,c){}), [{ param: 'a' },{ param: 'b', default: true },{ param: 'c' }])
stringEqual(getParams(function(a,b={}){}), [{ param: 'a' },{ param: 'b', default: {} }])
stringEqual(getParams(function(a,b={c:true,d:false}){}), [{ param: 'a' },{ param: 'b', default: {c:true,d:false} }])
stringEqual(getParams(function(a,b=function(){}){}), [{ param: 'a' },{ param: 'b', default: function(){} }])

// arrow functions
stringEqual(getParams(()=>{}), [])
stringEqual(getParams((a)=>{}), [{ param: 'a' }])
stringEqual(getParams((a,b)=>{}), [{ param: 'a' },{ param: 'b' }])
stringEqual(getParams((a,/*bork*/b)=>{}), [{ param: 'a' },{ param: 'b' }])
stringEqual(getParams((a,/*bork*/b/*bork*/)=>{}), [{ param: 'a' },{ param: 'b' }])
stringEqual(getParams(a => {}), [{ param: 'a' }])

// arrows + defaults
stringEqual(getParams((a,b=true,c)=>{}), [{ param: 'a' },{ param: 'b', default: true },{ param: 'c' }])
stringEqual(getParams((a,b={})=>{}), [{ param: 'a' },{ param: 'b', default: {} }])
stringEqual(getParams((a,b={c:true,d:false})=>{}), [{ param: 'a' },{ param: 'b', default: {c:true,d:false} }])
stringEqual(getParams((a,b=function(){})=>{}), [{ param: 'a' },{ param: 'b', default: function(){} }])

// default function args
stringEqual(getParams(function(a=function(b=false,c=true){}){}), [{ param: 'a', default: function(b=false,c=true){} }])
stringEqual(getParams(function(a=(b=false,c=true)=>{}){}), [{ param: 'a', default: (b=false,c=true)=>{} }])
stringEqual(getParams((a=function(b=false,c=true){})=>{}), [{ param: 'a', default: function(b=false,c=true){} }])
stringEqual(getParams((a=(b=false,c=true)=>{})=>{}), [{ param: 'a', default: (b=false,c=true)=>{} }])

// lots-o-edge-cases
stringEqual(getParams((a,b={c:true,d:false},c={z:'test,}',y:()=>false,x:'hello},){'})=>{}), [{ param: 'a' },{ param: 'b', default:{c:true,d:false} },{ param: 'c', default: {z:'test,}',y:()=>false,x:'hello},){'} }])
stringEqual(getParams(function(a){return')'}), [{ param: 'a' }])
stringEqual(getParams((a)=>')'), [{ param: 'a' }])
stringEqual(getParams(function(a,b){return (1==2)}), [{ param: 'a' },{ param: 'b' }])
stringEqual(getParams((a)=>(1)), [{ param: 'a' }])
stringEqual(getParams((a)=>(b)=>(3)), [{ param: 'a' }])
stringEqual(getParams(function(a=[]){}), [{ param: 'a', default: [] }])
stringEqual(getParams(function(a=[1]){}), [{ param: 'a', default: [1] }])
stringEqual(getParams(function(a=[1, 2, 3]){}), [{ param: 'a', default: [1, 2, 3] }])
stringEqual(getParams(function(a="'", b="'"){}), [{ param: 'a', default: "'" },{ param: 'b', default: "'" }])
stringEqual(getParams((
  a
 ) => {}), [{ param: 'a' }])
stringEqual(getParams(async a => 2), [{ param: 'a' }])

console.log('All good ✓')