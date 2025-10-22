import { useState, useEffect, useRef } from "react";
import {
  Search,
  MoreVertical,
  Paperclip,
  Smile,
  Send,
  Mic,
  StopCircle,
  Phone,
  Video,
  Archive,
  Trash2,
  User,
  X,
} from "lucide-react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import messageSent from "./../../../components/chat/messageSent.mp3";
import AdminLayout from "../AdminLayout";
import { dataChat } from "./dataChat";
import { ChatMessage, Conversation } from "./types";

export default function AdminChat() {
  const [showMenu, setShowMenu] = useState(false);
  const [showSidebarMobile, setShowSidebarMobile] = useState(true);
  const [conversations, setConversations] = useState<Conversation[]>(dataChat);

  const [selectedConv, setSelectedConv] = useState<Conversation | null>(
    conversations[0]
  );
  const [input, setInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);
  const [recordTime, setRecordTime] = useState(0);
  const recordInterval = useRef<NodeJS.Timeout | null>(null);
  const chunks = useRef<Blob[]>([]);
  const chatRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [selectedConv?.messages]);

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

  const handleSend = () => {
    if (!input.trim() || !selectedConv) return;

    const newMessage: ChatMessage = {
      from: "admin",
      text: input,
      time: new Date(),
    };

    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === selectedConv.id
          ? {
              ...conv,
              messages: [...conv.messages, newMessage],
              lastMessage: input,
              time: "Just now",
            }
          : conv
      )
    );

    setSelectedConv((prev) =>
      prev
        ? {
            ...prev,
            messages: [...prev.messages, newMessage],
          }
        : null
    );

    audioRef.current?.play().catch((err) => console.error(err));
    setInput("");
  };

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
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

        if (!selectedConv) return;

        const newMessage: ChatMessage = {
          from: "admin",
          audio: url,
          time: new Date(),
        };

        setConversations((prev) =>
          prev.map((conv) =>
            conv.id === selectedConv.id
              ? {
                  ...conv,
                  messages: [...conv.messages, newMessage],
                  lastMessage: "🎤 Voice message",
                  time: "Just now",
                }
              : conv
          )
        );

        setSelectedConv((prev) =>
          prev
            ? {
                ...prev,
                messages: [...prev.messages, newMessage],
              }
            : null
        );

        setIsRecording(false);
        clearInterval(recordInterval.current!);
      };
    } catch (err) {
      console.error("Mic access denied:", err);
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
    if (!file || !selectedConv) return;

    const reader = new FileReader();
    reader.onload = () => {
      const newMessage: ChatMessage = {
        from: "admin",
        image: reader.result as string,
        time: new Date(),
      };

      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === selectedConv.id
            ? {
                ...conv,
                messages: [...conv.messages, newMessage],
                lastMessage: "📷 Photo",
                time: "Just now",
              }
            : conv
        )
      );

      setSelectedConv((prev) =>
        prev
          ? {
              ...prev,
              messages: [...prev.messages, newMessage],
            }
          : null
      );
    };
    reader.readAsDataURL(file);
    e.target.value = "";
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

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalUnread = conversations.reduce((sum, conv) => sum + conv.unread, 0);

  return (
    <AdminLayout activePage="chat" padding={false}>
      <div className="flex h-[91vh] bg-gray-50 flex-col md:flex-row ">
        {/* Sidebar - Daftar Percakapan */}
        {/* Sidebar - Daftar Percakapan */}
        <div
          className={`w-full md:w-80 lg:mt-0 mt-20 bg-white border-r border-gray-200 flex flex-col  fixed z-30 top-0 left-0 h-screen md:h-auto md:relative transition-all duration-300 overflow-y-auto
            ${showSidebarMobile ? "block" : "hidden"} md:block`}
        >
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-bold text-gray-800">Messages</h1>
              <span className="bg-gold-400 text-white text-xs px-2 py-1 rounded-full">
                {totalUnread}
              </span>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
              />
            </div>
          </div>

          {/* Daftar Percakapan */}
          <div className="flex-1 overflow-y-auto ">
            {filteredConversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => {
                  setSelectedConv(conv);
                  if (window.innerWidth < 768) setShowSidebarMobile(false);
                }}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition ${
                  selectedConv?.id === conv.id ? "bg-gold-50" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <img
                      src={conv.avatar}
                      alt={conv.name}
                      className="w-12 h-12 rounded-full"
                    />
                    {conv.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-sm text-gray-800 truncate">
                        {conv.name}
                      </h3>
                      <span className="text-xs text-gray-500">{conv.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">
                      {conv.lastMessage}
                    </p>
                  </div>
                  {conv.unread > 0 && (
                    <span className="bg-gold-400 text-white text-xs px-2 py-1 rounded-full">
                      {conv.unread}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Area Chat */}
        {/* Area Chat */}
        {selectedConv && (!showSidebarMobile || window.innerWidth >= 768) ? (
          <div className="flex-1 flex flex-col w-full">
            {/* Header Chat */}
            <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between relative">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={selectedConv.avatar}
                    alt={selectedConv.name}
                    className="w-10 h-10 rounded-full"
                  />
                  {selectedConv.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-800 text-base">
                    {selectedConv.name}
                  </span>
                  <p className="text-xs text-gray-500">
                    {selectedConv.online ? "Online" : "Offline"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Tombol kembali di mobile */}
                <button
                  className="md:hidden p-2 mr-2 rounded-full hover:bg-gray-100"
                  onClick={() => setShowSidebarMobile(true)}
                >
                  <X size={20} />
                </button>
                <button
                  className="p-2 hover:bg-gray-100 rounded-full transition relative"
                  onClick={() => setShowMenu((v) => !v)}
                >
                  <MoreVertical size={20} className="text-gray-600" />
                  {showMenu && (
                    <div className="absolute right-0 top-10 bg-white border border-gray-200 rounded-lg shadow-lg py-2 w-40 z-50">
                      <button className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 gap-2">
                        <Phone size={18} />
                        <span>Telepon</span>
                      </button>
                      <button className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 gap-2">
                        <Video size={18} />
                        <span>Video Call</span>
                      </button>
                      <button className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 gap-2">
                        <Archive size={18} />
                        <span>Arsipkan</span>
                      </button>
                      <button className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 gap-2">
                        <Trash2 size={18} />
                        <span>Hapus</span>
                      </button>
                    </div>
                  )}
                </button>
              </div>
            </div>

            {/* Area Pesan */}
            <div
              ref={chatRef}
              className="flex-1 overflow-y-auto p-2 md:p-6 space-y-4 bg-gray-50"
            >
              {selectedConv.messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.from === "admin" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.from === "user" && (
                    <img
                      src={selectedConv.avatar}
                      alt=""
                      className="w-8 h-8 rounded-full mr-2"
                    />
                  )}
                  <div
                    className={`px-4 py-2 rounded-2xl max-w-[70%] ${
                      msg.from === "admin"
                        ? "bg-gold-400 text-white rounded-br-none"
                        : "bg-white text-gray-800 rounded-bl-none shadow-sm"
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
                        className="rounded-lg max-w-[250px] cursor-pointer hover:opacity-90 transition"
                        onClick={() => setPreviewImage(msg.image)}
                      />
                    ) : (
                      <span
                        className={`block ${
                          isOnlyEmoji(msg.text) ? "text-3xl leading-tight" : ""
                        }`}
                      >
                        {msg.text}
                      </span>
                    )}
                    <p
                      className={`text-[10px] mt-1 ${
                        msg.from === "admin"
                          ? "text-white text-right"
                          : "text-gray-400 text-left"
                      }`}
                    >
                      {msg.time.toLocaleString("id-ID", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="bg-white border-t border-gray-200 px-2 md:px-6 py-2 md:py-4">
              <div className="flex items-center gap-1 md:gap-2">
                <div ref={emojiPickerRef} className="relative">
                  <button
                    onClick={() => setShowEmoji((prev) => !prev)}
                    className="text-gray-500 hover:text-gold-600 flex items-center justify-center w-9 h-9"
                  >
                    <Smile size={20} />
                  </button>
                  {showEmoji && (
                    <div className="absolute bottom-12 left-0 z-50">
                      <EmojiPicker
                        onEmojiClick={onEmojiClick}
                        width={320}
                        height={400}
                        lazyLoadEmojis
                      />
                    </div>
                  )}
                </div>

                <button
                  className="text-gray-500 hover:text-gold-600"
                  onClick={handleUploadClick}
                >
                  <Paperclip size={20} />
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
                  placeholder="Type your message..."
                  className="flex-1 bg-gray-100 border border-gray-200 rounded-full px-2 md:px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                />

                {isRecording ? (
                  <div className="flex items-center gap-1 bg-red-500 text-white px-3 py-2 rounded-full animate-pulse">
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
                    className="text-gray-600 hover:text-gold-600"
                  >
                    <Mic size={20} />
                  </button>
                )}

                <button
                  onClick={handleSend}
                  className="bg-gold-400 cursor-pointer text-white p-2.5 rounded-full hover:bg-gold-500 transition"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 lg:flex hidden items-center justify-center bg-gray-50 w-full">
            <div className="text-center">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <User size={40} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Select a conversation
              </h3>
              <p className="text-gray-500">
                Choose a conversation from the sidebar to start chatting
              </p>
            </div>
          </div>
        )}

        {/* Modal Preview Gambar */}
        {previewImage && (
          <div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
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
                className="absolute cursor-pointer -top-3 -right-3 bg-white text-gray-700 rounded-full p-2 shadow-md hover:bg-gray-100"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        )}

        <audio ref={audioRef} src={messageSent} />
      </div>
    </AdminLayout>
  );
}
