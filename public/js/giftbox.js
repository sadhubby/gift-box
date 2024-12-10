// const click = document.querySelector('.click');
// const giftBox = document.querySelector('.gift-box');
// const shadow = document.querySelector('.shadow');

// click.addEventListener('click', () => {
//     if (click.classList.contains('active')) {
//         click.classList.remove('active');
//         giftBox.classList.remove('active');
//         shadow.classList.remove('active');
//     } else {
//         click.classList.add('active');
//         giftBox.classList.add('active');
//         shadow.classList.add('active');
//     }
// });

const click = document.querySelector('.click');
const giftBox = document.querySelector('.gift-box');
const shadow = document.querySelector('.shadow');

// Select the letter and overlay
const overlay = document.createElement('div');
overlay.classList.add('overlay');
document.body.appendChild(overlay);

const letter = document.createElement('div');
letter.classList.add('letter');
document.body.appendChild(letter);

const fetchLetterContent = async() =>{

    try{
        const response = await fetch('/api/letter');//to be replaced
        if(!response.ok) throw new Error("Failed to get letter content");
        const data = await response.json();

        letter.innerHTML= `
            <div class = "letter-content">
                <div class = "letter-body>
                    <div class="letter-body">
                    <p>Dear ${data.name}</p>
                    <p>${data.message}</p>
                    <p>My deepest regards, <br> Evan</p>
                    </div>
                </div>
                <button class = "close-button">Close</button>
            </div>
        `;
        const closeButton = letter.querySelector('.close-button');
        closeButton.addEventListener('click', () => {
            overlay.style.display = 'none';
            letter.style.display = 'none';
        });
    }catch(error){
        console.error("Error getting letter", error);
        letter.innerHTML = `<p>Failed to get content letter</p>`;
        closeButton.addEventListener('click', () => {
            overlay.style.display = 'none';
            letter.style.display = 'none';
        })
    }

}

// Add click event to the gift box
click.addEventListener('click', () => {
    if (click.classList.contains('active')) {
        click.classList.remove('active');
        giftBox.classList.remove('active');
        shadow.classList.remove('active');
    } else {
        click.classList.add('active');
        giftBox.classList.add('active');
        shadow.classList.add('active');
        
        setTimeout(() => {
            overlay.style.display = 'block';
            letter.style.display = 'block';
            fetchLetterContent();
        }, 700); // Adjust delay to sync with the gift box animation
    }
});

// const closeButton = letter.querySelector('.close-button');
// closeButton.addEventListener('click', () => {
//     overlay.style.display = 'none';
//     letter.style.display = 'none';
// });

overlay.addEventListener('click', () => {
    overlay.style.display = 'none';
    letter.style.display = 'none';
});
