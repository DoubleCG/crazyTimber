cc.Class({
    extends: cc.Component,

    properties: {
        gameScreen:cc.Node,
        trunks:cc.Node,
        trunkFly:cc.Node,
        scoreLabel:cc.Node,
        dieAudio:cc.AudioClip,
        cutAudio:cc.AudioClip,
        loseAudio:cc.AudioClip,
        blood:cc.Node,
        levelupLabel:cc.Node,

    },

    onLoad () {
        this.flyingTrunks = [];
        this.record = 0;
        this.HP = this.gameScreen.getComponent('game').HP;
        this.maxHP = 70;
        this.score = 0;
    },

    start () {
        this.gameStart();
    },

    gameStart(){
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: (keyCode, event) => {
                this.keyHandler(keyCode);
            },
        }, this.node);
    },

    keyHandler(keyCode) {

        if(!this.gameScreen.getComponent('game').gameBegin) return;

        switch(keyCode) {
            case cc.KEY.a:
            case cc.KEY.left:
                this.cut(true);
                break;
            case cc.KEY.d:
            case cc.KEY.right:
                this.cut(false);
                break;
        }
    },

    cut(isLeft){
        let trunks = this.trunks;
        let _trunks = trunks.children;
        let currentTrunk = _trunks[0];

        currentTrunk.removeFromParent();
        this.trunkFly.addChild(currentTrunk);
        trunks.getComponent('trunks').trunkAllDown(currentTrunk.height);
        
        let person = this.node;
        if(isLeft){
            if(person.x > 0){
                person.x *= -1;
                person.width *=-1;
            }
        }else{
            if(person.x < 0){
                person.x *= -1;
                person.width *=-1;
            }
        }

        let anim = this.gameScreen.getChildByName('person_3').getComponent(cc.Animation);
        anim.play('cut');
        this.cutAudioPlay = cc.audioEngine.play(this.cutAudio, false, 1);

        let isLose = this.isLose(isLeft,currentTrunk.trunkDir) || this.isLose(isLeft,_trunks[0].trunkDir);

        var color_white = new cc.Color(255, 255, 255);
        let t = this;
        let iniColor = t.blood.color;
        t.blood.color = color_white;
        setTimeout(function(){
            t.blood.color = iniColor;
        },100);

        if(isLose){
            this.dieAudioPlay = cc.audioEngine.play(this.dieAudio, false, 1);
            this.blood.width /= 1.5;
            this.blood.width -= 5;
            if(this.blood.width < 0){
                this.blood.width = 0;
            }
        }else{
            this.score++;
            this.scoreLabel.getComponent(cc.Label).string = this.score;
            this.record++;
            if(this.record % 20 === 0){
                this.gameScreen.getComponent('game').gameLevel++;
                this.levelupLabel.active = true;
                this.levelupLabel.getComponent(cc.Label).string = "LEVEL UP "+this.gameScreen.getComponent('game').gameLevel;
                let t = this;
                
                setTimeout(function(){
                    t.levelupLabel.active= false;
                },1000);
                
                console.log("!--level up--!")
            }

            this.blood = this.HP.getChildByName("blood");
            this.blood.width++;
            if(this.blood.width > this.maxHP){
                this.blood.width = this.maxHP;
            }

        }

        // 树干飞旋动画
        let xAction = cc.moveBy(0.2, (isLeft?1:-1) * 90, 0);
        let rotateAction = cc.rotateBy(0.2,360);
        let rotate0 = cc.rotateTo(0,0);

        let fly = cc.spawn(xAction,rotateAction);
        currentTrunk.y = 0;
        currentTrunk.runAction(cc.sequence(fly,rotate0,cc.callFunc(()=>{
            t.flyingTrunkBack();
        })));
    },


    flyingTrunkBack(){
        let trunks = this.trunks;
        let theFlyingTrunk = this.trunkFly.children[0];
        theFlyingTrunk.removeFromParent();

        let _trunks = trunks.children;
        let lastTrunk = _trunks[_trunks.length-1];
        theFlyingTrunk.x = 0;
        theFlyingTrunk.y = lastTrunk.y + lastTrunk.height;

        // 重置树枝
        if(theFlyingTrunk.children.length){
            theFlyingTrunk.children[0].removeFromParent();
            theFlyingTrunk.trunkDir = 0;
        }

        trunks.getComponent("trunks").addSonTreeToTrunk(theFlyingTrunk);
        trunks.addChild(theFlyingTrunk);
    },

    isLose(isLeft,trunkDir){
        if(isLeft){
            if(trunkDir == 1){
                return true;
            }
        }else if(trunkDir == 2){
            return true;
        }
        return false;
    },

    death(){
        console.log('death!!!')
        this.loseAudioPlay = cc.audioEngine.play(this.loseAudio, false, 1);
        this.node.getComponent(cc.Animation).play('die');
    },

    update (dt) {},
});
