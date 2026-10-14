// ============================================
// لیست محصولات پروتین 9595 با دسته‌بندی
// ============================================

const products = [
  // همبرگر
  { image: "images/4532.jpg", title: "مام رویال برگر ۸۵٪", category: "burger" },
  { image: "images/4535.jpg", title: "مام مرغ برگر ۶۰٪", category: "burger" },
  { image: "images/4536.jpg", title: "مام ممتاز برگر ۶۰٪", category: "burger" },
  { image: "images/4531.jpg", title: "مام کلاسیک برگر ۹۵٪", category: "burger" },
  { image: "images/4530.jpg", title: "ویچ‌لند برگر ۷۵٪", category: "burger" },
  { image: "images/4537.jpg", title: "ویچ‌لند زغال برگر ۹۵٪", category: "burger" },

  // کباب لقمه
  { image: "images/4533.jpg", title: "مام کباب لقمه ۷۰٪", category: "kebab" },
  { image: "images/4538.jpg", title: "کبابی کباب لقمه (۱۲ عددی)", category: "kebab" },
  { image: "images/4528.jpg", title: "ویچ‌لند کباب لقمه ۸۵٪", category: "kebab" },

  // کنسرو
  { image: "images/4526.jpg", title: "کنسرو سس ماکارونی فدک", category: "canned" },
  { image: "images/4522.jpg", title: "فدک خورشت قرمه سبزی", category: "canned" },
  { image: "images/4521.jpg", title: "فدک خورشت قرمه سبزی (قوطی)", category: "canned" },
  { image: "images/4523.jpg", title: "فدک خوراک مرغ", category: "canned" },
  { image: "images/4525.jpg", title: "فدک جوجه کباب", category: "canned" },
  { image: "images/4524.jpg", title: "فدک خورشت فسنجان", category: "canned" },

  // سس
  { image: "images/4520.jpg", title: "سس‌های مری‌جوی (۵ طعم)", category: "sauce" },
  { image: "images/4540.jpg", title: "آبلیمو بدر (BADR)", category: "sauce" }
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
const emptyMessage = document.getElementById("emptyMessage");
const categoryButtons = document.querySelectorAll(".cat-btn");

let currentIndex = 0;
let filteredProducts = [...products];
let currentCategory = "all";

function buildGallery(list) {
  gallery.innerHTML = "";
  filteredProducts = list;

  if (list.length === 0) {
    emptyMessage.style.display = "block";
    return;
  }

  emptyMessage.style.display = "none";

  list.forEach((product, index) => {
    const item = document.createElement("div");
    item.className = "gallery-item";
    item.style.animationDelay = `${index * 0.05}s`;
    item.innerHTML = `
      <img src="${product.image}" alt="${product.title}" loading="lazy" />
      <div class="caption">${product.title}</div>
    `;
    item.addEventListener("click", () => openLightbox(index));
    gallery.appendChild(item);
  });
}

function filterCategory(category) {
  currentCategory = category;

  // فعال کردن دکمه
  categoryButtons.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.category === category);
  });

  if (category === "all") {
    buildGallery(products);
  } else {
    const filtered = products.filter(p => p.category === category);
    buildGallery(filtered);
  }
}

function openLightbox(index) {
  currentIndex = index;
  lightboxImg.src = filteredProducts[currentIndex].image;
  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("active");
  document.body.style.overflow = "";
}

function showNext() {
  if (filteredProducts.length === 0) return;
  currentIndex = (currentIndex + 1) % filteredProducts.length;
  lightboxImg.src = filteredProducts[currentIndex].image;
}

function showPrev() {
  if (filteredProducts.length === 0) return;
  currentIndex = (currentIndex - 1 + filteredProducts.length) % filteredProducts.length;
  lightboxImg.src = filteredProducts[currentIndex].image;
}

// رویدادها
categoryButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterCategory(btn.dataset.category);
  });
});

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

// شروع
buildGallery(products);
