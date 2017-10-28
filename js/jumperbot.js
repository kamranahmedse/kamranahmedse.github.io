var JumperBot = function () {

    var canvas = document.getElementById('swingbot'),

        bot = {},
        bullet = {},
        bars = [],

    // Game variables
        barCount = 3,
        barWidth = 100,
        barHeight = 15,
        bulletSpeed = 15, // Higher it is, faster the bullet will be
        swingSpeed = 30,  // Higher it is, slower the bot will swing
        ropeThickness = 2, // Higher it is, thicker will the rope be

    // Do not change below this line unless you know exactly what you are doing
        scorePosX = 5,      // Position (x point) where score is to be displayed
        scorePosY = 15,     // Position (y point) where score is to be displayed
        firedPointX = 0,    // Exact `x` point where user clicked
        firedPointY = 0,    // Exact `y` point where user clicked
        barHitPointX = 0,   // Point on canvas where the bullet hit the bar
        barHitPointY = 0,   // Point on canvas where the bullet hit the bar
        barHit = false,     // Used to decide if the bullet hit the bar
        moveBars = false,   // Will decide if the bars are to be moved or not
        firedPointDist = 0, // Will be cotaining the distance between the bullet hit position and player position
        swingX = 0,         // Next x point where the bot will be while swinging
        swingY = 0,         // Next y point where the bot will be while swinging
        currScore = 0,
        topScore = 0,
        isActive = false,  // If the bot is in the move. False means the game is inactive
        botImg = '',       // Image object containing the robot image
        bulletFired = false,
        swingBot = false,     // Is the bot needed to swing (will happen whenever the rope will hit the bar)
        relAngleX, relAngleY, relFiredPointX, relFiredPointY; // These values will be relative to the current bot position

    canvas.width = 400;
    canvas.height = 500;

    context = canvas.getContext('2d');
    context.lineWidth = ropeThickness;

    /**
     * Sets the bullet defaults
     */
    function setBullet() {
        bullet.posX = 0;
        bullet.posY = 0;
        bullet.height = 4;
        bullet.width = 4;
    }

    /**
     * Sets the bot defaults
     */
    function setBot() {
        bot.width = 24;
        bot.height = 37;
        bot.posX = canvas.width / 2;
        bot.posY = canvas.height - bot.height - 50;

        botImg = new Image();
        botImg.src = "http://kamranahmed.info/img/bot.svg";
    }

    /**
     * Generates the bars along with their positions and populates them in the bar
     */
    function setBars() {
        // Generate the bars positions
        for (var i = 0; i < barCount; i++) {
            bars.push({
                posX: Math.random() * ( canvas.width / 2 ),
                posY: (( canvas.height / barCount ) * i) + 20     // So to make the bars span the whole height
            });
        }
        ;
    }

    /**
     * Sets up the variables to fire the bullet at specified position
     * @param  int posX X point on canvas which is to be fired at
     * @param  int posY     Y point on canvas which is to be fired at
     */
    function fireBullet(posX, posY) {
        // Reset the bar hit or it will start throwing the rope
        // ..instead of the bullet
        barHit = false;
        isActive = true;

        firedPointX = posX;
        firedPointY = posY;

        // Get the positions relative to the current bot position
        relFiredPointX = firedPointX - bot.posX;
        relFiredPointY = firedPointY - bot.posY;

        // Relative angles to the fire position
        relAngleX = relAngleY = Math.atan2(relFiredPointY, relFiredPointX) * 57.32;

        // Set the fired flag
        bulletFired = true;
    }

    /**
     * Populates the current score over top score on canvas
     */
    function populateScore() {
        context.fillText(currScore + '/' + topScore, scorePosX, scorePosY);
    }


    /**
     * Draws bars upon the canvas
     */
    function drawBars() {
        // Draw the bars
        for (var i = 0; i < barCount; i++) {

            if (bars[i].posY > canvas.height) {
                bars[i].posX = Math.random() * ( canvas.width / 2 );
                bars[i].posY = 0
            }

            // If the bars are to be moved
            if (moveBars) {
                bars[i].posY = bars[i].posY - swingY * 4;
            }
            ;

            context.fillRect(bars[i].posX, bars[i].posY, barWidth, barHeight);
        }
        ;
    }

    /**
     * Draws the player on the canvas
     */
    function drawPlayer() {
        // context.fillRect(bot.posX, bot.posY, bot.width, bot.height);
        context.drawImage(botImg, bot.posX, bot.posY);
    }

    /**
     * Checks if the game is over or not
     * @return {boolean} True if the game is over and false otherwise
     */
    function isGameOver() {
        return !isActive;
    }

    /**
     * To check if the specified bar number is hit by the bullet or not
     * @param  {integer}  barNum Bar number which is to be checked for the hit
     * @return {Boolean}        True if the bar is hit or false otherwise
     */
    function isNthBarHit(barNum) {
        return (
                bullet.posX >= bars[barNum].posX &&
                bullet.posX <= ( bars[barNum].posX + barWidth )
            ) && (
                bullet.posY >= bars[barNum].posY &&
                bullet.posY <= ( bars[barNum].posY + barHeight )
            );
    }

    /**
     * Handles the bullet fire. Function is to be called inside the game loop, where it sets the bullet visibility and movement is controlled
     */
    function handleBulletFire() {

        // If it is the first frame after bullet got fired
        if (!bullet.posX && !bullet.posY) {
            bullet.posX = bot.posX;
            bullet.posY = bot.posY;
        }
        ;

        // Increment the bullet position so that it may move to the position
        // ..towards which it is fired
        bullet.posX += Math.cos(relAngleX * 0.017) * bulletSpeed;
        bullet.posY -= Math.sin(relAngleY * -0.017) * bulletSpeed;

        // If the bullet tries to go outside the canvas in sideways
        if (( bullet.posX > canvas.width ) || ( bullet.posX < 0 )) {
            // To divert the bullet in the reverse direction
            relAngleX = relAngleX - relAngleY;
        }
        ;

        // To check if the bullet has hit any of the bars
        for (var i = 0; i < barCount; i++) {

            // If the bullet's current position overlaps with 
            // any of the bars
            if (isNthBarHit(i)) {
                // No bullet fired, it was a bar hit
                bulletFired = false;
                barHit = true;

                // Since the bot has got a rope in his hand
                // ..now swing
                swingBot = true;

                // Change the fired point, as this is the point where the rope will be thrown
                firedPointX = bullet.posX;
                firedPointY = bullet.posY;

                // Reset the bullet position
                bullet.posX = bullet.posY = 0;

                return;
            }
            ;

            barHit = false;
        }
        ;

        // Show the bullet
        context.fillRect(bullet.posX, bullet.posY, bullet.width, bullet.height);

        // If the bullet goes out of the top of canvas
        if (bullet.posY < 0) {
            // Reset that bullet
            bullet.posX = bullet.posY = 0;
            bulletFired = false
        }
        ;
    }

    /**
     * Resets the game i.e. bars, bullet and bot positions and other required variables
     */
    function resetGame() {
        // Reset everything
        setBars();
        setBullet();
        setBot();

        swingX = swingY = firedPointX = firedPointY = firedPointDist = 0;
        relAngleX = relAngleY = 0;
        moveBars = barHit = swingBot = false;

        if (currScore > topScore) {
            topScore = currScore;
        }
        ;

        currScore = 0;
    }

    /**
     * Game loop i.e. which is to be called infinitely
     */
    function gameLoop() {
        // Clear the canvas
        context.clearRect(0, 0, canvas.width, canvas.height);

        populateScore();
        drawPlayer();
        drawBars();

        if (!isGameOver()) {

            // If the bullet gets fired
            if (bulletFired) {
                handleBulletFire();
            }
            ;

            if (moveBars) {
                firedPointY = firedPointY - swingY * 4;

                // Increase the score only if the bars are moving
                currScore++;
            }

            // If the bar was hit and the fired point is not below the bot
            // bot.posY > ( firedPointY + 20 ) because we want the bot to leave the rope if the hook goes lower to him
            if (barHit && bot.posY > ( firedPointY + 20 )) {
                context.beginPath();
                // Changed the `x` a bit, so that the rope comes out of the head of the bot
                context.moveTo((bot.posX + bot.width / 2), bot.posY);
                context.lineTo(firedPointX, firedPointY);
                context.stroke();

                firedPointDist = Math.sqrt(Math.pow((bot.posX - firedPointX), 2) + Math.pow((bot.posY - firedPointY), 2));

                swingX += ( firedPointX - bot.posX ) / (firedPointDist * swingSpeed);
                swingY += ( firedPointY - bot.posY ) / (firedPointDist * swingSpeed);

            } else {
                barHit = false;
            }
            ;

            // If the bot is within the visible canvas
            if (swingY > 0) {
                moveBars = false;
            }
            ;

            // To simulate gravity i.e. the bot may 
            // get slowly pulled down
            swingY += 0.01;

            moveBars || (bot.posY += swingY * 4);
            bot.posX += swingX;

            // If the bot is about to reach the top
            if (bot.posY < ( canvas.width / 2 )) {
                moveBars = true;
            }
            ;

            // If the bot tries to go outside the canvas
            if (bot.posX < 0 || ( bot.posX + bot.width ) > canvas.width) {
                swingX = -swingX; // Swing it backward
            }
            ;

            // If the bot goes down the bottom of the canvas
            if (bot.posY > canvas.height) {
                isActive = false; // Bot is dead
            }
            ;

        } else {
            resetGame();
        }
    }

    /**
     * Makes sure that the game is in the loop
     */
    function startGame() {
        window.setInterval(gameLoop, 10);
    }

    return {

        /**
         * Initializes the game
         */
        init: function () {

            setBars();
            setBullet();
            setBot();

            this.bindUI();
            startGame();
        },

        /**
         * UI bindings
         */
        bindUI: function () {

            canvas.onclick = function (ev) {
                fireBullet(ev.clientX, ev.clientY);
            }

        }
    };
}
