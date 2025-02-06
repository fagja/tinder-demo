const profiles = [
    {
        name: "田中 花子",
        age: 25,
        description: "旅行と写真が好きです。新しい場所を探検するのが趣味です。",
        images: [
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400",
            "https://picsum.photos/400/400?random=2",
            "https://picsum.photos/400/400?random=3"
        ],
        details: {
            location: "東京都",
            occupation: "写真家",
            hobbies: ["写真撮影", "旅行", "カフェ巡り"],
            education: "写真専門学校",
            about: "写真を通じて人々の心に残る瞬間を切り取ることが私の使命です。"
        }
    },
    {
        name: "佐藤 太郎",
        age: 28,
        description: "音楽とカフェ巡りが好きです。ギターを演奏します。",
        images: [
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400",
            "https://picsum.photos/400/400?random=5",
            "https://picsum.photos/400/400?random=6"
        ],
        details: {
            location: "大阪府",
            occupation: "ミュージシャン",
            hobbies: ["ギター", "作曲", "カフェ巡り"],
            education: "音楽大学",
            about: "音楽で人々を幸せにすることが目標です。"
        }
    },
    {
        name: "山本 美咲",
        age: 23,
        description: "音楽とダンスが大好きです。",
        images: [
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400",
            "https://picsum.photos/400/400?random=8",
            "https://picsum.photos/400/400?random=9"
        ],
        details: {
            location: "福岡県",
            occupation: "ダンサー",
            hobbies: ["ダンス", "ヨガ", "料理"],
            education: "ダンスアカデミー",
            about: "表現することが大好きです。"
        }
    },
    {
        name: "鈴木 陽子",
        age: 27,
        description: "アート好きのフリーランスデザイナーです。",
        images: [
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400",
            "https://picsum.photos/400/400?random=9",
            "https://picsum.photos/400/400?random=10"
        ],
        details: {
            location: "福岡県",
            occupation: "グラフィックデザイナー",
            hobbies: ["絵画", "美術館巡り", "読書"],
            education: "芸術大学",
            about: "デザインで世界をより美しくしたいと考えています。"
        }
    }
];

let currentProfileIndex = 0;
let currentImageIndex = 0;

// ドラッグ関連の変数を調整
let startX = 0;
let currentX = 0;
let isDragging = false;
let initialTouchTime = 0;
const SWIPE_THRESHOLD = 100; // スワイプのしきい値
const CLICK_THRESHOLD = 200; // クリックとみなす時間（ミリ秒）

function createCard(profile) {
    const card = document.createElement('div');
    card.className = 'card';

    const content = `
        <div class="swipe-overlay">
            <div class="overlay-section left"></div>
            <div class="overlay-section center"></div>
            <div class="overlay-section right"></div>
            <div class="overlay-text overlay-left">NOPE</div>
            <div class="overlay-text overlay-right">LIKE</div>
        </div>
        <div class="image-container">
            <div class="image-slider">
                ${profile.images.map(image => `<img src="${image}" alt="Profile Photo">`).join('')}
            </div>
            <div class="image-dots">
                ${profile.images.map((_, i) => `<div class="dot ${i === 0 ? 'active' : ''}"></div>`).join('')}
            </div>
            <button class="nav-button prev-button" onclick="event.stopPropagation(); previousImage()">❮</button>
            <button class="nav-button next-button" onclick="event.stopPropagation(); nextImage()">❯</button>
            <div class="profile-info">
                <h2>${profile.name}, ${profile.age}</h2>
                <p>${profile.description}</p>
                <button class="details-button" onclick="event.stopPropagation(); toggleDetails()">詳細を表示</button>
            </div>
        </div>
        <div class="profile-details">
            <div class="details-content">
                <h3>プロフィール詳細</h3>
                <div class="detail-item">
                    <span class="label">居住地:</span>
                    <span class="value">${profile.details.location}</span>
                </div>
                <div class="detail-item">
                    <span class="label">職業:</span>
                    <span class="value">${profile.details.occupation}</span>
                </div>
                <div class="detail-item">
                    <span class="label">趣味:</span>
                    <span class="value">${profile.details.hobbies.join(', ')}</span>
                </div>
                <div class="detail-item">
                    <span class="label">学歴:</span>
                    <span class="value">${profile.details.education}</span>
                </div>
                <div class="detail-item">
                    <span class="label">自己紹介:</span>
                    <span class="value">${profile.details.about}</span>
                </div>
                <button class="close-details" onclick="toggleDetails()">閉じる</button>
            </div>
        </div>
    `;

    card.innerHTML = content;
    return card;
}

