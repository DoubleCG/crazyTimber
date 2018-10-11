cc.Class({
    extends: cc.Component,

    properties: {
        gameScreen:cc.Node,
        person:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        this.blood = this.node.getChildByName("blood");
    },

    start () {
    },

    update (dt) {
        if(!this.gameScreen.getComponent('game').gameBegin) return false;

        if(this.blood.width < 0 ){
            this.person.getComponent('person').death();
            this.gameScreen.getComponent('game').gameOver();
        }else{
            this.blood.width -= 0.07 + 0.001*this.gameScreen.getComponent('game').gameLevel;
        }
    },


});
