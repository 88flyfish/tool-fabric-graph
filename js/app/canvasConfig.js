define(['graphPathConfig'],function (graphPathConfig) {
    return {
        methods: {
            init() {
                const _this = this;
                this.canvas = new fabric.Canvas('canvas');
                this.canvas.setHeight(this.canvasHeight);
                this.canvas.setWidth(this.canvasWidth);
                // canvas.selections=false//取消框选
                // canvas.selection = false;
                // this.canvas.rotationCursor = "pointer",//改变旋转时鼠标样式
                this.canvas.defaultCursor = 'move';
                this.canvas.hoverCursor = 'pointer';
                $(window).on('resize', function () {
                    this.canvas.setHeight($(window).height());
                    this.canvas.setWidth($(window).width());
                });
                this.canvas.on({
                    'mouse:down': function (options) {
                        _this.isShowColorPick = false
                        graphPathConfig.initMove(options.e)
                        if (options.target&&options.target.stroke!==_this.canvasBgLineColor) {
                            options.target.set({
                                opacity: 0.5
                            });
                            _this.canvas.renderAll();
                        };
                    },
                    'mouse:move':function(options){
                        if(options.transform){
                            graphPathConfig.move(options.e)
                            console.log(options,graphPathConfig.move(options.e)) 
                            _this.canvas.renderAll();
                        }
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
            clip() {
                const clipPath = new fabric.Path('M 0 0 L 50 50 L 0 50 z');
                this.operation.set({
                    'fill': 'yellow'
                })
                this.operation.clipPath = clipPath
                this.canvas.renderAll();
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
                    originY : 'center',
                };
                if (type === '圆形') {
                    options.radius = 55;
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
                    };
                    var tmp = []
                    var list = JSON.parse(this.graphPathConfig[type])
                    list.forEach((item,index)=>{
                        var path = new fabric.Path(item,options);
                        tmp.push(path)
                    })
                    var group = new fabric.Group(tmp)
                    group.set(options)
                    this.canvas.add(group)
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