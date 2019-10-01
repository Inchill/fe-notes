export class VNode {
    constructor(tag, children, text, ele) {
        this.tag = tag;
        this.children = children;
        this.text = text;
        this.ele = ele;
    }
}

export function createTextNode(val) {
    return new VNode(undefined, undefined, String(val), undefined);
}

// 注释节点function
export function createCommentNode(tag, children) {
    if(children) {
        for(var i = 0; i < children.length; i++) {
            var child = children[i];
            if(typeof child == 'string') {
                children[i] = createTextNode(child);
            }
        }
    }
    return new VNode(tag,children,undefined,null);
}