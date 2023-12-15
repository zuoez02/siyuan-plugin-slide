// 请求函数
export function request(url, data = null, method = "POST") {
    return new Promise<any>((resolve, reject) => {
        if (method.toUpperCase() == "POST") {
            fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })
                .then(
                    (data) => resolve(data.json()),
                    (error) => {
                        reject(error);
                    }
                )
                .catch((err) => {
                    console.error("请求失败:", err);
                });
        }
    });
}

// 弹出提示信息
export async function showMessage(msg) {
    await request("/api/notification/pushMsg", { msg, timeout: 3000 });
}

// 获取当前文档id
export function getFileID() {
    //获取当前页面
    const currentPage = getCurrentPage();
    //获取当前页面id
    const currentPageID = currentPage.querySelector(
        "span.protyle-breadcrumb__item--active"
    ).getAttribute("data-node-id");

    return currentPageID;
}

export function getCurrentPage() {

    try {
        //获取当前屏幕
        let currentScreen = document.querySelector(".layout__wnd--active");
        //获取当前页面
        let currentPage = currentScreen.querySelector(
            ".fn__flex-1.protyle:not(.fn__none)"
        );
        return currentPage;
    }
    catch (e) {
        showMessage(`未能获取到页面焦点！`)
    }
    throw new Error("未能获取到页面焦点！");
}
