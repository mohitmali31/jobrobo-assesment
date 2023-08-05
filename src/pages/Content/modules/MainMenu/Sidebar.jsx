import React, { useState } from "react";
import { useEffect } from "react";
import ReactShadowRoot from "react-shadow-root";

const style = `
.sidebarWrapper {
    width: 320px;
    height: 92vh;
    background: #fff;
    color: #000;
    padding: 10px;
    box-shadow: 4px 4px 16px 4px #00000040;
    border-radius: 10px;
}
.closeBtn .close{
    position: absolute;
    top: 10px;
    right: 10px;
    background: transparent;
    border: 3px solid;
    font-size: 16px;
    font-weight: 700;
    width: 30px;
    height: 30px;
    border-radius: 25px;
    cursor : pointer;
}
main {
    padding-top : 60px;
    max-height: 100%;
    height: 85%;
}
.form-control { 
    display: block;
    width: 100%;
    max-width : 90%;
    padding: 0.375rem 0.75rem;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 0.25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}
.searchBarWrap {
    text-align : center;
}
.sidebarPanel {
    position: fixed;
    top: 10px;
    right: 20px;
}
.externalLinksWrap {
    max-height: 100%;
    height: 85%;
    overflow-y: auto;
    overflow-x: hidden;
    margin: 20px 0;
}
.externalLink {
    margin-bottom : 16px;
}
.text-center {
    text-align : center;
    margin-top : 60px;
}
`

function SideBar(props) {
    const [externalLinks, setExternalLinks] = useState([])
    const [externalLinksShow, setExternalLinksShow] = useState([])
    const [searchKeyword, setSearchKeyWord] = useState("")



    useEffect(() => {
        let linkArr = []
        let pageHost = window.location.hostname
        let aTags = document.getElementsByTagName("a")
        for (let i = 0; i < aTags.length; i++) {
            const aTag = aTags[i];
            let link = aTag.href;
            if (link) {
                let url = new URL(link);
                let host = url.hostname;
                if (host != pageHost) {
                    let obj = {
                        text: aTag.innerText,
                        link: link
                    }
                    linkArr.push(obj)
                }
            }
        }
        console.log(linkArr);
        setExternalLinks(linkArr)
        setExternalLinksShow(linkArr);
    }, [])

    const updateKeyword = (e) => {
        let keyword = e.target.value
        const filtered = externalLinks.filter(obj => {
            return `${obj.text.toLowerCase()} ${obj.link.toLowerCase()}`.includes(keyword.toLowerCase());
        })
        setSearchKeyWord(keyword);
        setExternalLinksShow(filtered);
    }

    const closeSideBar = (e) => {
        document.getElementById("MainConatinerSidebar").remove()
    }

    return <>
        <ReactShadowRoot>
            <style>{style}</style>
            <div className="Wrapper">
                <div className="sidebarPanel">
                    <div className="sidebarWrapper">
                        <header>
                            <div className="closeBtn">
                                <button onClick={closeSideBar} className="close">X</button>
                            </div>
                        </header>
                        <main>
                            <div className="searchBarWrap">
                                <input onChange={updateKeyword} type="text" id="searchInput" placeholder="Search..." value={searchKeyword} className="form-control" />
                            </div>
                            {externalLinksShow.length ? <div className="externalLinksWrap">
                                <div className="header">
                                    <h3>External Links</h3>
                                </div>
                                <ul className="externalLinksList">
                                    {externalLinksShow.map(obj => {
                                        return <li className="externalLink">
                                            <a target="blank" href={obj.link}>{obj.text ? obj.text : (new URL(obj.link)).host}</a>
                                        </li>
                                    })}
                                </ul>
                            </div>
                                : <h3 className="text-center">No Links Found</h3>}
                        </main>
                    </div>
                </div>
            </div>

        </ReactShadowRoot>
    </>
}

export default SideBar;