//Đếm số
function countUp(element, start, end, duration) {
    const COUNT_NUMBER = 30;
    let range = end - start;
    let stepTime = COUNT_NUMBER;
    let increment = Math.round (end / COUNT_NUMBER);
    let current = start;
    let timer = setInterval(function() {
        current += increment;
        element.textContent = current;
        if (increment > 0 && current >= end || increment < 0 && current <= end) {
            clearInterval(timer);
            element.textContent = end; // Đảm bảo giá trị cuối cùng được hiển thị chính xác
        }
    }, stepTime);
}


document.addEventListener('DOMContentLoaded', function () {
    //Chạy tự động tiêu đề
    let features = document.querySelector("#features");
    let featureTitleIndex = 0;
    let runCarouselFeatureTitle;
    let featureTitles = document.querySelectorAll(".feature_title");
    let featureTitlesLength = featureTitles.length;
    let contactForm = document.getElementById('contact_form');
    let contactButton = document.getElementById("contact_button");
    let contactLoading = document.getElementById('contact_loading');
    let hiddenIframe = document.getElementById("hidden_iframe");
    //Chạy đếm
    let counters = document.querySelectorAll('.counter');
    //Slide trang home
    let slideContentWrapper = document.querySelector(".slide_content_wrapper");
    let slideImageWrapper = document.querySelector(".slide_image_wrapper");
    let arrowLeft = document.querySelector("#arrow_left");
    let arrowRight = document.querySelector("#arrow_right");
    //Lướt từ trái sang phải và từ phải sang trái
    let animationSwipeRights = document.querySelectorAll('.animation_swipe_right');
    let animationSwipeLefts = document.querySelectorAll('.animation_swipe_left');
    // Khác
    let observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                let element = entry.target;
                let endValue = parseInt(element.getAttribute('data-count'));
                countUp(element, 0, endValue, 2000); // Sử dụng hàm countUp
                observer.unobserve(element); // Ngừng quan sát sau khi số đã chạy
            }
        });
    });
    counters.forEach(function(counter) {
        observer.observe(counter);
    });

    //SLide trang Home
    arrowLeft.addEventListener("click",(e)=>{
        let slideContent = document.querySelectorAll(".slide_content");
        let slideImage = document.querySelectorAll(".slide_image");
        slideContentWrapper.prepend(slideContent[slideContent.length - 1]);
        slideImageWrapper.prepend(slideImage[slideImage.length - 1]);
    });
    arrowRight.addEventListener("click",(e)=>{
        let slideContent = document.querySelectorAll(".slide_content");
        let slideImage = document.querySelectorAll(".slide_image");
        slideContentWrapper.append(slideContent[0]);
        slideImageWrapper.append(slideImage[0]);
    });

    //Lướt từ trái sang phải và từ phải sang trái
    let observerAnimationSwipe = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                let element = entry.target;
                if(element.classList.contains("animation_swipe_right")){
                    element.classList.add("swipe_right_to_left");
                }else{
                    element.classList.add("swipe_left_to_tight");
                }
                observerAnimationSwipe.unobserve(element);
            }
        });
    });
    animationSwipeRights.forEach(function(animationSwipe) {
        observerAnimationSwipe.observe(animationSwipe);
    });
    animationSwipeLefts.forEach(function(animationSwipe) {
        observerAnimationSwipe.observe(animationSwipe);
    });

    //Tự động chạy tiêu đề các tính năng
    function carouselFeatureTitle(featureTitleIndex){
        featureTitles.forEach((featureTitle,index)=>{
            if(index === featureTitleIndex){
                featureTitle.classList.add("active");
            }else{
                featureTitle.classList.remove("active");
            }
        })
    }
    function handleRunCarouselFeatureTitle(){
        runCarouselFeatureTitle = setInterval(()=>{
            if(featureTitleIndex == featureTitlesLength - 1 || featureTitleIndex >= featureTitlesLength - 1){
                featureTitleIndex = 0;
            }else{
                featureTitleIndex += 1;
            }
            carouselFeatureTitle(featureTitleIndex);
        },2000);
    }
    featureTitles.forEach((featureTitle, index)=>{
        featureTitle.addEventListener("mouseover",(event)=>{
            if(runCarouselFeatureTitle){
                clearInterval(runCarouselFeatureTitle);
                featureTitleIndex = index;
                carouselFeatureTitle(featureTitleIndex);
            }
        })

        featureTitle.addEventListener("mouseout",(event)=>{
            if(featureTitleIndex == featureTitlesLength - 1 || featureTitleIndex >= featureTitlesLength - 1){
                featureTitleIndex = 0;
            }else{
                featureTitleIndex += 1;
            }
            carouselFeatureTitle(featureTitleIndex);
            handleRunCarouselFeatureTitle();
        })
    })

    let featuresObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                let element = entry.target;
                featureTitleIndex = 0;
                carouselFeatureTitle(featureTitleIndex);
                handleRunCarouselFeatureTitle();
                featuresObserver.unobserve(element); // Ngừng quan sát sau khi hiệu ứng đã chạy
            }
        });
    });
    featuresObserver.observe(features);

    //Xử lý khi submit form
    contactForm.addEventListener('submit', function() {
        // Hiển thị loading khi form được submit
        contactButton.style.display = "none";
        contactLoading.style.display = 'flex';
    });
    
    hiddenIframe.addEventListener("load",function() {
        // Ẩn loading khi iframe hoàn thành tải (khi server đã xử lý xong yêu cầu)
        contactButton.style.display = "flex";
        contactLoading.style.display = 'none';
        alert("Gửi liên hệ thành công!!!");
    })
});

