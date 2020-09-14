var heading,
  conclusion,
  description,
  imageUrl,
  blog_name,
  index_value,
  meta_description,
  category,
  urls = [],
  tab_count = 0,
  url_count = 0,
  modal_tab_count = 0,
  modal_url_count = 0,
  sub_count = 0,
  quest_count = 0,
  modal_quest_count = 0,
  modal_sub_count = 0,
  questModalno,
  subModalno,
  tab_active = 0,
  prompted,
  change_attribute,
  featured = [],
  tags = [],
  questions = [],
  subheading = [];

refreshVars = () => {
  questions = [];
  subheading = [];
  urls = [];
  tags = [];
};

const cleanForm = () => {
  $("#skills_set").empty();
  $("#skills_set").append(
    `<input class="form-control" style="display: none;" onkeyup="tagInput(event)" id="add_skill" />`
  );
  $("#subheading_tabs").empty();
  $("#subheading_quest").empty();
  $("#url_set").empty();
  $("#url_set").append(
    `<input class="form-control"style="display: none; id="add_url onkeyup="urlInputHandle(event)" />`
  );
};
const clearThings = () => {
  refreshVars();
  cleanForm();
  for (i = 0; i < 3; i++) {
    if (i == prompted) {
      $(`#home${i}`).show();
      $(`#button_home${i}`).css({
        "background-color": "#242849",
        color: "white",
      });
      tab_active = i;
    } else {
      $(`#home${i}`).hide();
      $(`#button_home${i}`).css({
        "background-color": "#0e0c28",
        color: "#7a80b4",
      });
    }
  }
};

const show = (event) => {
  prompted = event;
  for (i = 0; i < 3; i++) {
    if (
      event == 0 &&
      tab_active == 1 &&
      (questions.length > 0 ||
        subheading.length > 0 ||
        tags.length > 0 ||
        urls.length > 0)
    ) {
      $("#confirmmodal").modal("show");
    } else if (event == 1 && tab_active == 0 && questions.length > 0) {
      refreshVars();
    } else {
      if (i == event) {
        $(`#home${i}`).show();
        $(`#button_home${i}`).css({
          "background-color": "#242849",
          color: "white",
        });
        tab_active = i;
      } else {
        $(`#home${i}`).hide();
        $(`#button_home${i}`).css({
          "background-color": "#0e0c28",
          color: "#7a80b4",
        });
      }
    }
  }
};

const featuredSelection = (event, data) => {
  let index = featured.findIndex((val) => {
    return val == data;
  });
  if (featured.length < 5) {
    if (index >= 0) {
      featured.splice(index, 1);
      document.getElementById(event.target.id).style.color = "black";
    } else {
      featured.push(data);

      document.getElementById(event.target.id).style.color = "blue";
    }
  } else {
    if (index >= 0) {
      featured.splice(index, 1);
      document.getElementById(event.target.id).style.color = "black";
    } else {
      window.alert("cant select more then 5");
    }
  }
};
const featureSubmit = async () => {
  $("#featureSubmit").html(
    'Confuring <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>'
  );
  axios
    .post(
      "https://zen-newton-5723fe.netlify.app/.netlify/functions/api/featured",
      {
        featured,
      },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    )
    .then((res) => {
      if (res.status == 200) {
        $("#featureSubmit").html("Save Changes");
      }
    })
    .catch((err) => {
      window.alert("Request Denied");
    });

  if (res.status == 200) {
    window.alert("done");
  }
};
const showBut = () => {
  $("#add_skill").show();
};
const showUrl = () => {
  $("#add_url").show();
};
const editPanel = () => {
  $("#edit_panel").show();
};
const questeditPanel = () => {
  $("#quest_edit_panel").show();
};

const modalshowBut = () => {
  $("#modal_add_skill").show();
};
const modalshowUrl = () => {
  $("#modal_add_url").show();
};
const modaleditPanel = () => {
  $("#modal_edit_panel").show();
};
const modalquesteditPanel = () => {
  $("#modal_quest_edit_panel").show();
};

