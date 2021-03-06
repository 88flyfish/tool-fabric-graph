define(['graphPathConfig'],function (graphPathConfig) {
     /************绘制正方体************/ 
     var Vertex = function(x, y, z) {
        this.x = parseFloat(x);
        this.y = parseFloat(y);
        this.z = parseFloat(z);
    };
    
    var Vertex2D = function(x, y) {
        this.x = parseFloat(x);
        this.y = parseFloat(y);
    };
    
    var Cube = function(center, side) {
        // Generate the vertices
        var d = side / 2;
        this.vertices = [
            new Vertex(center.x - d, center.y - d, center.z + d),
            new Vertex(center.x - d, center.y - d, center.z - d),
            new Vertex(center.x + d, center.y - d, center.z - d),
            new Vertex(center.x + d, center.y - d, center.z + d),
            new Vertex(center.x + d, center.y + d, center.z + d),
            new Vertex(center.x + d, center.y + d, center.z - d),
            new Vertex(center.x - d, center.y + d, center.z - d),
            new Vertex(center.x - d, center.y + d, center.z + d)
        ];
    
        // Generate the faces
        this.faces = [
            [this.vertices[0], this.vertices[1], this.vertices[2], this.vertices[3]],
            [this.vertices[3], this.vertices[2], this.vertices[5], this.vertices[4]],
            [this.vertices[4], this.vertices[5], this.vertices[6], this.vertices[7]],
            [this.vertices[7], this.vertices[6], this.vertices[1], this.vertices[0]],
            [this.vertices[7], this.vertices[0], this.vertices[3], this.vertices[4]],
            [this.vertices[1], this.vertices[6], this.vertices[5], this.vertices[2]]
        ];
    };
    
    function project(M) {
        return new Vertex2D(M.x, M.z);
    }
    
    function render(objects, dx, dy) {
        let pathStrArr = []
        for (var i = 0, n_obj = objects.length; i < n_obj; ++i) {
            // For each face
            for (var j = 0, n_faces = objects[i].faces.length; j < n_faces; ++j) {
                let pathStr = ''
                var face = objects[i].faces[j];
                // Draw the first vertex
                var P = project(face[0]);
                pathStr += `M ${P.x + dx} ${-P.y + dy}`      
                for (var k = 1, n_vertices = face.length; k < n_vertices; ++k) {
                    P = project(face[k]);
                    if(k===n_vertices-1){
                        pathStr += ` L ${P.x + dx} ${-P.y + dy} z`
                    }else{
                        pathStr += ` L ${P.x + dx} ${-P.y + dy}`
                    }
                }
                pathStrArr.push(pathStr)
            }
        }
        return pathStrArr
    }
    var dx = 300 , dy = 200, cube_bianchang = 120 //cube_bianchang边长
    var cube_center = new Vertex(0, 11 * dy / 10, 0);
    var cube = new Cube(cube_center, cube_bianchang); 
    var objects = [cube];

    var list
    var mousedown = false;
    var mx = 0;
    var my = 0;
    //防抖
    function debounce(method, delay) {
        var timer = null;
        return function () {
            var self = this,
                args = arguments;
            timer && clearTimeout(timer);
            timer = setTimeout(function () {
                method.apply(self, args);
            }, delay);
        }
    }
    function rotate(M, center, theta, phi) {
        var ct = Math.cos(theta);
        var st = Math.sin(theta);
        var cp = Math.cos(phi);
        var sp = Math.sin(phi);
        // Rotation
        var x = M.x - center.x;
        var y = M.y - center.y;
        var z = M.z - center.z;

        M.x = ct * x - st * cp * y + st * sp * z + center.x;
        M.y = st * x + ct * cp * y - ct * sp * z + center.y;
        M.z = sp * y + cp * z + center.z;
    }

    // Initialize the movement
    function initMove(evt) {
        mousedown = true;
        mx = evt.clientX;
        my = evt.clientY;
    }

    function move(evt) {
        if (mousedown) {
            var theta = (evt.clientX - mx) * Math.PI / 360;
            var phi = (evt.clientY - my) * Math.PI / 180;
            for (var i = 0; i < 8; ++i){
                rotate(cube.vertices[i], cube_center, theta, phi);
            }
            mx = evt.clientX;
            my = evt.clientY;
            list = render(objects, dx, dy);
        }
    }
   /************绘制正方体************/ 
   /************绘制球体************/ 
   //    var canvas = document.getElementById("cas"),
   //    ctx = canvas.getContext("2d"),
   var $vm,
   vpx =300,
   vpy =200,
   Radius = 150,                       //整体大球的坐标
   LayerBallNum = 360 / 15,        // 横向
   LayerIntervalUp = 360 / 15;     //
   balls = [],
   circles = [],
   angleX = Math.PI/100,
   angleY = Math.PI/100;

   window.addEventListener("mousemove" , function(event){
       var x = event.clientX  -200- vpx;
       var y = event.clientY  -150- vpy;

       angleY = -x*0.0001;
       angleX = -y*0.0001;
   });

   var Animation = function(){
    //    this.init();
   };

   Animation.prototype = {
       isrunning: false,
       init: function () {
           var num = LayerIntervalUp / 2;    
           for (var i = 0; i <=num; i++) {
               var l = new layer(i, 1);
               l.draw();
               var l = new layer(i, -1);
               l.draw();
           }
       },
       start:function(){
           this.isrunning = true;
           animate();
       },
       stop:function(){
           this.isrunning = false;
       }
   }

   function animate(){
    //    ctx.clearRect(0,0,canvas.width , canvas.height);
       rotateX();
       rotateY();
       rotateZ();
       for(var i=0;i<balls.length;i++){
           balls[i].paint();
       }
       if(animation.isrunning) {
           if("requestAnimationFrame" in window){
               requestAnimationFrame(animate);
           }
           else if("webkitRequestAnimationFrame" in window){
               webkitRequestAnimationFrame(animate);
           }
           else if("msRequestAnimationFrame" in window){
               msRequestAnimationFrame(animate);
           }
           else if("mozRequestAnimationFrame" in window){
               mozRequestAnimationFrame(animate);
           }
       }
   }


   var layer = function (num, up) {
       this.radius = Math.sqrt(Math.pow(Radius,2) - Math.pow(Radius * Math.cos(num * Math.PI * 2 / LayerBallNum), 2))
       this.x = 0;
       this.y = 0;
       this.up = up;
   }

   layer.prototype = {
       setBalls: function (radius) {
           for(var i=0; i<LayerBallNum; i++){
               var angle =  2 * Math.PI / LayerBallNum * i;
               var b = new ball(radius * Math.cos(angle), radius * Math.sin(angle), this.up * Math.sqrt(Math.pow(Radius, 2) - Math.pow(radius, 2)), 1.5);
               var circle = b.paint();
               balls.push(b);
               circles.push(circle)
           }
       },
       draw: function () {
            //    ctx.beginPath();
            //    ctx.arc(vpx, vpy, this.radius , 0, 2*Math.PI, true);
            //    ctx.strokeStyle = "#00F";
            //    ctx.stroke();
            let options = {
                fill: '#75BAFF',
                strokeWidth: 2,
                stroke: 'rgba(255,0,0,1)',
                angle:  0,
                opacity: 0.6,
                // originX : 'center',
                // originY : 'center',
            };
            console.log($vm,912)
            // $vm.canvas.add(new fabric['Circle'](options));
            this.setBalls(this.radius);
            var group = new fabric.Group(circles)
            group.set(options)
            console.log(circles,16)
            if(circles.length === 624){
                $vm.canvas.add(group)
            }
       }
   }

   var ball = function(x , y , z , r){
       this.x = x;
       this.y = y;
       this.z = z;
       this.r = r;
       this.width = 3*r;
   }

   ball.prototype = {
       paint:function(ctx){
           const _this = this;
           var fl = 450 //焦距
        //    ctx.save();
        //    ctx.beginPath();
           var scale = fl / (fl - this.z);
           var alpha = (this.z+Radius)/(2*Radius);
        //    ctx.arc(vpx + this.x, vpy + this.y, this.r*scale , 0 , 2*Math.PI , true);
        //    ctx.fillStyle = "rgba(3,255,255,"+(alpha+0.5)+")";
        //    ctx.fill();
        //    ctx.restore();
            let options = {
                radius: _this.r*scale,
                // fill: 'red',
                // originX: 'center', 
                // originY: 'center',
                opacity: alpha+0.5
            }
           var circle = new fabric['Circle'](options);
           return circle
           //   console.log($vm.canvas)
        //    $vm.canvas.add(circle)
       }
   }

   function rotateX(){
       var cos = Math.cos(angleX);
       var sin = Math.sin(angleX);
       for(var i=0;i<balls.length;i++){
           var y1 = balls[i].y * cos - balls[i].z * sin;
           var z1 = balls[i].z * cos + balls[i].y * sin;
           balls[i].y = y1;
           balls[i].z = z1;
       }
   }

   function rotateY(){
       var cos = Math.cos(angleY);
       var sin = Math.sin(angleY);
       for(var i=0;i<balls.length;i++){
           var x1 = balls[i].x * cos - balls[i].z * sin;
           var z1 = balls[i].z * cos + balls[i].x * sin;
           balls[i].x = x1;
           balls[i].z = z1;
       }
   }

   function rotateZ(){
       var cos = Math.cos(angleY);
       var sin = Math.sin(angleY);
       for(var i=0;i<balls.length;i++){
           var x1 = balls[i].x * cos - balls[i].y * sin;
           var y1 = balls[i].y * cos + balls[i].x * sin;
           balls[i].x = x1;
           balls[i].y = y1;
       }
   }

   var animation = new Animation();
    //    animation.start();
    //    document.getElementById("controlBtn").onclick = function(){
    //        this.innerText === "开始" ? this.innerText="停止" : this.innerText="开始";
    //        this.innerText === "开始" ? animation.stop() : animation.start();;
    //    }
   /************绘制球体************/ 
    return {
        methods: {
            init() {
                const _this = this;
                $vm = this;
                this.canvas = new fabric.Canvas('canvas');
                this.canvas.setHeight(this.canvasHeight);
                this.canvas.setWidth(this.canvasWidth);

                animation.init()
                vpx = this.canvasWidth/2,
                vpy = this.canvasHeight/2,
                // canvas.selections=false//取消框选
                // canvas.selection = false;
                // this.canvas.rotationCursor = "pointer",//改变旋转时鼠标样式
                this.canvas.defaultCursor = 'move';
                this.canvas.hoverCursor = 'pointer';
                this.canvas.on({
                    'mouse:down': function (options) {
                        initMove(options.e)
                        _this.isShowColorPick = false
                        // graphPathConfig.initMove(options.e)
                        if (options.target&&options.target.stroke!==_this.canvasBgLineColor) {
                            options.target.set({
                                opacity: 0.5
                            });
                            _this.canvas.renderAll();
                        };
                    },
                    'mouse:move':function(options){
                        
                    },
                    'mouse:up': function (options) {
                        var select = _this.canvas.getActiveObject()
                        if(select){
                            _this.isShowOperation = true;
                            _this.positM(options.target.left+options.target.width*options.target.scaleX/2+25,options.target.top-options.target.height*options.target.scaleY/2);
                            _this.operation = options.target
                            options.target.set({
                                opacity: 0.7
                            });
                            _this.canvas.renderAll();
                            //显示影藏颜色拾取功能 图片默认不显示
                            if(select._element && select._element.className === 'canvas-img') {
                                _this.isShowColorPickerTool = false
                            }else{
                                _this.isShowColorPickerTool = true
                            }
                        }else{
                            _this.isShowOperation = false;
                            _this.isShowColorPick = false
                        }
                    },
                    'object:moved': function (e) {
                        e.target.set({
                            opacity: 0.5
                        });
                    },
                    'object:selected': function (e) {
                        
                    },
                    'object:modified': function(e) {
                       _this.isShowOperation = false
                    },
                    'object:rotating':function(options){
                        if(options.transform&&options.target.graphName==='正方体'){
                            move(options.e)
                            //删除上一次生成的图形
                             _this.canvas.remove(_this.lastItem);
                             debounce(_this.addPath('正方体'),200) 
                            _this.canvas.renderAll();
                        }
                    },
                    'object:scaling':function(e){
                        
                    },
                    'mouse:over': function (e) {
                        if (e.target&&e.target.stroke!==_this.canvasBgLineColor) {
                            //存储当前操作项的颜色
                            _this.operationColor = e.target.fill
                            e.target.set({
                                // opacity: 0.4
                            })
                            _this.canvas.renderAll();
                        }
                    },
                    'mouse:out': function (e) {
                        if (e.target) {
                            e.target.set({
                                'fill': _this.operationColor,
                            })
                            // _this.canvas.renderAll();
                        }
                    }
                });
            },
            chooseGraph(val) {
                this.operationGraph = val;
            },
            paste(_clipboard){
                // clone again, so you can do multiple copies.
                let canvas = this.canvas;
                _clipboard.clone(function(clonedObj) {
                    canvas.discardActiveObject();
                    clonedObj.set({
                        left: clonedObj.left + 20,
                        top: clonedObj.top + 20,
                        evented: true,
                    });
                    if (clonedObj.type === 'activeSelection') {
                        // active selection needs a reference to the canvas.
                        clonedObj.canvas = canvas;
                        clonedObj.forEachObject(function(obj) {
                            canvas.add(obj);
                        });
                        // this should solve the unselectability
                        clonedObj.setCoords();
                    } else {
                        canvas.add(clonedObj);
                    }
                    _clipboard.top += 20;
                    _clipboard.left += 20;
                    canvas.setActiveObject(clonedObj);
                    // canvas.requestRenderAll();
                });
            },
            clone(){
                var _this = this;
                this.canvas.getActiveObject().clone(function(cloned){
                     _this.paste(cloned);
                 })
            },
            rotate() {
                if (!this.operation) return
                if (this.operation.angle === 360) {
                    this.operation.angle = 0
                }
                this.operation.angle += 30;
                this.canvas.renderAll();
            },
            fill(val) {
                if (!this.operation) return
                if(val){
                    this.operation.set({
                        'fill': val
                    })
                }else{
                    this.operation.set({
                        'fill': this.fillColor
                    })
                }
                this.canvas.renderAll();
            },
            //切换显示网格背景
            toggleBg(e) {
                const opacity = this.isShowFg?1:0
                this.pathXArr.forEach(function (i) {
                    i.set('opacity', opacity)
                })
                this.pathYArr.forEach(function (i) {
                    i.set('opacity', opacity)
                })
                this.canvas.renderAll();
            },
            deleteObj() {
                this.canvas.remove(this.canvas.getActiveObject());
                this.isShowOperation = false;
            },
            // 图片上传时触发事件
            addImg: function (e) {
                const _this = this;
                e.stopPropagation();
                var img = e.target
                var oFile = e.target.files[0]
                var fr = new FileReader();
                var rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;
                if (!rFilter.test(oFile.type)) {
                    // errorFun('图片格式不正确，请重新添加图片')
                    return;
                };
                fr.readAsDataURL(oFile);
                fr.onload = function (FREvent) {
                    _this.dealImage(FREvent.target.result, {
                        maxWidth: 200
                    }, function (base,w,h) {
                        fabric.Image.fromURL(base, function (img) {
                            img.set({
                                top: _this.canvasHeight/2 ,
                                left: _this.canvasWidth/2 ,
                                originX : 'center',
                                originY : 'center'
                            })
                            _this.canvas.add(img);
                        })
                    })
                }
            },
            /*压缩图片*/
            dealImage(path, obj, callback) {
                var img = new Image();
                img.src = path;
                img.onload = function () {
                    var that = this;
                    // 默认按比例压缩
                    var w = that.width,
                        h = that.height,
                        scale = w / h;
                    w = obj.width || w<250?w:250; //图片最大宽度设置为250
                    h = obj.height || (w / scale);
                    var quality = 0.7; // 默认图片质量为0.7
                    //生成canvas
                    var canvas = document.createElement('canvas');
                    var ctx = canvas.getContext('2d');
                    // 创建属性节点
                    var anw = document.createAttribute("width");
                    anw.nodeValue = w;
                    var anh = document.createAttribute("height");
                    anh.nodeValue = h;
                    canvas.setAttributeNode(anw);
                    canvas.setAttributeNode(anh);
                    ctx.drawImage(that, 0, 0, w, h);
                    // 图像质量
                    if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
                        quality = obj.quality;
                    }
                    // quality值越小，所绘制出的图像越模糊
                    var type = 'image/png';
                    var base64 = canvas.toDataURL(type, quality);
                    // 回调函数返回base64的值
                    callback(base64,w,h);
                }
            },
            addPath(type, color, angle) {
                let options = {
                    top: this.canvasHeight/2 ,
                    left: this.canvasWidth/2 ,
                    fill: color ? color : '#75BAFF',
                    strokeWidth: 2,
                    stroke: 'rgba(0,0,0,1)',
                    angle: angle ? angle : 0,
                    clipPath: null,
                    opacity: 0.6,
                    originX : 'center',
                    originY : 'center'
                };
                if (type === '圆形') {
                    options.radius = 55;
                    console.log(11,new fabric['Circle'](options))
                    this.canvas.add(new fabric['Circle'](options));
                }else if(type === '椭圆'){
                    options.radius = 65;
                    options.scaleY = 0.55;
                    this.canvas.add(new fabric['Circle'](options));
                }else if(type === '半圆'){
                    options.startAngle = 90;
                    this.canvas.add(new fabric['Circle'](options));
                }else if(type === '正方体'){
                    let options = {
                        fill: color ? color : '#75BAFF',
                        strokeWidth: 2,
                        stroke: 'rgba(0,0,0,1)',
                        angle: angle ? angle : 0,
                        opacity: 0.6,
                        graphName:'正方体' //自定义属性
                    };
                    var tmp = []
                    // var list = JSON.parse(this.graphPathConfig[type])
                     list = render(objects, dx, dy)
                    //初次渲染变化倾斜角
                    if(!this.lastItem){
                        initMove({clientX:536,clientY:118})
                        move({clientX:516,clientY:160})
                    }
                    list.forEach((item,index)=>{
                        var path = new fabric.Path(item,options);
                        tmp.push(path)
                    })
                    var group = new fabric.Group(tmp)
                    group.set(options)
                    this.lastItem = group
                    this.canvas.add(group)
                }else if(type === '球体'){

                }else {
                    //判断传过来的数据类型
                    if(!(this.graphPathConfig[type] instanceof Array)){
                        var path = new fabric.Path(this.graphPathConfig[type]);
                        path.set(options)
                        this.canvas.add(path)
                    }
                }
            },
            drawGrid(step) {
                for (var i = step; i < this.canvasHeight; i += step) {
                    const pathX = new fabric.Line([0, i, this.canvasWidth, i], {
                        strokeWidth: (i % (5 * step)) === 0 ? 2 : 1, //线宽
                        stroke: this.canvasBgLineColor, //线的颜色
                        selectable: false
                    });
                    this.pathXArr.push(pathX)
                    this.canvas.add(pathX)
                }
                for (var i = step; i < this.canvasWidth; i += step) {
                    const pathY = new fabric.Line([i, 0, i, this.canvasHeight], {
                        strokeWidth: (i % (5 * step)) === 0 ? 2 : 1, 
                        stroke: this.canvasBgLineColor, 
                        selectable: false
                    });
                    this.pathYArr.push(pathY)
                    this.canvas.add(pathY)
                }
            },
            positM(x,y){
                var operationBox = document.querySelector('.operationBox')
                operationBox.style.top = y+'px'
                operationBox.style.left= x+'px';
              }
        },
        watch:{
            // 'operation':{
            //     handler:function(newVal){
            //         if(newVal){
            //             this.bannerConfig.forEach(item =>{
            //                 item.isShowMore = false
            //             })
            //         }
            //     },
            //     deep:true
            // }
        }
    }
})