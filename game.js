import * as THREE from
"https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";


/* =================================================
   SCENE
================================================= */

const game =
  document.getElementById("game");


const scene =
  new THREE.Scene();


scene.background =
  new THREE.Color(0x78a8d0);


scene.fog =
  new THREE.Fog(
    0x78a8d0,
    35,
    170
  );


/* =================================================
   CAMERA
================================================= */

const camera =
  new THREE.PerspectiveCamera(
    65,
    innerWidth / innerHeight,
    0.1,
    400
  );


/* =================================================
   RENDERER
================================================= */

const renderer =
  new THREE.WebGLRenderer({
    antialias: true,
    powerPreference:
      "high-performance"
  });


renderer.setSize(
  innerWidth,
  innerHeight
);


renderer.setPixelRatio(
  Math.min(
    devicePixelRatio,
    2
  )
);


renderer.shadowMap.enabled =
  true;


renderer.shadowMap.type =
  THREE.PCFSoftShadowMap;


game.appendChild(
  renderer.domElement
);


/* =================================================
   LIGHT
================================================= */

const sun =
  new THREE.DirectionalLight(
    0xffffff,
    3
  );


sun.position.set(
  40,
  60,
  30
);


sun.castShadow =
  true;


sun.shadow.mapSize.width =
  2048;


sun.shadow.mapSize.height =
  2048;


scene.add(sun);


const ambient =
  new THREE.HemisphereLight(
    0xbad7ff,
    0x252035,
    2
  );


scene.add(ambient);


/* =================================================
   GROUND
================================================= */

const ground =
  new THREE.Mesh(

    new THREE.PlaneGeometry(
      300,
      300
    ),

    new THREE.MeshStandardMaterial({
      color: 0x4f7448,
      roughness: .9
    })

  );


ground.rotation.x =
  -Math.PI / 2;


ground.receiveShadow =
  true;


scene.add(ground);


/* =================================================
   ROADS
================================================= */

function createRoad(
  x,
  z,
  width,
  depth
) {

  const road =
    new THREE.Mesh(

      new THREE.BoxGeometry(
        width,
        .08,
        depth
      ),

      new THREE.MeshStandardMaterial({
        color: 0x29292e,
        roughness: .9
      })

    );


  road.position.set(
    x,
    .04,
    z
  );


  scene.add(road);
}


createRoad(
  0,
  0,
  20,
  300
);


createRoad(
  0,
  0,
  300,
  20
);


/* =================================================
   BUILDINGS
================================================= */

function createBuilding(
  x,
  z,
  width,
  height,
  depth
) {

  const building =
    new THREE.Mesh(

      new THREE.BoxGeometry(
        width,
        height,
        depth
      ),

      new THREE.MeshStandardMaterial({
        color:
          new THREE.Color()
            .setHSL(
              Math.random(),
              .18,
              .35
            ),

        roughness: .8
      })

    );


  building.position.set(
    x,
    height / 2,
    z
  );


  building.castShadow =
    true;


  building.receiveShadow =
    true;


  scene.add(
    building
  );
}


for (
  let x = -90;
  x <= 90;
  x += 20
) {

  for (
    let z = -90;
    z <= 90;
    z += 20
  ) {

    if (
      Math.abs(x) < 25 ||
      Math.abs(z) < 25
    )
      continue;


    createBuilding(
      x,
      z,
      12,
      8 + Math.random() * 18,
      12
    );

  }

}


/* =================================================
   HOUSE
================================================= */

function createHouse() {

  const house =
    new THREE.Group();


  const walls =
    new THREE.Mesh(

      new THREE.BoxGeometry(
        12,
        5,
        10
      ),

      new THREE.MeshStandardMaterial({
        color: 0xf0d1bd
      })

    );


  walls.position.y =
    2.5;


  walls.castShadow =
    true;


  house.add(walls);


  const roof =
    new THREE.Mesh(

      new THREE.ConeGeometry(
        8.5,
        3,
        4
      ),

      new THREE.MeshStandardMaterial({
        color: 0x8b3f52
      })

    );


  roof.rotation.y =
    Math.PI / 4;


  roof.position.y =
    6.5;


  house.add(roof);


  const door =
    new THREE.Mesh(

      new THREE.BoxGeometry(
        2,
        3,
        .2
      ),

      new THREE.MeshStandardMaterial({
        color: 0x542f22
      })

    );


  door.position.set(
    0,
    1.5,
    5.1
  );


  house.add(door);


  house.position.set(
    -30,
    0,
    -25
  );


  scene.add(house);
}


createHouse();


/* =================================================
   SCHOOL
================================================= */

