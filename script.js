// 图片配置
const images = [
    {
        src: 'images/1.jpg',
        alt: '发癫'
    },
    {
        src: 'images/2.jpg',
        alt: '持续发癫'
    },
    {
        src: 'images/3.jpg',
        alt: '发呆~'
    },
    {
        src: 'images/4.jpg',
        alt: '嘟~'
    },
    {
        src: 'images/5.jpg',
        alt: '嘟嘟~'
    },
    {
        src: 'images/6.jpg',
        alt: '嘟嘟嘟~'
    },
    {
        src: 'images/7.jpg',
        alt: '嘟嘟嘟嘟~'
    },
    {
        src: 'images/8.jpg',
        alt: '嫌弃~'
    },
    {
        src: 'images/9.jpg',
        alt: '有点丑'
    },
    {
        src: 'images/10.jpg',
        alt: '嗷呜~吃草莓'
    },
    {
        src: 'images/11.jpg',
        alt: '吃不下'
    },
    {
        src: 'images/12.jpg',
        alt: '可爱'
    },
    {
        src: 'images/13.jpg',
        alt: '可可爱爱'
    },
    {
        src: 'images/14.jpg',
        alt: '草莓熊'
    },
    {
        src: 'images/15.jpg',
        alt: '裹成粽子'
    },
    {
        src: 'images/16.jpg',
        alt: '嘿嘿~'
    },
    {
        src: 'images/17.jpg',
        alt: '你谁哇~'
    },
    {
        src: 'images/18.jpg',
        alt: '放屁~~~'
    },
    {
        src: 'images/19.jpg',
        alt: '我也要七'
    }
];

// 轮播图相关变量
let currentCarouselIndex = 0;
let carouselInterval;

// 图片查看器相关变量
let currentViewerIndex = 0;

// 加载轮播图
function loadCarousel() {
    const carousel = document.getElementById('carousel');
    const dotsContainer = document.getElementById('carouselDots');
    
    // 创建轮播图项
    images.forEach((image, index) => {
        const item = document.createElement('div');
        item.className = 'carousel-item';
        
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.alt;
        
        item.appendChild(img);
        carousel.appendChild(item);
        
        // 创建轮播图指示点
        const dot = document.createElement('div');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    // 开始自动轮播
    startCarousel();
}

// 轮播图控制函数
function startCarousel() {
    carouselInterval = setInterval(nextSlide, 5000);
}

function stopCarousel() {
    clearInterval(carouselInterval);
}

function nextSlide() {
    goToSlide((currentCarouselIndex + 1) % images.length);
}

function prevSlide() {
    goToSlide((currentCarouselIndex - 1 + images.length) % images.length);
}

function goToSlide(index) {
    currentCarouselIndex = index;
    const carousel = document.getElementById('carousel');
    const dots = document.querySelectorAll('.dot');
    
    carousel.style.transform = `translateX(-${index * 100}%)`;
    
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

// 加载图片到相册
function loadImages() {
    const gallery = document.getElementById('gallery');
    
    images.forEach((image, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.alt;
        img.loading = 'lazy';
        
        // 添加点击事件
        item.addEventListener('click', () => openImageViewer(index));
        
        item.appendChild(img);
        gallery.appendChild(item);
    });
}

// 图片查看器功能
function openImageViewer(index) {
    currentViewerIndex = index;
    const viewer = document.getElementById('imageViewer');
    const viewerImage = document.getElementById('viewerImage');
    
    viewerImage.src = images[index].src;
    viewerImage.alt = images[index].alt;
    viewer.classList.add('active');
    
    // 停止轮播图
    stopCarousel();
}

function closeImageViewer() {
    const viewer = document.getElementById('imageViewer');
    viewer.classList.remove('active');
    
    // 恢复轮播图
    startCarousel();
}

function nextImage() {
    currentViewerIndex = (currentViewerIndex + 1) % images.length;
    updateViewerImage();
}

function prevImage() {
    currentViewerIndex = (currentViewerIndex - 1 + images.length) % images.length;
    updateViewerImage();
}

function updateViewerImage() {
    const viewerImage = document.getElementById('viewerImage');
    viewerImage.src = images[currentViewerIndex].src;
    viewerImage.alt = images[currentViewerIndex].alt;
}

// 事件监听器设置
function setupEventListeners() {
    // 轮播图按钮
    document.getElementById('prevBtn').addEventListener('click', () => {
        stopCarousel();
        prevSlide();
        startCarousel();
    });
    
    document.getElementById('nextBtn').addEventListener('click', () => {
        stopCarousel();
        nextSlide();
        startCarousel();
    });
    
    // 图片查看器按钮
    document.querySelector('.close-viewer').addEventListener('click', closeImageViewer);
    document.getElementById('viewerPrevBtn').addEventListener('click', prevImage);
    document.getElementById('viewerNextBtn').addEventListener('click', nextImage);
    
    // 键盘控制
    document.addEventListener('keydown', (e) => {
        if (document.getElementById('imageViewer').classList.contains('active')) {
            if (e.key === 'ArrowLeft') prevImage();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'Escape') closeImageViewer();
        }
    });
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    loadCarousel();
    loadImages();
    setupEventListeners();
}); 