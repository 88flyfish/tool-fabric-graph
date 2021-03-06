/**
 * @Description: 图形拼接 
 * @readMe:建议不直接修改经过 gulp编译的*.edit.js文件
 * @Author: zhaofuding
 * @Date: 2019-04-26 14:00
 * @LastEditors: 
 * @LastEditTime: 
 */

$(function () {
    require.config({
        paths: {
            "imgConfig": "./imgConfig",
            "canvasConfig": "./canvasConfig",
            "graphPathConfig": "./graphPathConfig",
        }
    });
    require(['imgConfig', 'canvasConfig','graphPathConfig'], function (res, canvasConfig,graphPathConfig) {
        // vue实例
        let vm = new Vue({
            el: "#vm",
            mixins: [canvasConfig],
            data: {
                canvas: null,
                canvasWidth:800,
                canvasHeight:400,
                lastItem:null,
                canvasBgLineColor:'#ddd',
                isShowFg:'1',
                isShowOperation:false,
                operation: null,
                operationColor: null,
                fillColor:null,
                imgConfig: res.imgConfig,
                graphPathConfig:graphPathConfig,
                isShowColorPickerTool:true,
                isShowColorPick:false,
                pathXArr: [],
                pathYArr: [],
                colorPickArr:['#f6b37f','#C00000','#FF0000','#FFC000','#FFFF00','#92D050','#0FD9D2','#00B050','#00B0F0','#0070C0','#795548','#000000'],
                bannerConfig: [{
                    isShowMore: false,
                    title: '平行四边形',
                    top: "-110px",
                    width: "175px"
                }, {
                    isShowMore: false,
                    title: '三角形',
                    top: "-160px",
                    width: "200px"
                }, {
                    isShowMore: false,
                    title: '梯形',
                    top: "-110px",
                    width: "140px"
                }, {
                    isShowMore: false,
                    title: '圆形',
                    top: "-110px",
                    width: "130px"
                }, {
                    isShowMore: false,
                    title: '不规则图形',
                    top: "-210px",
                    width: "175px"
                }, {
                    isShowMore: false,
                    title: '立体图形',
                    top: "-160px",
                    width: "150px"
                }],
                operationGraph: ''
            },
            mounted() {
                // $.getJSON("data/main.json", function (data, status) {

                // })
                $('.colorPicker').colorPicker({
                    doRender: false,  //'selector', // render color and bgColor of input field
                    renderCallback:function(...res){
                        vm.fillColor  = res[0]._css.backgroundColor
                        vm.fill()
                    }
                })
                this.init()
                this.drawGrid(10);
                this.canvas.renderAll();
            },
            methods: {
                toggleMore(idx) {
                    this.bannerConfig.forEach(function (item, index) {
                        if (idx !== index) item.isShowMore = false;
                    });
                    this.operationGraph = ''
                    this.bannerConfig[idx].isShowMore = !this.bannerConfig[idx].isShowMore;
                },
                toggleColorBox(){
                    this.isShowColorPick = !this.isShowColorPick
                },
                activeGraph(val) {
                    return this.operationGraph === val ? true : false
                },
                //预览保存按钮
                output() {
                    var result = {};
                    return JSON.stringify(result);
                },
                save() {
                    bounds.ViewModel.SaveInformation(this.output());
                },
                preview() {
                    bounds.ViewModel.PreviewInformation(this.output());
                },
                //显示上传等待信息
                showLoading(str) {
                    $('.succ').html(str);
                    $('.succlay').fadeIn();
                },
                //关闭上传等待信息
                closeLoading() {
                    $('.succlay').fadeOut();
                },
            },
            watch: {
                
            }
        });
    });

    //显示错误信息
    function errorFun(str) {
        $('.error-txt').html(str);
        $('.error-txt').fadeIn();
        setTimeout(function () {
            $('.error-txt').fadeOut();
        }, 3000);
    }


    fabric.Object.prototype.transparentCorners = false;

});