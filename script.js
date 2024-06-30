let songIndex = 0;
let masterPlay = document.querySelector(".icons .iconPlay");
let myProgressBar = document.getElementById('myProgressBar');
let bottomName = document.getElementById('bottomName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
  { songName: "Song1", filePath: "songs/1.mp3", songCover: "covers/1.jpg" , timeSpan:"3:15" },
  { songName: "Song2", filePath: "songs/2.mp3", songCover: "covers/2.jpg" , timeSpan:"4:00"},
  { songName: "Song3", filePath: "songs/3.mp3", songCover: "covers/3.jpg" , timeSpan:"5:15"},
  { songName: "Song4", filePath: "songs/4.mp3", songCover: "covers/4.jpg" , timeSpan:"2:30"},
  { songName: "Song5", filePath: "songs/5.mp3", songCover: "covers/5.jpg" , timeSpan:"3:15"},
  { songName: "Song6", filePath: "songs/6.mp3", songCover: "covers/6.jpg" , timeSpan:"3:15"},
  { songName: "Song7", filePath: "songs/7.mp3", songCover: "covers/7.jpg" , timeSpan:"3:15"},
  { songName: "Song8", filePath: "songs/8.mp3", songCover: "covers/8.jpg" , timeSpan:"3:15"},
  { songName: "Song9", filePath: "songs/9.mp3", songCover: "covers/9.jpg" , timeSpan:"3:15"},
  { songName:"Song10", filePath: "songs/10.mp3",songCover: "covers/10.jpg", timeSpan:"3:15"},
];

songItems.forEach(function(element,i){
    // console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].songCover;
    element.getElementsByClassName("songName")[0].innerHTML = songs[i].songName;
    element.getElementsByClassName("timeSpan")[0].innerHTML = songs[i].timeSpan;
    // element.getElementsByClassName("songName")[0] = songs[i].songName;
});

let audioElement = new Audio("songs/1.mp3");

  masterPlay.addEventListener("click", function () {
      if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
    masterPlay.setAttribute('name', 'pause');
    masterPlay.classList.remove('iconPlay');
    masterPlay.classList.add('iconPause');
    document.querySelector('.songInfo img').style.opacity = 1;
    bottomName.innerText = songs[songIndex].songName;
    
      }
      else{
        audioElement.pause();
        masterPlay.setAttribute('name', 'play');
        masterPlay.classList.remove('iconPause');
        masterPlay.classList.add('iconPlay');
        document.querySelector('.songInfo img').style.opacity = 0;
        
      }
    });
    

    

audioElement.addEventListener('timeupdate', function(){
    console.log('timeupdate');
    var progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    console.log(progress);
    myProgressBar.value = progress;
 
});

myProgressBar.addEventListener('change', function(){
    audioElement.currentTime = myProgressBar.value*audioElement.duration/100;
});



Array.from(document.querySelectorAll(".songItem .icon")).forEach(function(element){
    element.addEventListener("click", function(e){
        
        document.querySelectorAll(".songItem .icon").forEach(function(icon){
            icon.setAttribute('name', 'play');
            icon.classList.remove('iconPause');
            icon.classList.add('iconPlay');
        });


        if (e.target.getAttribute('name') === 'play') {
            songIndex = parseInt(e.target.id);
            e.target.setAttribute('name', 'pause');        
            audioElement.src = `songs/${songIndex+1}.mp3`;
            audioElement.currentTime = 0;
            audioElement.play();
            masterPlay.setAttribute('name', 'pause');
            masterPlay.classList.remove('iconPlay');
            masterPlay.classList.add('iconPause');
            document.querySelector('.songInfo img').style.opacity = 1;
            bottomName.innerText = songs[songIndex].songName;
        }

            
        else{
            e.target.setAttribute('name', 'play');
            audioElement.pause();
        }

        });
});

document.getElementById("next").addEventListener("click", function(){
    if(songIndex>9){
        songIndex = 0;
    }
    else{
        songIndex= songIndex+1;
    }
    
    audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    bottomName.innerHTML = songs[songIndex].songName;
    masterPlay.setAttribute('name', 'pause');
    masterPlay.classList.remove('iconPlay');
    masterPlay.classList.add('iconPause');
    document.querySelector('.songInfo img').style.opacity = 1; 
    
})

document.getElementById("previous").addEventListener("click", function(){
    if(songIndex<0){
        songIndex=0;
    }
    else{
        songIndex =songIndex-1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    bottomName.innerText = songs[songIndex].songName;
    masterPlay.setAttribute('name', 'pause');
    masterPlay.classList.remove('iconPlay');
    masterPlay.classList.add('iconPause');
    document.querySelector('.songInfo img').style.opacity = 1;
    

    });

