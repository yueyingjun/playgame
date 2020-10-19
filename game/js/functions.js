
/*
*   预加载图片的功能
* */
function loadImgs(imgarr,eachfun,endfun) {
    var num=0;
    for(var i=0;i<imgarr.length;i++){
        var im=new Image();
        im.onload=function () {
            num++;
            if(eachfun) {
                eachfun(num, imgarr.length);
            }
            if(num==imgarr.length){
                if(endfun) {
                    endfun();
                }
            }
        }
        im.src=imgarr[i];
    }
}

/*
* 
* 从数组里面获取指定个数的随机数
* */





function getRand(arr,num) {
    var newarr=[];
    for(var i=0;i<num;i++){

        var rand=arr[Math.floor(Math.random()*arr.length)];

        while (checkRand(newarr,rand)){
            rand=arr[Math.floor(Math.random()*arr.length)];
        }
        newarr.push(rand);
    }
    return newarr;
}

function checkRand(newarr,val) {
    for(var i=0;i<newarr.length;i++){
        if(newarr[i]==val){
            return true
        }
    }
    return false;
}

