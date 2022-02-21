import * as THREE from 'three';

// COMMENT OUT FOR TESTING, Jest *BUG*
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';
//

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const textureLoader = new THREE.TextureLoader();

// HOUSE OBJECT

let cubeMaterialArray: object[] = [];
let wallTexture: string = "./textures/wall.jpg";

cubeMaterialArray.push(new THREE.MeshStandardMaterial({
    map: textureLoader.load(wallTexture)
}));
cubeMaterialArray.push(new THREE.MeshStandardMaterial({
    map: textureLoader.load(wallTexture)
}));
cubeMaterialArray.push(new THREE.MeshBasicMaterial({
    color: 0xFEC009
})); // top
cubeMaterialArray.push(new THREE.MeshStandardMaterial({
    map: textureLoader.load(wallTexture)
}));
cubeMaterialArray.push(new THREE.MeshStandardMaterial({
    map: textureLoader.load(wallTexture)
}));
cubeMaterialArray.push(new THREE.MeshStandardMaterial({
    map: textureLoader.load(wallTexture)
}));

export let cubeDimensions: {
    length: number,
    height: number,
    depth: number;
} = {
    length: 20,
    height: 10,
    depth: 10
}

/* 

// For ridges I would probably have to create custom geometry and position matrix for size calculations..
const vertices = [
    -1, -1, 0,
    1, -1, 0,
    1, 1, 0,
    -1, 1, 0
];

const indices = [
    0, 1, 2, // first triangle
    2, 3, 0 // second triangle
];

const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
geometry.setIndex(indices);
const basic = new THREE.MeshBasicMaterial();
const cube = new THREE.Mesh(geometry, basic);
*/

const cubeGeometry = new THREE.BoxGeometry(cubeDimensions.length, cubeDimensions.height, cubeDimensions.depth);

// BoxGeometry params -> length, height, depth
const cube = new THREE.Mesh(cubeGeometry, cubeMaterialArray);

cube.position.set(0, 5, 0);
cube.castShadow = true;
cube.receiveShadow = false;
//

let renderer: any;
let orbitControls: any;
let dragControls: any;
//

// Fixed point for Sun/Moon rotation
const fixPoint = new THREE.Object3D();

// SUN OBJECT
const sunGeometry = new THREE.SphereGeometry(3.2, 30, 30);
const sunMaterial = new THREE.MeshBasicMaterial({
    //color: 0x00ff00,
    map: textureLoader.load("./textures/sun.jpeg")
});
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
sun.castShadow = false;
//

// MOON OBJECT
const moonGeometry = new THREE.SphereGeometry(1.8, 30, 30);
const moonMaterial = new THREE.MeshBasicMaterial({
    //color: 0x00ff00,
    map: textureLoader.load("./textures/moon.jpg")
});
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
moon.castShadow = false;
//

// LIGHT
const sunLight = new THREE.PointLight(0xF4E99B, 1.5, 0, 2); //sunlight
sunLight.castShadow = true;

const moonLight = new THREE.PointLight(0xF6EED5, 0.7, 0, 2); //moonlight
moonLight.castShadow = false;

const ambientLight = new THREE.AmbientLight(0x404040, 0.4); // soft white light
scene.add(ambientLight);

// HELPERS
//const gridHelper = new THREE.GridHelper(200, 50);
//scene.add(gridHelper);
//const sunLightHelper = new THREE.PointLightHelper(sunLight);
//scene.add(sunLightHelper);

// PLANE
let planeGeometry = new THREE.PlaneBufferGeometry(125, 125, 8, 8);
let planeMaterial = new THREE.MeshStandardMaterial({
    //color: 0x000000,
    map: textureLoader.load("./textures/grass.jpg"),
    side: THREE.DoubleSide
});
let plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.castShadow = false;
plane.receiveShadow = true;
plane.rotateX(- Math.PI / 2);
scene.add(plane);
//