function createSchool() {

  const school =
    new THREE.Group();


  const building =
    new THREE.Mesh(

      new THREE.BoxGeometry(
        22,
        8,
        14
      ),

      new THREE.MeshStandardMaterial({
        color: 0xd8dbe1
      })

    );


  building.position.y =
    4;


  building.castShadow =
    true;


  school.add(building);


  const roof =
    new THREE.Mesh(

      new THREE.BoxGeometry(
        23,
        .8,
        15
      ),

      new THREE.MeshStandardMaterial({
        color: 0x303647
      })

    );


  roof.position.y =
    8.4;


  school.add(roof);


  school.position.set(
    30,
    0,
    -30
  );


  scene.add(school);
}


createSchool();


/* =================================================
   PLAYER
================================================= */

const player =
  new THREE.Group();


scene.add(player);


/* BODY */

const body =
  new THREE.Mesh(

    new THREE.CapsuleGeometry(
      .55,
      1.15,
      8,
      16
    ),

    new THREE.MeshStandardMaterial({
      color: 0x8d4c7a
    })

  );


body.position.y =
  1.25;


body.castShadow =
  true;


player.add(body);


/* HEAD */

const head =
  new THREE.Mesh(

    new THREE.SphereGeometry(
      .48,
      32,
      32
    ),

    new THREE.MeshStandardMaterial({
      color: 0xc98d70
    })

  );


head.position.y =
  2.25;


head.castShadow =
  true;


player.add(head);


/* HAIR */

const hair =
  new THREE.Mesh(

    new THREE.SphereGeometry(
      .51,
      32,
      20
    ),

    new THREE.MeshStandardMaterial({
      color: 0x241714
    })

  );


hair.position.y =
  2.48;


hair.scale.y =
  .65;


hair.castShadow =
  true;


player.add(hair);


/* EYES */

function createEye(x) {

  const eye =
    new THREE.Mesh(

      new THREE.SphereGeometry(
        .055,
        12,
        12
      ),

      new THREE.MeshBasicMaterial({
        color: 0x111111
      })

    );


  eye.position.set(
    x,
    2.28,
    -.43
  );


  player.add(eye);
}


createEye(-.16);
createEye(.16);


/*
  الشخصية تواجه -Z.
*/

player.position.set(
  0,
  0,
  10
);


/* =================================================
   MOVEMENT INPUT
================================================= */

const input = {

  x: 0,

  y: 0,

  sprint: false

};


let velocityY = 0;

let grounded = true;


/* =================================================
   MOVEMENT
================================================= */

function movePlayer(delta) {

  const length =
    Math.sqrt(
      input.x * input.x +
      input.y * input.y
    );


  if (
    length > .05
  ) {

    const speed =
      input.sprint
        ? 13
        : 7;


    /*
      الحركة بالنسبة للكاميرا
      مثل ألعاب PUBG.
    */

    const cameraForward =
      new THREE.Vector3();


    camera.getWorldDirection(
      cameraForward
    );


    cameraForward.y = 0;

    cameraForward.normalize();


    const cameraRight =
      new THREE.Vector3(
        cameraForward.z,
        0,
        -cameraForward.x
      );


    const movement =
      new THREE.Vector3();


    movement.addScaledVector(
      cameraRight,
      input.x
    );


    movement.addScaledVector(
      cameraForward,
      input.y
    );


    movement.normalize();


    player.position.addScaledVector(
      movement,
      speed * delta
    );


    /*
      الشخصية تلف ناحية اتجاه الحركة.
    */

    player.rotation.y =
      Math.atan2(
        movement.x,
        movement.z
      );

  }


  /* GRAVITY */

  velocityY -=
    18 * delta;


  player.position.y +=
    velocityY * delta;


  if (
    player.position.y <= 0
  ) {

    player.position.y =
      0;

    velocityY =
      0;

    grounded =
      true;

  }

}


/* =================================================
   JUMP
================================================= */

function jump() {

  if (!grounded)
    return;


  velocityY =
    8;


  grounded =
    false;
}


/* =================================================
   PUBG CAMERA
================================================= */

let cameraYaw = 0;

let cameraPitch = .25;


const cameraDistance = 8;

const cameraHeight = 4.5;


function updateCamera() {

  const offset =
    new THREE.Vector3(

      Math.sin(cameraYaw) *
        cameraDistance,

      cameraHeight +
        cameraPitch * 5,

      Math.cos(cameraYaw) *
        cameraDistance

    );


  const target =
    player.position
      .clone()
      .add(offset);


  camera.position.lerp(
    target,
    .12
  );


  camera.lookAt(

    player.position.x,

    player.position.y + 1.4,

    player.position.z

  );
}


/* =================================================
   CAMERA TOUCH
================================================= */

let cameraTouching =
  false;


let lastTouchX = 0;

let lastTouchY = 0;


const cameraSensitivity =
  .006;


