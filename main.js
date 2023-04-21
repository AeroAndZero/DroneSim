import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Drone from './drone.js';

// setting up scene
const scene = new THREE.Scene();

// setting up renderer
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("main")});
renderer.setSize(window.innerWidth, window.innerHeight);
let renderList = [];

/*
*       MAIN CODE
*/

// lights, camera..
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
camera.position.set(0,2,5);
camera.rotateOnAxis(new THREE.Vector3(1,0,0), -0.3);

const ambientLight = new THREE.AmbientLight( 0xFFFFFF,1.6 );
renderList.push( ambientLight );

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(1,2,1);
renderList.push(pointLight);

const hdriTex = new THREE.TextureLoader().load( 'res/kloppenheim_05_puresky.webp' );
const skybox = new THREE.Mesh(new THREE.SphereGeometry(900, 32, 32), new THREE.MeshBasicMaterial({color: 0xffffff, side: THREE.DoubleSide, map: hdriTex}));
renderList.push(skybox);

const lightHelper = new THREE.PointLightHelper(pointLight, 0.2);
renderList.push(lightHelper);

const gridHelper = new THREE.GridHelper(20,40);
renderList.push(gridHelper);

// ...action!
const controls = new OrbitControls( camera, renderer.domElement );

const drone = new Drone(scene);

// Adding elements to the scene
renderList.forEach((obj) => {
    scene.add(obj);
})

// Rendering every frame
let fps = 0;
function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    fps+=1;
    
}
animate();

// FPS counter
window.setInterval(() => {document.getElementById("fpscounter").innerText = "FPS: " + fps; fps=0},1000)