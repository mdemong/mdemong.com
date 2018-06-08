var camera, scene, renderer;
var farClip = 100;
var density = 10;
var speed = 0.2;
var spread = 500;

init();
animate();

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, farClip);
    camera.position.set(0, 0, 0);
    for (let i = 0; i < farClip; i += speed) {
        addMultStars(-i);
    }

    renderer = new THREE.WebGLRenderer({ antialias: true, canvas: jsCanvas });
    renderer.setSize(window.innerWidth, window.innerHeight);

    window.addEventListener("resize", onWindowResize, false);
}

function animate() {
    requestAnimationFrame(animate);
    addMultStars(camera.position.z - farClip);
    camera.translateZ(-speed);
    renderer.render(scene, camera);
    removeLayer();
}

function addMultStars(posZ) {
    for (let i = 0; i < density; i++) {
        addStar(posZ);
    }
}

function addStar(posZ) {
    var starGeom = new THREE.SphereGeometry(0.1);
    var material = new THREE.MeshBasicMaterial;
    var star = new THREE.Mesh(starGeom, material);

    posX = Math.random() * spread - (spread / 2);
    posY = Math.random() * spread - (spread / 2);
    star.position.set(posX, posY, posZ);
    scene.add(star);
}

function removeLayer() {
    for (let i = 0; i < density; i++) {
        scene.remove(scene.children[0]);
    }
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}
