import { useState, useEffect } from 'react';
import { Phone, Copy, Share2, ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';
import './App.css'

// 샘플 이미지 (public 폴더에 넣어두고 경로 맞추세요)
const photos = [
  "/images/sample1.jpg",
  "/images/sample2.jpg",
  "/images/sample3.jpg",
  "/images/sample4.jpg",
  "/images/sample5.jpg",
  "/images/sample6.jpg",
];

const titlePhoto = "/images/title.jpg"; // 대표사진

const Calendar = ({ year, month, day }) => {
  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

  const blanks = Array(firstDayOfMonth).fill(null);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="p-4">
      <div className="grid grid-cols-7 text-center gap-y-2">
        {weekDays.map(d => <div key={d} className="font-semibold text-sm">{d}</div>)}
        {blanks.map((_, i) => <div key={`blank-${i}`}></div>)}
        {days.map(d => (
          <div key={d} className={`p-1 ${d === day ? 'bg-pink-400 text-white rounded-full' : ''}`}>
            {d}
          </div>
        ))}
      </div>
    </div>
  );
};

const Contact = ({ name, phone, isGroom }) => (
    <div className="flex justify-between items-center w-full">
        <span className="text-lg">{name}</span>
        <div className="flex gap-3">
            <a href={`tel:${phone}`} className={`p-2 rounded-full ${isGroom ? 'bg-green-100' : 'bg-pink-100'}`}>
                <Phone size={18} className={isGroom ? 'text-green-600' : 'text-pink-600'} />
            </a>
            <a href={`sms:${phone}`} className={`p-2 rounded-full ${isGroom ? 'bg-green-100' : 'bg-pink-100'}`}>
                <MessageCircle size={18} className={isGroom ? 'text-green-600' : 'text-pink-600'} />
            </a>
        </div>
    </div>
);

