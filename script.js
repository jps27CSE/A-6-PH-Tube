const fetchCatergories = async () => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/categories`
  );
  const data = await response.json();
  categoriesButton(data.data);
};

const categoriesButton = (data) => {
  const categoriesSection = document.getElementById("categories_section");

  data.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <button class="btn mr-2">${category.category}</button>
    `;

    categoriesSection.appendChild(div);
  });
};

fetchCatergories();
