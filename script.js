// تسجيل دخول المستخدم
function loginUser() {
    let userName = document.getElementById("userNameInput").value.trim();
    if (userName === "") {
        alert("Please enter your name!");
        return;
    }
    localStorage.setItem("userName", userName);
    saveUser(userName);
    window.location.href = "updates.html";
}

// حفظ المستخدمين المسجلين
function saveUser(userName) {
    let users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    if (!users.includes(userName)) {
        users.push(userName);
        localStorage.setItem("registeredUsers", JSON.stringify(users));
    }
}

// تحميل اسم المستخدم وعرض التحديثات الخاصة به
window.onload = function() {
    let savedUser = localStorage.getItem("userName");
    if (savedUser) {
        document.getElementById("displayUserName").textContent = savedUser;
        loadUpdates();
    } else if (window.location.pathname.includes("updates.html")) {
        window.location.href = "index.html"; // رجوع لصفحة تسجيل الدخول إذا ما كان فيه مستخدم
    }
};

// تسجيل خروج المستخدم
function logoutUser() {
    localStorage.removeItem("userName");
    window.location.href = "index.html";
}

// 📝 **حفظ التحديثات لكل مستخدم بشكل منفصل**
function saveUpdate() {
    let userName = localStorage.getItem("userName");
    let updateText = document.getElementById("updateInput").value.trim();

    if (updateText === "") {
        alert("Please enter an update!");
        return;
    }

    let updates = JSON.parse(localStorage.getItem(`updates_${userName}`)) || [];
    updates.push(updateText);
    localStorage.setItem(`updates_${userName}`, JSON.stringify(updates));

    addUpdateToUI(updateText);
    document.getElementById("updateInput").value = ""; // تفريغ البوكس بعد الإضافة
}

// ✅ **تحميل التحديثات عند فتح الصفحة**
function loadUpdates() {
    let userName = localStorage.getItem("userName");
    let updates = JSON.parse(localStorage.getItem(`updates_${userName}`)) || [];
    updates.forEach(update => {
        addUpdateToUI(update);
    });
}

// ✅ **إضافة التحديثات إلى القائمة في HTML**
function addUpdateToUI(update) {
    let updateList = document.getElementById("updateList");
    let newUpdate = document.createElement("li");
    newUpdate.textContent = update;
    updateList.appendChild(newUpdate);
}
