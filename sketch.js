var video;
var vScale = 6;
var angle = 0;
var canvas;

function setup() {
    canvas = createCanvas(480, 720);
    canvas.parent('canvasPos');
    background(0);
    pixelDensity(1);
    video =  createCapture(VIDEO);
    video.size(width/vScale, height/vScale); //making video very small low-res
    video.hide();
}

function draw() {
    image(video, 0, 0);
    // background(0);
    background(0, 33, 153);
    video.loadPixels(); //video pixels
    loadPixels(); //canvas pixels
    var offset = 0;
    //go through every pixel
    for (var y = 0; y < video.height; y++) {
        for(var x = 0; x < video.width; x++) {
            //js every pixel has 4 spots in array (x + y * width) * 4
            var index = (video.width - x + 1 + y * video.width) * 4;//mirror
            var r = video.pixels[index+0]; //looking at every pixel
            var g = video.pixels[index+1];
            var b = video.pixels[index+2];
            var bright = (r+g+b)/3; // find avarage to make grscl
            var w = map(bright, 0, 255, 0, vScale);//map bright to size
            var s = sin(angle + offset);
            var m = map(s, -1, 1, x-2, x+2); //map sine to x loc
            noStroke();
            fill(255);
            rectMode(CENTER);
            rect((m) * vScale, (y) * vScale, w, w); //scaling up to canvas size
            // rect((-m) * vScale, (y) * vScale, w, w); //scaling up to canvas size
            offset += PI;
        }
    }
    angle += 0.025;
 }
