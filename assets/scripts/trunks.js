cc.Class({
    extends: cc.Component,

    properties: {
        gameScreen: cc.Node,
        trunkPrefab1: cc.Prefab,
        trunkPrefab2: cc.Prefab,
        trunkPrefab3: cc.Prefab,
        trunkPrefab4: cc.Prefab,
        sonTreePrefabLeft: cc.Prefab,
        sonTreePrefabRight: cc.Prefab,
    },

    onLoad () {
        cc.view.enableAntiAlias(false)
        this.trunkNumber = 12;
        this.trunkWidth = 33;
        this.firstTrunk = true;
        this.sonTreeDense = 0;
        this.trunkDir = 0;  // 0:无  1:左  2:右
        this.hadSonTree = false;
    },

    start () {
        this.trunkPool = new cc.NodePool();
        this.sonTreePool = new cc.NodePool();

        for(let i=0;i<this.trunkNumber;i++){
            this.createTrunk();
        }

    },

    createTrunk(){
        let trunkTip = Math.ceil(Math.random() * 4);
        let trunk = cc.instantiate(this['trunkPrefab' + trunkTip]); // 创建节点

        let _trunks = this.node.children;

        if(!this.firstTrunk){
            let lastTrunk = _trunks[_trunks.length-1];
            console.log("lastTrunk.y : " ,lastTrunk.y);
            trunk.position = cc.v2(0, lastTrunk.y + lastTrunk.height);
        }else{
            trunk.position = cc.v2(0, 0);

        }

        this.node.addChild(trunk);
        trunk.trunkDir = 0;

        this.addSonTreeToTrunk(trunk);
    
        this.firstTrunk = false;
    },

    addSonTreeToTrunk(trunk){
        if(!this.hadSonTree && !this.firstTrunk && (Math.random() + this.sonTreeDense*0.1  < 0.5) ){
            // 添加树枝
            let isLeft = Math.random() < 0.5;
            let sonTree = cc.instantiate(this["sonTreePrefab" + (isLeft?"Left":"Right")]);
            sonTree.position = cc.v2( (isLeft?-1:1) * this.trunkWidth);
            trunk.trunkDir = isLeft?1:2;

            trunk.addChild(sonTree);
            
            this.sonTreeDense += 1.5;
            this.hadSonTree = true;
        }else{
            this.sonTreeDense--;
            this.hadSonTree = false;
        }
    },

    trunkAllDown(trunkHeight){
        let downAction = cc.moveBy(0.1, 0, -trunkHeight);
        this.node.runAction(downAction);
    },

    
    update (dt) {},
});