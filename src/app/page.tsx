"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Clock, MapPin, Gift, PartyPopper, Music, Star, Zap, X } from "lucide-react";

const CalendarModal = ({ onClose }: { onClose: () => void }) => {
  const days = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
  const dates = Array.from({ length: 31 }, (_, i) => i + 1);
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, y: 50, rotate: -5 }} animate={{ scale: 1, y: 0, rotate: 0 }} exit={{ scale: 0.8, y: 50, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white comic-border comic-shadow p-6 sm:p-8 max-w-sm w-full relative bg-halftone-white"
      >
        <button onClick={onClose} className="absolute -top-4 -right-4 bg-rose-500 comic-border text-white w-12 h-12 flex items-center justify-center hover:scale-110 shadow-[4px_4px_0_0_#000] z-[60]">
          <X size={28} strokeWidth={3} />
        </button>
        <h2 className="text-4xl sm:text-5xl font-['Bangers'] text-center mb-6 uppercase text-black [text-shadow:2px_2px_0_#fce7f3]">THÁNG 3 . 2026</h2>
        <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center font-['Bangers'] text-xl sm:text-2xl">
          {days.map(d => <div key={d} className="text-rose-500 bg-rose-100 comic-border border-2">{d}</div>)}
          {dates.map(d => (
            <div key={d} className={`relative flex items-center justify-center h-10 sm:h-12 ${d === 29 ? 'text-white' : 'text-black'}`}>
              {d === 29 && (
                <motion.div
                  initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.1 }}
                  className="absolute inset-0 bg-rose-500 rounded-full comic-border border-2 z-0"
                />
              )}
              <span className="relative z-10">{d}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

const TimeModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, y: 50, rotate: 5 }} animate={{ scale: 1, y: 0, rotate: 0 }} exit={{ scale: 0.8, y: 50, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-cyan-100 comic-border comic-shadow p-8 sm:p-10 max-w-sm w-full relative flex flex-col items-center bg-halftone-yellow"
      >
        <button onClick={onClose} className="absolute -top-4 -right-4 bg-rose-500 comic-border text-white w-12 h-12 flex items-center justify-center hover:scale-110 shadow-[4px_4px_0_0_#000] z-[60]">
          <X size={28} strokeWidth={3} />
        </button>
        <h2 className="text-5xl sm:text-6xl font-['Bangers'] text-center mb-8 bg-white px-4 py-1 comic-border shadow-[2px_2px_0_0_#000] transform -rotate-2">16:00</h2>

        <div className="relative w-48 h-48 sm:w-56 sm:h-56 bg-white rounded-full border-8 border-black flex items-center justify-center shadow-[6px_6px_0_0_#000]">
          <div className="w-5 h-5 bg-black rounded-full absolute z-20"></div>

          <motion.div
            initial={{ rotate: 0 }} animate={{ rotate: 120 }} transition={{ type: "spring", stiffness: 50, damping: 10, delay: 0.1 }}
            className="absolute w-2.5 h-16 sm:h-20 bg-black bottom-1/2 origin-bottom rounded-full z-10"
          />
          <motion.div
            initial={{ rotate: -180 }} animate={{ rotate: 360 }} transition={{ type: "spring", stiffness: 60, damping: 12, delay: 0.2 }}
            className="absolute w-1.5 h-20 sm:h-24 bg-rose-500 bottom-1/2 origin-bottom rounded-t-full rounded-b-md z-10"
          />

          {[12, 3, 6, 9].map((num, i) => (
            <div key={num} className="absolute inset-0 flex p-3 font-['Bangers'] text-3xl items-start justify-center text-black" style={{ transform: `rotate(${i * 90}deg)` }}>
              <span style={{ transform: `rotate(-${i * 90}deg)` }}>{num}</span>
            </div>
          ))}
        </div>

        <motion.div
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.8, type: "spring" }}
          className="mt-8 bg-white comic-border px-6 py-2 font-['Bangers'] text-2xl text-rose-500 rotate-[-4deg] shadow-[4px_4px_0_0_#000]"
        >
          TIỆC BẮT ĐẦU!
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default function Home() {
  const [activeModal, setActiveModal] = useState<'date' | 'time' | null>(null);

  return (
    <main className="min-h-screen w-full bg-[#fafafa] flex flex-col lg:flex-row text-black selection:bg-yellow-300 selection:text-black overflow-x-hidden relative">
      <AnimatePresence>
        {activeModal === 'date' && <CalendarModal onClose={() => setActiveModal(null)} />}
        {activeModal === 'time' && <TimeModal onClose={() => setActiveModal(null)} />}
      </AnimatePresence>
      {/* 
        Desktop: Left Half (Manga Page Panels) 
        Mobile: Top Section 
      */}
      <section className="relative w-full lg:w-1/2 min-h-[60vh] lg:min-h-screen bg-rose-50 overflow-hidden flex flex-col items-center justify-center p-6 sm:p-12 border-b-4 lg:border-b-0 lg:border-r-4 border-black z-10">

        {/* Background Halftone */}
        <div className="absolute inset-0 bg-halftone-white opacity-60 mix-blend-multiply pointer-events-none"></div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0, rotate: -2 }}
          animate={{ scale: 1, opacity: 1, rotate: -1 }}
          transition={{ duration: 0.5 }}
          className="relative w-full max-w-sm sm:max-w-md aspect-[2/3] flex flex-col gap-2 sm:gap-3 p-2 sm:p-3 bg-white border-4 border-black shadow-[8px_8px_0_0_#000] z-10 hover:rotate-0 transition-transform duration-300"
        >
          {/* Panel 1 (Header/Title) */}
          <div className="relative w-full h-[30%] bg-yellow-300 comic-border overflow-hidden flex items-center justify-center group grayscale-[0.2]">
            {/* Speedlines */}
            <div className="absolute inset-0 opacity-20 bg-[repeating-conic-gradient(from_0deg,_#000_0deg_15deg,_transparent_15deg_30deg)] group-hover:animate-[spin_10s_linear_infinite] z-10"></div>

            {/* 📸 CHÈN LINK ẢNH SỐ 1 VÀO src="" BÊN DƯỚI */}
            <img src="/page1.png" alt="Manga Panel 1" className="absolute inset-0 w-full h-full object-cover z-0" />

            {/* Manga Burst Title Bubble overlapping panel bottom */}
            <div className="absolute -bottom-2 -left-2 sm:left-2 bg-white px-4 py-2 comic-border shadow-[4px_4px_0_0_#000] z-20 rotate-[-4deg]">
              <h1 className="text-4xl sm:text-5xl font-['Bangers'] uppercase text-rose-500 [text-shadow:2px_2px_0_#000]">
                You're Invited!
              </h1>
            </div>
          </div>

          {/* Row 2 */}
          <div className="relative w-full h-[40%] flex gap-2 sm:gap-3">
            {/* Panel 2 (Left Portrait) */}
            <div className="relative w-[45%] h-full bg-cyan-100 comic-border flex items-center justify-center bg-halftone-white overflow-hidden group">
              {/* 📸 CHÈN LINK ẢNH SỐ 2 VÀO src="" BÊN DƯỚI */}
              <img src="/page2.png" alt="Manga Panel 2" className="absolute inset-0 w-full h-full object-cover z-0" />

              {/* Speech Bubble attached to left panel */}
              <div className="absolute top-4 -right-3 bg-white px-3 py-1 comic-border font-['Bangers'] text-lg z-30 shadow-[2px_2px_0_0_#000] rotate-6 border-2 flex items-center gap-1">
                <Zap size={16} className="fill-yellow-400" /> HEY!
              </div>
            </div>

            {/* Panel 3 (Right Portrait / Text) */}
            <div className="relative w-[55%] h-full flex flex-col gap-2 sm:gap-3">
              <div className="relative w-full h-1/2 bg-rose-200 comic-border flex items-center justify-center overflow-hidden group">
                {/* 📸 CHÈN LINK ẢNH SỐ 3 VÀO src="" BÊN DƯỚI */}
                <img src="/page3.png" alt="Manga Panel 3" className="absolute inset-0 w-full h-full object-cover z-0" />

                {/* Action sticker */}
                <div className="absolute top-2 right-2 bg-yellow-400 font-['Bangers'] px-2 py-1 border-2 border-black text-sm rotate-12 shadow-[2px_2px_0_0_#000]">
                  WOW!
                </div>
              </div>
              <div className="relative w-full h-1/2 bg-white comic-border flex flex-col items-center justify-center p-2 overflow-hidden bg-halftone-yellow group">
                {/* 📸 CHÈN LINK ẢNH SỐ 4 VÀO src="" BÊN DƯỚI */}
                <img src="/page4.png" alt="" className="absolute inset-0 w-full h-full object-cover z-0" />

                <PartyPopper size={32} className="mb-2 text-black group-hover:rotate-12 transition-transform relative z-10" strokeWidth={1.5} />

              </div>
            </div>
          </div>

          {/* Panel 4 (Footer Panel) */}
          <div className="relative w-full h-[30%] bg-emerald-100 comic-border overflow-hidden flex items-center justify-center group bg-halftone-white">
            {/* 📸 CHÈN LINK ẢNH SỐ 5 VÀO src="" BÊN DƯỚI */}
            <img src="/page5.png" alt="" className="absolute inset-0 w-full h-full object-cover z-0" />

            <div className="absolute bottom-3 right-3 bg-yellow-400 px-4 py-2 comic-border shadow-[4px_4px_0_0_#000] -rotate-2 z-10">
              <p className="text-xl sm:text-3xl font-['Bangers'] text-black uppercase tracking-widest">
                SMILE HOUSE
              </p>
            </div>
          </div>

        </motion.div>
      </section>

      {/* 
        Desktop: Right Half (Details / Panels) 
        Mobile: Bottom Section 
      */}
      <section className="relative w-full lg:w-1/2 p-6 sm:p-10 lg:p-16 bg-white flex flex-col shrink-0 overflow-y-auto z-0 bg-halftone-white">

        <div className="max-w-xl mx-auto w-full space-y-8 sm:space-y-12">

          {/* Intro Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-cyan-100 comic-border comic-shadow p-6 sm:p-8 relative"
          >
            <div className="absolute -top-4 -left-4 bg-yellow-300 comic-border p-2 shadow-[2px_2px_0_0_#000]">
              <Star className="fill-black" size={20} />
            </div>
            <h2 className="text-3xl sm:text-4xl font-['Bangers'] mb-4 text-black uppercase tracking-wide [text-shadow:2px_2px_0_#fff]">
              Sinh Nhật Nhà<br />
              Chap17: Những mảnh ghép
            </h2>
            <p className="text-lg text-black font-bold uppercase leading-loose">
              Thân mời tất cả thành viên của <span className="bg-rose-400 text-white px-2 py-1 comic-border mx-1 shadow-[2px_2px_0_0_#000]">SMILE HOUSE</span> đến chung vui! Mang theo một nụ cười thật tươi nhé!
            </p>
          </motion.div>

          {/* Event Info Cards */}
          <div className="grid grid-cols-1 gap-6 sm:gap-8">

            <motion.div
              onClick={() => setActiveModal('date')}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex flex-row items-center p-4 bg-white comic-border comic-shadow -rotate-1 hover:rotate-0 transition-transform cursor-pointer group"
            >
              <div className="w-16 h-16 bg-rose-400 comic-border flex items-center justify-center shrink-0 mr-4 shadow-[4px_4px_0_0_#000] group-hover:bg-rose-500 transition-colors">
                <Calendar size={32} className="text-black" strokeWidth={2.5} />
              </div>
              <div className="overflow-hidden flex-1">
                <p className="text-sm font-black text-black uppercase bg-black text-white inline-block px-2 mb-1 border-2 border-black font-['Bangers'] tracking-widest">Ngày</p>
                <p className="text-xl sm:text-2xl font-black text-black uppercase truncate">CN, 29/03/2026</p>
              </div>
            </motion.div>

            <motion.div
              onClick={() => setActiveModal('time')}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex flex-row items-center p-4 bg-white comic-border comic-shadow rotate-1 hover:rotate-0 transition-transform cursor-pointer group"
            >
              <div className="w-16 h-16 bg-yellow-400 comic-border flex items-center justify-center shrink-0 mr-4 shadow-[4px_4px_0_0_#000] group-hover:bg-yellow-500 transition-colors">
                <Clock size={32} className="text-black" strokeWidth={2.5} />
              </div>
              <div className="overflow-hidden flex-1">
                <p className="text-sm font-black text-black uppercase bg-black text-white inline-block px-2 mb-1 border-2 border-black font-['Bangers'] tracking-widest">Thời gian</p>
                <p className="text-xl sm:text-2xl font-black text-black uppercase truncate">16:00 - 21:00</p>
              </div>
            </motion.div>

            <motion.a
              href="https://maps.app.goo.gl/aZuSMJMohHLe8MDz5"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-row items-center p-4 bg-white comic-border comic-shadow -rotate-2 hover:rotate-0 transition-transform cursor-pointer group block"
            >
              <div className="w-16 h-16 bg-emerald-400 comic-border flex items-center justify-center shrink-0 mr-4 shadow-[4px_4px_0_0_#000] group-hover:bg-emerald-500 transition-colors">
                <MapPin size={32} className="text-black" strokeWidth={2.5} />
              </div>
              <div className="overflow-hidden flex-1">
                <p className="text-sm font-black text-black uppercase bg-black text-white inline-block px-2 mb-1 border-2 border-black font-['Bangers'] tracking-widest">Địa điểm</p>
                <p className="text-xl sm:text-xl font-black text-black uppercase truncate">Angel Coffee - 123 Nguyễn Đức Trung</p>
              </div>
            </motion.a>

          </div>

          {/* Timeline Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white comic-border comic-shadow p-6 sm:p-8 relative"
          >
            {/* Speed dots decoration */}
            <div className="absolute top-4 right-4 flex gap-1">
              <div className="w-2 h-2 bg-black rounded-full" />
              <div className="w-2 h-2 bg-black rounded-full" />
              <div className="w-2 h-2 bg-black rounded-full" />
            </div>

            <h3 className="text-3xl font-['Bangers'] mb-6 text-black uppercase flex items-center gap-3 border-b-4 border-black pb-3">
              <span className="bg-rose-500 p-2 comic-border text-white shadow-[2px_2px_0_0_#000]"><Clock size={24} /></span>
              Timeline buổi sinh nhật
            </h3>

            <div className="relative border-l-4 border-black ml-4 space-y-8 py-4">
              {[
                { time: "16:00", event: "Đón khách và checkin", icon: "💥" },
                { time: "17:15", event: "Khai mạc và văn nghệ", icon: "✨" },
                { time: "18:00", event: "Điểm tâm và giao lưu", icon: "🍕" },
                { time: "19:45", event: "Cắt bánh sinh nhật", icon: "🎂" },
                { time: "20:30", event: "Chụp ảnh lưu niệm", icon: "📸" },
              ].map((item, i) => (
                <div key={i} className="relative pl-8 group">
                  <div className="absolute -left-[14px] top-1 w-6 h-6 bg-yellow-300 border-4 border-black z-10 group-hover:scale-125 transition-transform" />
                  <div className="absolute -left-[40px] top-[14px] w-6 h-1 bg-black z-0" />
                  <div className="flex flex-wrap items-center gap-3 mb-1">
                    <p className="text-xl sm:text-2xl font-black text-white bg-black px-3 py-1 comic-border font-['Bangers'] tracking-widest">{item.time}</p>
                    <span className="text-2xl">{item.icon}</span>
                  </div>
                  <p className="text-lg sm:text-xl text-black font-extrabold uppercase mt-1 tracking-tight">{item.event}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Action Button Segment */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-12 text-center pb-8"
          >
            <div className="mb-8 flex justify-center">
              <div className="text-lg sm:text-xl bg-cyan-100 inline-block px-6 py-3 comic-border shadow-[4px_4px_0_0_#000] font-black uppercase text-black rotate-[2deg] hover:rotate-0 transition-transform cursor-default">
                PHÍ THAM GIA: <span className="text-rose-500 font-['Bangers'] text-2xl sm:text-3xl tracking-widest bg-white comic-border px-2 ml-2">130K</span>
              </div>
            </div>
            <a
              href="mailto:sclub.smilehouse@gmail.com?subject=Xác nhận tham dự Sinh Nhật Nhà Smile&body=Mình xác nhận sẽ tham dự sinh nhật nhé!"
              className="inline-flex w-full sm:w-auto px-8 py-5 bg-rose-500 hover:bg-rose-400 text-white font-['Bangers'] tracking-widest text-3xl sm:text-4xl uppercase items-center justify-center gap-4 comic-border comic-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0_0_#000] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all group"
            >
              <Gift size={32} className="group-hover:animate-bounce" /> XÁC NHẬN NGAY!
            </a>
            <div className="mt-6 flex flex-col items-center">
              <span className="text-sm bg-yellow-300 inline-block px-4 py-2 comic-border shadow-[2px_2px_0_0_#000] font-black uppercase text-black">
                VUI LÒNG PHẢN HỒI TRƯỚC 25/03/2026
              </span>
            </div>
          </motion.div>

          <div className="mt-8 mb-4 text-center">
            <h2 className="text-6xl sm:text-7xl font-['Bangers'] text-black/20 uppercase tracking-widest hover:text-rose-500 transition-colors cursor-default">
              BIG BIG BIG SMILE
            </h2>
          </div>

        </div>
      </section>
    </main>
  );
}

