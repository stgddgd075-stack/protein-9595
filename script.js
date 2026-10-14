// ============================================
// لیست محصولات پروتین 9595
// ============================================

const products = [
  {
    image: "images/4526.jpg",
    title: "کنسرو سس ماکارونی فدک"
  },
  {
    image: "images/4532.jpg",
    title: "مام رویال برگر ۸۵٪"
  },
  {
    image: "images/4535.jpg",
    title: "مام مرغ برگر ۶۰٪"
  },
  {
    image: "images/4522.jpg",
    title: "فدک خورشت قرمه سبزی"
  },
  {
    image: "images/4521.jpg",
    title: "فدک خورشت قرمه سبزی (قوطی)"
  },
  {
    image: "images/4536.jpg",
    title: "مام ممتاز برگر ۶۰٪"
  },
  {
    image: "images/4523.jpg",
    title: "فدک خوراک مرغ"
  },
  {
    image: "images/4540.jpg",
    title: "آبلیمو بدر (BADR)"
  },
  {
    image: "images/4525.jpg",
    title: "فدک جوجه کباب"
  },
  {
    image: "images/4524.jpg",
    title: "فدک خورشت فسنجان"
  },
  {
    image: "images/4531.jpg",
    title: "مام کلاسیک برگر ۹۵٪"
  },
  {
    image: "images/4530.jpg",
    title: "ویچ‌لند برگر ۷۵٪"
  },
  {
    image: "images/4533.jpg",
    title: "مام کباب لقمه ۷۰٪"
  },
  {
    image: "images/4537.jpg",
    title: "ویچ‌لند زغال برگر ۹۵٪"
  },
  {
    image: "images/4538.jpg",
    title: "کبابی کباب لقمه (۱۲ عددی)"
  },
  {
    image: "images/4528.jpg",
    title: "ویچ‌لند کباب لقمه ۸۵٪"
  },
  {
    image: "images/4520.jpg",
    title: "سس‌های مری‌جوی (۵ طعم)"
  }
];

// ============================================
// از اینجا به پایین نیازی به تغییر نیست
// ============================================

const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let currentIndex = 0;

function buildGallery() {
  gallery.innerHTML = "";
  products.forEach((product, index) => {
    const item = document.createElement("div");
    item.className = "gallery-item";
    item.innerHTML = `
      <img src="${product.image}" alt="${product.title}" loading="lazy" />
      <div class="caption">${product.title}</div>
    `;
    item.addEventListener("click", () => openLightbox(index));
    gallery.appendChild(item);
  });
}

function openLightbox(index) {
  currentIndex = index;
  lightboxImg.src = products[currentIndex].image;
  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("active");
  document.body.style.overflow = "";
}

function showNext() {
  currentIndex = (currentIndex + 1) % products.length;
  lightboxImg.src = products[currentIndex].image;
}

function showPrev() {
  currentIndex = (currentIndex - 1 + products.length) % products.length;
  lightboxImg.src = products[currentIndex].image;
}

closeBtn.addEventListener("click", closeLightbox);
nextBtn.addEventListener("click", showNext);
prevBtn.addEventListener("click", showPrev);

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("active")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") showPrev();
  if (e.key === "ArrowLeft") showNext();
});

buildGallery();
