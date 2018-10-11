cc.Class({
    extends: cc.Component,

    properties: {
        gameScreen:{
            type:cc.Node,
            default:null
        }
    },


    onLoad () {},

    start () {
        this.move();
    },

    move(){
        let screenWidth = this.gameScreen.width;
        let birds1 = this.node.getChildByName('bird1');
        let birds2 = this.node.getChildByName('bird2');

        birds1.runAction(cc.repeatForever(cc.sequence(cc.delayTime(1), cc.flipY(true),cc.delayTime(1),cc.flipY(false))));
        birds1.runAction(cc.repeatForever(cc.sequence(cc.moveBy(7, 1.2*screenWidth, 20),cc.moveBy(0, -1.2*screenWidth, -20))));

        birds2.runAction(cc.repeatForever(cc.sequence(cc.delayTime(1), cc.flipY(true),cc.delayTime(1),cc.flipY(false))));
        birds2.runAction(cc.repeatForever(cc.sequence(cc.moveBy(7, 1.2*screenWidth, 20),cc.moveBy(0, -1.2*screenWidth, -20))));
    },

    update (dt) {},
});
