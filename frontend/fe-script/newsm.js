// document.addEventListener("DOMContentLoaded", function () {
    fetch("/api/posts/all-posts?page=1")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const tbody = document.getElementById("news-table-body");
            tbody.innerHTML = "";

            data.data.forEach(news => {
                const tr = document.createElement("tr");
                const author = news.userID?.email ? news.userID.email.split("@")[0] : "Unknown";
                tr.innerHTML = `
                    <td>${news._id}</td>
                    <td>${news.title}</td>
                    <td>${author}</td>
                    <td><img src="${news.image}" width="100" /></td>
                    <td>
                        <button onclick="editNews(${news._id})">Edit</button>
                        <button onclick="deleteNews(${news._id})">Delete</button>
                        <button onclick="sortNews(${news._id})">Sort</button>
                    </td>
                    `
                ;

                tbody.appendChild(tr);
            });
        }).catch(error => console.error("Lỗi tải dữ liệu:", error));
// });