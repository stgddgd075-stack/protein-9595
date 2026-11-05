// ============================================
// لیست محصولات پروتین 9595
// نسخه پایدار و سبک برای گوشی‌های ضعیف
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
  { image: "images/4526.jpg", title: "کنسرو سس ماکارونی", category: "canned" },
  { image: "images/4522.jpg", title: "خورشت قرمه سبزی", category: "canned" },
  { image: "images/4523.jpg", title: "خوراک مرغ", category: "canned" },
  { image: "images/4525.jpg", title: "جوجه کباب", category: "canned" },
  { image: "images/4524.jpg", title: "خورشت فسنجان", category: "canned" },
  { image: "images/IMG_20261016_173019_139.jpg", title: "کنسرو نخود سبز", category: "canned" },
  { image: "images/IMG_20261016_173022_049.jpg", title: "کنسرو لوبیا چیتی", category: "canned" },
  { image: "images/file_00000000b79c8211ac150b1ef16846f4.png", title: "کنسرو مخلوط سبزیجات", category: "canned" },

  // سس
  { image: "images/4520.jpg", title: "سس‌های مری‌جوی (۵ طعم)", category: "sauce" },
  { image: "images/4540.jpg", title: "آبلیمو بدر (BADR)", category: "sauce" },

  // پنیر و خمیر پیتزا
  { image: "images/file_000000006c2081f6972ff516ac7c4a57.png", title: "پنیر ۹۵۹۵ ۵۰۰ گرمی", category: "pizza" }
];

const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const emptyMessage = document.getElementById("emptyMessage");
const categoryButtons = document.querySelectorAll(".cat-btn");

let currentIndex = 0;
let filteredProducts = products.slice();

function buildGallery(list) {
  gallery.innerHTML = "";
  filteredProducts = list;

  if (list.length === 0) {
    emptyMessage.style.display = "block";
    return;
  }

  emptyMessage.style.display = "none";

  for (var i = 0; i < list.length; i++) {
    (function(index) {
      var product = list[index];
      var item = document.createElement("div");
      item.className = "gallery-item";

      item.innerHTML = '<img src="' + product.image + '" alt="' + product.title + '" loading="lazy">' +
                       '<div class="caption">' + product.title + '</div>';

      item.onclick = function() {
        openLightbox(index);
      };

      gallery.appendChild(item);
    })(i);
  }
}

function filterCategory(category) {
  for (var i = 0; i < categoryButtons.length; i++) {
    var btn = categoryButtons[i];
    if (btn.getAttribute("data-category") === category) {
      btn.className = "cat-btn active";
    } else {
      btn.className = "cat-btn";
    }
  }

  if (category === "all") {
    buildGallery(products);
  } else {
    var filtered = [];
    for (var j = 0; j < products.length; j++) {
      if (products[j].category === category) {
        filtered.push(products[j]);
      }
    }
    buildGallery(filtered);
  }
}

function openLightbox(index) {
  currentIndex = index;
  lightboxImg.src = filteredProducts[currentIndex].image;
  lightbox.className = "lightbox active";
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.className = "lightbox";
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

for (var k = 0; k < categoryButtons.length; k++) {
  (function(btn) {
    btn.onclick = function() {
      filterCategory(btn.getAttribute("data-category"));
    };
  })(categoryButtons[k]);
}

closeBtn.onclick = closeLightbox;
nextBtn.onclick = showNext;
prevBtn.onclick = showPrev;

lightbox.onclick = function(e) {
  if (e.target === lightbox) closeLightbox();
};

buildGallery(products);
