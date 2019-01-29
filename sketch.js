var video;
var vScale = 8;
var angle = 0;
var arr = [[]];
var canvas;

function setup() {
    canvas = createCanvas(1080, 720);
    canvas.parent('canvasPos');
    background(0);
    pixelDensity(1);
    video =  createCapture(VIDEO);
    video.size(width/vScale, height/vScale);
    video.hide();
}

function draw() {
    image(video, 0, 0);
    background(0);
    video.loadPixels();
    loadPixels();
    var offset = 0;
    //go through every pixel
    for (var y = 0; y < video.height; y++) {
        for(var x = 0; x < video.width; x++) {
            //js every pixel has 4 spots in array (x + y * width) * 4
            var index = (video.width - x + 1 + y * video.width) * 4;//mirror n
            var r = video.pixels[index+0];
            var g = video.pixels[index+1];
            var b = video.pixels[index+2];
            // find avarage to make grscl
            var bright = (r+g+b)/3;
            var w = map(bright, 0, 255, 0, vScale);//map bright to size
            // if(x%2 == 0){
            //     offset += pi;
            // }
            // else {
            //     offset -= pi;
            // }
            var s = map(sin(angle + offset), -1, 1, x - 2, x + 2);
            noStroke();
            fill(255);
            rectMode(CENTER);
            rect((s) * vScale, (y) * vScale, w, w);
            offset += PI;

        }
    //     angle += 0.05;
    }
    angle += 0.05;

}
