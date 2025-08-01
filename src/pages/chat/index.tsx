import { useEffect, useState } from "react";
import { Header, Icon } from "zmp-ui";
import base from "../../static/base.png";
import star from "../../static/star.svg";

type Message = {
  id: number;
  type: "user" | "bot";
  text: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, type: "bot", text: "Chào bạn, mình có thể giúp gì nè?" },
  ]);
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isInputFocused, setIsInputFocused] = useState(false);

  useEffect(() => {
    (window as any).fakeBotMessage = (text: string) => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          type: "bot",
          text,
        },
      ]);
    };
  }, []);

  const sendMessage = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const newMessage: Message = {
      id: Date.now(),
      type: "user",
      text: trimmed,
    };

    setMessages([...messages, newMessage]);
    setInput("");
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (text: string) => {
    const newMessage: Message = {
      id: Date.now(),
      type: "user",
      text,
    };

    setMessages([...messages, newMessage]);
    setShowSuggestions(false);
  };

  return (
    <div className="w-full h-screen bg-[#EFF6FF] flex flex-col justify-between max-w-md mx-auto text-sm font-sans">
      {/* Header */}
      {/* <div className="flex items-center justify-between px-4 py-3 shadow-sm border-b">
        <div className="text-gray-900 font-semibold">Trợ thủ AI - Zello</div>
        <button className="text-gray-500 text-xl">✕</button>
      </div> */}
      <Header
        title={
          <div className="h-[48px] flex flex-col  justify-center">
            <div className="leading-none">Trợ thủ AI - Zello</div>
            <div className="text-[12px] text-[#6F7071] font-normal">
              Trợ thủ AI cá nhân của bạn
            </div>
          </div>
        }
        onBackClick={() => {
          window.history.back();
        }}
      />

      {/* Chat messages */}
      <div className="flex flex-col-reverse h-full p-4 overflow-y-auto">
        {[...messages].reverse().map((msg, i, arr) => {
          const prev = arr[i + 1];
          const isSameSender = prev?.type === msg.type;
          const spacingClass = isSameSender ? "mt-1" : "mt-4";

          const isBot = msg.type === "bot";
          const showAvatar = isBot && !isSameSender;

          return (
            <div key={msg.id} className={`flex items-start ${spacingClass}`}>
              {isBot && (
                <div className="w-8 mr-2 flex justify-center">
                  {showAvatar && <img src={base} alt="Smiley" className="" />}
                </div>
              )}
              <div
                className={`p-3 rounded-xl shadow-sm max-w-[80%] ${
                  msg.type === "user"
                    ? "ml-auto bg-blue-500 text-white"
                    : "bg-[#F8F9FB] text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            </div>
          );
        })}
      </div>

      {/* Suggestion row */}
      {showSuggestions && (
        <div className="px-4 py-4">
          <div className="text-[#0D0D0D] mb-2 font-medium">
            Gợi ý Zello dành cho bạn
          </div>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {[
              "3 cách giới thiệu bản thân",
              "3 điều nên làm trong ngày đầu...",
              "3 mẹo để tự tin hơn",
            ].map((text, idx) => (
              <button
                key={idx}
                className="flex flex-col items-start gap-[6px] w-[154px] text-[#3D3D3D] text-start flex-shrink-0 px-3 py-[12px] bg-white text-blue-600 rounded-xl border text-sm"
                onClick={() => handleSuggestionClick(text)}
              >
                <img src={star} alt="" className="" />
                {text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input field */}
      <div
        className="py-[12px] px-[16px] bg-white flex items-center gap-2"
        style={{
          paddingBottom: isInputFocused
            ? "16px"
            : "var(--zaui-safe-area-inset-bottom, 16px)",
        }}
      >
        <input
          id="input-text"
          type="text"
          onFocus={() => setIsInputFocused(true)}
          onBlurCapture={() => setIsInputFocused(false)}
          // onBlur={(e) => {
          //   setIsInputFocused(false);
          //   e.preventDefault();
          // }}
          placeholder="Nhập nội dung..."
          className="flex-1 focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} className="text-blue-500 pl-2 ">
          <Icon icon="zi-send-solid" />
        </button>
      </div>
    </div>
  );
}
