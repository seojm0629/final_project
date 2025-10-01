import { useState } from "react";

const Main = () => {

    const [activeTab, setActiveTab] = useState("transaction")
    return(
        <section className="section main-page">
            <div className="main-wrap">
                <div className="main-tab-board">
                    <div className="main-board">
                        <div className="board-image">
                            <img src="/image/transaction.png" />
                        </div>
                        <div className="board-title">
                            <span>중고거래 게시판</span>
                        </div>
                    </div>

                    <div className="main-board">
                        <div className="board-image">
                            <img src="/image/work-outline.png" />
                        </div>
                        <div className="board-title">
                            <span>취업 게시판</span>
                        </div>
                    </div>

                    <div className="main-board">
                        <div className="board-image">
                            <img src="/image/board-line.png" />
                        </div>
                        <div className="board-title">
                            <span>자유 게시판</span>
                        </div>
                    </div>
                </div>

                <div className="main-board-list">
                    <div className="board-tab">
                        
                        <div onClick={()=>{
                            setActiveTab("transaction");
                        }}

                        style={{ backgroundColor: activeTab === "transaction" ? "white" : "#2F4E70", 
                                color : activeTab === "transaction" ? "black" : "white",
                                borderBottom : activeTab === "transaction" ? "none" : activeTab !== "transaction" && "1px solid black" }}
                        >중고거래 게시판 인기글</div>
                        <div onClick={()=>{
                            setActiveTab("job");
                        }}
                        style={{ backgroundColor: activeTab === "job" ? "white" : "#2F4E70", 
                                color : activeTab === "job" ? "black" : "white",
                                borderBottom : activeTab === "job" ? "none" : activeTab !== "job" && "1px solid black" 

                        }}
                        >취업 게시판 인기글</div>

                        <div onClick={()=>{
                            setActiveTab("free");
                        }}
                        style={{ backgroundColor: activeTab === "free" ? "white" : "#2F4E70", 
                                color : activeTab === "free" ? "black" : "white",
                                borderBottom : activeTab === "free" ? "none" : activeTab !== "free" && "1px solid black"  }}
                        >자유 게시판 인기글</div>
                    </div>



                    <div className="board-list">
                        {activeTab === "transaction" && 
                        <table>
                            <tbody>
                                <tr>
                                    <td style={{width: "10%"}}>1111</td>
                                    <td style={{width: "30%"}}>제목</td>
                                    <td style={{width: "10%"}}>좋아요</td>
                                    <td style={{width: "15%"}}>익명</td>
                                </tr>
                            </tbody>
                        </table>
                        }
                        {activeTab === "job" && <table>
                            <tbody>
                                <tr>
                                    <td style={{width: "20%"}}>222</td>
                                    <td style={{width: "30%"}}>제목</td>
                                    <td style={{width: "20%"}}>좋아요</td>
                                    <td style={{width: "30%"}}>익명</td>
                                </tr>
                            </tbody>
                        </table>}

                        {activeTab === "free" && <table>
                            <tbody>
                                <tr>
                                    <td style={{width: "10%"}}>333</td>
                                    <td style={{width: "30%"}}>제목</td>
                                    <td style={{width: "10%"}}>좋아요</td>
                                    <td style={{width: "15%"}}>익명</td>
                                </tr>
                            </tbody>
                        </table>}    
                    </div>    
                </div>
            </div>
        </section>

    )

}

export default Main;