// start slingin' some d3 here.

//CONTAINER/GameBox

var containerWidth = 800;
var containerHeight = 600;
var numEnemies = 20;
var radius = 7;
var highscore = 0;
var currentScore = 0;
var collisions = 0;
var counter = 0;

// d3.select(".highscore").text(highscore)
// d3.select(".currentScore").text(currentScore)
// d3.select(".collisions").text(collisions)


//this is the container
var svg = d3.select("body").append('svg')
  .attr('width', containerWidth)
  .attr('height', containerHeight)
  .attr('color', 'red');

var enemies = function() {
  var enemyCircles = [];
  for (var i = 0; i < numEnemies; i++) {
    enemyCircles.push(i);
  }
  d3.select('svg')
  .selectAll('enemies')
  .data(enemyCircles)
  .enter()
  .append('svg:circle')
  .attr('class', 'enemies')
  .attr('cx', function() { return Math.floor(Math.random() * 500) })
  .attr('cy', function() { return Math.floor(Math.random() * 500) })
  .attr('r', 8)
  .style('fill', 'red')
};
enemies();
  
var moveEnemies = function() {
  d3.select('svg')
  .selectAll('.enemies')
  .transition()
  .duration(1000)
  .attr('cx', function() {
    return Math.floor(Math.random() * 500)
  })
  .attr('cy', function() {
    return Math.floor(Math.random() * 500)
  })
};

setInterval(moveEnemies, 1000);

// set score
var currentScoreTimer = function(){
  currentScore++;
  d3.select('.current').text('Current score: ' + currentScore);
};


setInterval(currentScoreTimer, 1000);


function dragmove(d) {
  // this is the player
  var playerDrag = d3.select(this)
     .attr('cx', d3.event.x)
     .attr('cy', d3.event.y);
  // player cy
  var playerCY = playerDrag.attr('cy');
  // player cx
  var playerCX = playerDrag.attr('cx');
  // select all enemies
  var allEnemies = d3.selectAll('.enemies');
  // loop through all enemies
  allEnemies.each(function(d, i){
    // enemy r
    var enemyR = d3.select(this).attr('r');
    // enemy cy
    var enemyCY = d3.select(this).attr('cy');
    // enemy cx
    var enemyCX = d3.select(this).attr('cx');
    // check for collision
    if (Math.abs(playerCY - enemyCY) < enemyR && Math.abs(playerCX - enemyCX) < enemyR){
      console.log("i'm colliding!");
      counter++;
      console.log(counter);
      d3.select('.collisions span').text(counter);
      d3.select('body').transition().duration(200).style('background', 'blue');   
      if(currentScore > highscore){
        highscore = currentScore;
        d3.select('.high').text('High score: ' + currentScore);
        currentScore = 0;        
      }   
    } 
     d3.select('body').style('background', 'white');     
  });
}

var drag = d3.behavior.drag()
      .on("drag", dragmove)
      // .on("dragstart", dragstart)

var player = d3.select('svg')
                .append('svg:circle')
                .attr('class', 'player')
                .attr('cx', 200)
                .attr('cy', 200)
                .attr('r', 8)
                .call(drag);

//Alternate colision solution ---does not work, yet...
// var collisionDetection = function() {
//    d3.select(".highscore").text(highscore)
//    d3.select(".currentScore").text(currentScore)
//    var enemy= d3.selectAll('.enemies')
//    //loop through
//    for(var i =0; i < enemy.length; i++) {
//       var x = d3.select(this).attr('cx') - d3.select('.player').attr('cx');
//       var y = d3.select(this).attr('cy') - d3.select('.player').attr('cy');
//       var totalRadius = enemy[i].r + player.r;
//       var distance = Math.sqrt( Math.pow(x , 2) + Math.pow(y, 2) );
//       if(distance > totalRadius) {
//         counter++;
//         if(currentScore > highscore) {
//           highscore = currentScore;
//           d3.select('.highscore').text(highscore);
//         }
//       }
//       d3.select('.collisions span').text(counter);
//    }  
// };

// setInterval(collisionDetection, 30);


