import * as THREE from 'three';
import gsap from 'gsap'
class MouseMeshInteractionHandler {
	constructor(mesh_name, handler_function) {
		this.mesh_name = mesh_name;
		this.handler_function = handler_function;
	}
}

class MouseMeshInteraction {
	constructor(scene, camera) {
		this.scene = scene;
		this.camera = camera;
		
		this.raycaster = new THREE.Raycaster();
		this.mouse = new THREE.Vector2();
		
		this.updated = false;
		this.event = '';
		
		// last mesh that the mouse cursor was over
		this.last_mouseenter_mesh = undefined;
		// last mesh that the mouse was pressing down
		this.last_pressed_mesh = undefined;
		
		this.handlers = new Map();
		
		this.handlers.set('click', []);
		this.handlers.set('dblclick', []);
		this.handlers.set('contextmenu', []);
		
		this.handlers.set('mousedown', []);
		this.handlers.set('mouseup', []);
		this.handlers.set('mouseenter', []);
		this.handlers.set('mouseleave', []);
		
		window.addEventListener('mousemove', this);
		
		window.addEventListener('click', this);
		window.addEventListener('dblclick', this);
		window.addEventListener('contextmenu', this);
		
		window.addEventListener('mousedown', this);
	}
	
	handleEvent(e) {
		switch(e.type) {
			case "mousemove": {
				this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
				this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
				this.updated = true;
				this.event = 'motion';
			}
			break;
			default: {
				this.updated = true;
				this.event = e.type;
			}
		}
	}
	
	addHandler(mesh_name, event_type, handler_function) {
		if (this.handlers.has(event_type)) {
			this.handlers.get(event_type).push(new MouseMeshInteractionHandler(mesh_name, handler_function));
		}
	}
	
	update() {
		if (this.updated) {
			// update the picking ray with the camera and mouse position
			this.raycaster.setFromCamera(this.mouse, this.camera);
			
			// calculate objects intersecting the picking ray
			const intersects = this.raycaster.intersectObjects(this.scene.children);
			
			if (intersects.length > 0) {
				// special test for events: 'mouseenter', 'mouseleave'
				if (this.event === 'motion') {
					let mouseenter_handlers = this.handlers.get('mouseenter');
					let mouseleave_handlers = this.handlers.get('mouseleave');
					
					if (mouseleave_handlers.length > 0) {
						for (const handler of mouseleave_handlers) {
							// if mesh was entered by mouse previously, but not anymore, that means it has been mouseleave'd
							if (
								this.last_mouseenter_mesh !== undefined
								&& intersects[0].object !== this.last_mouseenter_mesh
								&& handler.mesh_name === this.last_mouseenter_mesh.name
							) {
								handler.handler_function(this.last_mouseenter_mesh);
								break;
							}
						}
					}
					
					if (mouseenter_handlers.length > 0) {
						for (const handler of mouseenter_handlers) {
							if (handler.mesh_name === intersects[0].object.name && intersects[0].object !== this.last_mouseenter_mesh) {
								this.last_mouseenter_mesh = intersects[0].object;
								handler.handler_function(intersects[0].object);
								break;
							}
						}
					}
				}
				else {
					// if mouseup event has occurred
					if (this.event === 'click' && this.last_pressed_mesh === intersects[0].object) {
						for (const handler of this.handlers.get('mouseup')) {
							if (handler.mesh_name === intersects[0].object.name) {
								handler.handler_function(intersects[0].object);
								break;
							}
						}
						this.last_pressed_mesh = undefined;
					}
					
					// for mouseup event handler to work
					if (this.event === 'mousedown') {
						this.last_pressed_mesh = intersects[0].object;
					}
					
					let handlers_of_event = this.handlers.get(this.event);
					for (const handler of handlers_of_event) {
						if (handler.mesh_name === intersects[0].object.name) {
							handler.handler_function(intersects[0].object);
							break;
						}
					}
				}
			}
			// if mouse doesn't intersect any meshes
			else if (this.event === 'motion') {
				// special test for 'mouseleave' event
				// 			(since it may be triggered when cursor doesn't intersect with any meshes)
				for (const handler of this.handlers.get('mouseleave')) {
					// if mesh was entered by mouse previously, but not anymore, that means it has been mouseleave'd
					if (this.last_mouseenter_mesh !== undefined && handler.mesh_name === this.last_mouseenter_mesh.name) {
						handler.handler_function(this.last_mouseenter_mesh);
						this.last_mouseenter_mesh = undefined;
						break;
					}
				}
			}
			
			this.updated = false;
		}
	}
}

// camera and scene set code **********

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;

const canvasContainer = document.getElementById("canvas")
const renderer = new THREE.WebGLRenderer( {alpha: true, antialias: true, canvas: canvasContainer} );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const mmi = new MouseMeshInteraction(scene, camera);


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
let picerSphere

loader.load( './picer.jpg', function ( texture ) {

    var geometry = new THREE.SphereGeometry();
    var material = new THREE.MeshBasicMaterial( { map: texture } );
    picerSphere = new THREE.Mesh( geometry, material );
    picerSphere.scale.set(0.8, 0.8, 0.8)
    picerSphere.name = 'picer_sphere';
    scene.add( picerSphere );
} );

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

let move = false

mmi.addHandler('picer_sphere', 'click', function(mesh) {
	console.log(mesh);
  	move = !move
	if (move) {
		gsap.to(picerSphere.position, {z: 1.8, y: 1.3, duration: 1.5})
		document.getElementById("hello").style.color = "red"
	} else {
		gsap.to(picerSphere.position, {z: 0, y: 0, duration: 1.5})
		document.getElementById("hello").style.color = "black"
	}
});


function animate() {
    resizeCanvasToDisplaySize()
    

	// if (picerSphere) {
		if (move) {
		  picerSphere.rotation.y += 0.01
		}
	// }
    
    renderer.render( scene, camera );

    requestAnimationFrame( animate );
    mmi.update();
};

requestAnimationFrame( animate );