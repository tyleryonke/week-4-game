var char1 = document.getElementById('foxButton');
	char1.name = "Fox";
	char1.healthPoints = 120;
	char1.maxHealth = 120;
	char1.attackPower = 0;
	char1.attackPowerGain = 8;
	char1.counterAttackPower = 10;

var char2 = document.getElementById('marioButton');
	char2.name = "Mario";
	char2.pngsrc = 'assest/images/mario.png';
	char2.healthPoints = 105;
	char2.maxHealth = 105;
	char2.attackPower = 0;
	char2.attackPowerGain = 14;
	char2.counterAttackPower = 5;
	
var char3 = document.getElementById('nessButton');
	char3.name = "Ness";
	char3.healthPoints = 150;
	char3.maxHealth = 150;
	char3.attackPower = 0;
	char3.attackPowerGain = 7;
	char3.counterAttackPower = 10;

var char4 = document.getElementById('handButton');
	char4.name = "Master Hand";
	char4.healthPoints = 160;
	char4.maxHealth = 160;
	char4.attackPower = 0;
	char4.attackPowerGain = 2;
	char4.counterAttackPower = 20;

var foxSound = document.getElementById('foxSound');
var marioSound = document.getElementById('marioSound');
var nessSound = document.getElementById('nessSound');
var handSound = document.getElementById('handSound');

var successSound = document.getElementById('successSound');
var failureSound = document.getElementById('failureSound');

var currentPlayer;
var currentEnemy;


function gameStart() {
		$("#foxButton").html( "<img src=assets/images/fox.png><br>" + char1.name + "<hr><progress value=" + char1.healthPoints + " max=" + char1.maxHealth + "></progress><span class='hpText'>HP: " + char1.healthPoints + "</span>");
		$("#marioButton").html( "<img src=assets/images/mario.png><br>" + char2.name + "<hr><progress value=" + char2.healthPoints + " max=" + char2.maxHealth + "></progress><span class='hpText'>HP: " + char2.healthPoints + "</span>");
		$("#nessButton").html( "<img id='nessImage' src=assets/images/ness.png><br>" + char3.name + "<hr><progress value=" + char3.healthPoints + " max=" + char3.maxHealth + "></progress><span class='hpText'>HP: " + char3.healthPoints + "</span>");
		$("#handButton").html( "<img src=assets/images/hand.png><br>" + char4.name + "<hr><progress value=" + char4.healthPoints + " max=" + char4.maxHealth + "></progress><span class='hpText'>HP: " + char4.healthPoints + "</span>");
		$('#fullEnemyZone').hide();
		$('#fullFightZone').hide();
	choosePlayer();
}

function choosePlayer() {
	$('.classBtn').on('click', function() {
		if ( $('#enemyZone').is(':empty') ) {
			$(this).data('clicked', 'yes');
			currentPlayer = this;
			$("#playerChoiceHead").html("Current Player:")
				$('.btn').each(function() {
					if( $(this).data('clicked') == 'yes') {
				   		
					} 
					else {
						$(this).data('enemy', 'yes');
				       	$("#enemyZone").append( $(this));
					}	    
				});
			if (currentPlayer.name == "Fox") {
				foxSound.play();
			}
			if (currentPlayer.name == "Mario") {
				marioSound.play();
			}
			if (currentPlayer.name == "Ness") {
				nessSound.play();
			}
			if (currentPlayer.name == "Master Hand") {
				handSound.play();
			}
			$('#fullEnemyZone').show();
			chooseEnemy();
		}
    })
}

function chooseEnemy() {
	$('.classBtn').on('click', function() {
		if( $(this).data('enemy') == 'yes' && $('#fightZone').is(':empty') ) {
			$('#fullFightZone').show();
			$("#fightZone").append( "<button id='attack'>Attack!</button>" );
			$("#fightZone").append( $(this));
			currentEnemy = this;
			$(this).data('enemy', 'current');
			if (currentEnemy.name == "Fox") {
				foxSound.play();
			}
			if (currentEnemy.name == "Mario") {
				marioSound.play();
			}
			if (currentEnemy.name == "Ness") {
				nessSound.play();
			}
			if (currentEnemy.name == "Master Hand") {
				handSound.play();
			}
			$('.enemyDefeatedText').remove();
			$('#playerZone').append("<div id='combatLog'><span id='logBold'>Combat Log:</span></div>");
			if ( $('#enemyZone').is(':empty') ) {
				$('#fullEnemyZone').hide();
			}
			$('#fullEnemyZone').hide();
			setTimeout(function() {readySound.play()}, 1500);
			battle();
		}
	})
}

function battle() {
	$('#attack').on('click', function() {
		currentPlayer.healthPoints = currentPlayer.healthPoints - currentEnemy.counterAttackPower;
		currentPlayer.attackPower = currentPlayer.attackPower + currentPlayer.attackPowerGain;
		currentEnemy.healthPoints = currentEnemy.healthPoints - currentPlayer.attackPower;
		$("#foxButton").html( "<img src=assets/images/fox.png><br>" + char1.name + "<hr><progress value=" + char1.healthPoints + " max=" + char1.maxHealth + "></progress><span class='hpText'>HP: " + char1.healthPoints + "</span>");
		$("#marioButton").html( "<img src=assets/images/mario.png><br>" + char2.name + "<hr><progress value=" + char2.healthPoints + " max=" + char2.maxHealth + "></progress><span class='hpText'>HP: " + char2.healthPoints + "</span>");
		$("#nessButton").html( "<img id='nessImage' src=assets/images/ness.png><br>" + char3.name + "<hr><progress value=" + char3.healthPoints + " max=" + char3.maxHealth + "></progress><span class='hpText'>HP: " + char3.healthPoints + "</span>");
		$("#handButton").html( "<img src=assets/images/hand.png><br>" + char4.name + "<hr><progress value=" + char4.healthPoints + " max=" + char4.maxHealth + "></progress><span class='hpText'>HP: " + char4.healthPoints + "</span>");
		$("#combatLog").html("<span id='logBold'>Combat Log:</span><br> You did " + currentPlayer.attackPower + " damage to " + currentEnemy.name + "!<br>" + currentEnemy.name + " did " + currentEnemy.counterAttackPower + " damage to you!");
		if (currentPlayer.healthPoints <= 0){
			$("#playerZone").append( "<h3 id='lossText'>You have been defeated!</h3><br><button id='resetButton'><span class='rainbow'>Click here to play again!</span></button>" );
				$("#fullEnemyZone").remove();
				$("#fullFightZone").remove();
				failureSound.play();
				$("#attack").remove();
				resetGame();
		}
		else if (currentEnemy.healthPoints <= 0) {
			$('#attack').remove();
			$('#combatLog').remove();
			$(currentEnemy).remove();
			$('#fullFightZone').hide();
			successSound.play();
			$("#playerZone").append( "<h3 class='enemyDefeatedText'>You have defeated " + currentEnemy.name + "!</h3>" );
			chooseEnemy();
			if ( $('#enemyZone').is(':empty') ) {
				$("#fullEnemyZone").remove();
				$("#playerZone").append( "<h3 id='winText'>You win!</h3><br><button id='resetButton'><span class='rainbow'>Click here to play again!</span></button>" );
				resetGame();
			}
			else {
				$("#playerZone").append( " <h3 class='enemyDefeatedText'>Choose a new enemy:</h3>" );
				$('#fullEnemyZone').show();
			}
		}
	})
}

function resetGame() {
	$('#resetButton').on('click', function() {
		location.reload();
	})
}

gameStart();