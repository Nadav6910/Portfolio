const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;

let model

const canvasContainer = document.getElementById("canvas")
const renderer = new THREE.WebGLRenderer( {alpha: true, antialias: true, canvas: canvasContainer} );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// document.body.appendChild( renderer.domElement );

// const GLTFloader = new THREE.GLTFLoader();

// GLTFloader.load( '../models/skull/scene.gltf', function ( gltf ) {

// 	scene.add( gltf.scene );
//   model = gltf.scene.children[0]
//   model.scale.set(2, 2, 2)
//   model.position.set(0.001, 0.001, 0.001)
//   requestAnimationFrame( animate );

// }, undefined, function ( error ) {

// 	console.error( error )
// })

// const loader = new THREE.TextureLoader();

// loader.load( '../assets/circle.png', function ( texture ) {

//     var geometry = new THREE.SphereGeometry();

//     var material = new THREE.MeshBasicMaterial( { map: texture } );
//     var mesh = new THREE.Mesh( geometry, material );
//     scene.add( mesh );

// } );

// } );

// const geometry = new THREE.BoxGeometry();
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

//lights
const ambient = new THREE.AmbientLight(0x404040, 5)
scene.add(ambient)

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
    // requestAnimationFrame( animate );

    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    // model.rotation.x += 0.001;
    // model.rotation.y += 0.001;
    // model.rotation.z += 0.01;

    renderer.render( scene, camera );
    requestAnimationFrame( animate );
};

requestAnimationFrame( animate );