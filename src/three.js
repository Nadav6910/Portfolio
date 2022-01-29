import * as THREE from 'three';

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// camera and scene set code **********

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;

const canvasContainer = document.getElementById("canvas")
const renderer = new THREE.WebGLRenderer( {alpha: true, antialias: true, canvas: canvasContainer} );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

function onMouseMove( event ) {
  let canvas = document.getElementById("canvas")
  let bounds = canvas.getBoundingClientRect()
	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components
	mouse.x = ( (event.clientX - bounds.left) / canvas.clientWidth ) * 2 - 1;
  mouse.y = - ( (event.clientY - bounds.top) / canvas.clientHeight ) * 2 + 1;
}

// document.body.appendChild( renderer.domElement );

//gltf loader code ********

// const GLTFloader = new THREE.GLTFLoader();
// let model

// GLTFloader.load( '../models/skull/scene.gltf', function ( gltf ) {
// 	scene.add( gltf.scene );
//   model = gltf.scene.children[0]
//   model.scale.set(2, 2, 2)
//   model.position.set(0.001, 0.001, 0.001)
//   requestAnimationFrame( animate );

// }, undefined, function ( error ) {

// 	console.error( error )
// })


//texture loader code ********

const loader = new THREE.TextureLoader();
let purpleSphere

loader.load( './assets/purple.jpg', function ( texture ) {

    var geometry = new THREE.SphereGeometry();
    var material = new THREE.MeshBasicMaterial( { map: texture } );
    purpleSphere = new THREE.Mesh( geometry, material );
    purpleSphere.scale.set(0.8, 0.8, 0.8)
    scene.add( purpleSphere );
} );

// } );

// const geometry = new THREE.BoxGeometry();
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

//lights *****
const ambient = new THREE.AmbientLight(0x404040, 5)
scene.add(ambient)

// dynamic display of the canvas ********

function resizeCanvasToDisplaySize() {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (canvas.width !== width ||canvas.height !== height) {
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }
}

function animate() {
    resizeCanvasToDisplaySize()
    raycaster.setFromCamera( mouse, camera );
    const intersects = raycaster.intersectObjects( scene.children );
    
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    // model.rotation.x += 0.001;
    // model.rotation.y += 0.001;
    // model.rotation.z += 0.01;
    // purpleSphere.rotation.z += 0.01;
    // purpleSphere.rotation.y += 0.01;
    
    if (intersects.length > 0) {
      for ( let i = 0; i < intersects.length; i ++ ) {
        
        if (intersects[i].object.position.y < 1) {
          const distanceFromCamera = 1.8; 
          const target = new THREE.Vector3(0, 2.2, 0);
          target.applyMatrix4(camera.matrixWorld);
          let moveSpeed = 0.03;
          let distance = intersects[i].object.position.distanceTo(target);
          let amount = Math.min(moveSpeed, distance) / distance;
          intersects[i].object.position.lerp(target, amount)
        }
          
        intersects[i].object.rotation.y += 0.01;
        console.log(intersects[i].object.position.y)
        // console.log(intersects[0].object.uuid)
        document.getElementById("hello").style.color = "red"
      }
    } 
    else {
      document.getElementById("hello").style.color = "black"
    }

    window.addEventListener('click', onMouseMove );
    
    renderer.render( scene, camera );

    requestAnimationFrame( animate );
};

requestAnimationFrame( animate );