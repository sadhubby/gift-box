// const click = document.querySelector('.click');
// const giftBox = document.querySelector('.gift-box');
// const shadow = document.querySelector('.shadow');

// // Select the letter and overlay
// const overlay = document.createElement('div');
// overlay.classList.add('overlay');
// document.body.appendChild(overlay);

// const letter = document.createElement('div');
// letter.classList.add('letter');
// document.body.appendChild(letter);

// const fetchLetterContent = async() =>{

//     try{
//         const response = await fetch('/api/letter');//to be replaced

//        if (response.status === 403) {
//             alert("Access denied: You cannot view this gift box.");
//             overlay.style.display = 'none';
//             letter.style.display = 'none';
//             return;
//         }

//         if(!response.ok) throw new Error("Failed to get letter content");

//         const data = await response.json();

//         letter.innerHTML= `
//             <div class = "letter-content">
//                 <div class = "letter-body>
//                     <div class="letter-body">
//                     <p>Dear ${data.name},</p>
//                     <p>${data.message}<br></p>
//                     <p>${data.greeting}<br> Evan</p>
//                     <p>P.S., go to the next page for your gift. </p>
//                     </div>
//                 </div>
//                 <button class = "close-button">Close</button>
//             </div>
//         `;
//         const closeButton = letter.querySelector('.close-button');
//         closeButton.addEventListener('click', () => {
//             overlay.style.display = 'none';
//             letter.style.display = 'none';
//         });
//     }catch(error){
//         console.error("Error getting letter", error);
//         letter.innerHTML = `<p>Failed to get content letter</p>`;
//         closeButton.addEventListener('click', () => {
//             overlay.style.display = 'none';
//             letter.style.display = 'none';
//         })
//     }

// }

// // Add click event to the gift box
// click.addEventListener('click', () => {
//     if (click.classList.contains('active')) {
//         click.classList.remove('active');
//         giftBox.classList.remove('active');
//         shadow.classList.remove('active');
//     } else {
//         click.classList.add('active');
//         giftBox.classList.add('active');
//         shadow.classList.add('active');
        
//         setTimeout(() => {
//             overlay.style.display = 'block';
//             letter.style.display = 'block';
//             fetchLetterContent();
//         }, 700); // Adjust delay to sync with the gift box animation
//     }
// });

// // const closeButton = letter.querySelector('.close-button');
// // closeButton.addEventListener('click', () => {
// //     overlay.style.display = 'none';
// //     letter.style.display = 'none';
// // });

// overlay.addEventListener('click', () => {
//     overlay.style.display = 'none';
//     letter.style.display = 'none';
// });
const click = document.querySelector('.click');
const giftBox = document.querySelector('.gift-box');
const shadow = document.querySelector('.shadow');

// Select or create overlay and letter elements
const overlay = document.createElement('div');
overlay.classList.add('overlay');
document.body.appendChild(overlay);

const letter = document.createElement('div');
letter.classList.add('letter');
document.body.appendChild(letter);

const fetchLetterContent = async () => {
    try {
        const response = await fetch('/api/letter'); // Replace this with your actual endpoint

        if (response.status === 403) {
            alert("Access denied: You cannot view this gift box.");
            overlay.style.display = 'none';
            letter.style.display = 'none';
            return;
        }

        if (!response.ok) throw new Error("Failed to get letter content");

        const data = await response.json();

        letter.innerHTML = `
            <div class="letter-content">
                <!-- Section 1: Message -->
                <div class="letter-section message-section">
                    <div class="letter-body">
                        <p>Dear ${data.name},</p>
                        <p>${data.message}</p>
                        <p>${data.greeting}<br>Evan</p>
                        <p>P.S., go to the next page for your gift.</p>
                    </div>
                    <button class="close-button">Close</button>
                    <button class="next-button">
                        <img src="/path-to-your-next-image.png" alt="Next" class="next-image">
                    </button>
                </div>
                <!-- Section 2: Gift -->
                <div class="letter-section gift-section" style="display: none;">
                    <div class="letter-body">
                        <p>Your gift: ${data.gift}</p>
                    </div>
                    <button class="close-button">Close</button>
                </div>
            </div>
        `;

        // Add functionality to buttons
        const nextButton = letter.querySelector('.next-button');
        const closeButtons = letter.querySelectorAll('.close-button'); // Both sections have close buttons
        const messageSection = letter.querySelector('.message-section');
        const giftSection = letter.querySelector('.gift-section');

        nextButton.addEventListener('click', () => {
            messageSection.style.display = 'none';
            giftSection.style.display = 'block';
        });

        closeButtons.forEach((closeButton) => {
            closeButton.addEventListener('click', () => {
                overlay.style.display = 'none';
                letter.style.display = 'none';
            });
        });
    } catch (error) {
        console.error("Error getting letter:", error);

        letter.innerHTML = `
            <div class="letter-content">
                <div class="letter-body">
                    <p>Failed to get content letter.</p>
                </div>
                <button class="close-button">Close</button>
            </div>
        `;

        const closeButton = letter.querySelector('.close-button');
        closeButton.addEventListener('click', () => {
            overlay.style.display = 'none';
            letter.style.display = 'none';
        });
    }
};

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

// Close overlay when clicking outside the letter
overlay.addEventListener('click', (e) => {
    if (e.target === overlay) { // Only close if clicking on the overlay, not the letter itself
        overlay.style.display = 'none';
        letter.style.display = 'none';
    }
});
