const click = document.querySelector('.click');
const giftBox = document.querySelector('.gift-box');
const shadow = document.querySelector('.shadow');

click.addEventListener('click', () => {
    if (click.classList.contains('active')) {
        click.classList.remove('active');
        giftBox.classList.remove('active');
        shadow.classList.remove('active');
    } else {
        click.classList.add('active');
        giftBox.classList.add('active');
        shadow.classList.add('active');
    }
});