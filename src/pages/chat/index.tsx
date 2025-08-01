import { useEffect, useState } from "react";
import { Header, Icon } from "zmp-ui";
import base from "../../static/base.png";
import chevronRight from "../../static/chevron-right.svg";
import star from "../../static/star.svg";
const SuggestPrompts = [
  "💡 Đứng thẳng → tự tin 200%.",
  "💡 7 giây: thời gian tạo ấn tượng đầu.",
  "💡 Hỏi mở → Dễ bắt chuyện hơn 80%",
];

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

  const getWelcomeMoment = () => {
    const now = new Date();
    const hours = now.getHours();
    if (hours < 11) return "Chào buổi sáng";
    if (hours < 13) return "Chào buổi trưa";
    if (hours < 18) return "Chào buổi chiều";
    return "Chào buổi tối";
  };

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
    <div className="w-full h-full overflow-hidden bg-[#EFF6FF] flex flex-col justify-between max-w-md mx-auto text-sm font-sans overscroll-none">
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
        <div className={`flex items-start`}>
          <div className="w-8 mr-2 flex justify-center">
            <img src={base} alt="Smiley" className="" />
          </div>
          <div
            className={`p-3 rounded-xl shadow-sm max-w-[80%] bg-white text-gray-800"
        `}
          >
            <p className="m-0 font-medium text-base mb-1">
              👋 {getWelcomeMoment()},Nguyễn Văn A2
            </p>
            <p>
              “Mách nhỏ bạn: Hãy là chính mình. Chỉ cần lịch sự, lắng nghe và tò
              mò – là ổn rồi.”
            </p>
            <div className="flex flex-col items-start gap-2 mt-3">
              {SuggestPrompts.map((prompt, idx) => (
                <div
                  className="bg-[#F0F7FF] text-[#0068FF] px-3 py-2 gap-1.5 rounded-xl text-sm font-normal flex w-full active:brightness-95 transition-all cursor-pointer"
                  key={idx}
                >
                  <p className="m-0">{prompt}</p>
                  <img src={chevronRight} alt="" className="ml-auto" />
                </div>
              ))}
            </div>
          </div>
        </div>
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
            : "calc(16px + var(--zaui-safe-area-inset-bottom, 0px))",
        }}
      >
        <input
          id="input-text"
          type="text"
          onFocus={() => setIsInputFocused(true)}
          onBlurCapture={() => {
            setTimeout(() => {
              setIsInputFocused(false);
            }, 100)
          }}
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
        <button onClick={sendMessage} className="text-blue-500 pl-2">
          <Icon icon="zi-send-solid" />
        </button>
      </div>
    </div>
  );
}
