import {VNode,createCommentNode} from './Vnode.js'
var newVnode = createCommentNode('ul',[createCommentNode('li',['item 1']),createCommentNode('li',['item 2']),createCommentNode('li',['item 3'])]);