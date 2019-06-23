const camera = document.getElementById("js--camera");
const scene = document.getElementById("js--scene");
const carParts = document.getElementById("js--car-parts")

var wheelCounter = 0;
var boltCounter = 0;

pickUp = function(event) {
  if (document.getElementById("js--camera-box") != undefined) {
    return;
  }
  var objModel = event.target.getAttribute("obj-model");
  var scale;
  id = event.target.id.substr(0, event.target.id.length - 1);
  if(id == "js--wheel") {
    scale = "0.00025 0.00025 0.00025";
  } else if(id == "js--bolt") {
    scale = "0.015 0.015 0.015";
  } else {
    return;
  }
  document.getElementById(event.target.getAttribute("id")).remove();
  camera.appendChild(makeEntity(id, objModel,"-0.2 0 -0.4" , scale));
};

makeEntity = function(id, model, position, scale, rotation="0 0 0") {
  let entity = document.createElement("a-entity");

  entity.setAttribute("id", id);
  entity.setAttribute("obj-model", model);
  entity.setAttribute("position", position);
  entity.setAttribute("scale", scale);

  return entity;
};

placeObject = function(event) {
  const cameraObject = camera.getChildren()[1];
  const id = cameraObject.getAttribute("id");
  var position;
  var rotation;

  if(id == "js--wheel") {
    scale = "0.0025 0.0025 0.0025";
    if(wheelCounter == 0) {
      position = "0 1 -8"
      rotation = "0 90 0"
    } else if(wheelCounter == 1) {
      position = "0 2 -8"
    } else if(wheelCounter == 2) {
      position = "0 3 -8"
    } else if(wheelCounter == 3) {
      position = "0 4 -8"
    }
    carParts.appendChild(makeEntity("wheel" + wheelCounter, cameraObject.getAttribute("obj-model"), position, scale, rotation));
    wheelCounter++;
  }
  else if(id == "js--bolt") {
    scale = "0.15 0.15 0.15";
    if(boltCounter == 0) {
      position = "-1 1 -8"
    } else if(boltCounter == 1) {
      position = "-1 2 -8"
    } else if(boltCounter == 2) {
      position = "-1 3 -8"
    }
    carParts.appendChild(makeEntity("bolt" + boltCounter, cameraObject.getAttribute("obj-model"), position, scale));
    boltCounter++;
  } else {
    return;
  }

  camera.removeChild(cameraObject);

  if(wheelCounter == 4 && boltCounter == 3) {
    buildCar();
  }
};

buildCar = function() {
  // TODO: automonteur geluidjes
  scene.removeChild(carParts);
  placeCar();
};

placeCar = function() {
  let entity = document.createElement("a-entity");
  let sound = document.querySelector("[sound]");

  entity.setAttribute("id", "js--car");
  entity.setAttribute("obj-model", "obj: url(objects/car.obj); mtl: url(objects/car.mtl)");
  entity.setAttribute("position", "0 0 -7");
  entity.setAttribute("rotation", "0 -25 0");
  setTimeout(function(){
    entity.setAttribute("animation", "property: rotation; from: 0 -25 0; to: 0 180 0; dur: 2000; easing: linear;");
  }, 500);
  setTimeout(function(){
    sound.components.sound.playSound();
    entity.setAttribute("animation", "property: position; from: 0 0 -7; to: 0 0 -1000; dur: 10000; easing: easeInCubic;");
  }, 2500);
  scene.appendChild(entity);

  setTimeout(function(){
    // TODO: fade screen to black dur:2000
    let spotlight = document.createElement("a-enitity");
    spotlight.setAttribute("light", "type: spot");
    // spotlight.setAttribute("animation", "property: ")
  }, 2000);

  setTimeout(function(){
    leaveChallenge();
  }, 6000);
};

leaveChallenge = function() {
  setTimeout(function(){
    location.replace("index.html");
    // completeChallenge("iat");

  }, 2000);

};
