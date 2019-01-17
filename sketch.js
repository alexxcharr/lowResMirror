var video;
var vScale = 6;
var angle = 0;
var arr = [[]];

function setup() {
    createCanvas(windowWidth, windowHeight);
    pixelDensity(1);
    video = createCapture(VIDEO);
    video.size(width/vScale, height/vScale);
    video.hide();
}

function draw() {
    background(0);
    video.loadPixels();
    loadPixels();
    var offset = 0;
    for (var y = 0; y < video.height; y++) {
        for(var x = 0; x < video.width; x++) {
            var index = (video.width - x + 1 + y * video.width) * 4;//mirror n
            var r = video.pixels[index+0];
            var g = video.pixels[index+1];
            var b = video.pixels[index+2];

            var bright = (r+g+b)/3;
            var w = map(bright, 10, 255, 2, vScale);//map bright to size
            // if(x%2 == 0){
            //     offset += 0.02;
            // }
            // else {
            //     offset += 0.04;
            // }
            var s = map(sin(angle+offset), -1, 1, x-8, x+8);
            noStroke();
            fill(bright);
            rectMode(CENTER);
            rect((x+s)*vScale, (y)*vScale, w, w);
            offset += 0.02;

        }
    //     angle += 0.05;
    }
    angle += 0.05;
}
