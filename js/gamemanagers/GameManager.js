//is the ExperienceManager and always updates when you get exp. 
game.ExperienceManager = Object.extend({
    init: function() {
        this.alwaysUpdate = true;
        this.gameover = false;
    },
    update: function() {
        //If you destroy the enemy's base you win
        if (game.data.win === true && !this.gameover) {
            this.gameOver(true);
            //If you win it says YOU WIN
            alert("YOU WIN!");
            ////If the creep destroys the my base it wins
        } else if (game.data.win === false && !this.gameover) {
            this.gameOver(false);
            alert("YOU LOSE!");
            //If you lose it says YOU LOSE
        }
        return true;
    },
    //Is the gameover function
    gameOver: function(win) {
        if (win) {
            game.data.exp += 10;
        } else {
            game.data.exp += 1;
        }
        //Is saying if you win its gameover
        this.gameover = true;
        me.save.exp = game.data.exp;
        $.ajax({
        type: "POST",
                url: "php/controller/save-user.php",
                data: {
                exp: game.data.exp,
                        exp1: game.data.exp1,
                        exp2: game.data.exp2,
                        exp3: game.data.exp3,
                        exp4: game.data.exp4
                },
                dataType: "text"
        })
        //This function is being true to the response
                .success(function(response) {
                    if (response === "true") {
                        me.state.change(me.state.MENU);
                    } else {
                        alert(response);
                    }
                })
                .fail(function(response) {
                    alert("Fail");
                });
            }
        });