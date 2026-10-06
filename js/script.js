// ---------------------------------------------------slaider---------------------------------------------------

const revContainer = document.querySelector('.rev-slider-box');
const revTrack = document.getElementById('revTrack');
const revPrevBtn = document.getElementById('revPrevBtn');
const revNextBtn = document.getElementById('revNextBtn');

let revOriginalCards = Array.from(revTrack.children);
const revOriginalCount = revOriginalCards.length;

let revVisibleCards = getRevVisibleCardsCount();
let revCurrentIndex = revVisibleCards; 
let revIsTransitioning = false;
let revAutoTimer = null;
const REV_INTERVAL = 4000;

// Drag / Swipe State Variables
let revIsDragging = false;
let revStartX = 0;
let revCurrentTranslate = 0;
let revPrevTranslate = 0;
const REV_DRAG_THRESHOLD = 50;

// 1. Inject duplicate elements at both ends to create infinite structural zones
revOriginalCards.forEach(card => {
  const clone = card.cloneNode(true);
  clone.classList.add('rev-card-clone');
  revTrack.appendChild(clone);
});

for (let i = revOriginalCount - 1; i >= 0; i--) {
  const clone = revOriginalCards[i].cloneNode(true);
  clone.classList.add('rev-card-clone');
  revTrack.insertBefore(clone, revTrack.firstChild);
}

// 2. Identify display viewport bounds
function getRevVisibleCardsCount() {
  if (window.innerWidth <= 600) return 1;
  if (window.innerWidth <= 992) return 2;
  return 3;
}

function getRevCardWidthAndGap() {
  const cards = revTrack.children;
  if (cards.length === 0) return { cardWidth: 0, gap: 24 };
  const cardWidth = cards[0].getBoundingClientRect().width;
  return { cardWidth, gap: 24 };
}

// Helper function to dynamically assign/update the center active class
function updateCenterCardHighlight() {
  const allCards = Array.from(revTrack.children);
  allCards.forEach(card => card.classList.remove('rev-center-active'));

  // Determine the index of the visual center card based on viewport count
  let centerOffset = 1; // For 3 visible cards, index + 1 is the middle card
  if (revVisibleCards === 1) {
    centerOffset = 0;
  } else if (revVisibleCards === 2) {
    centerOffset = 0;
  }

  const targetIndex = revCurrentIndex + centerOffset;
  if (allCards[targetIndex]) {
    allCards[targetIndex].classList.add('rev-center-active');
  }
}

function moveRevSlider(animate = true) {
  if (revIsDragging) return;
  
  const { cardWidth, gap } = getRevCardWidthAndGap();
  const offset = revCurrentIndex * (cardWidth + gap);

  if (animate) {
    revTrack.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
  } else {
    revTrack.style.transition = 'none';
  }
  
  revCurrentTranslate = -offset;
  revPrevTranslate = revCurrentTranslate;
  revTrack.style.transform = `translateX(${revCurrentTranslate}px)`;

  updateCenterCardHighlight(); // Updates the center shadow highlight on every move
}

// 3. Handle seamless wrapping at loop boundaries
revTrack.addEventListener('transitionend', () => {
  revIsTransitioning = false;
  
  if (revCurrentIndex >= revOriginalCount + revVisibleCards) {
    revTrack.style.transition = 'none';
    revCurrentIndex = revCurrentIndex - revOriginalCount;
    moveRevSlider(false);
  } else if (revCurrentIndex < revVisibleCards) {
    revTrack.style.transition = 'none';
    revCurrentIndex = revCurrentIndex + revOriginalCount;
    moveRevSlider(false);
  }
});

// 4. Directional control triggers
function handleRevNext() {
  if (revIsTransitioning || revIsDragging) return;
  revIsTransitioning = true;
  revCurrentIndex++;
  moveRevSlider(true);
}

function handleRevPrev() {
  if (revIsTransitioning || revIsDragging) return;
  revIsTransitioning = true;
  revCurrentIndex--;
  moveRevSlider(true);
}

revNextBtn.addEventListener('click', handleRevNext);
revPrevBtn.addEventListener('click', handleRevPrev);

// 5. Rotation Engine Functions
function startRevAutoRotate() {
  if (revAutoTimer) return;
  revAutoTimer = setInterval(handleRevNext, REV_INTERVAL);
}

function stopRevAutoRotate() {
  clearInterval(revAutoTimer);
  revAutoTimer = null;
}

revContainer.addEventListener('mouseenter', stopRevAutoRotate);
revContainer.addEventListener('mouseleave', () => {
  if (!revIsDragging) startRevAutoRotate();
});

// 6. Mouse Dragging & Pointer Event Logic
function revDragStart(e) {
  if (revIsTransitioning) return;
  revIsDragging = true;
  stopRevAutoRotate();
  
  revStartX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
  revTrack.style.transition = 'none';
  revContainer.classList.add('rev-is-grabbing');
}

function revDragMove(e) {
  if (!revIsDragging) return;
  
  const currentX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
  const currentXDiff = currentX - revStartX;
  
  revCurrentTranslate = revPrevTranslate + currentXDiff;
  revTrack.style.transform = `translateX(${revCurrentTranslate}px)`;
  
  e.preventDefault();
}

function revDragEnd() {
  if (!revIsDragging) return;
  revIsDragging = false;
  revContainer.classList.remove('rev-is-grabbing');
  
  const movedBy = revCurrentTranslate - revPrevTranslate;
  
  if (movedBy < -REV_DRAG_THRESHOLD) {
    revCurrentIndex++;
  } else if (movedBy > REV_DRAG_THRESHOLD) {
    revCurrentIndex--;
  }
  
  moveRevSlider(true);
  startRevAutoRotate();
}

revTrack.addEventListener('mousedown', revDragStart);
window.addEventListener('mousemove', revDragMove);
window.addEventListener('mouseup', revDragEnd);

revTrack.addEventListener('touchstart', revDragStart, { passive: true });
window.addEventListener('touchmove', revDragMove, { passive: false });
window.addEventListener('touchend', revDragEnd);

window.addEventListener('resize', () => {
  revVisibleCards = getRevVisibleCardsCount();
  moveRevSlider(false);
});

// 7. Component Launch
setTimeout(() => {
  moveRevSlider(false);
  startRevAutoRotate();
}, 50);

// ---------------------------------------------------slaider---------------------------------------------------




//  -------------------------------------------- Decrees and prayers -------------------------------------------
//  ------------------------------------------------ Authority ------------------------------------------------
function toggleAccordion(header) {
    const currentPra = header.nextElementSibling;
    const isAlreadyOpen = currentPra.classList.contains('open');

    // 1. Sabhi sections ko band kar do aur inactive classes set karo
    const allPras = document.querySelectorAll('.pra');
    const allHeaders = document.querySelectorAll('.accordion-header');
    
    allPras.forEach(pra => pra.classList.remove('open'));
    allHeaders.forEach(h => {
        h.classList.remove('active');
        h.classList.add('inactive');
    });

    // 2. Agar clicked section pehle se open nahi tha, toh use open karo
    if (!isAlreadyOpen) {
        currentPra.classList.add('open');
        header.classList.remove('inactive');
        header.classList.add('active');
    }
}
