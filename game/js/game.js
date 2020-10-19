class game{
    constructor(){
        //  字母的种子
        this.seed="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        // 需要预加载的资源
        this.resource=[
            "img/bg.jpeg","img/start.png","img/startActive.png","img/cloud1.png","img/one.png","img/two.png","img/three.png","img/tree1.png","img/restart.png","img/next.png"
        ];
        //  通过循环将字母放入到资源的数组里面
        for(var i=0;i<this.seed.length;i++){
            this.resource.push("img/A_Z/"+this.seed[i]+".png")
        }
        //  首次加载字母的数量
        this.initLetterNum=5;
        // 随机的字母
        this.randArr=[];

        // 字母落下的速度
        this.speed=5;

        // 生命值
        this.life=10;

        //  分数
        this.score=0;

        //  存放字母元素的数组
        this.letterArr=[];

        //  创建界面的对象
        this.view=new view()

        // 定时器的指针

        this.t=null;

        this.flag=true;
    }

    run(){
        // 1. 创建进入条，等待资源的加载
        this.view.createProgress()
        var that=this;
        //要加载的图片资源    每一张图片加载完要做的事情  全部都加载完要执行的事情
        loadImgs(this.resource,function (num,total) {
            that.view.progressBar.style.width=num/total*100+"%"
        },function () {
            // 1. 隐藏进度条
            that.view.progressBar.parentElement.style.display="none";
            //2. 遮罩隐藏
            that.view.bgMask.style.display="none";

            //3. 创建开始界面
            that.view.startView();

            // 4. 创建 生命值容器

            that.view.createLifeEle();

            that.view.lifeEle.innerHTML=that.life;
            //5. 创建 分数容器


            that.view.createScoreEle();
            that.view.scoreEle.innerHTML=that.score;

            //6.创建一个重新开始的按钮

            that.view.createRestartEle();

            // 7. 创建下一关的按钮

            that.view.createNextEle();

            //8. 创建暂停按钮

            that.view.createPausedEle();

            that.paused();


            // 4. 点击按钮开始
            that.gameStart(function () {
               // 开始游戏
                // 1. 创建字母
                that.createLetter()
                // 2. 字母坠落
                that.dropLetter();
                //  3.键盘按下
                that.keydown();

            })

        })
    }
    paused(){
        var that=this;
        that.view.pausedBtn.onclick=function () {
            if(that.flag){
                clearInterval(that.t);
                that.view.pausedBtn.style.backgroundImage="url(img/paused.png)"
                that.flag=false

            }else{
                that.t=setInterval(function () {
                    that.move();

                },40)
                that.view.pausedBtn.style.backgroundImage="url(img/run.png)"
                that.flag=true;

            }
        }

    }

    keydown(){
        var that=this;
        document.onkeydown=function (ev) {
            var letter=String.fromCharCode(ev.keyCode);
            for(var i=0;i<that.letterArr.length;i++){
                if(that.letterArr[i].letter==letter){
                    document.body.removeChild(that.letterArr[i]);
                    that.letterArr.splice(i,1);
                    that.createLetter(1)

                    that.view.scoreEle.innerHTML=++that.score;

                    if(that.score%10==0){
                        that.next();
                    }
                    break;
                }
            }

        }
    }

    // 下一关
    next(){
        var that=this;
        // 1. 停止字母下落
        clearInterval(that.t);
        //2.清空现有的字母
        for(var i=0;i<that.letterArr.length;i++){
            document.body.removeChild(that.letterArr[i]);
        }

        that.letterArr=[];

        that.view.nextBtn.style.display="block";
        that.view.nextBtn.onclick=function () {
            this.style.display="none";

            that.initLetterNum++;
            that.speed++;
            //1. 创建字母
            that.createLetter()
            // 2. 字母坠落
            that.dropLetter();
            //  3.键盘按下
            that.keydown();

            
        }
    }

    // 字母下落
    dropLetter(){
        var that=this;
        this.t=setInterval(function () {
            that.move();

        },40)
    }

    // 核心的动画函数
    move(){

        var that=this;
        for(var i=0;i<that.letterArr.length;i++){

            that.letterArr[i].style.top=that.letterArr[i].offsetTop+that.speed+"px";

            if(that.letterArr[i].offsetTop>document.documentElement.clientHeight){

                // 视觉删掉
                document.body.removeChild(that.letterArr[i]);
                // 数组里面删掉
                that.letterArr.splice(i,1);
                that.createLetter(1)
                that.view.lifeEle.innerHTML=--that.life;
                if(that.life<0){
                    // 重新开始游戏
                    that.restart();


                }

            }


        }
    }

    // 重新开始
    restart(){
        var that=this;
        that.view.lifeEle.innerHTML=0;
        // 1. 停止字母下落
        clearInterval(that.t);
        //2.清空现有的字母
        for(var i=0;i<that.letterArr.length;i++){
            document.body.removeChild(that.letterArr[i]);
        }

        that.letterArr=[];

        that.view.restartBtn.style.display="block";

        that.view.restartBtn.onclick=function () {
            this.style.display="none";
            that.life=10;
            that.score=0;
            that.initLetterNum=5;
            that.view.lifeEle.innerHTML=that.life;
            that.view.scoreEle.innerHTML=that.score;
            //1. 创建字母
            that.createLetter()
            // 2. 字母坠落
            that.dropLetter();
            //  3.键盘按下
            that.keydown();

        }
    }

    // 创建随机字母
    createLetter(num){
        //1. 创建随机值
        var that=this;
        var num=num||that.initLetterNum;
        that.randArr=getRand(that.seed,num);
        for(var i=0;i<that.randArr.length;i++){
            var im=document.createElement("img");
            im.src="img/A_Z/"+that.randArr[i]+".png";
            im.style.position="absolute";
            im.style.top="25px";

            var begin=(document.documentElement.clientWidth-(document.documentElement.clientWidth*0.8))/2;
            im.style.left= begin+Math.random()*(document.documentElement.clientWidth*0.8-begin)+"px"


            im.letter=that.randArr[i];
            that.letterArr.push(im);
            document.body.appendChild(im);
        }

    }

    // 游戏开始
    gameStart(nextcallback){
        var that=this;
        that.view.startBtn.onclick=function () {
            that.view.startBtn.style.display="none";
            that.view.numBox.style.display="block";

            var num=2;
            var t=setInterval(function () {
                if(num==2){
                    var imgname="img/two.png"
                    that.view.numBox.style.background = "url(" + imgname + ")";
                }else if(num==1){
                    var imgname="img/one.png"
                    that.view.numBox.style.background = "url(" + imgname + ")";
                }else if(num==0){
                    clearInterval(t);
                    that.view.numBox.style.display = "none";
                    if(nextcallback){
                        nextcallback();
                    }
                }

                num--

            },1000)
        }
    }

}

// 语法糖

