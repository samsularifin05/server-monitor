import { useState, useEffect, useRef } from "react";
import {
  X,
  Paperclip,
  Smile,
  Send,
  MessageCircle,
  Mic,
  StopCircle,
} from "lucide-react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import messageSent from "./messageSent.mp3";

import Logo from "../../assets/logo.jpg";

type ChatMessage =
  | { from: "user" | "helpdesk"; text: string }
  | { from: "user" | "helpdesk"; audio: string }
  | { from: "user" | "helpdesk"; image: string };

export default function LiveChat() {
  const [open, setOpen] = useState(false);
  // Detect mobile device
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
  const [messages, setMessages] = useState<ChatMessage[]>([
    { from: "helpdesk", text: "Ada yang bisa saya bantu?" },
  ]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);
  const [recordTime, setRecordTime] = useState(0);
  const recordInterval = useRef<NodeJS.Timeout | null>(null);
  const chunks = useRef<Blob[]>([]);
  const chatRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const emojiPickerRef = useRef<HTMLDivElement | null>(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!open) {
      const newUnread = messages.filter(
        (msg) => msg.from === "helpdesk"
      ).length;
      setUnreadCount(newUnread);
    } else {
      setUnreadCount(0); // reset saat dibuka
    }
  }, [messages, open]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { from: "user", text: input }]);
    audioRef.current?.play().catch((err) => console.error(err));
    setInput("");
  };

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(e.target as Node)
      ) {
        setShowEmoji(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleStartRecording = async () => {
    try {
      if (typeof MediaRecorder === "undefined") {
        alert("Perekaman suara belum didukung di browser ini.");
        return;
      }

      // ✅ Cek izin mikrofon
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (!stream) {
        alert("Tidak dapat mengakses mikrofon.");
        return;
      }

      // ✅ Tentukan tipe MIME yang didukung
      let mimeType = "audio/webm";
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = "audio/mp4";
      }

      const mediaRecorder = new MediaRecorder(stream);
      setRecorder(mediaRecorder);
      chunks.current = [];
      mediaRecorder.start();
      setIsRecording(true);
      setRecordTime(0);

      recordInterval.current = setInterval(() => {
        setRecordTime((t) => t + 1);
      }, 1000);

      mediaRecorder.ondataavailable = (e) => chunks.current.push(e.data);

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setMessages((prev) => [...prev, { from: "user", audio: url }]);
        setIsRecording(false);
        clearInterval(recordInterval.current!);
      };
    } catch (err) {
      console.error("Mic access denied:", err);
      alert("Izin mikrofon ditolak.");
    }
  };

  const handleStopRecording = () => {
    if (recorder && recorder.state !== "inactive") {
      recorder.stop();
      recorder.stream.getTracks().forEach((t) => t.stop());
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setMessages((prev) => [
        ...prev,
        { from: "user", image: reader.result as string },
      ]);
    };
    reader.readAsDataURL(file);
    e.target.value = ""; // reset input
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };
  const onEmojiClick = (emojiData: EmojiClickData) => {
    setInput((prev) => prev + emojiData.emoji);
  };

  const isOnlyEmoji = (text: string) => {
    const emojiRegex =
      /^(?:\p{Emoji_Presentation}|\p{Extended_Pictographic})+$/u;
    return emojiRegex.test(text.trim());
  };

  useEffect(() => {
    if (open) {
      // kasih sedikit delay biar konten sempat render dulu
      setTimeout(() => {
        chatRef.current?.scrollTo({
          top: chatRef.current.scrollHeight,
          // behavior: "smooth",
        });
      }, 0);
    }
  }, [open]);

  useEffect(() => {
    if (!isMobile) return;

    const handleResize = () => {
      const chatContainer = document.querySelector(
        "#chat-input-container"
      ) as HTMLElement;
      if (!chatContainer) return;

      // Ketika keyboard muncul, viewport height berkurang
      const visualViewport = window.visualViewport;
      if (visualViewport) {
        chatContainer.style.bottom = `${
          window.innerHeight - visualViewport.height
        }px`;
      }
    };

    const resetPosition = () => {
      const chatContainer = document.querySelector(
        "#chat-input-container"
      ) as HTMLElement;
      if (chatContainer) {
        chatContainer.style.bottom = "0px";
      }
    };

    window.visualViewport?.addEventListener("resize", handleResize);
    window.visualViewport?.addEventListener("scroll", handleResize);
    window.visualViewport?.addEventListener("focusout", resetPosition);

    return () => {
      window.visualViewport?.removeEventListener("resize", handleResize);
      window.visualViewport?.removeEventListener("scroll", handleResize);
      window.visualViewport?.removeEventListener("focusout", resetPosition);
    };
  }, [isMobile]);

  return (
    <div
      className={
        isMobile
          ? open
            ? "fixed inset-0 z-50 bg-white flex flex-col"
            : ""
          : "fixed bottom-6 right-6 z-50"
      }
    >
      {/* Tombol utama */}
      {isMobile && open ? null : (
        <button
          onClick={() => setOpen(!open)}
          className="relative bg-gold-400 cursor-pointer text-white p-4 rounded-full shadow-xl hover:bg-gold-400 transition-all duration-300 focus:outline-none"
        >
          {open ? <X size={24} /> : <MessageCircle size={24} />}

          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {unreadCount}
            </span>
          )}
        </button>
      )}

      {open ? (
        <div
          className={
            isMobile
              ? "flex-1 w-full h-full bg-white flex flex-col animate-none border-none rounded-none shadow-none"
              : "absolute bottom-20 right-0 w-[400px] h-[560px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-gray-200 animate-slide-up"
          }
        >
          {/* Header */}
          <div className="bg-gold-400 text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src={Logo}
                alt="avatar"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <div>
                <p className="font-semibold text-sm">Nagatech Live Chat</p>
                <p className="text-xs opacity-90">
                  Bagaimana kami dapat membantu Anda?
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                if (isMobile) {
                  console.log("Mobile close");
                  // On mobile, close means hide the chat (setOpen to false and maybe reload page or navigate away if needed)
                  setOpen(false);
                } else {
                  setOpen(false);
                }
              }}
              className="hover:bg-white/20 p-1 rounded-full cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          {/* Info tim */}
          <div className="bg-[#f3f6fb] px-4 py-3 border-b border-gold-100">
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-2">
                <img
                  src="https://i.pravatar.cc/32?img=2"
                  className="w-7 h-7 rounded-full border-2 border-white"
                />
                <img
                  src="https://i.pravatar.cc/32?img=3"
                  className="w-7 h-7 rounded-full border-2 border-white"
                />
                <img
                  src="https://i.pravatar.cc/32?img=4"
                  className="w-7 h-7 rounded-full border-2 border-white"
                />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-800">
                  Ada pertanyaan? Chat dengan tim kami!
                </p>
                <p className="text-[8px] text-gray-500">
                  <span className="text-green-500">●</span> Biasanya membalas
                  dalam waktu kurang dari satu 5 menit
                </p>
              </div>
            </div>
          </div>

          {/* Area chat */}
          <div
            ref={chatRef}
            className="flex-1 p-4 space-y-3 overflow-y-auto bg-white"
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.from === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-3 py-2 text-sm rounded-2xl max-w-[75%] ${
                    msg.from === "user"
                      ? "bg-gold-400 text-white rounded-br-none"
                      : "bg-[#f1f5f9] text-gray-800 rounded-bl-none"
                  }`}
                >
                  {"audio" in msg ? (
                    <audio controls className="w-48">
                      <source src={msg.audio} type="audio/webm" />
                    </audio>
                  ) : "image" in msg ? (
                    <img
                      src={msg.image}
                      alt="uploaded"
                      className="rounded-lg max-w-[200px] cursor-pointer hover:opacity-90 transition"
                      onClick={() => setPreviewImage(msg.image)}
                    />
                  ) : (
                    <span
                      className={`block text-end ${
                        isOnlyEmoji(msg.text) ? "text-3xl leading-tight" : ""
                      }`}
                    >
                      {msg.text}
                    </span>
                  )}

                  {/* Tambahan waktu & tanggal pesan */}
                  <p
                    className={`text-[8px] ${
                      msg.from === "user"
                        ? "text-white text-right"
                        : "text-black text-left"
                    } mt-1 `}
                  >
                    {new Date().toLocaleString("id-ID", {
                      day: "2-digit",
                      month: "short",
                      year: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}

                    {msg.from !== "user" ? " a/n Yaris" : ""}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input area */}
          <div
            id="chat-input-container"
            className="border-t bg-[#f9fafc] px-3 py-2 flex items-center gap-2 border-gold-100 fixed bottom-0 left-0 w-full md:static"
          >
            <div ref={emojiPickerRef} className="relative">
              <button
                onClick={() => setShowEmoji((prev) => !prev)}
                className="text-gray-500 cursor-pointer hover:text-gold-600 flex items-center justify-center w-8 h-8"
              >
                <Smile size={18} />
              </button>
              {showEmoji && (
                <div className="absolute bottom-12 left-0 z-50 cursor-pointer">
                  <EmojiPicker
                    onEmojiClick={onEmojiClick}
                    width={300}
                    height={350}
                    lazyLoadEmojis
                  />
                </div>
              )}
            </div>

            <button
              className="text-gray-500 hover:text-gold-600 cursor-pointer"
              onClick={handleUploadClick}
            >
              <Paperclip size={18} />
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Apa yang mau kamu tanyakan ?"
              className="flex-1 text-sm bg-white border placeholder:text-gray-400 border-gray-300 rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold-400"
            />

            {isRecording ? (
              <div
                onClick={handleStopRecording}
                className="flex cursor-pointer items-center gap-1 bg-red-500 text-white px-3 py-2 rounded-full animate-pulse"
              >
                <StopCircle
                  size={18}
                  onClick={handleStopRecording}
                  className="cursor-pointer"
                />
                <span className="text-xs">{formatTime(recordTime)}</span>
              </div>
            ) : (
              <button
                onClick={handleStartRecording}
                className="text-gray-600 hover:text-gold-600 cursor-pointer"
              >
                <Mic size={18} />
              </button>
            )}

            <button
              onClick={handleSend}
              className="bg-gold-400 text-white p-2 cursor-pointer rounded-full hover:bg-gold-400"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      ) : null}

      {/* Modal preview gambar */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-[999px]"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative">
            <img
              src={previewImage}
              alt="Preview"
              className="max-h-[80vh] max-w-[90vw] rounded-lg shadow-2xl"
            />
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute -top-3 -right-3 bg-white text-gray-700 rounded-full p-1 shadow-md hover:bg-gray-100"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}
      <audio ref={audioRef} src={messageSent} />
    </div>
  );
}
