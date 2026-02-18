/**
 * Pong Game To-Do List
 * 
 * Step 1: Start Your Game
 * 
 * ☐ Open MakeCode Arcade
 * 
 * ☐ Click New Project
 * 
 * ☐ Name it Multiplayer Pong
 * 
 * Step 2: Make Paddle 1
 * 
 * ☐ Create a new sprite
 * 
 * ☐ Make it tall like a paddle
 * 
 * ☐ Put it on the left side of the screen
 * 
 * ☐ Make sure it stays in the screen
 * 
 * Step 3: Make Paddle 2
 * 
 * ☐ Create another sprite
 * 
 * ☐ Make it tall like a paddle
 * 
 * ☐ Put it on the right side of the screen
 * 
 * ☐ Make sure it stays in the screen
 * 
 * Step 4: Make the Ball
 * 
 * ☐ Create a small square sprite
 * 
 * ☐ Put it in the middle of the screen
 * 
 * ☐ Make it move using velocity
 * 
 * ☐ Make it bounce off walls
 * 
 * Step 5: Add Controls
 * 
 * Player 1
 * 
 * ☐ Move paddle up
 * 
 * ☐ Move paddle down
 * 
 * Player 2
 * 
 * ☐ Move paddle up
 * 
 * ☐ Move paddle down
 * 
 * Step 6: Make the Ball Bounce
 * 
 * ☐ Detect when the ball touches a paddle
 * 
 * ☐ Reverse the ball's X direction
 * 
 * (Hint: Use set velocity block)
 * 
 * Step 7: Add Scoring
 * 
 * ☐ Detect when the ball goes off the left side
 * 
 * ☐ Give Player 2 a point
 * 
 * ☐ Detect when the ball goes off the right side
 * 
 * ☐ Give Player 1 a point
 * 
 * Step 8: Reset the Ball
 * 
 * ☐ Destroy the old ball
 * 
 * ☐ Create a new one in the middle
 * 
 * Step 9: Test Your Game!
 * 
 * ☐ Do paddles move?
 * 
 * ☐ Does the ball bounce?
 * 
 * ☐ Does scoring work?
 */
// Bonus Challenges (Optional)
// 
// - Make the ball go faster over time
// 
// - Add sound when the ball hits a paddle
// 
// - Add a win screen
// 
// - Change paddle colors
function createBall () {
    ball = sprites.create(img`
        . 2 2 . 
        2 2 2 2 
        2 2 2 2 
        . 2 2 . 
        `, SpriteKind.Projectile)
    ball.setPosition(80, 60)
    ball.setVelocity(randint(-60, 60), randint(-40, 40))
    ball.setBounceOnWall(true)
}
// Ball hits paddle (Block-safe bounce)
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Player, function (sprite, otherSprite) {
    sprite.setVelocity(sprite.vx * -1, sprite.vy)
})
let player1Score = 0
let player2Score = 0
let ball: Sprite = null
// Create paddles
let paddle1 = sprites.create(img`
    . . 5 5 . . 
    . . 5 5 . . 
    . . 5 5 . . 
    . . 5 5 . . 
    . . 5 5 . . 
    . . 5 5 . . 
    `, SpriteKind.Player)
paddle1.setPosition(10, 60)
paddle1.setStayInScreen(true)
let paddle2 = sprites.create(img`
    . . 9 9 . . 
    . . 9 9 . . 
    . . 9 9 . . 
    . . 9 9 . . 
    . . 9 9 . . 
    . . 9 9 . . 
    `, SpriteKind.Player)
paddle2.setPosition(150, 60)
paddle2.setStayInScreen(true)
createBall()
// Player 1 Controls (W/S)
game.onUpdate(function () {
    if (controller.player1.isPressed(ControllerButton.Up)) {
        paddle1.y += -3
    }
    if (controller.player1.isPressed(ControllerButton.Down)) {
        paddle1.y += 3
    }
})
// Player 2 Controls (Arrow Keys)
game.onUpdate(function () {
    if (controller.player2.isPressed(ControllerButton.Up)) {
        paddle2.y += -3
    }
    if (controller.player2.isPressed(ControllerButton.Down)) {
        paddle2.y += 3
    }
})
// Scoring system
game.onUpdate(function () {
    if (ball.x < 0) {
        player2Score += 1
        info.setScore(player2Score)
        ball.destroy()
        pause(500)
        createBall()
    }
    if (ball.x > 160) {
        player1Score += 1
        info.setScore(player1Score)
        ball.destroy()
        pause(500)
        createBall()
    }
})
