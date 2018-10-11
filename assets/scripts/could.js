// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        gameScreen:{
            type:cc.Node,
            default:null
        }
    },

    onLoad () {
        this.move();
    },

    start () {

    },

    move(){
        let screenWidth = this.gameScreen.width;
        let seq = cc.repeatForever(
            cc.sequence(cc.moveBy(30, 1.2*screenWidth, 0), cc.moveBy(30, -1.2*screenWidth, 0))
        );
        this.node.runAction(seq);
    },

    update (dt) {},
});
