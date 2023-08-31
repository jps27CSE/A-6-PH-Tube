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
    <button class="btn mr-2" onclick="getCategory('${category.category_id}')">${category.category}</button>
    `;

    categoriesSection.appendChild(div);
  });
};

const ShowDataCards = async (category = 1000) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${category}`
  );
  const data = await response.json();
  const card_section = document.getElementById("card_section");
  const nodata = document.getElementById("no_data");
  card_section.textContent = "";
  nodata.textContent = "";
  const countofData = data.data.length;
  if (countofData) {
    data.data.forEach((card) => {
      const div = document.createElement("div");
      const authorName = card.authors
        .map(
          (author) => `<p class="text-[14px] ml-2">${author.profile_name}</p>`
        )
        .join("");

      const authorPic = card.authors
        .map(
          (author) => `<img
      class="w-[40px] h-[40px] rounded-full mt-4"
      src="${author.profile_picture}"
      alt=""
    />`
        )
        .join("");

      const authorVerified = card.authors
        .map((author) => {
          if (author.verified === true) {
            return ` <img
          class="w-[20px] h-[20px] ml-1"
          src="images/verified.png"
          alt=""
        />
    `;
          } else {
            return "";
          }
        })
        .join("");

      const videoViews = card.others.views;
      const postedDate = card.others.posted_date;
      const formatDate = PostTimeConvert(postedDate);

      div.innerHTML = `
        <div>
          <!-- photo  -->
          <div>
            <div class="relative">
              <img
                class="w-[312px] h-[200px] rounded-lg"
                src='${card.thumbnail}'
                alt=""
              />
            </div>
            ${
              formatDate
                ? ` <div
              class="w-[109px] flex absolute mt-[-52px] ml-[200px] text-white bg-[#171717] rounded-lg p-2"
            >
              <p class="text-[12px] ">${formatDate}</p>
            </div>`
                : ""
            }
          </div>
    
          <!-- info   -->
          <div class="flex flex-row">
            <div>
              ${authorPic}
            </div>
            <div class="cursor-pointer">
              <!-- photo and title   -->
              <div class="flex flex-row">
                <div class="w-64 ml-2 mt-3">
                  <h2 class="text-[16px] font-bold">
                   ${card.title}
                  </h2>
                </div>
              </div>
              <div class="flex flex-row">
                ${authorName}
                ${authorVerified}
              </div>
              <p class="ml-2 text-[14px]">${videoViews} views</p>
            </div>
          </div>
        </div>
      `;

      card_section.appendChild(div);
    });
  } else {
    const div = document.createElement("div");

    div.innerHTML = ` <div>
    <div class="flex justify-center mt-40">
      <img src="./images/Icon.png" alt="" class="w-[140px] h-[140px] mb-10" />
    </div>
    <h1 class="text-[32px] w-96 text-center mx-auto font-bold flex justify-center">
      Oops!! Sorry, There is no content here
    </h1>
  </div>`;

    nodata.appendChild(div);
  }
};

const PostTimeConvert = (time) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);

  let result = "";
  if (hours > 0) {
    result += `${hours} ${hours === 1 ? "hr" : "hrs"}`;
  }

  if (minutes > 0) {
    if (result.length > 0) {
      result += " ";
    }
    result += `${minutes} ${"min ago"}`;
  }

  return result;
};

const getCategory = async (data) => {
  ShowDataCards(data);
};

fetchCatergories();
ShowDataCards();