const replace = (str) => {
  let array = str;
  for (i = 0; i < str.length; i++) {
    array = array.replace(" ", "_");
  }
  return array;
};
const revreplace = (str) => {
  let array = str;
  for (i = 0; i < str.length; i++) {
    array = array.replace("_", " ");
  }
  return array;
};
const questModal = (value, datas) => {
  let data = revreplace(datas);
  let index = questions.findIndex((val) => {
    return val.question == data;
  });
  change_attribute = value;
  if (index >= 0) {
    questModalno = index;

    $("#modals_quest").val(questions[index].question);
    $("#modals_ans").val(questions[index].answer);
  }
};

//function for filling modal in new form
const subModal = (datas, value) => {
  change_attribute = value;
  let data = revreplace(datas);
  let index = subheading.findIndex((val) => {
    return val.title == data;
  });

  if (index >= 0) {
    subModalno = index;
    $("#modals_title").val(subheading[index].title);
    $("#modals_url").val(subheading[index].url);
    $("#modals_description").val(subheading[index].content);
    $("#modals_key_features").val(subheading[index].key_feature);
    $("#modals_cons").val(subheading[index].cons);
    $("#modals_pros").val(subheading[index].pros);
    $("#modals_flipkart").val(subheading[index].flipkart);
    $("#modals_amazon").val(subheading[index].amazon);
  }
};

const modaldeletequestTab = (value, datas) => {
  let data = revreplace(datas);
  let index = questions.findIndex((val) => {
    return val.question == data;
  });
  if (index >= 0) {
    questions.splice(index, 1);

    $(`#modal_quest_tab_container_${value}`).remove();
  }
};
const modaldeletesubTab = (value, datas) => {
  let data = revreplace(datas);

  let index = subheading.findIndex((val) => {
    return val.title == data;
  });
  if (index >= 0) {
    subheading.splice(index, 1);
    $(`#modal_sub_tab_container_${value}`).remove();
  }
};

const deletequestTab = (value, datas) => {
  let data = revreplace(datas);
  let index = questions.findIndex((val) => {
    return val.question == data;
  });
  if (index >= 0) {
    questions.splice(index, 1);

    $(`#quest_tab_container_${value}`).remove();
  }
};
const deletesubTab = (value, datas) => {
  let data = revreplace(datas);

  let index = subheading.findIndex((val) => {
    return val.title == data;
  });

  if (index >= 0) {
    subheading.splice(value, 1);
    $(`#sub_tab_container_${value}`).remove();
  }
};

const modaldeleteUrls = (value, data) => {
  let index = urls.map((val, index) => {
    if (val.keyword == data) {
      return index;
    } else {
      return null;
    }
  });
  if (index != null) {
    urls.splice(index, 1);
  }

  $(`#modal_app_url_${value}`).remove();
};

const modaldeleteTags = (value, data) => {
  let index = tags.map((val, index) => {
    if (val.keyword == data) {
      return index;
    } else {
      return null;
    }
  });
  if (index != null) {
    tags.splice(index, 1);
  }

  $(`#modal_app_tag_${value}`).remove();
};

const deleteBlog = (value, index) => {
  $("#deleteModal").modal(show);
  $("#deleteblogname").html(value);
  blog_name = value;
  index_value = index;
};

