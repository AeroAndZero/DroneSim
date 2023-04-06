import * as THREE from 'three';

// setting up scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// setting up renderer
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("main")});
renderer.setSize(window.innerWidth, window.innerHeight);
let renderList = [];

// main code
let fps = 0; 

camera.position.set(0,2,5);
camera.rotateOnAxis(new THREE.Vector3(1,0,0), -0.3);

let cube = new THREE.Mesh(new THREE.BoxGeometry(1,1,1), new THREE.MeshStandardMaterial({color: 0x00ff00}))
cube.position.y += 0.5;
renderList.push(cube);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(1,2,1);
renderList.push(pointLight);

const lightHelper = new THREE.PointLightHelper(pointLight, 0.2);
renderList.push(lightHelper);

const gridHelper = new THREE.GridHelper(20,40);
renderList.push(gridHelper);

// adding to the render list
renderList.forEach((obj) => {
    scene.add(obj);
})

// animating
function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    fps+=1;
    
}
animate();

// FPS counter
window.setInterval(() => {document.getElementById("fpscounter").innerText = "FPS: " + fps; fps=0},1000)