scene.add(cube);
fixPoint.add(sun, moon);
sun.add(sunLight);
moon.add(moonLight);
scene.add(fixPoint);
sun.position.x = 90;
sun.position.z = -90;
moon.position.x = -90;
moon.position.z = 90;

// DEFAULT CAMERA POSITION
camera.position.x = 15;
camera.position.y = 95;
camera.position.z = 30;
//

const backgroundTexture = new THREE.TextureLoader().load("./textures/sky.jpg");

let orbitSpeed: number = 0.0004;
const animate = (): void => {
    requestAnimationFrame(animate);
    sun.rotateY(0.004);
    moon.rotateY(0.004);
    fixPoint.rotateZ(orbitSpeed);
    fixPoint.rotateX(orbitSpeed);

    // COMMENT OUT FOR TESTING, Jest *BUG*
    orbitControls.update();
    //

    renderer.render(scene, camera);
};

const resize = (): void => {
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
};

export const createScene = (el: object): void => {
    renderer = new THREE.WebGLRenderer({ antialias: true, canvas: el });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // COMMENT OUT FOR TESTING, Jest *BUG*
    orbitControls = new OrbitControls(camera, renderer.domElement);
    dragControls = new DragControls(solarPanels, camera, renderer.domElement);
    dragControls.addEventListener('dragstart', function () { orbitControls.enabled = false; });
    dragControls.addEventListener('dragend', function () { orbitControls.enabled = true; });
    //

    scene.background = backgroundTexture;
    resize();
    animate();
}

export const camera2D = (): void => {
    console.log('Camera 2D');
    camera.position.x = 0;
    camera.position.y = 30;
    camera.position.z = 0;
}

export const camera3D = (): void => {
    console.log('Camera 3D');
    camera.position.x = 30;
    camera.position.y = 30;
    camera.position.z = 45;
}

export const decreaseOrbitSpeed = (): void => {
    orbitSpeed = orbitSpeed - 0.0005;
    console.log('Orbit speed set to: ', orbitSpeed);
}

export const increaseOrbitSpeed = (): void => {
    orbitSpeed = orbitSpeed + 0.0005;
    console.log('Orbit speed set to: ', orbitSpeed);
}

interface SolarMaterial {
    material: object
}

let solarPanels: SolarMaterial[] = [];

export const addSolarPanel = (): void => {
    console.log("Solar panel added!");
    const panelGeometry = new THREE.BoxGeometry(2, 0.1, 4.8);
    const panelMaterial = new THREE.MeshBasicMaterial({
        map: textureLoader.load("./textures/panel.jpeg")
    });
    const solarPanel = new THREE.Mesh(panelGeometry, panelMaterial);
    solarPanel.position.set(0, 5, 0);
    solarPanel.castShadow = false;
    solarPanel.receiveShadow = true;

    solarPanels.push(solarPanel);

    cube.add(solarPanel);
}

export const changeRoofDimensions = (width: number, length: number, depth: number): void => {
    console.log("Changing roof dimensions");

    cube.geometry = new THREE.BoxGeometry(width, length, depth);
}

export const toggleShadows = (): void => {

    if (cube.material[2].type == 'MeshBasicMaterial') {
        console.log("Toggle Shadows: ON");

        cubeMaterialArray[2] = new THREE.MeshStandardMaterial({
            color: 0xFEC009
        });

        cube.material = cubeMaterialArray;

        if (solarPanels.length > 0) {
            for (let i = 0; i < solarPanels.length; i++) {

                solarPanels[i].material = new THREE.MeshStandardMaterial({
                    map: textureLoader.load("./textures/panel.jpeg")
                });
            }
        }

    } else {
        console.log("Toggle Roof Shadows: OFF");
        cubeMaterialArray[2] = new THREE.MeshBasicMaterial({
            color: 0xFEC009
        });

        if (solarPanels.length > 0) {
            for (let i = 0; i < solarPanels.length; i++) {
                solarPanels[i].material = new THREE.MeshBasicMaterial({
                    map: textureLoader.load("./textures/panel.jpeg")
                });
            }
        }
    }
}

window.addEventListener('resize', resize);