const advanceCreateTags = (array) => {
  tags = [];
  $("#modal_skills_set").empty();
  $("#modal_skills_set").append(
    '<input class= "form-control" style = "display: none"   onkeyup = "modaltagInput(event)"      id = "modal_add_skill"  />'
  );
  array.map((val) => {
    let element = `  <div class="application-tag-container" id="modal_app_tag_${modal_tab_count}">
          <div class="application-tags">${val}
          <span
              
              style="margin-left:4px;cursor:pointer"
              data-value=${val}
              onClick="modaldeleteTags(${modal_tab_count},this.getAttribute('data-value'))"
            >
              &times;
            </span></div>
        </div>`;

    let component = document.getElementById("modal_skills_set");
    component.insertAdjacentHTML("beforeend", element);
    tags.push(val);
    modal_tab_count++;
  });
};
const advanceCreateSubheading = (array) => {
  subheading = [];
  $("#modal_subheading_tabs").empty();

  array.map((val) => {
    let { title, url, content, key_feature, pros, cons } = val;
    let object = { title, url, content, key_feature, pros, cons };
    subheading.push(object);

    let component = `<div class="subheading-tab-container" id="modal_sub_tab_container_${modal_sub_count}">
                  <h5 id=sub_tab_${modal_sub_count}>${title}</h3>
                    <div style="
                                      display: flex;
                                      flex-direction: row-reverse;
                                      margin: px 0;
                                    ">
                      <button id=subheading_delete-btn_${modal_sub_count} type="button" data-heading=${replace(
      title
    )} class="btn btn-primary btn-sm" onclick="modaldeletesubTab(${modal_sub_count},this.getAttribute('data-heading'))">delete</button>
                      <button type="button" data-heading=${replace(
                        title
                      )} id=subheading_edit-btn_${modal_sub_count} onclick="subModal(this.getAttribute('data-heading'),${modal_sub_count})"  data-toggle="modal" data-target="#subModal" class="btn btn-secondary btn-sm">edit</button>
                
                    </div>
                </div>`;

    let element = document.getElementById("modal_subheading_tabs");
    element.insertAdjacentHTML("beforeend", component);
    modal_sub_count++;
  });
};

const advanceCreateQuestions = (array) => {
  questions = [];
  $("#modal_subheading_quest").empty();
  array.map((val) => {
    let { question, answer } = val;
    let object = { question, answer };
    questions.push(object);
    let component = `<div class="subheading-tab-container" id="modal_quest_tab_container_${modal_quest_count}">
                  <h5 id=modal_quest_tab_heading_${modal_quest_count}>${question}</h3>
                    <div style="
                                      display: flex;
                                      flex-direction: row-reverse;
                                      margin: px 0;
                                    ">
                      <button type="button" id="button_quest_${modal_quest_count}"  data-heading=${replace(
      question
    )}  onclick="modaldeletequestTab(${modal_quest_count},this.getAttribute('data-heading'))" class="btn btn-primary btn-sm">delete</button>
                      <button  data-heading=${replace(
                        question
                      )}  type="button" id="button_quest_edit_${modal_quest_count}" onclick="questModal(${modal_quest_count},this.getAttribute('data-heading'))" data-toggle="modal" data-target="#questModal"  class="btn btn-secondary btn-sm">edit</button>
                
                    </div>
                </div>`;

    let element = document.getElementById("modal_subheading_quest");
    element.insertAdjacentHTML("beforeend", component);
    modal_quest_count++;
  });
};

const advanceCreateUrls = (array) => {
  urls = [];
  let component = document.getElementById("modal_url_set");
  $("#modal_url_set").empty();
  $("#modal_url_set").append(
    ' <input class="form-control" style="display:none" id="modal_add_url" onkeyup="modalurlInputHandle(event)" />'
  );

  array.map((value) => {
    const { keyword, url } = value;
    urls.push({
      keyword,
      url,
    });
    let element = ` 
       <div  class="application-tag-container" id="modal_app_url_${modal_url_count}" >
          <div class="application-tags" style="background-color: #dfe9fb;"><a href="${arr[1]}" >${arr[0]}</a><span

              style="margin-left:4px;cursor:pointer;color:blue"
              data-value=${keyword}
              onClick="modaldeleteUrls(${modal_url_count},this.getAttribute('data-value'))"
            >
              &times;
            </span></div>
        </div> 
      `;

    component.insertAdjacentHTML("beforeend", element);

    modal_url_count++;
  });
};

const putBlog = async () => {
  $("#editBlogConfirm").html(
    '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>'
  );
  category = $("#modal_category").val();
  heading = $("#modal_heading_input").val();
  imageUrl = $("#modal_url_input").val();
  description = $("#modal_description_input").val();
  meta_description = $("#modal_meta_description_input").val();
  conclusion = $("#modal_conclusion").val();

  const res = await axios.put(
    `https://zen-newton-5723fe.netlify.app/.netlify/functions/api/blog?blog=${blog_name}`,
    {
      category,
      heading,
      imageUrl,
      description,
      meta_description,
      subheading,
      tags,
      questions,
      urls,
      conclusion,
    },
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );

  if (res) {
    $("#editBlogConfirm").html("Save Changes");
    window.alert("done");
    populateData();
  }
};

