'use strict';

let leftImg = document.getElementById('leftImg');
let midelImg = document.getElementById('midelImg');
let rightImg = document.getElementById('rightImg');
let result = document.getElementById('results');
let resultsButton = document.getElementById('resultsButton');
let busImages = ['bag.jpg', 'banana.jpg','bathroom.jpg', 'boots.jpg','breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg','dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg','water-can.jpg','wine-glass.jpg'];
let maxAttempts = 25;
let attempt = 1;
let bus = [];
let bName = [];
let votes = [];
let views = [];


function saveToLocalStorage(){
  let data = JSON.stringify(bus);
  localStorage.setItem('bus' , data);
}

function readFromLocalStorage(){
  let stringObj = localStorage.getItem('bus');
  let normalObj = JSON.parse(stringObj);

  if(normalObj){

    bus = normalObj;

    // renderImg();
  }
}

readFromLocalStorage();


function BusImage(busName){
  this.bName = busName.split('.')[0];
  this.bImg = `img/${busName}`;
  this.votes = 0;
  this.views = 0;
  bus.push(this);
  bName.push(this.bName);
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

let arr = [];

function renderImg(){
  leftIndex = randomImage();
  midelIndex = randomImage();
  rightIndex = randomImage();

  while(leftIndex === rightIndex || rightIndex === midelIndex || midelIndex === leftIndex || arr.includes(leftIndex) || arr.includes(midelIndex) || arr.includes(rightIndex)){
    leftIndex = randomImage();
    midelIndex = randomImage();
    rightIndex = randomImage();
  }
  arr[0] = leftIndex;
  arr[1] = midelIndex;
  arr[2] = rightIndex;


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
    saveToLocalStorage();
  }else{
    leftImg.removeEventListener('click' , clickHandler);
    midelImg.removeEventListener('click' ,clickHandler);
    rightImg.removeEventListener('click' , clickHandler);

  }
}



function showResilts(){
  for(let i = 0; i < bus.length; i++){
    let liEl = document.createElement('li');
    result.appendChild(liEl);
    liEl.textContent = `${bus[i].bName} has ${bus[i].votes} votes and ${bus[i].views} views `;
    votes.push(bus[i].votes);
    views.push(bus[i].views);
  }
  resultsButton.removeEventListener('click' , showResilts);
  chartRender();
}

function chartRender() {
  let ctx = document.getElementById('myChart').getContext('2d');
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: bName,
      datasets: [{
        label: '# of Votes',
        data: votes,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1
      }, {
        label: '# of views',
        data: views,
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)'
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}


