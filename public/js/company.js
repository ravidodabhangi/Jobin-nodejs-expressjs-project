const comp_detail_save_btn = document.querySelectorAll(".comp_detail_save_btn");
let comp_detail_btn = false;
let changer1 = () => {
  comp_detail_btn = true;
};
let changer2 = () => {
  comp_detail_btn = false;
};
if (comp_detail_save_btn) {
  comp_detail_save_btn.forEach((comp_btn) => {
    comp_btn.addEventListener("click", () => {
      if (comp_detail_btn === false) {
        changer1();
        comp_btn.textContent = "unsave";
      } else {
        changer2();
        comp_btn.textContent = "save";
      }
    });
  });
}

const comp_save_btn2 = document.querySelectorAll(".comp_save_btn2");
let comp_detail_btn2 = false;
let changer_btn1 = () => {
  comp_detail_btn2 = true;
};
let changer_btn2 = () => {
  comp_detail_btn2 = false;
};
if (comp_save_btn2) {
  comp_save_btn2.forEach((comp_btn2) => {
    comp_btn2.addEventListener("click", () => {
      if (comp_detail_btn2 === false) {
        changer_btn1();
        comp_btn2.textContent = "saved";
      } else {
        changer_btn2();
        comp_btn2.textContent = "save";
      }
    });
  });
}

// todo=============================================

let apply_xmark = document.querySelector(".apply_xmark");
let apply_btn = document.querySelector(".apply_btn");
let Email_send_aside = document.querySelector(".Email_send_aside");

if (apply_xmark && apply_btn) {
  apply_btn.addEventListener("click", () => {
    Email_send_aside.style.display = "block";
  });
  apply_xmark.addEventListener("click", () => {
    Email_send_aside.style.display = "none";
  });
}

let alert_success = document.querySelector(".alert-success");
if (alert_success) {
  setTimeout(() => {
    alert_success.style.display = "none";
  }, 2000);
}
