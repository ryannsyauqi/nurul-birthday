import { ArrowLeftIcon, ArrowRightIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

type Slide = { kind: "reveal" | "letter" | "wish" | "memory" | "bangkok" | "collage" | "dream" | "ending"; eyebrow: string; title: string; copy: string[]; label?: string; note?: string; image?: string; collage?: { src: string; alt: string }[] };

const slides: Slide[] = [
  { kind: "reveal", eyebrow: "for nurul", title: "This is your\nspecial day", copy: ["Aku bikin sesuatu kecil buat kamu.", "Bukan karena hari ini harus heboh, tapi karena aku pengin kamu tahu kalau kamu sespesial itu buat aku."], label: "Buka yuk" },
  { kind: "letter", eyebrow: "20 september", title: "Happy Birthday,\nMy Wife", copy: ["Nurul Rizki Yanti", "Makasih ya udah jadi istri, teman, tempat cerita, dan partner paling seru buat aku. Semoga malam ini kamu senang, dan semoga kamu selalu inget kalau aku sayang banget sama kamu."], image: "/photos/nurul-rizki-yanti.jpg" },
  { kind: "wish", eyebrow: "wish for you", title: "Semoga kamu\nmakin jadi diri sendiri", copy: ["Tetap jadi kamu yang hangat, tulus, dan selalu punya cara buat bikin orang di sekitar kamu merasa nyaman.", "Kalau nanti kamu berubah, semoga itu karena kamu makin tumbuh—bukan karena dunia bikin kamu lupa sebaik apa hati kamu."] },
  { kind: "wish", eyebrow: "wish for you", title: "Semoga kariermu\nselalu punya arah", copy: ["Semoga semua usaha kamu ketemu jalannya, dan hal-hal yang kamu kerjain pelan-pelan bawa kamu ke tempat yang kamu pengin.", "Aku percaya sama kemampuan kamu, bahkan di hari saat kamu sendiri lagi ragu sama diri kamu."] },
  { kind: "wish", eyebrow: "wish for you", title: "Semoga kamu\nselalu sehat", copy: ["Semoga badan kamu kuat, pikiran kamu tenang, dan hari-hari kamu punya cukup waktu buat istirahat juga.", "Jangan lupa jaga diri ya, karena aku mau kita punya banyak waktu buat bikin cerita bareng."] },
  { kind: "wish", eyebrow: "wish for you", title: "Semoga keluarga kita\nselalu hangat", copy: ["Semoga rumah kita nanti selalu jadi tempat yang enak buat pulang—penuh obrolan, tawa, dan rasa saling jaga.", "Aku pengin kita terus belajar jadi pasangan yang baik, lalu membangun keluarga kecil dengan cara kita sendiri."] },
  { kind: "memory", eyebrow: "our memories · 01", title: "It all started\nwith a first date", copy: ["Dari semua hari biasa, ternyata hari itu jadi awal cerita paling penting buat aku."], note: "Foto first date kamu taruh di sini nanti" },
  { kind: "memory", eyebrow: "our memories · 02", title: "Campus life,\nbut with you", copy: ["Banyak hal yang aku inget dari masa itu, tapi kamu tetap jadi bagian favoritnya."], note: "Foto campus life kamu taruh di sini nanti" },
  { kind: "memory", eyebrow: "our memories · 03", title: "Every trip\nwas better with you", copy: ["Tempatnya boleh beda-beda, tapi yang bikin semuanya seru tetap karena ada kamu."], note: "Our trip together", image: "/photos/our-trip.jpg" },
  { kind: "memory", eyebrow: "our memories · 04", title: "Another year\nof celebrating you", copy: ["Aku suka lihat kamu senang. Semoga aku bisa terus punya kesempatan buat ngerayain kamu."], note: "Foto ulang tahun sebelumnya kamu taruh di sini nanti" },
  { kind: "memory", eyebrow: "our memories · 05", title: "My favorite\n‘I do’", copy: ["Salah satu hari paling indah dalam hidup aku. Dan setelah itu, kita mulai cerita yang lebih seru lagi."], note: "Foto wedding kamu taruh di sini nanti" },
  { kind: "bangkok", eyebrow: "our next honeymoon", title: "Bangkok,\nhere we come", copy: ["Setelah semua cerita yang udah kita lewatin, sekarang waktunya bikin cerita baru lagi."], note: "Cuma kita berdua, jalan-jalan, makan enak, foto-foto, dan nggak mikirin apa-apa dulu.", image: "https://images.unsplash.com/photo-1587308688353-bc58083be441?auto=format&fit=crop&w=1200&q=85" },
  { kind: "bangkok", eyebrow: "bangkok plans · 01", title: "Let’s get lost\ntogether", copy: ["Jalan pelan-pelan, cari tempat random, dan bikin cerita yang nggak ada di itinerary."], note: "Yaowarat after dark", image: "https://images.unsplash.com/photo-1679066277595-d2bef02d966a?auto=format&fit=crop&w=1200&q=85" },
  { kind: "bangkok", eyebrow: "bangkok plans · 02", title: "Let’s eat\neverything", copy: ["Street food, café kecil, dinner enak, dan semua makanan yang pengin kita coba."], note: "Bangkok night market", image: "https://images.unsplash.com/photo-1672934324126-257a393a9aa8?auto=format&fit=crop&w=1200&q=85" },
  { kind: "bangkok", eyebrow: "bangkok plans · 03", title: "Just us", copy: ["Yang paling aku tunggu bukan tempatnya, tapi waktunya bareng kamu."], note: "A city to wander together", image: "https://images.unsplash.com/photo-1655562546244-f54950d0858a?auto=format&fit=crop&w=1200&q=85" },
  { kind: "collage", eyebrow: "five little places", title: "Bangkok,\nall in one day", copy: ["Lima spot, satu perjalanan, dan terlalu banyak alasan buat bikin foto bareng."], collage: [
    { src: "https://images.unsplash.com/photo-1587308688353-bc58083be441?auto=format&fit=crop&w=900&q=82", alt: "Wat Arun" },
    { src: "https://images.unsplash.com/photo-1679066277595-d2bef02d966a?auto=format&fit=crop&w=900&q=82", alt: "Yaowarat Chinatown" },
    { src: "https://images.unsplash.com/photo-1672934324126-257a393a9aa8?auto=format&fit=crop&w=900&q=82", alt: "Bangkok street food" },
    { src: "https://tajlandiafaq.pl/wp-content/uploads/pak_klong_market_01.jpg", alt: "Pak Khlong Talat flower market" },
    { src: "https://destinasian.com/_next/image?q=75&url=https%3A%2F%2Fstaging.destinasian.com%2Fwp-content%2Fuploads%2FBangkok-and-Chao-Phraya-River-at-Dusk.jpeg&w=1200", alt: "Chao Phraya River" },
  ] },
  { kind: "dream", eyebrow: "our little dream", title: "A little family,\nfull of love", copy: ["Aku pengin pelan-pelan kita bikin hidup yang kita suka. Rumah yang hangat, penuh cerita, penuh ketawa, dan jadi tempat pulang buat kita."], note: "Nggak harus sempurna—yang penting kita jalanin semuanya bareng." },
  { kind: "ending", eyebrow: "always, with you", title: "Happy birthday,\nmy love", copy: ["Makasih udah jadi kamu. Makasih udah milih jalanin hidup ini sama aku.", "Aku nggak sabar buat bikin lebih banyak cerita, pergi ke lebih banyak tempat, dan punya lebih banyak alasan buat ngerayain kamu."], note: "Foto kita berdua", label: "Mulai lagi dari awal" },
];

function PhotoSlot({ note, image }: { note?: string; image?: string }) {
  return <div className={`photo-slot ${image ? "has-image" : ""}`} aria-label={note ?? "Tempat foto"}><div className="tape tape-left" /><div className="tape tape-right" />{image ? <img src={image} alt={note ?? "Bangkok"} /> : <><span>foto kita</span><small>{note}</small></>}</div>;
}

export default function Prototype() {
  const [active, setActive] = useState(0);
  const slide = slides[active];
  const first = active === 0;
  const last = active === slides.length - 1;
  const next = () => setActive((current) => last ? 0 : current + 1);
  const previous = () => setActive((current) => Math.max(0, current - 1));
  return (
    <div className={`scrapbook-app ${slide.kind}`}>
    <div className="app-screen scrapbook-screen">
      <main className="screen-content" aria-live="polite">
        <header className="topbar"><button className="back-button" onClick={previous} disabled={first} aria-label="Kembali"><ArrowLeftIcon /></button><div className="page-count">{String(active + 1).padStart(2, "0")} <span>/</span> {String(slides.length).padStart(2, "0")}</div></header>
        <AnimatePresence initial={false} mode="wait"><motion.article className="slide" key={active} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2, ease: "easeOut" }}>
          <p className="eyebrow">{slide.eyebrow}</p><h1>{slide.title.split("\n").map((line) => <span key={line}>{line}</span>)}</h1>
          {slide.kind === "letter" && slide.image && <div className="portrait-card"><img src={slide.image} alt="Nurul Rizki Yanti" /></div>}
          {(slide.kind === "memory" || slide.kind === "bangkok" || slide.kind === "ending") && <PhotoSlot note={slide.note} image={slide.image} />}
          {slide.kind === "collage" && <div className="bangkok-collage">{slide.collage?.map((photo) => <img key={photo.alt} src={photo.src} alt={photo.alt} />)}</div>}
          {slide.kind === "reveal" && <div className="envelope"><div className="envelope-heart">n</div></div>}
          {slide.kind === "dream" && <div className="dream-tag">rumah · tawa · kita</div>}
          <div className="copy">{slide.copy.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{slide.note && slide.kind !== "memory" && slide.kind !== "bangkok" && slide.kind !== "ending" && <p className="soft-note">{slide.note}</p>}</div>
        </motion.article></AnimatePresence>
      </main>
    </div>
    <footer className="navigation"><div className="progress" aria-label={`Slide ${active + 1} dari ${slides.length}`}>{slides.map((_, index) => <span className={index === active ? "current" : index < active ? "done" : ""} key={index} />)}</div><button className="next-button" onClick={next}><span className="next-button-content"><span>{slide.label ?? (last ? "Mulai lagi" : "Lanjut")}</span>{last ? <ChevronRightIcon /> : <ArrowRightIcon />}</span></button></footer>
    </div>
  );
}
