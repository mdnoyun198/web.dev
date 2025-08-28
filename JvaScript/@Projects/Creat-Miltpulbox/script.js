function card(title, cName, views, monthsOld, duration, thumbnail) {




    let viewStr;
    if (views < 1000) {
        viewStr = views;
    } else if (views > 1000000) {
        viewStr = (views / 1000000).toFixed(1) + "M";
    } else {
        viewStr = (views / 1000).toFixed(1) + "K";
    }







    let html = `  
    <div class="card">
        <div class="img">
            <img src="${thumbnail}" width="200px" alt="">
        </div>
        <div class="text">
            <h1>${title}</h1>
            <p>${cName} · ${viewStr} views · ${monthsOld} months ago · ${duration}</p>
        </div>
    </div>`;

    document.querySelector(".body").innerHTML += html;
}






// ফাংশন কল
card(
    "Introduction to Backend | Sigma Web Dev video #2","CodeWithHarry",560000,7,"31:22","img.jpg"
);












function fnname(title, cName, views) { 
    console.log(`${title} ${cName} ${views}`); 
}

fnname("Introduction to Backend", "CodeWithHarry", 560000);

