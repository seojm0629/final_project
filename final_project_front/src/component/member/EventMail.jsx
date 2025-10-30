import { useEffect, useState } from "react";
import { loginIdState, memberTypeState } from "../utils/RecoilData";
import axios from "axios";
import Swal from "sweetalert2";

const EventMail = () => {
  const [memberId, setMemberId] = useState(loginIdState);
  const [memberType, setMemberType] = useState(memberTypeState);
  const [member, setMember] = useState({
    memberId: memberId,
    memberType: memberType,
    memberCheck: "Y",
  });

  const [isLoader, setIsLoader] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [eventMail, setEventMail] = useState({
    eventTitle: "",
    eventContent: "",
  });

  const inputMailData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const newInputData = { ...eventMail, [name]: value };
    setEventMail(newInputData);
  };

  const sendMail = () => {
    setIsLoading(true);
    const sendTitle = eventMail.eventTitle;
    const sendContent = eventMail.eventContent;

    if (eventMail.eventTitle.trim() && eventMail.eventContent.trim()) {
      setIsLoader(true);
      axios
        .get(`${import.meta.env.VITE_BACK_SERVER}/member/sendEmail`, {
          params: {
            eventTitle: sendTitle,
            eventContent: sendContent,
            memberCheck: member.memberCheck,
          },
        })
        .then((res) => {
          setIsLoading(false);
          if (res.data) {
            setIsLoader(false);
            console.log(res);
            Swal.fire({
              title: "이메일 전송 완료",
              text: "이메일 전송이 완료 되었습니다.",
              icon: "success",
            });
            setEventMail({
              ...eventMail,
              eventTitle: "",
              eventContent: "",
            });
          } else {
            setIsLoader(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  /*
    const sendMail = () => {
        const eventTitle = eventMail.eventTitle;
        const eventContent = eventMail.eventContent;

        axios
        .get(`${import.meta.env.VITE_BACK_SERVER}/api/sendEvent`, {params : {eventTitle, eventContent}})
        .then((res)=>{
            console.log(res);
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    */

  return (
    <section className="admin-right email">
      <div className="admin-content-wrap email content-head">
        <div className="title m">광고성 메일 전송</div>
        <div>
          <div className="email-input-form">
            {isLoader && (
              <div className="loader-wrap">
                <span className={isLoading ? "loader" : ""}></span>
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMail();
              }}
            >
              <div className="event-mail-input">
                <div className="event-mail-title">
                  <label htmlFor="eventTitle">제목</label>
                </div>
                <div className="event-mail-content">
                  <input
                    type="text"
                    name="eventTitle"
                    id="eventTitle"
                    placeholder="제목을 입력해주세요."
                    value={eventMail.eventTitle}
                    onChange={inputMailData}
                  />
                </div>
              </div>

              <div className="event-mail-input">
                <div className="event-mail-title">
                  <label htmlFor="eventContent">내용</label>
                </div>
                <div className="event-mail-content">
                  <textarea
                    type="text"
                    name="eventContent"
                    id="eventContent"
                    value={eventMail.eventContent}
                    onChange={inputMailData}
                    placeholder={`※ 주의하세요!!!!!!!!!!! ※ \n본 메일은 광고성 메일 수신 동의한 전체 유저에게 발송됩니다.`}
                  />
                </div>
              </div>
              <div className="email-btn-box">
                <button type="submit" className="email-button">
                  전송하기
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <table className="email-target-table">
        <thead>
          <tr>
            <th colSpan={4}>
              <div>발송 유저 대상 목록</div>
            </th>
          </tr>
          <tr>
            <th>회원 번호</th>
            <th>회원 이름</th>
            <th>이메일</th>
            <th>전화번호</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>홍길동</td>
            <td>a@a.com</td>
            <td>010-0000-0000</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default EventMail;
