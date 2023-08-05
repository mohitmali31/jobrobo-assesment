import React from "react";
import ReactDOM from "react-dom";
import Sidebar from "./modules/MainMenu/Sidebar";
import './content.styles.css';
import Browser from "webextension-polyfill";

// This is the main content script.
function renderSidebar() {
    const container = document.createElement("div");
    container.id = "MainConatinerSidebar";
    container.style.position = "fixed";
    container.style.top = "100px";
    container.style.left = "0";
    container.style.zIndex = "9999999";
    ReactDOM.render(<Sidebar />, container);
    document.body.appendChild(container);
}
if (!document.getElementById("MainConatinerSidebar")) {
    renderSidebar()
}

Browser.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.action == "btnClicked") {
        if (!document.getElementById("MainConatinerSidebar")) {
            renderSidebar()
        }
        else {
            document.getElementById("MainConatinerSidebar").remove()
        }
        sendResponse(true)
    }
})