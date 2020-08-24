var heading, description, imageUrl;
var tags = [];
var questions = [];
var subheading = [];
var urls = [];
/* var sub_count = 0;
var quest_count = 0; */

/* const handleSubheading = (id) => {
  $("#subheading_input").show();
  console.log(heading, description, tags, questions, subheading);
};
const handleSubheadingCancel = (id) => {
  $("#subheading_input").hide();
};
const handleSubheadingSave = (id) => {
  let title = $("#title").val();
  let url = $("#url").val();
  let content = $("#content").val();
  let object = { title, url, content };
  subheading.push(object);
  let element = `<div class="accordion">
    <div class="accordion_heading" onclick="showAccordion(${sub_count})">
       <input
       id="accordion_input_${sub_count}"
              onkeyup="handleSubheadingEdit(event,${sub_count})"
              value=${title}
              style="display: none;"
            />
       
      <span id="accordion_heading_${sub_count}">${subheading[sub_count].title}</span>
      <span  id="accordion_button_${sub_count}" onclick="editAccordion(${sub_count})">edit</span>
              </div>
    <div
      class="accordion_content"
      id="accordion_content_${sub_count}"
      style="display: none;"
    > <input
       id="accordion_inputs_${sub_count}"
              
              value= "${content}"
              style="display: none;"
            />
       
      <span id="accordion_headings_${sub_count}"> ${content}</span>
      <span  id="accordion_buttons_${sub_count}" onclick="editAccordions(${sub_count})">edit</span>
              </div>
     
              </div>
  </div>`;
  let component = document.getElementById("subheading_created");
  component.insertAdjacentHTML("beforeend", element);
  sub_count++;
  $("#subheading_input").hide();
};
const handleTags = (id) => {
  $("#tag_input").show();
};
const handleTagInput = (event) => {
  console.log("clicked");
  if (event.keyCode == 13) {
    let array = event.target.value.split(",");
    array.map((val) => {
      let element = `<div class='tag-wrapper'>
    <div class="tags">${val}</div></div>`;

      let component = document.getElementById("tag-container");
      component.insertAdjacentHTML("beforeend", element);
      tags.push(val);
    });

    $("#tag_input").hide();
  }
};
const handleQuestion = (id) => {
  $("#input_question").show();
};
const handleQuestionSave = (id) => {
  let question = $("#question").val();
  let answer = $("#answer").val();

  let object = { question, answer };
  questions.push(object);
  let element = `<div class="accordion">
    <div class="accordion_heading" onclick="showQuestion(${quest_count})">
     
      <input
       id="qaccordion_input_${quest_count}"
              onkeyup="qhandleSubheadingEdit(event,${quest_count})"
              value="${question}"
              style="display: none;"
            />
       
      <span id="qaccordion_heading_${quest_count}"> ${question}</span>
      <span  id="qaccordion_button_${quest_count}" onclick="qeditAccordion(${quest_count})">edit</span>
              </div>
    <div
      class="accordion_content"
      id="question_content_${quest_count}"
      style="display: none;"
    >
      <input
       id="aaccordion_input_${quest_count}"
              onkeyup="ahandleSubheadingEdit(event,${quest_count})"
              value="${answer}"
              style="display: none;"
            />
       
      <span id="aaccordion_heading_${quest_count}"> ${answer}</span>
      <span  id="aaccordion_button_${quest_count}" onclick="aeditAccordion(${quest_count})">edit</span>
              </div>
              </div>
  </div>`;
  let component = document.getElementById("question_created");
  component.insertAdjacentHTML("beforeend", element);
  quest_count++;

  $("#input_question").hide();
};
const handleQuestionCancel = (id) => {
  $("#input_question").hide();
};
const showAccordion = (id) => {
  $(`#accordion_content_${id}`).toggle();
};

const editAccordion = (id) => {
  $(
    `#accordion_input_${id},#accordion_button_${id},#accordion_heading_${id}`
  ).toggle();
};
const qeditAccordion = (id) => {
  $(
    `#qaccordion_input_${id},#qaccordion_button_${id},#qaccordion_heading_${id}`
  ).toggle();
};
const aeditAccordion = (id) => {
  $(
    `#aaccordion_input_${id},#aaccordion_button_${id},#aaccordion_heading_${id}`
  ).toggle();
};
const editAccordions = (id) => {
  if ($(`#accordion_buttons_${id}`).html() == "edit") {
    $(`#accordion_inputs_${id},#accordion_headings_${id}`).toggle();
    $(`#accordion_buttons_${id}`).html("save");
  } else {
    subheading[id].content = $(`#accordion_inputs_${id}`).val();

    $(`#accordion_headings_${id}`).html($(`#accordion_inputs_${id}`).val());
    $(`#accordion_buttons_${id}`).html("edit");
    $(`#accordion_inputs_${id},#accordion_headings_${id}`).toggle();
  }
};

const handleSubheadingEdit = (event, id) => {
  if (event.keyCode == 13) {
    $(
      `#accordion_input_${id},#accordion_button_${id},#accordion_heading_${id}`
    ).toggle();
    subheading[id].title = event.target.value;
    $(`#accordion_heading_${id}`).html(event.target.value);
    console.log(subheading);
  }
};
const qhandleSubheadingEdit = (event, id) => {
  if (event.keyCode == 13) {
    $(
      `#qaccordion_input_${id},#qaccordion_button_${id},#qaccordion_heading_${id}`
    ).toggle();
    questions[id].question = event.target.value;
    $(`#qaccordion_heading_${id}`).html(event.target.value);
  }
};
const ahandleSubheadingEdit = (event, id) => {
  if (event.keyCode == 13) {
    $(
      `#aaccordion_input_${id},#aaccordion_button_${id},#aaccordion_heading_${id}`
    ).toggle();
    questions[id].answer = event.target.value;
    $(`#aaccordion_heading_${id}`).html(event.target.value);
  }
};

const showQuestion = (id) => {
  $(`#question_content_${id}`).toggle();
};
const handleUrlInput = (id) => {
  $("#url_input,#url_input_value,#url_input_button").toggle();
};
const urlInput = () => {
  if (event.keyCode == 13) {
    $("#url_input,#url_input_value,#url_input_button").toggle();

    let object = event.target.value.split(",");
    object.map((value) => {
      let arr = value.split("-");

      urls.push({
        keyword: arr[0],
        url: arr[1],
      });
      console.log(urls);
    });
  }
};
 */
