scoreLeftWrist = 0
scoreRightWrist = 0
leftWristX=0
leftWristY=0
rightWristX=0
rightWristY=0

function setup() {
    canvas = createCanvas(600 , 500);
    canvas.center()
    video = createCapture(VIDEO);
    video.hide()

      poseNet = ml5.poseNet(video , modelLoaded);
      poseNet.on('pose' , gotPoses);
}

function draw() {

    image(video,0,0,600,500)
    if (scoreRightWrist>0.2) {
      fill("red")
    stroke("black")
      circle(rightWristX,rightWristY,20) 
      if (rightWristY>0&& rightWristY<=100 ) {
        song.rate(0.5)
        document.getElementById("speed").innerHTML = "speed = 0.5x"
      }

      else if (rightWristY>100&& rightWristY<=200 ) {
        song.rate(1.0)
        document.getElementById("speed").innerHTML = "speed = 1x"
      }
 
      else if (rightWristY>200&& rightWristY<=300 ) {
        song.rate(1.5)
        document.getElementById("speed").innerHTML = "speed = 1.5x"
      }

     else if (rightWristY>300&& rightWristY<=400 ) {
        song.rate(2.0)
        document.getElementById("speed").innerHTML = "speed = 2.0x"
      }

      else if (rightWristY>400&& rightWristY<=500 ) {
        song.rate(2.5)
        document.getElementById("speed").innerHTML = "speed = 2.5x"
      }

    }
    


      if(scoreLeftWrist>0.2)
      {

       
       
        circle(leftWristX,leftWristY,20)
       
        leftWristY = Number(leftWristY);
        remove_decimals = floor(leftWristY);
        volume = remove_decimals/500;
        song.setVolume(volume);
        document.getElementById("volume").innerHTML = "volume : " + volume;
    
      }


}

var song = ""
function preload() {
    song = loadSound("music.mp3")
}

function play()
{
song.play()
song.setVolume(1)
song.rate(1)

}

function modelLoaded() {
    console.log("model is loaded ")

}


function gotPoses(results)
{
if (results.length>0) {
    console.log(results)

     scoreLeftWrist = results[0].pose.keypoints[9].score
     console.log("score = " + scoreLeftWrist );

    leftWristX = results[0].pose.leftWrist.x
    leftWristY = results[0].pose.leftWrist.y
    console.log("Left Wrist X = " + leftWristX  + "Left Wrist Y = " + leftWristY)

    rightWristX = results[0].pose.rightWrist.x
    rightWristY = results[0].pose.rightWrist.y
    console.log("Right Wrist X = " + rightWristX + "Right Wrist Y = " + rightWristY)
  
    scoreRightWrist = results[0].pose.keypoints[10].score
     console.log("score = " + scoreRightWrist );




}
}



