var playerMoney = 10;

var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;

console.log(playerName, playerHealth, playerAttack);

var enemyName = "Bender Rodriguez";
var enemyHealth = 100;
var enemyAttack = 10;

console.log(enemyName, enemyHealth, enemyAttack);

var fight = function(){
    window.alert("Welcome to Robot Gladiators!");

    var promptFight =  window.prompt("Would you like to FIGHT or SKIP this battle?");

    if (promptFight === "fight" || promptFight === "FIGHT") {
        enemyHealth = enemyHealth - playerAttack;

        console.log(playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining.");

        if (enemyHealth <= 0){
            window.alert(enemyName + " has died!");
        }
        else {
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
        }

        playerHealth = playerHealth - enemyAttack;

        console.log(enemyName + " attacked " + playerName +". " + playerName + " now has " + playerHealth + " health remaining.");

        if (playerHealth <= 0){
            window.alert(playerName + " has died!");
        }
        else {
            window.alert(playerName + " still has " + playerHealth + " health left.");
        }
    }
    else if (promptFight === "skip" || promptFight === "SKIP") {

        var confirmSkip = window.confirm("Are you sure you'd like to quit?");

        if (confirmSkip){
           window.alert(playerName + " has chosen to skip the fight!");
           playerMoney = playerMoney - 2; 
        }
        else {
            fight();
        }
    }
    else {
        window.alert("You must choose a valid option! Try again."); 
    }    
};

fight();
