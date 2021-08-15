'use strict';

let leftImg = document.getElementById('leftImg');
let midelImg = document.getElementById('midelImg');
let rightImg = document.getElementById('rightImg');
let result = document.getElementById('results');
let resultsButton = document.getElementById('resultsButton');
let busImages = ['bag.jpg', 'banana.jpg','bathroom.jpg', 'boots.jpg','breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg','dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg','water-can.jpg','wine.jpg'];
let maxAttempts = 25;
let attempt = 1;
let bus = [];

function BusImage(busName){
  this.bName = busName.split('.')[0];
  this.bImg = `img/${busName}`;
  this.votes = 0;
  this.views = 0;
  bus.push(this);
}

for (let i =0; i< busImages.length; i++){
  new BusImage(busImages[i]);
}

function randomImage(){
  return Math.floor(Math.random() * bus.length);
}

let leftIndex;
let midelIndex;
let rightIndex;

function renderImg(){
  leftIndex = randomImage();
  midelIndex = randomImage();
  rightIndex = randomImage();

  while(leftIndex === midelIndex || rightIndex === midelIndex || leftIndex === rightIndex){
    leftIndex = randomImage();
  }
  leftImg.setAttribute('src',bus[leftIndex].bImg);
  midelImg.setAttribute('src',bus[midelIndex].bImg);
  rightImg.setAttribute('src',bus[rightIndex].bImg);

  bus[leftIndex].views++;
  bus[midelIndex].views++;
  bus[rightIndex].views++;
}
renderImg();

leftImg.addEventListener('click' ,clickHandler);
midelImg.addEventListener('click' ,clickHandler);
rightImg.addEventListener('click' ,clickHandler);
resultsButton.addEventListener('click' , showResilts);

function clickHandler(event){
  if (attempt <= maxAttempts) {
    let clickedImage = event.target.id;
    if (clickedImage === 'leftImg') {
      bus[leftIndex].votes++;
    } else if (clickHandler === 'midelImg'){
      bus[midelIndex].votes++;
    }
    else if (clickedImage === 'rightImg') {
      bus[rightIndex].votes++;
    }
    renderImg();
    attempt++;
  }
  leftImg.removeEventListener('click' , clickHandler);
  midelImg.removeEventListener('click' ,clickHandler);
  rightImg.removeEventListener('click' , clickHandler);
}



function showResilts(){
  for(let i = 0; i < bus.length; i++){
    let liEl = document.createElement('li');
    result.appendChild(liEl);
    liEl.textContent = `${bus[i].bName} has ${bus[i].votes} votes and ${bus[i].views} views `;
  }
  resultsButton.removeEventListener('click' , showResilts);
}



