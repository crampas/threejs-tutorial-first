import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'



const scene = new THREE.Scene();
scene.background = 0xffffff
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 200;
camera.position.y = 10;
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

let orbitControls = new OrbitControls(camera, renderer.domElement);


const geometry = new THREE.BoxGeometry();
const parts = [];

for (let index = 0; index < 3000; index++) {
    const material = new THREE.MeshBasicMaterial({color: Math.random() * 0xffffff});
    const cube = new THREE.Mesh( geometry, material );
    
    cube.scale.x = Math.random() * 8.0 - 4.0;
    cube.scale.y = Math.random() * 8.0 - 4.0;
    cube.scale.z = Math.random() * 8.0 - 4.0;

    const angle = 2.0 * Math.PI * Math.random();
    const dist = 1.0 + 2.0 * Math.random();
    cube.userData = {
        velocity: {
            x: Math.sin(angle) * dist,
            y: 0.0,
            z: Math.cos(angle) * dist
        }
    };

    cube.position.x = Math.sin(angle) * dist;
    cube.position.z = Math.cos(angle) * dist;
    cube.position.x = 0;
    cube.position.z = 0;

    cube.rotation.x = Math.random() * 360.0;
    cube.rotation.y = Math.random() * 360.0;
    cube.rotation.z = Math.random() * 360.0;

    scene.add(cube);
    parts.push(cube);
}


let speed = 0.0;

let frame = 0;

function animate() {
    frame++;
    document.getElementById('info').innerText = frame;
    requestAnimationFrame( animate );
    if (frame < 50) {
        return;
    }

    for (let index = 0; index < parts.length; index++) {
        parts[index].position.x += parts[index].userData.velocity.x;
        parts[index].position.z += parts[index].userData.velocity.z;

        parts[index].rotation.x = parts[index].rotation.x + 0.05;
        parts[index].rotation.y = parts[index].rotation.y + 0.05;
        parts[index].rotation.z = parts[index].rotation.z + 0.05;

        if (Math.random() > 0.99 && frame > 200) {
            parts[index].visible = false;
        }
    }

    renderer.render( scene, camera );
}
// renderer.render( scene, camera );
animate();
