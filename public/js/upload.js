// upload profile picture
const camBtn = document.querySelector(".cambutton");
const uploadBlock = document.querySelector("#uploadProfileModel");
// console.log(camBtn);
// console.log(uploadBlock);
camBtn.addEventListener("click", (e) => {
  uploadBlock.style.display = "flex";
});

// success message for updated user form
const upMsg = document.querySelector("#successMessageUpload");
setTimeout(() => {
  upMsg.style.display = "none";
}, 2500);