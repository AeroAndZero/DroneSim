import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';

export default class Drone{
    
    constructor(scene){
        let modelLoader = new GLTFLoader();
        modelLoader.load('res/DJI Mini 3.glb', function(gltf){
            scene.add(gltf.scene);
            
            self.model = gltf.scene;
            self.weightG = 248;

        }, undefined, function(error){
            console.error(error);
        });
    }

    getModel(){
        return self.model;
    }
}