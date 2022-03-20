var getPlayerName = function() {
  var name = "";

  while (name === "" || name === null) {
    name = prompt("What is your robot's name?");
  }
  console.log("Your robot's name is " + name + ". Nice name bro.");
  return name;
}

var playerInfo = {
  name: getPlayerName(),
  health: 100,
  attack: 10,
  money: 10,
  reset: function() {
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  },
  refillHealth: function() {
    if (this.money >= 7) {
      window.alert("Refilled health by 20 pts. for $7");
      this.health += 20;
      this.money -= 7;
    }
    else {
      window.alert("NOt enough money!");
    }
  },
  upgradeAttack: function() {
    if (this.money >= 7) {
      window.alert("Upgraded attack by 6 pts. for $7.");
      this.attack += 6;
      this.money -= 7;
    }
    else {
      window.alert("Not enough money!");
    }
  }
};

var randomNumber = function(min, max){
  var value = Math.floor(Math.random() * (max - min + 1) + min);
  return value;
};

var enemyInfo = [
  {
    name: "Bender",
    attack: randomNumber(10, 14)
  },
  {
    name: "DaBaby",
    attack: randomNumber(10, 14)
  },
  {
    name: "Bobby Shmurda",
    attack: randomNumber(10, 14)
  }
];

var fightOrSkip = function() {
  var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle?");

  if (promptFight === "" || promptFight === null) {
    window.alert("You must enter a valid response! Try again.");
    return fightOrSkip();
  }

  promptFight = promptFight.toLowerCase();

  if (promptFight === "skip"){
    var confirmSkip = window.confirm("Are you sure you'd like to quit?");
    if (confirmSkip) {
      window.alert(playerInfo.name + " has decided to skip this fight. See ya later alligator!");
      playerInfo.money = playerInfo.money - 10;
      return true;
    }
  }
  return false;
};


var fight = function(enemy) {
    while (playerInfo.health > 0 && enemy.health > 0) {
      if(fightOrSkip()){
        break;
      }
      // remove enemy's health by subtracting the amount set in the playerAttack variable
      var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
      enemy.health = Math.max(0, enemy.health - damage);
      console.log(playerInfo.name + ' attacked ' + enemy.name + '. ' + enemy.name + ' now has ' + enemy.health + ' health remaining.');
  
      // check enemy's health
      if (enemy.health <= 0) {
        window.alert(enemy.name + ' has died!');
  
        // award player money for winning
        playerInfo.money = playerInfo.money + 20;
        // leave while() loop since enemy is dead
        break;
      } else {
        window.alert(enemy.name + ' still has ' + enemy.health + ' health left.');
      }
  
      // remove players's health by subtracting the amount set in the enemyAttack variable
      var damage = randomNumber(enemy.attack - 3, enemy.attack);
      playerInfo.health = Math.max(0, playerInfo.health - damage);
      console.log(enemy.name + ' attacked ' + playerInfo.name + '. ' + playerInfo.name + ' now has ' + playerInfo.health + ' health remaining.');
  
      // check player's health
      if (playerInfo.health <= 0) {
        window.alert(playerInfo.name + ' has died!');
        // leave while() loop if player is dead
        break;
      } else {
        window.alert(playerInfo.name + ' still has ' + playerInfo.health + ' health left.');
      }
    } // end of while loop
  }; // end of fight function

var startGame = function(){
  playerInfo.reset();
  for(var i = 0; i < enemyInfo.length; i++){
    if (playerInfo.health > 0) {
      window.alert("Welcome to Robot Gladiators! Round " + ( i + 1 ) );
    
      var pickedEnemyObj = enemyInfo[i];
    
      pickedEnemyObj.health = randomNumber(40, 60);
    
      fight(pickedEnemyObj);

      if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
        var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
        if(storeConfirm){
          shop();
        }
      }
    } 
    else {
      window.alert("You have lost your robot in battle! Game Over.");
      break;
    }
  }
  endGame();
};

var endGame = function(){
  if (playerInfo.health > 0) {
    window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
  }
  else {
    window.alert("You've lost your robot in battle. Lol.")
  }
  var playAgainConfirm = window.confirm("Would you like to play again?");

  if (playAgainConfirm) {
    startGame();
  }
  else {
    window.alert("Thanks for playing! Come back soon!");
  }
};

var shop = function() {
  var shopOptionPrompt = window.prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Enter 1 to REFILL, 2 to UPGRADE, or 3 to LEAVE.");
  shopOptionPrompt = parseInt(shopOptionPrompt);
  switch (shopOptionPrompt) {
    case 1:
      playerInfo.refillHealth();
      break;
    case 2:
      playerInfo.upgradeAttack();
      break;
    case 3:
      window.alert("Leaving the store.");
      break;
    default:
      window.alert("You did not pick a valid option. Try again.");
      shop();
      break;
  }
};

startGame();