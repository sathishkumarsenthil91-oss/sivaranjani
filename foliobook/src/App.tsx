import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Moon,
  Sun,
} from "lucide-react";
import {
  ALL_CHAPTERS_PAGES,
  CHAPTER_LIST,
  CHARACTERS,
  MANGA_STORY,
} from "./data/mangaData";
import { MangaPage } from "./components/MangaPage";
import { ZoomModal } from "./components/ZoomModal";
const STORAGE = "sunwheels_reader_v3";
const number = (n: number) => String(n).padStart(2, "0");
function loadSaved() {
  try {
    const s = JSON.parse(localStorage.getItem(STORAGE) || "null");
    const ch = Number(
      s?.chapter ?? localStorage.getItem("sunwheels_chapter_v2") ?? 1,
    );
    const p = Number(s?.page ?? localStorage.getItem("sunwheels_page_v2") ?? 1);
    const chapter = Number.isInteger(ch) && ALL_CHAPTERS_PAGES[ch] ? ch : 1;
    return {
      chapter,
      page: Number.isInteger(p)
        ? Math.max(1, Math.min(p, ALL_CHAPTERS_PAGES[chapter].length))
        : 1,
      bookmarks: Array.isArray(s?.bookmarks)
        ? (s.bookmarks.filter(
            (v: unknown) => typeof v === "string" && /^\d+_\d+$/.test(v),
          ) as string[])
        : [],
      started: Boolean(s?.started),
      dark: Boolean(s?.dark),
    };
  } catch {
    return {
      chapter: 1,
      page: 1,
      bookmarks: [] as string[],
      started: false,
      dark: false,
    };
  }
}
export default function App() {
  const [saved] = useState(loadSaved);
  const [progress, setProgress] = useState({
    chapter: saved.chapter,
    page: saved.page,
  });
  const [started, setStarted] = useState(saved.started);
  const [bookmarks, setBookmarks] = useState<string[]>(saved.bookmarks);
  const [dark, setDark] = useState(saved.dark);
  const [reader, setReader] = useState(false);
  const [scrollMode, setScrollMode] = useState(false);
  const [bw, setBw] = useState(false);
  const [direction, setDirection] = useState(1);
  const [turningPage, setTurningPage] = useState<{
    chapter: number;
    page: number;
    direction: number;
  } | null>(null);
  const [zoom, setZoom] = useState<{ src: string; caption?: string } | null>(
    null,
  );
  const [character, setCharacter] = useState(CHARACTERS[0]);
  const [savedOnly, setSavedOnly] = useState(false);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const stage = useRef<HTMLDivElement>(null);
  const { chapter, page } = progress;
  const pages = ALL_CHAPTERS_PAGES[chapter];
  const meta = CHAPTER_LIST.find((c) => c.chapterNumber === chapter)!;
  const key = `${chapter}_${page}`;
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE,
        JSON.stringify({ ...progress, bookmarks, started, dark }),
      );
    } catch {}
  }, [progress, bookmarks, started, dark]);
  const home = useCallback(() => {
    setTurningPage(null);
    setReader(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);
  const open = useCallback((ch: number, p = 1) => {
    setTurningPage(null);
    setProgress({
      chapter: ch,
      page: Math.max(1, Math.min(p, ALL_CHAPTERS_PAGES[ch].length)),
    });
    setReader(true);
    setStarted(true);
    setScrollMode(false);
    setDirection(1);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);
  const turn = useCallback(
    (step: number) => {
      const next = (() => {
        const current = progress;
        const count = ALL_CHAPTERS_PAGES[current.chapter].length;
        if (current.page + step < 1)
          return current.chapter > 1
            ? {
                chapter: current.chapter - 1,
                page: ALL_CHAPTERS_PAGES[current.chapter - 1].length,
              }
            : current;
        if (current.page + step > count)
          return current.chapter < CHAPTER_LIST.length
            ? { chapter: current.chapter + 1, page: 1 }
            : current;
        return { ...current, page: current.page + step };
      })();
      if (next === progress) return;
      setTurningPage({ ...progress, direction: step });
      setDirection(step);
      setProgress(next);
      window.scrollTo({ top: 0, behavior: "instant" });
    },
    [progress],
  );
  useEffect(() => {
    if (!turningPage) return;
    const timeout = window.setTimeout(() => setTurningPage(null), 700);
    return () => window.clearTimeout(timeout);
  }, [turningPage]);
  const bookmark = useCallback(
    () =>
      setBookmarks((items) =>
        items.includes(key) ? items.filter((v) => v !== key) : [...items, key],
      ),
    [key],
  );
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (zoom) setZoom(null);
        else if (reader) home();
        return;
      }
      if (
        !reader ||
        zoom ||
        ["INPUT", "SELECT", "TEXTAREA"].includes(
          (e.target as HTMLElement).tagName,
        )
      )
        return;
      if (e.key === " " && (e.target as HTMLElement).closest("button,a"))
        return;
      if (
        !scrollMode &&
        ["ArrowRight", "PageDown", " ", "ArrowLeft", "PageUp"].includes(e.key)
      ) {
        e.preventDefault();
        turn(["ArrowLeft", "PageUp"].includes(e.key) ? -1 : 1);
      }
      if (e.key.toLowerCase() === "b") bookmark();
    };
    const next = () => {
      if (chapter < CHAPTER_LIST.length) open(chapter + 1);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("nav-home", home);
    window.addEventListener("nav-next-chapter", next);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("nav-home", home);
      window.removeEventListener("nav-next-chapter", next);
    };
  }, [reader, zoom, scrollMode, home, turn, bookmark, chapter, open]);
  useEffect(() => {
    if (!reader || !scrollMode || !stage.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          )[0];
        if (visible)
          setProgress((current) => ({
            ...current,
            page: Number((visible.target as HTMLElement).dataset.page),
          }));
      },
      { rootMargin: "-10% 0px -65% 0px", threshold: 0 },
    );
    stage.current
      .querySelectorAll("[data-page]")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [reader, scrollMode, chapter]);
  const changeMode = (scroll: boolean) => {
    setTurningPage(null);
    setScrollMode(scroll);
    if (scroll)
      requestAnimationFrame(() =>
        document
          .getElementById(`page-${page}`)
          ?.scrollIntoView({ block: "start" }),
      );
    else window.scrollTo({ top: 0, behavior: "instant" });
  };
  const zoomPanel = (src: string, caption?: string) =>
    setZoom({ src, caption });
  return (
    <div
      className={`manga-site ${reader ? "is-reading" : ""} ${dark ? "night-paper" : ""}`}
    >
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="comic-header">
        <button
          className="wordmark"
          onClick={home}
          aria-label="Sun Wheels home"
        >
          <span className="sun-mark">✳</span> SUN WHEELS{" "}
          <small>ORIGINAL MANGA</small>
        </button>
        {reader ? (
          <button className="text-button" onClick={home}>
            <ArrowLeft size={16} /> Chapter library
          </button>
        ) : (
          <nav aria-label="Main navigation">
            <a href="#chapters">Chapters</a>
            <a href="#characters">Characters</a>
            <a href="#world">The world</a>
            <button
              className="ink-button small"
              onClick={() => open(chapter, page)}
            >
              Read manga <ArrowRight size={15} />
            </button>
          </nav>
        )}
      </header>
      <main id="main-content">
        {!reader ? (
          <>
            <section className="cover-section">
              <div className="issue-line">
                <span>VOL. 01 / THE SEVEN WHEELS</span>
                <span>SCI-FI · MYSTERY · ADVENTURE</span>
                <span>10 CHAPTERS. ONE EPIC STORY.</span>
              </div>
              <div className="cover-grid">
                <div className="cover-copy">
                  <span className="eyebrow">
                    <i /> SEASON ONE · COMPLETE
                  </span>
                  <h1>
                    SUN
                    <br />
                    <em>WHEELS</em>
                    <small>サン・ホイールズ</small>
                  </h1>
                  <p className="cover-tagline">
                    A city caught in yesterday.
                    <br />A boy who remembers tomorrow.
                  </p>
                  <p className="story-subtitle">{MANGA_STORY.subtitle}</p>
                  <p className="cover-description">
                    An ancient vault. An endless sunset. Step into Aathirai with
                    Ilan and uncover the mystery of the seven Sun Wheels.
                  </p>
                  <div className="cover-buttons">
                    <button className="ink-button" onClick={() => open(1)}>
                      <BookOpen size={19} /> Start reading{" "}
                      <ArrowRight size={19} />
                    </button>
                    {started ? (
                      <button
                        className="paper-button"
                        onClick={() => open(chapter, page)}
                      >
                        Continue · Ch. {number(chapter)}
                      </button>
                    ) : (
                      <a className="paper-button" href="#chapters">
                        Explore chapters
                      </a>
                    )}
                  </div>
                  <p className="reader-note">
                    <b>← →</b> Turn the page. Swipe on mobile. Get lost in the
                    story.
                  </p>
                  <div className="cover-stat">
                    <strong>10</strong>
                    <span>CHAPTERS</span>
                    <strong>
                      {Object.values(ALL_CHAPTERS_PAGES).reduce(
                        (n, p) => n + p.length,
                        0,
                      )}
                    </strong>
                    <span>PAGES TO EXPLORE</span>
                    <b>FREE TO READ</b>
                  </div>
                </div>
                <div className="cover-art">
                  <div className="art-main">
                    <img
                      src={MANGA_STORY.coverImage}
                      alt="Sun Wheels manga cover with Ilan and the ancient Sun Wheel"
                    />
                    <span className="art-caption">
                      SOME MEMORIES WERE NEVER MEANT TO SURVIVE TIME.
                    </span>
                    <span className="volume-sticker">
                      VOL.<b>01</b>
                    </span>
                  </div>
                  <div className="art-strip">
                    <div>
                      <img
                        src={CHAPTER_LIST[1].coverImage}
                        alt="The ancient city of Aathirai"
                      />
                      <span>THE CITY THAT NEVER SLEEPS.</span>
                    </div>
                    <div>
                      <img
                        src={CHARACTERS[1].avatar}
                        alt="Yazhini, the black stone carver"
                      />
                      <span>THE GIRL WHO REMEMBERS.</span>
                    </div>
                  </div>
                  <div className="speech-sticker">
                    The next page
                    <br />
                    changes everything.
                  </div>
                </div>
              </div>
            </section>
            <div className="story-ribbon">
              <span>ANCIENT SECRETS</span>
              <span>✳</span>
              <span>ENDLESS SUNSETS</span>
              <span>✳</span>
              <span>ONE CHANCE TO BREAK THE LOOP</span>
              <span>✳</span>
              <span>SUN WHEELS</span>
            </div>
            <section id="chapters" className="section-wrap library-section">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">YOUR NEXT ADVENTURE</span>
                  <h2>
                    The chapter shelf<span>.</span>
                  </h2>
                </div>
                <p>Read in order. Or pick up where you left off.</p>
              </div>
              <div className="shelf-toolbar">
                <div role="group" aria-label="Chapter filters">
                  <button
                    className={!savedOnly ? "active" : ""}
                    onClick={() => setSavedOnly(false)}
                  >
                    All chapters <span>10</span>
                  </button>
                  <button
                    className={savedOnly ? "active" : ""}
                    onClick={() => setSavedOnly(true)}
                  >
                    <Bookmark size={15} /> Bookmarked{" "}
                    <span>{bookmarks.length}</span>
                  </button>
                </div>
                <span>SEASON 01 — COMPLETE</span>
              </div>
              {savedOnly && !bookmarks.length ? (
                <div className="empty-shelf">
                  <Bookmark size={28} />
                  <h3>Keep a page for later.</h3>
                  <p>
                    Tap the bookmark in the reader. Your saved pages will appear
                    here.
                  </p>
                  <button
                    className="paper-button"
                    onClick={() => setSavedOnly(false)}
                  >
                    Browse all chapters
                  </button>
                </div>
              ) : (
                <div className="chapter-grid">
                  {CHAPTER_LIST.filter(
                    (c) =>
                      !savedOnly ||
                      bookmarks.some((k) =>
                        k.startsWith(`${c.chapterNumber}_`),
                      ),
                  ).map((c) => (
                    <article className="chapter-card" key={c.chapterNumber}>
                      <button
                        className="chapter-cover"
                        onClick={() => open(c.chapterNumber)}
                        aria-label={`Read chapter ${c.chapterNumber}: ${c.title}`}
                      >
                        <img src={c.coverImage} alt={c.title} loading="lazy" />
                        <span className="chapter-number">
                          {number(c.chapterNumber)}
                        </span>
                        <span className="chapter-pages">
                          {ALL_CHAPTERS_PAGES[c.chapterNumber].length} PAGES
                        </span>
                        <span className="cover-read">
                          <BookOpen size={22} /> Read chapter
                        </span>
                      </button>
                      <div className="chapter-info">
                        <span className="eyebrow">
                          CHAPTER {number(c.chapterNumber)}
                          {started && chapter === c.chapterNumber
                            ? " · READING"
                            : ""}
                        </span>
                        <h3>{c.title}</h3>
                        <p>{c.subtitle}</p>
                        <button
                          className="chapter-link"
                          onClick={() =>
                            open(
                              c.chapterNumber,
                              started && chapter === c.chapterNumber ? page : 1,
                            )
                          }
                        >
                          {started && chapter === c.chapterNumber
                            ? `Continue · Page ${page}`
                            : "Open chapter"}
                          <ArrowRight size={17} />
                        </button>
                        {savedOnly && (
                          <div className="saved-page-links">
                            {bookmarks
                              .filter((k) =>
                                k.startsWith(`${c.chapterNumber}_`),
                              )
                              .map((k) => (
                                <button
                                  key={k}
                                  onClick={() =>
                                    open(
                                      c.chapterNumber,
                                      Number(k.split("_")[1]),
                                    )
                                  }
                                >
                                  Saved page {k.split("_")[1]}
                                </button>
                              ))}
                          </div>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
            <section id="characters" className="cast-section">
              <div className="section-wrap">
                <div className="section-heading">
                  <div>
                    <span className="eyebrow">THE FACES INSIDE THE LOOP</span>
                    <h2>
                      Meet the cast<span>.</span>
                    </h2>
                  </div>
                  <p>Everyone has a story. Everyone has a secret.</p>
                </div>
                <div className="cast-layout">
                  <div
                    className="cast-tabs"
                    role="group"
                    aria-label="Choose a character"
                  >
                    {CHARACTERS.map((c) => (
                      <button
                        key={c.id}
                        className={character.id === c.id ? "selected" : ""}
                        aria-pressed={character.id === c.id}
                        onClick={() => setCharacter(c)}
                      >
                        <img src={c.avatar} alt="" loading="lazy" />
                        <span>
                          <b>{c.name}</b>
                          <small>{c.role}</small>
                        </span>
                        <ArrowRight size={17} />
                      </button>
                    ))}
                  </div>
                  <div className="cast-portrait">
                    <img
                      src={character.avatar}
                      alt={character.name}
                      loading="lazy"
                    />
                  </div>
                  <div className="cast-description">
                    <span className="eyebrow">{character.role}</span>
                    <h3>{character.name}</h3>
                    <p>{character.description}</p>
                    <blockquote>{character.quote}</blockquote>
                    <small>CHARACTER NOTES CONTAIN STORY SPOILERS</small>
                  </div>
                </div>
              </div>
            </section>
            <section id="world" className="world-section section-wrap">
              <div className="world-art">
                <img
                  src={CHAPTER_LIST[1].coverImage}
                  alt="Aathirai at its eternal sunset"
                  loading="lazy"
                />
                <span className="art-caption">AATHIRAI / TIME UNKNOWN</span>
              </div>
              <div>
                <span className="eyebrow">ENTER THE WORLD</span>
                <h2>
                  Yesterday never
                  <br />
                  ends here<span>.</span>
                </h2>
                <p>
                  Under Vetri Nagar lies the Echo Vault, a machine that brings
                  memories in stone to life. Beyond it, Aathirai waits in an
                  eternal sunset. Every reset erases everyone's memory — except
                  Ilan's.
                </p>
                <details>
                  <summary>The Echo Vault</summary>
                  <p>
                    An ancient machine that reconstructs memories preserved in
                    mineral stone, materializing a lost civilization.
                  </p>
                </details>
                <details>
                  <summary>The seven Sun Wheels</summary>
                  <p>
                    Seven ancient wheels govern Memory, Time, Energy, Life,
                    Knowledge, Reality, and Origin.
                  </p>
                </details>
                <button className="ink-button" onClick={() => open(1)}>
                  Enter the story <ArrowRight size={18} />
                </button>
              </div>
            </section>
            <footer className="comic-footer">
              <b>✳ SUN WHEELS</b>
              <span>SEASON 01 · THE SEVEN WHEELS</span>
              <a href="#main-content">Back to top ↑</a>
              <p>Season 2: The Seven Cities · Coming next</p>
            </footer>
          </>
        ) : (
          <div className="reader-shell">
            <div className="reader-topline">
              <div>
                <span className="eyebrow">CHAPTER {number(chapter)} / 10</span>
                <h1>{meta.title}</h1>
              </div>
              <label className="chapter-select">
                Jump to chapter
                <select
                  aria-label="Jump to chapter"
                  value={chapter}
                  onChange={(e) => open(Number(e.target.value))}
                >
                  {CHAPTER_LIST.map((c) => (
                    <option key={c.chapterNumber} value={c.chapterNumber}>
                      {number(c.chapterNumber)} · {c.title}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="reader-options">
              <div className="mode-switch">
                <button
                  className={!scrollMode ? "active" : ""}
                  aria-pressed={!scrollMode}
                  onClick={() => changeMode(false)}
                >
                  Page turns
                </button>
                <button
                  className={scrollMode ? "active" : ""}
                  aria-pressed={scrollMode}
                  onClick={() => changeMode(true)}
                >
                  Scroll
                </button>
              </div>
              <span className="reader-help">
                {scrollMode
                  ? "Scroll down to follow the story"
                  : "Swipe or use ← → to turn pages"}
              </span>
              <button
                className="text-button"
                aria-pressed={bw}
                onClick={() => setBw((v) => !v)}
              >
                {bw ? "Color artwork" : "Black & white"}
              </button>
              <button
                className="icon-button"
                aria-label={dark ? "Use light paper" : "Use dark paper"}
                onClick={() => setDark((v) => !v)}
              >
                {dark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
            <div
              ref={stage}
              className={`book-stage ${scrollMode ? "scroll-book" : ""}`}
              onTouchStart={(e) => {
                if (
                  (e.target as HTMLElement).closest("button") ||
                  e.touches.length !== 1
                ) {
                  touch.current = null;
                  return;
                }
                touch.current = {
                  x: e.touches[0].clientX,
                  y: e.touches[0].clientY,
                };
              }}
              onTouchEnd={(e) => {
                const start = touch.current;
                touch.current = null;
                if (!start || zoom || scrollMode) return;
                const dx = e.changedTouches[0].clientX - start.x,
                  dy = e.changedTouches[0].clientY - start.y;
                if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.5)
                  turn(dx < 0 ? 1 : -1);
              }}
            >
              {scrollMode ? (
                pages.map((p) => (
                  <div
                    className="book-leaf"
                    data-page={p.pageNumber}
                    id={`page-${p.pageNumber}`}
                    key={`${chapter}-${p.pageNumber}`}
                  >
                    <MangaPage
                      page={p}
                      totalPages={pages.length}
                      background={dark ? "dark" : "light"}
                      isBlackAndWhiteMode={bw}
                      onZoom={zoomPanel}
                    />
                  </div>
                ))
              ) : (
                <div
                  key={`${chapter}-${page}`}
                  className={`book-leaf ${direction > 0 ? "turn-forward" : "turn-back"}`}
                >
                  <MangaPage
                    page={pages[page - 1]}
                    totalPages={pages.length}
                    background={dark ? "dark" : "light"}
                    isBlackAndWhiteMode={bw}
                    onZoom={zoomPanel}
                  />
                </div>
              )}
              {!scrollMode && turningPage && (
                <div
                  key={`turn-${turningPage.chapter}-${turningPage.page}`}
                  className={`book-turn-sheet ${turningPage.direction > 0 ? "sheet-forward" : "sheet-back"}`}
                  aria-hidden="true"
                  inert
                  onAnimationEnd={() => setTurningPage(null)}
                >
                  <div className="book-leaf">
                    <MangaPage
                      page={
                        ALL_CHAPTERS_PAGES[turningPage.chapter][
                          turningPage.page - 1
                        ]
                      }
                      totalPages={
                        ALL_CHAPTERS_PAGES[turningPage.chapter].length
                      }
                      background={dark ? "dark" : "light"}
                      isBlackAndWhiteMode={bw}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="reader-dock">
              <button
                className="dock-turn"
                onClick={() => turn(-1)}
                disabled={(chapter === 1 && page === 1) || scrollMode}
                aria-label="Previous page"
              >
                <ChevronLeft size={22} />
                <span>Previous</span>
              </button>
              <div className="dock-progress">
                <span role="status" aria-live="polite">
                  Ch. {number(chapter)}{" "}
                  <b>
                    Page {page} / {pages.length}
                  </b>
                </span>
                <input
                  aria-label="Go to page"
                  type="range"
                  min={1}
                  max={pages.length}
                  value={page}
                  onChange={(e) => {
                    const p = Number(e.target.value);
                    setDirection(p > page ? 1 : -1);
                    setProgress({ chapter, page: p });
                    if (scrollMode)
                      document
                        .getElementById(`page-${p}`)
                        ?.scrollIntoView({ block: "start" });
                    else window.scrollTo({ top: 0, behavior: "instant" });
                  }}
                />
              </div>
              <button
                className={`icon-button ${bookmarks.includes(key) ? "saved" : ""}`}
                onClick={bookmark}
                aria-label={
                  bookmarks.includes(key) ? "Remove bookmark" : "Bookmark page"
                }
                aria-pressed={bookmarks.includes(key)}
              >
                <Bookmark
                  size={20}
                  fill={bookmarks.includes(key) ? "currentColor" : "none"}
                />
              </button>
              <button
                className="dock-turn next"
                onClick={() => turn(1)}
                disabled={
                  (chapter === 10 && page === pages.length) || scrollMode
                }
                aria-label="Next page"
              >
                <span>
                  {page === pages.length && chapter < 10
                    ? "Next chapter"
                    : "Next"}
                </span>
                <ChevronRight size={22} />
              </button>
            </div>
          </div>
        )}
      </main>
      {zoom && (
        <ZoomModal
          key={zoom.src}
          isOpen
          imageSrc={zoom.src}
          caption={zoom.caption}
          onClose={() => setZoom(null)}
        />
      )}
    </div>
  );
}