window.addEventListener(
  "touchstart",
  event => {

    for (
      const touch
      of event.touches
    ) {

      /*
        النصف اليمين
        مخصص للكاميرا.
      */

      if (
        touch.clientX >
        innerWidth / 2
      ) {

        cameraTouching =
          true;


        lastTouchX =
          touch.clientX;


        lastTouchY =
          touch.clientY;


        break;
      }

    }

  },
  { passive: true }
);


window.addEventListener(
  "touchmove",
  event => {

    if (
      !cameraTouching
    )
      return;


    const touch =
      event.touches[0];


    const dx =
      touch.clientX -
      lastTouchX;


    const dy =
      touch.clientY -
      lastTouchY;


    cameraYaw -=
      dx *
      cameraSensitivity;


    cameraPitch -=
      dy *
      cameraSensitivity;


    cameraPitch =
      Math.max(
        -.25,
        Math.min(
          .65,
          cameraPitch
        )
      );


    lastTouchX =
      touch.clientX;


    lastTouchY =
      touch.clientY;

  },
  { passive: true }
);


window.addEventListener(
  "touchend",
  () => {

    cameraTouching =
      false;

  }
);


/* =================================================
   JOYSTICK
================================================= */

const joystick =
  document.getElementById(
    "joystick"
  );


const stick =
  document.getElementById(
    "joystickStick"
  );


let joystickActive =
  false;


let centerX = 0;

let centerY = 0;


function joystickStart(e) {

  joystickActive =
    true;


  const rect =
    joystick.getBoundingClientRect();


  centerX =
    rect.left +
    rect.width / 2;


  centerY =
    rect.top +
    rect.height / 2;


  joystickMove(e);
}


function joystickMove(e) {

  if (
    !joystickActive
  )
    return;


  const touch =
    e.touches[0];


  let dx =
    touch.clientX -
    centerX;


  let dy =
    touch.clientY -
    centerY;


  const max = 48;


  const distance =
    Math.sqrt(
      dx * dx +
      dy * dy
    );


  if (
    distance > max
  ) {

    dx =
      dx / distance *
      max;


    dy =
      dy / distance *
      max;

  }


  input.x =
    dx / max;


  input.y =
    -dy / max;


  stick.style.transform =
    `translate(
      calc(-50% + ${dx}px),
      calc(-50% + ${dy}px)
    )`;
}


function joystickEnd() {

  joystickActive =
    false;


  input.x = 0;

  input.y = 0;


  stick.style.transform =
    "translate(-50%, -50%)";
}


joystick.addEventListener(
  "touchstart",
  joystickStart,
  { passive: true }
);


window.addEventListener(
  "touchmove",
  joystickMove,
  { passive: true }
);


window.addEventListener(
  "touchend",
  joystickEnd
);


/* =================================================
   BUTTONS
================================================= */

const sprint =
  document.getElementById(
    "sprintButton"
  );


sprint.addEventListener(
  "touchstart",
  () => {

    input.sprint =
      true;

  },
  { passive: true }
);


sprint.addEventListener(
  "touchend",
  () => {

    input.sprint =
      false;

  }
);


document
  .getElementById(
    "jumpButton"
  )
  .addEventListener(
    "click",
    jump
  );


/* =================================================
   KEYBOARD
================================================= */

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "w" ||
      event.key === "ArrowUp"
    )
      input.y = 1;


    if (
      event.key === "s" ||
      event.key === "ArrowDown"
    )
      input.y = -1;


    if (
      event.key === "a" ||
      event.key === "ArrowLeft"
    )
      input.x = -1;


    if (
      event.key === "d" ||
      event.key === "ArrowRight"
    )
      input.x = 1;


    if (
      event.code === "Space"
    )
      jump();

  }
);


document.addEventListener(
  "keyup",
  event => {

    if (
      event.key === "w" ||
      event.key === "ArrowUp" ||
      event.key === "s" ||
      event.key === "ArrowDown"
    )
      input.y = 0;


    if (
      event.key === "a" ||
      event.key === "ArrowLeft" ||
      event.key === "d" ||
      event.key === "ArrowRight"
    )
      input.x = 0;

  }
);


/* =================================================
   GAME LOOP
================================================= */

const clock =
  new THREE.Clock();


function animate() {

  requestAnimationFrame(
    animate
  );


  const delta =
    Math.min(
      clock.getDelta(),
      .05
    );


  movePlayer(delta);

  updateCamera();


  renderer.render(
    scene,
    camera
  );

}


animate();


/* =================================================
   RESIZE
================================================= */

window.addEventListener(
  "resize",
  () => {

    camera.aspect =
      innerWidth /
      innerHeight;


    camera.updateProjectionMatrix();


    renderer.setSize(
      innerWidth,
      innerHeight
    );

  }
);
