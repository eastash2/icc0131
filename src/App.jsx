import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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

export default function App() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const prevPhoto = () =>
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  const nextPhoto = () =>
    setCurrentIndex((prev) => (prev + 1) % photos.length);

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {/* 헤더 영역 */}
      <header className="text-center py-12 bg-pink-50">
        <h1 className="text-3xl font-bold mb-2">여동재 ❤️ 정찬영</h1>
        <p className="text-lg">2026년 1월 31일 · 대전</p>
      </header>

      {/* 갤러리 */}
      <section className="p-4 grid grid-cols-3 gap-2">
        {photos.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`photo-${idx}`}
            className="w-full h-28 object-cover rounded-lg cursor-pointer hover:opacity-80"
            onClick={() => openLightbox(idx)}
          />
        ))}
      </section>

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