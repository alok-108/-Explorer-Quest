// Setup for 3D Scene
let scene, camera, renderer, cube, button, buttonMaterial, buttonGeometry;
let flashlightOn = false;
let missions = [
  { name: "Find the Hidden Treasure", clue: "Use your compass and walk north!", completed: false },
  { name: "Escape the Maze", clue: "Turn around and head west", completed: false }
];
let currentMissionIndex = 0;

function init3DScene() {
  // Create a new scene
  scene = new THREE.Scene();

  // Create a camera with a 75-degree field of view and aspect ratio based on window size
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  // Create a WebGL renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);  // Set the renderer to fill the screen
  document.getElementById('3dCanvas').appendChild(renderer.domElement);  // Attach the renderer to the game area

  // Create a rotating cube to use as a UI element
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);  // Add the cube to the scene

  // Create a 3D Button (interactive object)
  buttonGeometry = new THREE.BoxGeometry(2, 1, 0.5);
  buttonMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  button = new THREE.Mesh(buttonGeometry, buttonMaterial);
  button.position.set(0, -2, -3);  // Position the button in front of the camera
  scene.add(button);

  // Set the camera position to look at the cube
  camera.position.z = 5;

  // Start the animation loop
  animate();
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Rotate the cube
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  // Render the scene with the camera
  renderer.render(scene, camera);
}

// Handle flashlight toggle
document.getElementById("torchBtn").addEventListener("click", function() {
  flashlightOn = !flashlightOn;
  document.getElementById("torchBtn").textContent = flashlightOn ? "Turn Off Flashlight" : "Turn On Flashlight";
  // Logic for flashlight on/off (camera control) can go here
});

// Update compass heading
window.addEventListener("deviceorientation", (event) => {
  const compassHeading = event.alpha;
  document.getElementById("compassHeading").textContent = Math.round(compassHeading);
});

// Handle mission completion
function completeMission() {
  missions[currentMissionIndex].completed = true;
  alert(`Mission "${missions[currentMissionIndex].name}" Completed!`);
  currentMissionIndex = (currentMissionIndex + 1) % missions.length;  // Move to next mission
  document.getElementById("missionName").textContent = `Mission: ${missions[currentMissionIndex].name}`;
  document.getElementById("missionClue").textContent = `Clue: ${missions[currentMissionIndex].clue}`;
}

// Initialize the 3D scene
init3DScene();

// Camera Feed (for Torch and Compass functionality)
navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
  document.getElementById("cameraFeed").srcObject = stream;
}).catch((error) => {
  console.error("Error accessing camera: ", error);
});
