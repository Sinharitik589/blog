var featured = [];
var featured_flag = 0;
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
    array = array.replace(" ", "_");
  }
  return array;
};
const CallApi = async () => {
  axios
    .get(
      "https://zen-newton-5723fe.netlify.app/.netlify/functions/api/featured",
      {
        timeout: 5000,
      }
    )
    .then((res) => {
      featured = res.data.featured;
      console.log(featured, "featured");
    })
    .catch((err) => {
      console.log(err);
    });

  let component = document.getElementById("main");
  axios
    .get("https://zen-newton-5723fe.netlify.app/.netlify/functions/api", {
      timeout: 5000,
    })
    .then((res) => {
      const data = res.data;
      data.map((value, i) => {
        let times = new Date(value.createdAt);
        let day = week_days[times.getDay()];
        let date = times.getDate();
        let month = months[times.getMonth()];
        let year = times.getFullYear();

        let time = `${day} ${date} ${month} ${year}`;
        let element = `<a class="col-lg-12 col-md-12 col-sm-12 " href=./about.html?${replace(
          value.heading
        )}><div class=" blog-container" id=${i} onclick="handleClick(
            this.id
          )" >
          
          <div class="component-description ">   <div class="heading" >${
            value.heading
          }</div> <div class="auth-des"><span><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-calendar-check" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
  <path fill-rule="evenodd" d="M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1zm1-3a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2z"/>
  <path fill-rule="evenodd" d="M3.5 0a.5.5 0 0 1 .5.5V1a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 .5-.5zm9 0a.5.5 0 0 1 .5.5V1a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 .5-.5z"/>
</svg> ${time}</span><span><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z"/>
  <path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z"/>
</svg> ${value.username}</span></div>
        
          <p>${value.description}</p>
         </div>
         <div class=" image-container"><img  style="padding:0" src="${
           value.imageUrl
         }"/></div>
         
          </div></a>`;
        component.insertAdjacentHTML("afterbegin", element);

        let flag = featured.findIndex((val) => {
          return val == value.heading;
        });

        if (flag >= 0) {
          if (featured_flag == 0) {
            $("#carousel_inner").append(`<div class="carousel-item active">
             <a href=./about.html?${replace(value.heading)}> <div
                class="d-block w-100 description-container"
                style="
                  background-image: url(${value.imageUrl});

                  background-size: cover;
                "
              >
                <div
                  style="
                    position: absolute;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    width: 100%;
                    height: 100%;
                    color: white;
                    background-color: #0009;
                  "
                >
                  <div>
                    <div class="heading">
                      ${value.heading}
                    </div>
                    <p class="carousel-des">
                       ${value.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            </a>`);
            featured_flag = 1;
          } else {
            $("#carousel_inner").append(`<div class="carousel-item ">
             <a href=./about.html?${replace(value.heading)}> <div
                class="d-block w-100 description-container"
                style="
                  background-image: url(${value.imageUrl});

                  background-size: cover;
                "
              >
                <div
                  style="
                    position: absolute;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    width: 100%;
                    height: 100%;
                    color: white;
                    background-color: #0009;
                  "
                >
                  <div>
                    <div class="heading">
                      ${value.heading}
                    </div>
                    <p class="carousel-des">
                       ${value.description}
                    </p>
                  </div>
                </div>
              </div>
            </div> </a>`);
          }
        }
      });
      $("#loader").hide();
      $("#container,#footer").show();
    })
    .catch((err) => {
      console.log(err);
    });
};
