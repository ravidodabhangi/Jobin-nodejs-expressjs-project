let imageP = document.querySelector('#post_img')
let videoP = document.querySelector('#post_video')
let startPhoto = document.querySelector('#startPhoto')
let startVideo = document.querySelector('#startVideo')
let enableImg = document.querySelector('  #startPost .pi1 div')
let enableVideo = document.querySelector('  #startPost .pv1 div')


console.log(enableImg)
console.log(enableVideo)

startPhoto.addEventListener('click', ()=>
{
    imageP.style.display = "block"
    enableImg.style.display = "block"
})


startVideo.addEventListener('click', ()=>
{
    videoP.style.display = "block"
    enableVideo.style.display = "block"
})


enableImg.addEventListener('click', ()=>
{
    imageP.style.display = "none"
    enableImg.style.display = "none"

})


enableVideo.addEventListener('click', ()=>
{
    videoP.style.display = "none"
    enableVideo.style.display = "none"

})