define(['canvasConfig'],
    function(canvasConfig){
        // 星形 计算配置中间量
        const R = 50/Math.sin(Math.PI*72/180) ,
                H = R*Math.cos(Math.PI*36/180),
                L = R*Math.sin(Math.PI*36/180),
                r = H-L*Math.tan(Math.PI*36/180),
                h = r*Math.cos(Math.PI*36/180),
                l = r*Math.sin(Math.PI*36/180)
        return {
            平行四边形A : 'M 25 0 L 125 0 L 100 80 L 0 80 z',
            平行四边形B : 'M 0 0 L 100 0 L 125 80 L 25 80 z',
            正方形 : 'M 0 0 L 100 0 L 100 100 L 0 100 z',
            矩形 : 'M 0 0 L 120 0 L 120 80 L 0 80 z',
            等腰直角三角形 : 'M 60 0 L 120 60 L 0 60 z',
            等腰三角形 : 'M 75 0 L 150 55 L 0 55 z',
            等边三角形 : `M 50 0 L 100 ${50/Math.sin(Math.PI/6)} L 0 ${50/Math.sin(Math.PI/6)} z`,
            钝角三角形 : 'M 100 0 L 150 60 L 0 60 z',
            直角三角形 : 'M 0 0 L 70 100 L 0 100 z',
            锐角三角形 : 'M 60 0 L 100 70 L 0 70 z',
            等腰梯形 : 'M 25 0 L 100 0 L 125 100 L 0 100 z',
            普通梯形 : 'M 45 0 L 110 0 L 125 100 L 0 100 z',
            直角梯形 : 'M 0 0 L 80 0 L 125 100 L 0 100 z',
            不规则图形A : 'M 50 0 L 100 30 L 100 100 L 0 100 L 0 30 z',
            不规则图形B : 'M 0 0 L 50 30 L 100 0 L 100 100 L 0 100 z',
            不规则图形C : 'M 0 0 L 80 0 L 125 100 L 0 100 z',
            不规则图形D : `M 50 0 L ${50+50*Math.tan(Math.PI*36/180)*Math.tan(Math.PI*18/180)} ${50*Math.tan(Math.PI*36/180)} L 100 ${50*Math.tan(Math.PI*36/180)} L ${(R+r)*Math.cos(Math.PI*18/180)} ${(R+r)*Math.sin(Math.PI*18/180)+50*Math.tan(Math.PI*36/180)} L ${50+L} ${R+H} L 50 ${R+r}} L ${50-L} ${R+H} L ${(50-l)*Math.cos(Math.PI*36/180)} ${(50-l)*Math.sin(Math.PI*36/180)+50*Math.tan(Math.PI*36/180)} L 0 ${50*Math.tan(Math.PI*36/180)} L ${50-l} ${50*Math.tan(Math.PI*36/180)} z`,
            正方体1 : JSON.stringify(['M 76.25751881584311 85.59804227154068 L 46.11771742800306 261.3618301332373 L 201.57097739246018 225.8316590044201 L 231.71077878030036 50.067871142723504 z',' M 231.71077878030036 50.067871142723504 L 201.57097739246018 225.8316590044201 L 323.7424811841568 314.40195772845937 L 353.88228257199694 138.63816986676272 z',' M 353.88228257199694 138.63816986676272 L 323.7424811841568 314.40195772845937 L 168.28922121969964 349.93212885727644 L 198.42902260753976 174.16834099557985 z', 'M 198.42902260753976 174.16834099557985 L 168.28922121969964 349.93212885727644 L 46.11771742800306 261.3618301332373 L 76.25751881584311 85.59804227154068 z ','M 198.42902260753976 174.16834099557985 L 76.25751881584311 85.59804227154068 L 231.71077878030036 50.067871142723504 L 353.88228257199694 138.63816986676272 z ','M 46.11771742800306 261.3618301332373 L 168.28922121969964 349.93212885727644 L 323.7424811841568 314.40195772845937 L 201.57097739246018 225.8316590044201 z']),
            长方体 : ``,
            圆柱体 : ``,
            圆锥体 : ``
        }
    }
)