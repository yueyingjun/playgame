class game{
    constructor(){
        this.seed="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        this.resource=[
            "img/bg.jpeg","img/start.png","img/startActive.png","img/cloud1.png","img/one.png","img/two.png","img/three.png","img/tree1.png"
        ];
        for(var i=0;i<this.seed.length;i++){
            this.resource.push("img/A_Z/"+this.seed[i]+".png")
        }

        this.initLetterNum=5;
        this.randArr=[];

        this.speed=5;
        this.life=10;
        this.score=0;

        this.letterArr=[];
        this.view=new view()
    }
    run(){
        // 1. 创建进入条，等待资源的加载
        // 2. 单线程异步机制
        this.view.createProgress()

        var that=this;
        loadImgs(this.resource,function (num,total) {
            that.view.progressBar.style.width=num/total*100+"%"
        },function () {
            // 1. 隐藏进度条
            that.view.progressBar.parentElement.style.display="none";
            //2. 遮罩隐藏
            that.view.bgMask.style.display="none";

            //3. 创建开始界面
            that.view.startView();

            // 4. 点击按钮开始

            that.gameStart(function () {
               // 开始游戏
                // 1. 创建字母
                that.createLetter()
                // 2. 字母坠落

                setInterval(function () {

                    for(var i=0;i<that.letterArr.length;i++){

                            that.letterArr[i].style.top=that.letterArr[i].offsetTop+that.speed+"px";

                            if(that.letterArr[i].offsetTop>document.documentElement.clientHeight){

                                document.body.removeChild(that.letterArr[i]);
                                that.letterArr.splice(i,1);

                                that.createLetter(1)
                                console.log("生命值:"+(--that.life))
                                if(that.life){

                                }

                            }


                    }

                },40)



                //  键盘按下

                document.onkeydown=function (ev) {
                   var letter=String.fromCharCode(ev.keyCode);
                   for(var i=0;i<that.letterArr.length;i++){
                       if(that.letterArr[i].letter==letter){
                           document.body.removeChild(that.letterArr[i]);
                           that.letterArr.splice(i,1);
                           that.createLetter(1)
                           console.log("分数:"+(++that.score));
                           break;
                       }
                   }
                    
                }


            })


        })

    }

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