const subheadingSave = () => {
  let title = $("#subheading_title").val();
  let url = $("#subheading_url").val();
  let content = $("#subheading_description").val();
  let object = { title, url, content };
  subheading.push(object);

  let component = `<div class="subheading-tab-container">
                  <h5>${title}</h3>
                    <div style="
                                      display: flex;
                                      flex-direction: row-reverse;
                                      margin: px 0;
                                    ">
                      <button type="button" class="btn btn-primary btn-sm">delete</button>
                      <button type="button" class="btn btn-secondary btn-sm">edit</button>
                
                    </div>
                </div>`;

  let element = document.getElementById("subheading_tabs");
  element.insertAdjacentHTML("beforeend", component);
  $("#edit_panel").hide();
};
const subheadingCancel = () => {
  $("#edit_panel").hide();
};
const questionSave = () => {
  let question = $("#quest").val();
  let answer = $("#ans").val();

  let object = { question, answer };
  questions.push(object);
  let component = `<div class="subheading-tab-container">
                  <h5>${question}</h3>
                    <div style="
                                      display: flex;
                                      flex-direction: row-reverse;
                                      margin: px 0;
                                    ">
                      <button type="button" class="btn btn-primary btn-sm">delete</button>
                      <button type="button" class="btn btn-secondary btn-sm">edit</button>
                
                    </div>
                </div>`;

  let element = document.getElementById("subheading_quest");
  element.insertAdjacentHTML("beforeend", component);

  $("#quest_edit_panel").hide();
};
const questionCancel = () => {
  $("#quest_edit_panel").hide();
};

const tagInput = (event) => {
  if (event.keyCode == 13) {
    let array = event.target.value.split(",");
    array.map((val) => {
      let element = `  <div class="application-tag-container">
          <div class="application-tags">${val}</div>
        </div>`;

      let component = document.getElementById("skills_set");
      component.insertAdjacentHTML("beforeend", element);
    });
    tags.push(array);
    console.log(array);
    $("#add_skill").hide();
  }
};

const urlInputHandle = (event) => {
  if (event.keyCode == 13) {
  }
  if (event.keyCode == 13) {
    let object = event.target.value.split(",");
    object.map((value) => {
      let arr = value.split("-");
      let element = `  <a href="${arr[1]}"><div  class="application-tag-container ">
          <div class="application-tags" style="background-color: #dfe9fb;">${arr[0]}</div>
        </div></a>`;

      let component = document.getElementById("url_set");
      component.insertAdjacentHTML("beforeend", element);

      urls.push({
        keyword: arr[0],
        url: arr[1],
      });
      console.log(urls);
    });
    $("#add_url").hide();
  }
};

const submitInfo = async () => {
  let category = $("#categories :selected").val();
  description = $("#description_input").val();
  heading = $("#heading_input").val();
  imageUrl = $("#url_input").val();
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

  /* const res = await axios.post(
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
    },
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );

  if (res) {
    window.alert("done");
  } */
};