function showImage(index) {
    if (!profiles[currentProfileIndex]) return;

    currentImageIndex = index;
    const slider = document.querySelector('.image-slider');
    if (!slider) return;

    // トランジションをスムーズにする
    slider.style.transition = 'transform 0.3s ease-out';
    slider.style.transform = `translateX(-${index * 100}%)`;

    // ドットの更新
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function nextImage() {
    event.stopPropagation(); // イベントの伝播を停止
    const totalImages = profiles[currentProfileIndex].images.length;
    const nextIndex = (currentImageIndex + 1) % totalImages;
    showImage(nextIndex);
}

function previousImage() {
    event.stopPropagation(); // イベントの伝播を停止
    const totalImages = profiles[currentProfileIndex].images.length;
    const prevIndex = (currentImageIndex - 1 + totalImages) % totalImages;
    showImage(prevIndex);
}

function toggleDetails() {
    const details = document.querySelector('.profile-details');
    details.classList.toggle('active');
}

function loadNextProfile() {
    currentProfileIndex++;
    currentImageIndex = 0;

    if (currentProfileIndex < profiles.length) {
        const cardContainer = document.querySelector('.card-container');
        const newCard = createCard(profiles[currentProfileIndex]);

        // 既存のカードを削除
        const existingCard = cardContainer.querySelector('.card');
        if (existingCard) {
            cardContainer.removeChild(existingCard);
        }

        cardContainer.appendChild(newCard);
        initializeDragEvents(newCard);

        // 詳細表示を閉じる
        const details = document.querySelector('.profile-details');
        if (details) {
            details.classList.remove('active');
        }
    }
}

function swipeLeft() {
    const currentCard = document.querySelector('.card:last-child');
    currentCard.classList.add('swipe-left');
    setTimeout(() => {
        currentCard.remove();
        loadNextProfile();
    }, 300);
}

function swipeRight() {
    const currentCard = document.querySelector('.card:last-child');
    currentCard.classList.add('swipe-right');
    setTimeout(() => {
        currentCard.remove();
        loadNextProfile();
    }, 300);
}

function initializeDragEvents(card) {
    // タッチデバイスの場合
    card.addEventListener('touchstart', dragStart, { passive: false });
    document.addEventListener('touchmove', drag, { passive: false });
    document.addEventListener('touchend', dragEnd);

    // マウスの場合
    card.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);
}

function dragStart(e) {
    // ボタンや詳細表示をクリックした場合は何もしない
    if (e.target.closest('.nav-button') ||
        e.target.closest('.details-button') ||
        e.target.closest('.profile-details') ||
        e.target.closest('.image-dots')) {
        return;
    }

    initialTouchTime = new Date().getTime();

    if (e.type === 'mousedown') {
        startX = e.clientX;
        currentX = e.clientX;
    } else {
        startX = e.touches[0].clientX;
        currentX = e.touches[0].clientX;
    }

    isDragging = true;
    const card = document.querySelector('.card:last-child');
    card.classList.add('swiping');
}

function drag(e) {
    if (!isDragging) return;
    e.preventDefault();

    const card = document.querySelector('.card:last-child');
    if (!card) return;

    if (e.type === 'mousemove') {
        currentX = e.clientX;
    } else {
        currentX = e.touches[0].clientX;
    }

    const diffX = currentX - startX;
    const rotation = diffX * 0.1;

    card.style.transform = `translateX(${diffX}px) rotate(${rotation}deg)`;

    // 背景色の変更
    const leftSection = document.getElementById('leftSection');
    const rightSection = document.getElementById('rightSection');

    if (diffX < 0) {
        // 左にスワイプ
        leftSection.classList.add('active-left');
        rightSection.classList.remove('active-right');
    } else if (diffX > 0) {
        // 右にスワイプ
        leftSection.classList.remove('active-left');
        rightSection.classList.add('active-right');
    } else {
        // 中立位置
        leftSection.classList.remove('active-left');
        rightSection.classList.remove('active-right');
    }
}

// ドラッグ終了時に背景色をリセット
function dragEnd(e) {
    if (!isDragging) return;

    const leftSection = document.getElementById('leftSection');
    const rightSection = document.getElementById('rightSection');

    // 既存のドラッグ終了処理
    const touchEndTime = new Date().getTime();
    const touchDuration = touchEndTime - initialTouchTime;

    isDragging = false;
    const card = document.querySelector('.card:last-child');
    const diffX = currentX - startX;

    if (Math.abs(diffX) < 20 && touchDuration < CLICK_THRESHOLD) {
        card.style.transform = '';
        card.classList.remove('swiping');
    } else if (Math.abs(diffX) > SWIPE_THRESHOLD) {
        if (diffX > 0) {
            swipeRight();
        } else {
            swipeLeft();
        }
    } else {
        card.style.transform = '';
        card.classList.remove('swiping');
    }

    // 背景色をリセット
    leftSection.classList.remove('active-left');
    rightSection.classList.remove('active-right');
}

// 初期カードのイベントを設定
initializeDragEvents(document.querySelector('.card'));
