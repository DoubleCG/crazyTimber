cc.Class({
    extends: cc.Component,

    properties: {
        HP:cc.Node,
        bgm:cc.AudioClip,
        gameHUD:cc.Node,
        beginMenu:cc.Node,
        person:cc.Node,
        gameoverBoard: cc.Node,
        gameoverScoreLabel: cc.Node,
        gameoverBestLabel: cc.Node,
    },

    onLoad () {
        this.gameBegin = false;
        this.upHeight = 300;
        this.gameLevel = 1;
        this.bgmPlay = cc.audioEngine.play(this.bgm, true, 1);
        this.best = 1000;
        this._person = this.person.getComponent("person");
        this.firstGame = true;
    },

    start () {

    },

    beginMenuMove(isDown){
        let action = cc.moveBy(0.1, cc.v2(0, (isDown?-1:1) * this.upHeight));
        action.easing(cc.easeSineInOut());
        this.beginMenu.runAction(action);
    },

    gameoverBoardMove(isDown){
        let downAction = cc.moveBy(1, 0, (isDown?-1:1) * this.upHeight);
        downAction.easing(cc.easeSineInOut());
        this.gameoverBoard.runAction(downAction);
    },

    gameStart(){
        let blood = this.HP.getChildByName("blood");
        blood.width = 1/2 * this._person.maxHP;

        this.gameBegin = true;
        this.beginMenuMove(false);
        this.gameHUD.active = true;

        if(this.firstGame){
            this.firstGame = false;
        }else{
            this.gameoverBoardMove(false);
        }
        this.person.getComponent(cc.Animation).play('wait');
    },


    gameOver(){
        this.gameHUD.active = false;
        this.gameBegin = false;
        let score = this._person.score;
        this.gameoverScoreLabel.getComponent(cc.Label).string = score;
        this.gameoverBestLabel.getComponent(cc.Label).string = this.best;

        this.gameoverBoardMove(true);
        this.beginMenuMove(true);
    },

    update (dt) {},
});
