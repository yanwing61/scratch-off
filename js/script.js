var emojiCanvas = document.getElementById("emojiCanvas");
var emojiContext = emojiCanvas.getContext("2d");
var emojisDrawn = [];
var emojiTotal = 100;
var emojiCount = document.getElementById("countnum");
var countDiv = document.getElementById("count");


function loadEmoji() {
    emojiContext.clearRect(0, 0, emojiCanvas.width, emojiCanvas.height);

    for (var i = 0; i <= emojiTotal; i++) {
        //generate random position
        var x = Math.floor(Math.random() * 500) + 1;
        var y = Math.floor(Math.random() * 500) + 1;

        //generate a random emoji
        var emos = Math.floor(Math.random() * (127891 - 127744 + 1) + 127744);

        //prevent displaying invalid emojis
        while (emos === 127778 || emos === 127779) {
            emos = Math.floor(Math.random() * (127891 - 127744 + 1) + 127744);
        }
        
        var emoji = String.fromCodePoint(emos);
        
        emojiContext.fillText(emoji, x, y);
        emojisDrawn.push({
            emoji: emoji,
            x: x,
            y: y,
            revealed: false
        });
    }
}

window.onload = function() {
    loadEmoji();
};


var scratchCanvas = document.getElementById("scratchCanvas");
var scratchContext = scratchCanvas.getContext("2d");

scratchContext.fillStyle = "#FFF";
scratchContext.fillRect(0, 0, scratchCanvas.width, scratchCanvas.height);

function pickColor() {
    var colorPicker = document.createElement('input');
    colorPicker.type = 'color';
    colorPicker.addEventListener('change', function() {
        setColor(colorPicker.value);
    });
    colorPicker.click();
}

function setColor(color) {
    // fill the canvas with the chosen color
    scratchContext.fillStyle = color;
    scratchContext.fillRect(0, 0, scratchCanvas.width, scratchCanvas.height);
    countDiv.style.display = "block";
}


var x = null;
var y = null;
var previousX = null;
var previousY = null;
var distance = 0;

scratchCanvas.addEventListener('mousemove', function(event){
    // adjusting the mouse position with the browser position
    var rect = scratchCanvas.getBoundingClientRect();

    previousX = x;
    previousY = y;

    x = event.clientX - rect.left;
    y = event.clientY - rect.top;

    if(previousX != null){

        var distanceX = Math.round(x - previousX);
        if (distanceX < 0) distanceX *= -1;

        var distanceY = Math.round(y - previousY);
        if (distanceY < 0) distanceY *= -1;

        distance = Math.hypot(distanceX, distanceY);
        scratchContext.beginPath();

        scratchContext.lineWidth = 1;
        scratchContext.clearRect(x, y, distance, distance)
        calRevealed();
    }
});



emojiCount.innerHTML = 0;

function calRevealed() {
    const scratchData = scratchContext.getImageData(0, 0, scratchCanvas.width, scratchCanvas.height);
    let revealedCount = 0;

    emojisDrawn.forEach(emojiObj => {
        if (!emojiObj.revealed) {
            const isRevealed = checkEmojiReveal(emojiObj, scratchData);
            if (isRevealed) {
                emojiObj.revealed = true;
                revealedCount++;
            }
        } else {
            revealedCount++;
        }
    });
    
    if (revealedCount >= emojiTotal){
        countDiv.classList.add("congrats");
        emojiCount.innerHTML = revealedCount + " &#127880; Congrats! You've scratched all the emojis! &#127882;";
    } else {
        emojiCount.innerHTML = revealedCount;
    } 
    
}

// Check if a significant portion of the emoji at (emojiObj.x, emojiObj.y) has been revealed in the scratchData.
// Check if more than half of this area is cleared.
function checkEmojiReveal(emojiObj, scratchData) {

    let clearedPixels = 0;
    for (let i = -10; i <= 10; i++) {
        for (let j = -10; j <= 10; j++) {
            const x = emojiObj.x + i;
            const y = emojiObj.y + j;
            const index = (y * scratchCanvas.width + x) * 4;
            if (scratchData.data[index + 3] === 0) {
                clearedPixels++;
            }
        }
    }

    return clearedPixels > (20 * 20 / 2);  // more than half cleared
}
    

// Reload the page
var reset = document.getElementById("reset");

reset.addEventListener('click', function() {
    location.reload(); 
});