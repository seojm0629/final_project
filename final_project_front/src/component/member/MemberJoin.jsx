const MemberJoin = () => {
    return(
        <section className="section join-wrap">
            <div className="join-page-title">회원가입</div>

            <form onSubmit={(e)=>{
                e.preventDefault;
            }}>
                <div className="login">
                    <div className="join-input-wrap">
                        <div className="join-input-title">
                            <label htmlFor="memberId">아이디</label>
                        </div>
                        <div className="join-input-item">
                            <input type="text" name="memberId" id="memberId" />
                        </div>
                    </div>
                </div>
            </form>
        </section>
    )
}

export default MemberJoin;