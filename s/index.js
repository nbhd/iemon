var THREE = require('threejs');

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
        var material = new THREE.MeshPhongMaterial({color: 0xff0000});
        var mesh = new THREE.Mesh(geometry, material);

        mesh.position.x  = i * 60;
        scene.add(mesh);
    }

    var speed = 0.3;
    !function renderLoop() {
        requestAnimationFrame(renderLoop);

        // debugger
        mesh.rotation.set(
            0,
            mesh.rotation.y + speed,
            mesh.rotation.z + speed
        );

        // speed = speed * 0.99;
        renderer.render(scene, camera);
    }();
};

window.addEventListener('DOMContentLoaded', main, false);