export default function App() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dDay, setDDay] = useState('');
  const [showAccounts, setShowAccounts] = useState(false);

  const weddingDay = new Date("2026-01-31");

  useEffect(() => {
    const calculateDDay = () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const weddingDate = new Date(weddingDay);
      weddingDate.setHours(0, 0, 0, 0);

      const diffTime = weddingDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays > 0) {
        setDDay(`동재 ❤️ 찬영의 결혼식까지 ${diffDays}일 남았습니다.`);
      } else if (diffDays === 0) {
        setDDay("오늘은 저희 두 사람이 부부가 되는 날입니다.");
      } else {
        setDDay(`저희 두 사람이 부부가 된지 ${-diffDays}일 지났습니다.`);
      }
    };
    calculateDDay();
  }, []);


  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const prevPhoto = () =>
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  const nextPhoto = () =>
    setCurrentIndex((prev) => (prev + 1) % photos.length);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("복사되었습니다.");
    });
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans max-w-xl mx-auto">
      {/* 헤더 영역 */}
      <header className="text-center py-12 bg-pink-50">
        <h1 className="text-3xl font-bold mb-2">여동재 ❤️ 정찬영</h1>
      </header>

      {/* 타이틀 사진 */}
      <section className="py-8 px-4">
        <img src={titlePhoto} alt="Main" className="w-full rounded-lg shadow-lg" />
      </section>

      {/* 초대문 */}
      <section className="text-center py-12 px-6">
        <p className="text-lg leading-relaxed">
          서로에게 가장 큰 힘이 되어줄 사람,<br />
          평생을 함께하고 싶은 사람을 만났습니다.<br />
          저희 두 사람, 이제 사랑의 결실을 맺으려 합니다.<br />
          귀한 걸음 하시어 자리를 빛내주시길 바랍니다.
        </p>
      </section>

      {/* 구분선 */}
      <div className="border-t border-gray-200 w-3/4 mx-auto my-8"></div>

      {/* 혼주 정보 */}
      <section className="text-center px-6 py-8">
          <div className="flex justify-around items-center">
              <div>
                  <p className="text-gray-600">여운철 · (故)이향원 의 차남</p>
                  <p className="text-2xl font-bold mt-1">동재</p>
              </div>
              <div>
                  <p className="text-gray-600">정진웅 · 최선경 의 장녀</p>
                  <p className="text-2xl font-bold mt-1">찬영</p>
              </div>
          </div>
      </section>

      {/* 연락처 */}
      <section className="px-8 py-6">
          <div className="grid grid-cols-2 gap-x-12 gap-y-6">
              <div className="space-y-4">
                  <h3 className="font-bold text-lg border-b-2 border-green-400 pb-2">신랑측에 연락하기</h3>
                  <Contact name="신랑 여동재" phone="010-1234-5678" isGroom={true} />
                  <Contact name="아버지 여운철" phone="010-1111-2222" isGroom={true} />
              </div>
              <div className="space-y-4">
                  <h3 className="font-bold text-lg border-b-2 border-pink-400 pb-2">신부측에 연락하기</h3>
                  <Contact name="신부 정찬영" phone="010-9876-5432" isGroom={false} />
                  <Contact name="아버지 정진웅" phone="010-3333-4444" isGroom={false} />
                  <Contact name="어머니 최선경" phone="010-5555-6666" isGroom={false} />
              </div>
          </div>
      </section>

      {/* 구분선 */}
      <div className="border-t border-gray-200 w-3/4 mx-auto my-8"></div>

      {/* 날짜 및 달력 */}
      <section className="text-center py-8">
        <p className="text-2xl font-bold">2026. 01. 31. 토요일 PM 12:50</p>
        <p className="text-xl font-semibold text-pink-500 mt-4">{dDay}</p>
        <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">1월</h3>
            <Calendar year={2026} month={1} day={31} />
        </div>
      </section>

      {/* 구분선 */}
      <div className="border-t border-gray-200 w-3/4 mx-auto my-8"></div>

      {/* 갤러리 */}
      <section className="px-4">
        <h2 className="text-2xl font-semibold text-center mb-6">우리의 순간들</h2>
        <div className="grid grid-cols-3 gap-2">
          {photos.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`photo-${idx}`}
              className="w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-80"
              onClick={() => openLightbox(idx)}
            />
          ))}
        </div>
      </section>

      {/* 구분선 */}
      <div className="border-t border-gray-200 w-3/4 mx-auto my-8"></div>

      {/* 오시는 길 */}
      <section className="py-12 px-6">
        <h2 className="text-2xl font-semibold text-center mb-6">오시는 길</h2>
        <div className="text-center mb-6">
          <p className="text-lg">호텔 ICC 웨딩홀 (3층 그랜드볼룸)</p>
          <p>대전 유성구 엑스포로123번길 55</p>
        </div>
        {/* 지도 (실제 지도는 API 연동 필요) */}
        <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center mb-6">
          <p>지도 영역</p>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          <a href="kakaomap://place?id=27292121" className="bg-yellow-400 text-black p-3 rounded-lg">카카오내비</a>
          <a href="nmap://place?id=37198191" className="bg-green-500 text-white p-3 rounded-lg">네이버지도</a>
          <a href="tmap://route?goalname=호텔ICC" className="bg-blue-500 text-white p-3 rounded-lg">티맵</a>
        </div>
        <div className="mt-6 text-left bg-gray-50 p-4 rounded-lg">
          <h3 className="font-bold text-lg mb-2">대중교통 이용 시</h3>
          <p>정부청사역 또는 갈마역 하차 후 택시/버스 이용</p>
          <h3 className="font-bold text-lg mt-4 mb-2">자가용 이용 시</h3>
          <p>호텔 내 주차장 이용 (3시간 무료)</p>
        </div>
      </section>

      {/* 구분선 */}
      <div className="border-t border-gray-200 w-3/4 mx-auto my-8"></div>

      {/* 계좌번호 */}
      <section className="py-12 px-6 text-center">
        <button onClick={() => setShowAccounts(!showAccounts)} className="bg-gray-100 px-6 py-3 rounded-lg flex items-center justify-center mx-auto">
          마음 전하실 곳
          {showAccounts ? <ChevronUp className="ml-2" size={20} /> : <ChevronDown className="ml-2" size={20} />}
        </button>
        {showAccounts && (
          <div className="mt-6 space-y-4 bg-gray-50 p-6 rounded-lg">
            <div>
              <p className="font-bold">신랑측 계좌</p>
              <div className="flex items-center justify-center gap-2 mt-1">
                <p>OO은행 123-456-7890 (예금주: 여동재)</p>
                <button onClick={() => copyToClipboard("123-456-7890")} className="text-sm bg-gray-200 p-2 rounded-lg"><Copy size={14}/></button>
              </div>
            </div>
            <div className="pt-4 border-t">
              <p className="font-bold">신부측 계좌</p>
              <div className="flex items-center justify-center gap-2 mt-1">
                <p>XX은행 098-765-4321 (예금주: 정찬영)</p>
                <button onClick={() => copyToClipboard("098-765-4321")} className="text-sm bg-gray-200 p-2 rounded-lg"><Copy size={14}/></button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 구분선 */}
      <div className="border-t border-gray-200 w-3/4 mx-auto my-8"></div>

      {/* 방명록 */}
      <section className="py-12 px-6">
        <h2 className="text-2xl font-semibold text-center mb-6">축하의 마음을 전해주세요</h2>
        {/* 방명록 목록 (API 연동 필요) */}
        <div className="space-y-4 mb-6 h-48 overflow-y-auto bg-gray-50 p-4 rounded-lg">
          <div className="border-b pb-2">
            <p className="font-bold">김코딩 <span className="text-sm text-gray-500 font-normal">2025.09.06</span></p>
            <p>결혼 축하해요! 행복하세요~</p>
          </div>
           <div className="border-b pb-2">
            <p className="font-bold">이개발 <span className="text-sm text-gray-500 font-normal">2025.09.05</span></p>
            <p>두 분의 앞날에 행복만 가득하길!</p>
          </div>
        </div>
        {/* 방명록 작성 (API 연동 필요) */}
        <form className="space-y-2">
          <input type="text" placeholder="이름" className="w-full p-2 border rounded-lg" />
          <textarea placeholder="메시지를 입력하세요" rows="3" className="w-full p-2 border rounded-lg"></textarea>
          <button type="submit" className="w-full bg-pink-400 text-white p-3 rounded-lg">작성하기</button>
        </form>
      </section>

      {/* 공유하기 */}
      <footer className="py-8 bg-gray-50 text-center mt-12">
        <p className="mb-4">저희의 시작을 함께 축복해주세요.</p>
        <div className="flex justify-center gap-4">
          <button className="bg-yellow-400 text-black p-3 rounded-lg flex items-center gap-2">
            <img src="/images/kakaotalk.png" alt="kakaotalk" className="w-6 h-6" />
            카카오톡 공유
          </button>
          <button onClick={() => copyToClipboard(window.location.href)} className="bg-gray-300 p-3 rounded-lg flex items-center gap-2">
            <Share2 size={20} />
            주소 복사
          </button>
        </div>
      </footer>

      {/* 라이트박스 */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <button
            className="absolute top-4 right-4 text-white text-2xl"
            onClick={closeLightbox}
          >
            ✕
          </button>
          <button
            className="absolute left-4 text-white text-3xl"
            onClick={prevPhoto}
          >
            ‹
          </button>
          <img
            src={photos[currentIndex]}
            alt="lightbox"
            className="max-h-[80%] max-w-[90%] rounded-lg shadow-lg"
          />
          <button
            className="absolute right-4 text-white text-3xl"
            onClick={nextPhoto}
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}