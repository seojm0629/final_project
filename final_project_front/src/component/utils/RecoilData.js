import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";


const { persistAtom } = recoilPersist();


//key : atom 중 구별할 식별표
//default : 최초의 값을 무엇을 설정할 것인지
//effects_UNSTABLE : [persistAtom] 새로고침을 대비하여 브라우저에 저장

//회원 아이디를 저장하는 저장소(atom)
const loginIdState = atom({
    key : "loginIdState",
    default : "",
    effects_UNSTABLE : [persistAtom],
})

//회원 타입을 저장하는 저장소(atom)
const memberTypeState = atom({
    key : "memberTypeState",
    default : "",
    effects_UNSTABLE : [persistAtom],
})

//refresh 초기화 확인용 데이터
const authReadyState = atom({
    key: "authReadyState",
    default: false,
})

//selector : atom으로 생성한 데이터를 이용해서 함수를 실행하고 결과를 리턴
const isLoginState = selector({
    key: "isLoginState",
    get: (state) => {
        //매개변수 state는 recoil에 저장된 데이터를 불러오기 위한 객체
        const loginId = state.get(loginIdState);
        const memberType = state.get(memberTypeState);
        return loginId !== "" && memberType !== 0;
    }
})

export { loginIdState, memberTypeState, isLoginState, authReadyState };