// For creating the edit panel
const editBlog = async (value) => {
  const res = await axios.get(
    `https://zen-newton-5723fe.netlify.app/.netlify/functions/api/blog?heading=${value}`
  );
  const data = await res.data;
  const {
    heading,
    imageUrl,
    description,
    meta_description,
    tags,
    category,
    urls,
    createdAt,
    username,
  } = data[0];
  questions = data[0].questions;
  subheading = data[0].subheading;

  $("#modal_heading_input").val(heading);
  $("#modal_url_input").val(imageUrl);
  $("#modal_description_input").val(description);
  $("#modal_meta_description_input").val(meta_description);
  $("#modal_category").val(category);
  blog_name = heading;
  advanceCreateTags(tags);
  advanceCreateSubheading(subheading);
  advanceCreateQuestions(questions);
  advanceCreateUrls(urls);
};
const deleteBlogConfirm = () => {
  $("#deleteBlogConfirm").html(
    'Deleting<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>'
  );
  axios
    .get(
      `https://zen-newton-5723fe.netlify.app/.netlify/functions/api/delete?blog=${blog_name}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    )
    .then((res) => {
      if (res.status == 200) {
        let index = featured.findIndex((val) => {
          return val == blog_name;
        });

        if (index >= 0) {
          featured.splice(index, 1);

          axios
            .post(
              "https://zen-newton-5723fe.netlify.app/.netlify/functions/api/featured",
              {
                featured,
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            )
            .then((res) => {
              if (res.status == 200) {
                $("#deleteBlogConfirm").html("Confirm");
                $("#deleteModal").modal("hide");

                populateData();
              }
            });
        } else {
          $("#deleteBlogConfirm").html("Confirm");
          $("#deleteModal").modal("hide");

          populateData();
        }
      }
    });
};

//Function for populating data when page loads up initially
const populateData = () => {
  $("#blog_tabs").empty();
  $("#featured-tab").empty();

  axios
    .get("https://zen-newton-5723fe.netlify.app/.netlify/functions/api", {
      timeout: 5000,
    })
    .then((res) => {
      const data = res.data.arr;
      featured = res.data.featured;

      data.map((value, index) => {
        let element = `<div class="col-md-6 col-sm-12" id=edit_blog_tab_${index}>
              <div class="edit-blog-tab" >
                <img src="${value.imageUrl}"
                  alt="" />
                
                <div >
                <h5>${value.heading}</h5>
                  <div>
                  <span style="color: orange;" data-heading="${
                    value.heading
                  }" onclick=editBlog(this.getAttribute(["data-heading"])) data-toggle="modal" data-target="#exampleModalLong">edit</span>
                 
                  <span  style="color: red;" data-heading="${
                    value.heading
                  }" onclick=deleteBlog(this.getAttribute(["data-heading"]),${index}) >Delete</span>
                  <span><a href="./about.html?${replace(
                    value.heading
                  )}">View</a></span>
                </div>
                </div>
              </div>
            </div>`;

        let component = document.getElementById("blog_tabs");
        component.insertAdjacentHTML("afterbegin", element);
        let flag = featured.findIndex((val) => {
          return val == value.heading;
        });

        if (flag >= 0) {
          $("#featured-tab").append(`<div
             
              class="featured-tab"
              data-heading="${value.heading}"
              onclick=featuredSelection(event,this.getAttribute(["data-heading"]))
              id=featured_tab${index}
              style="color:blue"
            >
              ${value.heading}
            </div>`);
        } else {
          $("#featured-tab").append(`<div
             
             class="featured-tab"
              data-heading="${value.heading}"
              onclick=featuredSelection(event,this.getAttribute(["data-heading"]))
              id=featured_tab${index}
              
            >
              ${value.heading}
            </div>`);
        }
      });
    })
    .catch((err) => {
      if (err.code == "ECONNABORTED") {
        populateData();
        console.log("calling again");
      }
    });
};

$(document).ready(populateData);

const deleteUrls = (value, data) => {
  let index = urls.map((val, index) => {
    if (val.keyword == data) {
      return index;
    } else {
      return null;
    }
  });
  if (index != null) {
    urls.splice(index, 1);
  }

  $(`#app_url_${value}`).remove();
};

