song = "";
song2 = "";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

point_leftWristY = 0;
point_rightWristY = 0;

function setup()
{
    Canvas = createCanvas(600, 500);
    Canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function modelLoaded()
{
    console.log("Modelo P5 Inicializado");
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        point_leftWristY = results[0].pose.keypoints[9].score;
        point_rightWristY = results[0].pose.keypoints[10].score;

        console.log(results);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;

        console.log("Coordenada Mizquierda en x: " + leftWristX + "Coordenada Mizquierda en y: " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        console.log("Coordenada Mderecha en x: " + rightWristX + "Coordenada Mderecha en y: " + rightWristY);
    }
}

function draw()
{
    image(video, 0, 0, 600, 500);

    fill("lightgreen");
    stroke("black");

    SStatus = song.isPlaying()
    S2Status = song2.isPlaying()

    if(point_leftWristY > 0.2)
    {
        circle(leftWristX, leftWristY, 30);

        song2.stop()

        if(SStatus == false)
        {
            song.play();
            document.getElementById("volumen").innerHTML = "Believer se esta reproduciendo";
            document.getElementById("velocidad").innerHTML = "Past Lives";
        }
    }

    if(point_rightWristY > 0.2)
    {
        circle(rightWristX, rightWristY, 30);

        song.stop()

        if(S2Status == false)
        {
            song2.play();
            document.getElementById("velocidad").innerHTML = "Past Lives se esta reproduciendo";
            document.getElementById("volumen").innerHTML = "Believer";
        }
    }
}

function preload()
{
    song2 = loadSound("Past_Lives.mp3");
    song = loadSound("Believer.mp3");
}
