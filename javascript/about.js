const week_days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const replace = (str) => {
  let array = str;
  for (i = 0; i < str.length; i++) {
    array = array.replace("_", " ");
  }
  return array;
};

const handleUrl = async () => {
  const res = await axios.get(
    `https://zen-newton-5723fe.netlify.app/.netlify/functions/api/blog?heading=${replace(
      window.location.href.split("?")[1]
    )}`
  );
  const data = await res.data;
  const {
    category,
    heading,
    imageUrl,
    description,
    subheading,
    tags,
    questions,
    urls,
    createdAt,
    username,
  } = data[0];
  let times = new Date(createdAt);
  let day = week_days[times.getDay()];
  let date = times.getDate();
  let month = months[times.getMonth()];
  let year = times.getFullYear();

  let time = `${day} ${date} ${month} ${year}`;

  const replaceContentUrl = (str) => {
    let string = str;

    urls.map((value) => {
      string = string.replace(
        `${value.keyword}`,
        `<a href=${value.url}>${value.keyword}</a>`
      );
    });

    return string;
  };

  // these statements will creates the main content
  let main = document.getElementById("main");
  $("#heading").html(heading);
  $("#time")
    .html(`<span><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-calendar-check" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
  <path fill-rule="evenodd" d="M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1zm1-3a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2z"/>
  <path fill-rule="evenodd" d="M3.5 0a.5.5 0 0 1 .5.5V1a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 .5-.5zm9 0a.5.5 0 0 1 .5.5V1a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 .5-.5z"/>
</svg> ${time} </span><span><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z"/>
  <path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z"/>
</svg> ${username}</span>`);
  $("#header_img").attr("src", `${imageUrl}`);

  let des = document.createElement("p");
  des.className = "subheading";
  let description_new = description.replace("\n", "<br/>");
  des.innerHTML = description_new;
  main.appendChild(des);

  subheading.map((value) => {
    let { title, content } = value;

    let content_new = content.split("\n").join("<br/>");
    let content_final = replaceContentUrl(content_new);
    let arr = document.createElement("div");
    arr.className = "subheading";
    let head = document.createElement("h3");
    head.innerText = title;
    arr.appendChild(head);
    let cont = document.createElement("p");
    cont.innerHTML = content_final;
    arr.appendChild(cont);

    main.appendChild(arr);
  });

  document.getElementById("fb-share-button").dataset["href"] =
    window.location.href;
  $("#loader").hide();

  // these statements will creates the side content(question)

  let qcomponent = document.getElementById("quest");

  /*  questions.map((value) => {
    let element = `<div class="quest-container"><h5>${value.question}</h5><p>${value.answer}</p></div>`;
    qcomponent.insertAdjacentHTML("beforeend", element);
  }); */
};