const questModalSave = () => {
  $(`#button_quest_${change_attribute}`).attr(
    "data-heading",
    replace($("#modals_quest").val())
  );
  $(`#button_quest_edit_${change_attribute}`).attr(
    "data-heading",
    replace($("#modals_quest").val())
  );
  questions[questModalno].question = $("#modals_quest").val();
  questions[questModalno].answer = $("#modals_ans").val();

  $(`#quest_tab_heading_${change_attribute}`).html($("#modals_quest").val());
  $(`#modal_quest_tab_heading_${change_attribute}`).html(
    $("#modals_quest").val()
  );
};

const subModalSave = () => {
  $(`#subheading_edit-btn_${change_attribute}`).attr(
    "data-heading",
    replace($("#modals_title").val())
  );
  $(`#subheading_delete-btn_${change_attribute}`).attr(
    "data-heading",
    replace($("#modals_title").val())
  );
  subheading[subModalno].title = $("#modals_title").val();
  subheading[subModalno].url = $("#modals_url").val();
  subheading[subModalno].content = $("#modals_description").val();
  subheading[subModalno].key_feature = $("#modals_key_features").val();
  subheading[subModalno].cons = $("#modals_cons").val();
  subheading[subModalno].pros = $("#modals_pros").val();
  subheading[subModalno].flipkart = $("#modals_flipkart").val();
  subheading[subModalno].amazon = $("#modals_amazon").val();
  $(`#sub_tab_${change_attribute}`).html($("#modals_title").val());
  $(`#modal_sub_tab_${change_attribute}`).html($("#modals_title").val());
};

// for saving new subheading
const subheadingSave = () => {
  let title = $("#subheading_title").val();
  let url = $("#subheading_url").val();
  let content = $("#subheading_description").val();

  let key_feature = $("#subheading_key_features").val();
  let pros = $("#subheading_pros").val();
  let cons = $("#subheading_cons").val();
  let flipkart = $("#subheading_flipkart").val();
  let amazon = $("#subheading_amazon").val();
  let object = {
    title,
    url,
    content,
    key_feature,
    pros,
    cons,
    amazon,
    flipkart,
  };
  subheading.push(object);

  let component = `<div class="subheading-tab-container" id="sub_tab_container_${sub_count}">
                  <h5 id=sub_tab_${sub_count}>${title}</h3>
                    <div style="
                                      display: flex;
                                      flex-direction: row-reverse;
                                      margin: px 0;
                                    ">
                      <button type="button" id=subheading_delete-btn_${sub_count} data-heading=${replace(
    title
  )}  class="btn btn-primary btn-sm" onclick="deletesubTab(${sub_count},this.getAttribute('data-heading'))">delete</button>
                      <button type="button" id=subheading_edit-btn_${sub_count} data-heading=${replace(
    title
  )} onclick="subModal(this.getAttribute('data-heading'),${sub_count})"  data-toggle="modal" data-target="#subModal" class="btn btn-secondary btn-sm">edit</button>
                
                    </div>
                </div>`;

  let element = document.getElementById("subheading_tabs");
  element.insertAdjacentHTML("beforeend", component);
  sub_count++;
  $("#edit_panel").hide();
};
const subheadingCancel = () => {
  $("#edit_panel").hide();
};

