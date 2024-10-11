let compileBtn = document.getElementById("compileBtn");
let outputBox = document.getElementById("output_container");
let codeId;

compileBtn.addEventListener("click", () => {
    let langId = document.getElementById("languages").value;
    let code = document.getElementById("code_editor").value;

    if (!code) {
        outputBox.innerText = "Error: Code is empty.";
        return;
    }

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "https://course.codequotient.com/api/executeCode", true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    let data = JSON.stringify({ code: code, langId: langId });
    xhr.send(data);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let response = JSON.parse(xhr.responseText);
            console.log(response);

            if (response.codeId) {
                codeId = response.codeId;
                let val = setInterval(() => {
                    let xhrResult = new XMLHttpRequest();
                    xhrResult.open("GET", `https://course.codequotient.com/api/codeResult/${codeId}`, true);
                    xhrResult.send();
                    xhrResult.onreadystatechange = function () {
                        if (xhrResult.readyState === 4 && xhrResult.status === 200) {
                            let resultResponse = JSON.parse(xhrResult.responseText);
                            console.log(resultResponse);

                            if (resultResponse.data) {
                                let resultData = JSON.parse(resultResponse.data);
                                if (resultData.errors || resultData.output) {
                                    clearInterval(val);
                                    outputBox.innerText = resultData.errors ? resultData.errors : resultData.output;
                                }
                            }
                        }
                    };
                }, 1000);
            } else {
                outputBox.innerText = response.error ? `Error: ${response.error}` : "Unknown error occurred.";
            }
        }
    };
});

//dark Mode -light mode functionality


let modeBtn = document.getElementById("mode");
let logoContainer = document.querySelector(".logo_container");
let texContainer = document.querySelector("textarea");
let outputContainer = document.querySelector(".output_container");
let body = document.querySelector("body");

modeBtn.addEventListener("click", changeMode);
function changeMode() {
    if (modeBtn.textContent == "Light Mode") {
        body.style.backgroundColor = "rgb(242, 248, 248)";
        logoContainer.style.backgroundColor = "rgb(218, 218, 251)";
        logoContainer.style.color = "navy";

        texContainer.style.backgroundColor = "white";
        texContainer.style.color = "black";
        outputContainer.style.backgroundColor = "rgb(218, 218, 251)";
        outputContainer.style.color = "navy";
        modeBtn.textContent = "Dark Mode";
    }
    else {

        body.style.backgroundColor = "rgb(44, 44, 68)";
        logoContainer.style.backgroundColor = "rgb(25, 25, 39)";
        logoContainer.style.color = "white";

        texContainer.style.backgroundColor = "rgb(55, 55, 71)";
        texContainer.style.color = "white";
        outputContainer.style.backgroundColor = "black";
        outputContainer.style.color = "white";
        modeBtn.textContent = "Light Mode";

    }
}