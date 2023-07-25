
status = "";
objects = [];

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting";
}

function modelLoaded(){
    status = true;
    console.log("Model Loaded");
   
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);

    objects = results;
}

function draw(){
   image(video, 0, 0, 380, 380); 
   
   if(status != "")
   {

    r = random(255);
    g = random(255);
    b = random(255);

     for(i = 0; i < objects.length; i++)
     {
      objectDetector.detect(video, gotResult);  

      document.getElementById("status").innerHTML = "Objects Detected";
      document.getElementById("number_of_objects").innerHTML = "Number of objects detected are: " + objects.length;
      
      fill(r, g, b);
      noFill();
      stroke(r, g, b);
      percent = Math.floor(objects[i].confidence * 100);
      text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
     }  

   }

  
}



