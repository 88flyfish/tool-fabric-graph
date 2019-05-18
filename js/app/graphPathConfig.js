define(['canvasConfig'],
    function(canvasConfig){
        // 星形 计算配置中间量
        const R = 50/Math.sin(Math.PI*72/180) ,
                H = R*Math.cos(Math.PI*36/180),
                L = R*Math.sin(Math.PI*36/180),
                r = H-L*Math.tan(Math.PI*36/180),
                h = r*Math.cos(Math.PI*36/180),
                l = r*Math.sin(Math.PI*36/180)
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
            // For each object
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
    
        // First render
        var 正方体 = JSON.stringify(render(objects, dx, dy));
                    
        var mousedown = false;
        var mx = 0;
        var my = 0;
        document.getElementById('canvas').addEventListener('mousedown', initMove);
        document.addEventListener('mousemove', move);
        document.addEventListener('mouseup', stopMove);
        // Rotate a vertice
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
                正方体 = render(objects, dx, dy);
                return render(objects, dx, dy);
            }
        }

        function stopMove() {
            mousedown = false;
            autorotate_timeout = setTimeout(autorotate, 2000);
        }

        function autorotate() {
            for (var i = 0; i < 8; ++i)
                rotate(cube.vertices[i], cube_center, -Math.PI / 720, Math.PI / 720);
                render(objects, dx, dy);
        }                    
       /************绘制正方体************/ 
       
        // console.log(正方体,11)
        return {
            initMove,
            move,
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
            正方体 : 正方体,
            长方体 : ``,
            圆柱体 : ``,
            圆锥体 : ``
        }
    }
)