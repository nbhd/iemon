var THREE = require('threejs');
var $     = require('jquery');

var main = function () {

    var scene = new THREE.Scene();

    var width = window.innerWidth;
    var height = window.innerHeight;
    var fov = 60;
    var aspect = width / height;
    var near = 1;
    var far = 1000;
    var camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 0, 500);

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    document.body.appendChild(renderer.domElement);

    var directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(0, 0.7, 0.7);
    scene.add(directionalLight);

    for (var i = 0; i < 1; i++) {
        var geometry = new THREE.BoxGeometry(30, 30, 30);
        var material = new THREE.MeshPhongMaterial({color: Math.random() * 0xff0000});
        var mesh = new THREE.Mesh(geometry, material);

        mesh.position.x  = i * 60;
        scene.add(mesh);
    }

    var count = 5000;
    var particles = new THREE.Geometry();
    var material = new THREE.PointCloudMaterial({
        color: Math.random() * 0x00FFFF,
        size: 3
    });

    var particle;
    for (i = 0; i < count; i++) {
        particle = new THREE.Vector3();
        particle.x = Math.random() * 500 - 250;
        particle.y = Math.random() * 500 - 250;
        particle.z = Math.random() * 500 - 250;

        particles.vertices.push(particle);
    }

    var ps = new THREE.PointCloud(particles, material);
    scene.add(ps);

    $(document).mousemove(function (e) {
        e.preventDefault();

        mouseX = e.clientX - width / 2;
        mouseY = e.clientY - height / 2;
    });

    var speed = 0.3;
    var mouseX = 0;
    var mouseY = 0;
    !function renderLoop() {
        requestAnimationFrame(renderLoop);

        camera.position.x += ( mouseX - camera.position.x ) * 0.0005;
        camera.position.y += ( - mouseY - camera.position.y ) * 0.0005;

        // debugger
        mesh.rotation.set(
            0,
            mesh.rotation.y + speed,
            mesh.rotation.z + speed
        );

        mesh.position.x = (mouseX - mesh.position.x) - ((mouseX - mesh.position.x) * 0.05);
        mesh.position.y = (-mouseY - mesh.position.y) - ((-mouseY - mesh.position.y) * 0.05);

        var time = Date.now() * 0.00005;
        for (var i = 0; i < scene.children.length; i++) {
            var p = scene.children[i];
            if (p instanceof THREE.PointCloud) {
                p.rotation.y = time * ( i < 4 ? i + 1 : - ( i + 1 ) );
            }
        }

        // speed = speed * 0.99;
        renderer.render(scene, camera);
    }();

};

window.addEventListener('DOMContentLoaded', main, false);

