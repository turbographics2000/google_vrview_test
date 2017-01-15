var ctx = null;
/*if(Hls.isSupported()) {
  var video = document.getElementById('vid');
  var hls = new Hls();
  //hls.loadSource('https://bitmovin-a.akamaihd.net/content/playhouse-vr/mpds/105560.mpd');
  hls.loadSource('https://bitmovin-a.akamaihd.net/content/playhouse-vr/m3u8s/105560.m3u8');
  hls.attachMedia(video);
  render();
  hls.on(Hls.Events.MANIFEST_PARSED,function() {
    ctx = cnv.getContext('2d');
    video.play();
  });
}*/

//cnv.crossOrigin = "Anonymous";
//vid.crossOrigin = "Anonymous";
//vid.src = 'https://bitmovin-a.akamaihd.net/content/playhouse-vr/mpds/105560.mpd';
vid.src = 'https://bitmovin-a.akamaihd.net/content/playhouse-vr/m3u8s/105560.m3u8';
vid.onloadedmetadata = function() {
  vid.play();
  render();
}
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
var geometry = new THREE.SphereBufferGeometry(100, 64, 64);
var texture = new THREE.Texture(vid);
var material = new THREE.MeshBasicMaterial({map: texture, side: THREE.DoubleSide});
var mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
function render() {
  console.log('1');
  requestAnimationFrame(render);
  cnv.width = vid.videoWidth;
  cnv.height = vid.videoHeight;
  if(ctx && vid.videoWidth && vid.videoHeight) {
    ctx.drawImage(vid, 0, 0, vid.videoWidth, vid.videoHeight);
  }
  if(texture) texture.needsupdate = true;
  if(renderer) renderer.render(scene, camera);
}
