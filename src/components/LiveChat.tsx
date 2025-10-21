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

type ChatMessage =
  | { from: "user" | "crisp"; text: string }
  | { from: "user" | "crisp"; audio: string }
  | { from: "user" | "crisp"; image: string };

export default function LiveChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { from: "crisp", text: "How can we help with Crisp?" },
  ]);
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);
  const [recordTime, setRecordTime] = useState(0);
  const recordInterval = useRef<NodeJS.Timeout | null>(null);
  const chunks = useRef<Blob[]>([]);
  const chatRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { from: "user", text: input }]);
    setInput("");
  };

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

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
        setMessages((prev) => [...prev, { from: "user", audio: url }]);
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

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Tombol utama */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-[#007bff] text-white p-4 rounded-full shadow-xl hover:bg-blue-600 transition-all duration-300 focus:outline-none"
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {open && (
        <div className="absolute bottom-20 right-0 w-[380px] h-[560px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-gray-200 animate-slide-up">
          {/* Header */}
          <div className="bg-[#007bff] text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src="https://i.pravatar.cc/40?img=1"
                alt="avatar"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <div>
                <p className="font-semibold text-sm">Crisp</p>
                <p className="text-xs opacity-90">
                  How can we help with Crisp?
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="hover:bg-white/20 p-1 rounded-full"
            >
              <X size={16} />
            </button>
          </div>

          {/* Info tim */}
          <div className="bg-[#f3f6fb] px-4 py-3 border-b">
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
                  Questions? Chat with us!
                </p>
                <p className="text-[11px] text-gray-500">
                  <span className="text-green-500">●</span> Typically replies
                  under an hour
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
                      ? "bg-[#007bff] text-white rounded-br-none"
                      : "bg-[#f1f5f9] text-gray-800 rounded-bl-none"
                  }`}
                  style={{
                    fontSize:
                      "text" in msg &&
                      /^[\p{Emoji}\p{Extended_Pictographic}]+$/u.test(msg.text)
                        ? "1.25rem"
                        : undefined,
                  }}
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
                    msg.text
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Input area */}
          <div className="border-t bg-[#f9fafc] px-3 py-2 flex items-center gap-2">
            <button className="text-gray-500 hover:text-blue-600">
              <Smile size={18} />
            </button>

            <button
              className="text-gray-500 hover:text-blue-600"
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
              placeholder="Compose your message..."
              className="flex-1 text-sm bg-white border border-gray-300 rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#007bff]"
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
                className="text-gray-600 hover:text-blue-600"
              >
                <Mic size={18} />
              </button>
            )}

            <button
              onClick={handleSend}
              className="bg-[#007bff] text-white p-2 rounded-full hover:bg-blue-600"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

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
    </div>
  );
}