// function for editing subheading in new form as well as the edited panel
const modalsubheadingSave = () => {
  let title = $("#modal_subheading_title").val();
  let url = $("#modal_subheading_url").val();
  let content = $("#modal_subheading_description").val();
  let key_feature = $("#modal_subheading_key_features").val();
  let cons = $("#modal_subheading_cons").val();
  let pros = $("#modal_subheading_pros").val();
  let flipkart = $("#modal_subheading_flipkart").val();
  let amazon = $("#modal_subheading_amazon").val();
  let object = {
    title,
    url,
    content,
    key_feature,
    pros,
    cons,
    flipkart,
    amazon,
  };
  subheading.push(object);

  let component = `<div class="subheading-tab-container" id="modal_sub_tab_container_${modal_sub_count}">
                  <h5 id=sub_tab_${modal_sub_count}>${title}</h3>
                    <div style="
                                      display: flex;
                                      flex-direction: row-reverse;
                                      margin: px 0;
                                    ">
                      <button type="button" data-heading=${replace(
                        title
                      )}  class="btn btn-primary btn-sm" onclick="modaldeletesubTab(${modal_sub_count},this.getAttribute('data-heading'))">delete</button>
                      <button type="button" id=subheading_edit-btn_${modal_sub_count} data-heading=${replace(
    title
  )} onclick="subModal(this.getAttribute('data-heading'),${modal_sub_count})"  data-toggle="modal" data-target="#subModal" class="btn btn-secondary btn-sm">edit</button>
                
                    </div>
                </div>`;

  let element = document.getElementById("modal_subheading_tabs");
  element.insertAdjacentHTML("beforeend", component);
  modal_sub_count++;
  $("#modal_edit_panel").hide();
};
const modalsubheadingCancel = () => {
  $("#modal_edit_panel").hide();
};
const questionSave = () => {
  let question = $("#quest").val();
  let answer = $("#ans").val();

  let object = { question, answer };
  questions.push(object);
  let component = `<div class="subheading-tab-container" id="quest_tab_container_${modal_quest_count}">
                  <h5 id=quest_tab_heading_${modal_quest_count}>${question}</h3>
                    <div style="
                                      display: flex;
                                      flex-direction: row-reverse;
                                      margin: px 0;
                                    ">
                      <button type="button" data-heading=${replace(
                        question
                      )} id="button_quest_${modal_quest_count}" onclick="deletequestTab(${modal_quest_count},this.getAttribute('data-heading'))" class="btn btn-primary btn-sm">delete</button>
                      <button type="button" id="button_quest_edit_${modal_quest_count}" data-heading=${replace(
    question
  )}  type="button" onclick="questModal(${modal_quest_count},this.getAttribute('data-heading'))" data-toggle="modal" data-target="#questModal"  class="btn btn-secondary btn-sm">edit</button>
                
                    </div>
                </div>`;

  let element = document.getElementById("subheading_quest");
  element.insertAdjacentHTML("beforeend", component);
  modal_quest_count++;
  $("#quest_edit_panel").hide();
};
const questionCancel = () => {
  $("#quest_edit_panel").hide();
};
const modalquestionSave = () => {
  let question = $("#modal_quest").val();
  let answer = $("#modal_ans").val();

  let object = { question, answer };
  questions.push(object);
  let component = `<div class="subheading-tab-container" id="modal_quest_tab_container_${modal_quest_count}">
                  <h5 id=modal_quest_tab_heading_${modal_quest_count}>${question}</h3>
                    <div style="
                                      display: flex;
                                      flex-direction: row-reverse;
                                      margin: px 0;
                                    ">
                      <button type="button" id="button_quest_${modal_quest_count}"  data-heading=${replace(
    question
  )}  onclick="modaldeletequestTab(${modal_quest_count},this.getAttribute('data-heading'))" class="btn btn-primary btn-sm">delete</button>
                      <button type="button" data-heading=${replace(
                        question
                      )}  type="button" id="button_quest_edit_${modal_quest_count}" onclick="questModal(${modal_quest_count},this.getAttribute('data-heading'))"  data-toggle="modal" data-target="#questModal"  class="btn btn-secondary btn-sm">edit</button>
                
                    </div>
                </div>`;

  let element = document.getElementById("modal_subheading_quest");
  element.insertAdjacentHTML("beforeend", component);
  modal_quest_count++;
  $("#modal_quest_edit_panel").hide();
};
const modalquestionCancel = () => {
  $("#modal_quest_edit_panel").hide();
};

