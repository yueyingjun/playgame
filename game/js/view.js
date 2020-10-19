/*
*  负责创建各种界面的
* */


function view() {

    // 进度条的对象
    this.progressBar=null;
    // 遮罩对象
    this.bgMask=null;

    // 开始按钮的对象
    this.startBtn=null;

    // 数字的对象
    this.numBox=null;

    // 生命值的容器

    this.lifeEle=null;
}
view.prototype={

    // 创建进度条以及背景遮罩
    createProgress:function () {
        // 创建背景遮罩
        var bgMask=document.createElement("div");
        this.bgMask=bgMask;

        bgMask.style.cssText="width:100%;height:100%;background:rgba(0,0,0,.5)";

        // 创建进度条的容器
        var progressBox=document.createElement("div");
        progressBox.style.cssText="width:50%;height:10px;border:1px solid #fff;border-radius:5px;box-shadow:0 0 5px #000";
        this.setCenter(progressBox);
        // 创建进度条
        var progressBar=document.createElement("div");

        this.progressBar=progressBar;

        progressBar.style.cssText="width:0%;height:100%;background:#eee;border-radius:5px;";
        progressBox.appendChild(progressBar);
        document.body.appendChild(progressBox);


        document.body.appendChild(bgMask);
    },

    // 创建开始界面
    startView:function () {

        // 创建开始界面的背景
        document.body.style.background="url(img/bg111.png) no-repeat center";
        document.body.style.backgroundSize="cover";

        // 创建开始界面的云彩
        var cloud=document.createElement("div");
        cloud.style.cssText="width:80%;height:160px;position:absolute;left:0;right:0;margin:auto;top:20px;background:url(img/cloud1.png) no-repeat center;z-index:999";
        cloud.style.backgroundSize="cover";
        cloud.className="cloud";

        // 创建树
        var tree=document.createElement("div");
        tree.style.cssText="width:100%;height:100%;position:absolute;left:0;right:0;background:url(img/tree1.png) no-repeat 0 0";
        tree.style.backgroundSize="cover";
        tree.className="tree";



        // 创建开始界面的按钮

        var startBtn=document.createElement("div");
        this.startBtn=startBtn;
        startBtn.style.cssText="width:300px;height:144px;background:url(img/start.png) no-repeat center;cursor:pointer";
        this.setCenter(startBtn);
        startBtn.className="startBtn";


        // 创建数字的容器
        var numBox=document.createElement("div");
        this.numBox=numBox;

        numBox.style.cssText="width:150px;height:150px;background:url(img/three.png) no-repeat center;display:none";
        this.setCenter(numBox);




        var style=document.createElement("style");
        style.innerHTML=`
        .startBtn:hover{
    background:url(img/startActive.png) no-repeat center !important;
}
        `;



        document.body.appendChild(style);
        document.body.appendChild(tree);
        document.body.appendChild(numBox);
        document.body.appendChild(startBtn);
        document.body.appendChild(cloud);

    },


    // 创建生命值的容器
    createLifeEle:function(){

        var lifeEle=document.createElement("div");
        this.lifeEle=lifeEle;
        lifeEle.style.cssText="width:150px;height:40px;position:absolute;left:10px;top:20px;background:rgba(0,0,0,0.5);color:#fff;text-align:center;line-height:40px;font-size:24px;z-index:1000";
        document.body.appendChild(lifeEle);

    },
    // 创建分数的容器
    createScoreEle:function(){

        var scoreEle=document.createElement("div");
        this.scoreEle=scoreEle;
        scoreEle.style.cssText="width:150px;height:40px;position:absolute;right:10px;top:20px;background:rgba(0,0,0,0.5);color:#fff;text-align:center;line-height:40px;font-size:24px;z-index:1000";
        document.body.appendChild(scoreEle);

    },

    // 创建一个重新开始的按钮

    createRestartEle(){
        var restartBtn=document.createElement("div");
        this.restartBtn=restartBtn;
        restartBtn.style.cssText="width:300px;height:144px;background:url(img/restart.png) no-repeat center;cursor:pointer;display:none";
        this.setCenter(restartBtn);

        document.body.appendChild(restartBtn);
    },

    // 创建下一关的按钮

    createNextEle(){
        var nextBtn=document.createElement("div");
        this.nextBtn=nextBtn;
        nextBtn.style.cssText="width:300px;height:144px;background:url(img/next.png) no-repeat center;cursor:pointer;display:none";
        this.setCenter(nextBtn);

        document.body.appendChild(nextBtn);
    },


    // 创建一个暂停的按钮
    createPausedEle(){
        var pausedBtn=document.createElement("div");
        this.pausedBtn=pausedBtn;
        pausedBtn.style.cssText="width:40px;height:40px;background:url(img/run.png) no-repeat center;cursor:pointer;position:absolute;left:200px;top:20px;z-index:1000";

        pausedBtn.style.backgroundSize="100%";

        document.body.appendChild(pausedBtn);
    },




    // 将某个对象设置为绝对居中
    setCenter:function (obj) {
        obj.style.position="absolute";
        obj.style.left=0;
        obj.style.right=0;
        obj.style.bottom=0;
        obj.style.top=0;
        obj.style.margin="auto";
    },
}


