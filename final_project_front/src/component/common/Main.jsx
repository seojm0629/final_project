const Main = () => {
    return(
        <section className="section main-page">
            <div className="main-wrap">
                <div className="main-tab-board">
                    <div className="main-board">
                        <div className="board-image">
                            <img src="/image/final_logo.png" />
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
            </div>
        </section>

    )

}

export default Main;