const urlInputHandle = (event) => {
  if (event.keyCode == 13) {
  }
  if (event.keyCode == 13) {
    let object = event.target.value.split(",");
    object.map((value, index) => {
      let arr = value.split("-");
      let element = ` 
       <div  class="application-tag-container" id="app_url_${index}" >
          <div class="application-tags" style="background-color: #dfe9fb;"><a href="${arr[1]}" >${arr[0]}</a><span

              style="margin-left:4px;cursor:pointer;color:blue"
              data-value=${arr[0]}
              onClick="deleteUrls(${index},this.getAttribute('data-value'))"
            >
              &times;
            </span></div>
        </div> 
      `;

      let component = document.getElementById("url_set");
      component.insertAdjacentHTML("beforeend", element);

      urls.push({
        keyword: arr[0],
        url: arr[1],
      });
    });
    $("#add_url").hide();
  }
};

const modalurlInputHandle = (event) => {
  if (event.keyCode == 13) {
  }
  if (event.keyCode == 13) {
    let object = event.target.value.split(",");
    object.map((value) => {
      let arr = value.split("-");
      let element = ` 
       <div  class="application-tag-container" id="modal_app_url_${modal_url_count}" >
          <div class="application-tags" style="background-color: #dfe9fb;"><a href="${arr[1]}" >${arr[0]}</a><span

              style="margin-left:4px;cursor:pointer;color:blue"
              data-value=${arr[0]}
              onClick="modaldeleteUrls(${modal_url_count},this.getAttribute('data-value'))"
            >
              &times;
            </span></div>
        </div> 
      `;

      let component = document.getElementById("modal_url_set");
      component.insertAdjacentHTML("beforeend", element);

      urls.push({
        keyword: arr[0],
        url: arr[1],
      });
      modal_url_count++;
    });
    $("#modal_add_url").hide();
  }
};

const submitInfo = async () => {
  $("#saveBlogConfirm").html(
    '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>'
  );
  category = $("#category").val();
  description = $("#description_input").val();
  meta_description = $("#meta_description_input").val();
  heading = $("#heading_input").val();
  imageUrl = $("#url_input").val();
  conclusion = $("#conclusion").val();
  console.log(
    description,
    "next",
    heading,
    "next",
    imageUrl,
    "next",
    urls,
    "next",
    tags,
    "next",
    subheading,
    "next",
    questions
  );

  const res = await axios.post(
    "https://zen-newton-5723fe.netlify.app/.netlify/functions/api/input",
    {
      category,
      heading,
      imageUrl,
      description,
      subheading,
      tags,
      questions,
      urls,
      conclusion,
    },
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );

  if (res) {
    window.alert("done");
    $("#saveBlogConfirm").html("Submit");
    populateData();
    $("#description_input").val("");
    $("#heading_input").val("");
    $("#url_input").val("");
    refreshVars();
    cleanForm();
  }
};

const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "./admin.html";
};

//Depreceated tags input and delete function

const deleteTags = (value, data) => {
  let index = tags.map((val, index) => {
    if (val.keyword == data) {
      return index;
    } else {
      return null;
    }
  });
  if (index != null) {
    tags.splice(index, 1);
  }

  $(`#app_tag_${value}`).remove();
};

const tagInput = (event) => {
  if (event.keyCode == 13) {
    let array = event.target.value.split(",");
    array.map((val, index) => {
      let element = `  <div class="application-tag-container" id="app_tag_${index}">
          <div class="application-tags">${val}
          <span
              
              style="margin-left:4px;cursor:pointer"
              data-value=${val}
              onClick="deleteTags(${index},this.getAttribute('data-value'))"
            >
              &times;
            </span></div>
        </div>`;

      let component = document.getElementById("skills_set");
      component.insertAdjacentHTML("beforeend", element);
      tags.push(val);
    });

    $("#add_skill").hide();
  }
};
const modaltagInput = (event) => {
  if (event.keyCode == 13) {
    let array = event.target.value.split(",");
    array.map((val) => {
      let element = `  <div class="application-tag-container" id="modal_app_tag_${modal_tab_count}">
          <div class="application-tags">${val}
          <span
              
              style="margin-left:4px;cursor:pointer"
              data-value=${val}
              onClick="modaldeleteTags(${modal_tab_count},this.getAttribute('data-value'))"
            >
              &times;
            </span></div>
        </div>`;

      let component = document.getElementById("modal_skills_set");
      component.insertAdjacentHTML("beforeend", element);
      tags.push(val);
      modal_tab_count++;
    });

    $("#modal_add_skill").hide();
  }
};
