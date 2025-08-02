import { GetMessagesResponse } from "@/types";
import { doGet, doPost } from "@/utils/httpClient";
import { useEffect, useRef, useState } from "react";
import { getUserID } from "zmp-sdk";
import { Header, Icon } from "zmp-ui";
import base from "../../static/base.png";
import chevronRight from "../../static/chevron-right.svg";
import star from "../../static/star.svg";
import TypingDots from "./TypingDots";
const SuggestPrompts = [
  "💡 Đứng thẳng → tự tin 200%.",
  "💡 7 giây: thời gian tạo ấn tượng đầu.",
  "💡 Hỏi mở → Dễ bắt chuyện hơn 80%",
  "💡 Ghi chú tay → Nhớ lâu gấp 2 lần.",
  "💡 Trang phục gọn gàng → Trông chuyên nghiệp hơn 150%.",
  "💡 Thái độ > Kỹ năng trong tuần đầu.",
  "💡 Giao tiếp mắt → Tạo cảm giác tin cậy hơn.",
  "💡 Tới sớm 10 phút → Luôn là người chủ động.",
  "💡 Giữ thái độ tích cực → Giải quyết tình huống tốt hơn.",
  "💡 Đừng sợ không biết → Hỏi đúng mới là giỏi.",
];

type Message = {
  id: string | number;
  type: "user" | "bot";
  text: string;
};

function getRandomElements(arr: any[], n: number) {
  if (n > arr.length) {
    throw new RangeError(
      "Cannot get more elements than available in the array."
    );
  }

  // Create a shallow copy to avoid modifying the original array
  const shuffled = [...arr];

  // Fisher-Yates (Knuth) shuffle algorithm
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
  }

  // Return the first 'n' elements from the shuffled array
  return shuffled.slice(0, n);
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const userId = useRef<string>("");
  const fetchTimeoutRef = useRef<any>(null);

  useEffect(() => {
    (window as any).fakeBotMessage = (text: string) => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          type: "bot",
          text,
        },
      ]);
    };
  }, []);

  let amount = 0;

  useEffect(() => {
    const fetchLoop = async () => {
      if (amount > 3) {
        clearTimeout(fetchTimeoutRef.current);
        return;
      }
      amount++;
      await fetchMessages();
      fetchTimeoutRef.current = setTimeout(fetchLoop, 1000);
    };
    getUserID().then((id) => {
      console.log("User ID:", id);
      userId.current = (id as any) || 1;
      fetchLoop();
    });

    return () => {
      if (fetchTimeoutRef.current) {
        clearTimeout(fetchTimeoutRef.current);
      }
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

  const send = (msg: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      text: msg,
    };

    const botDummyMessage: Message = {
      id: "",
      text: "",
      type: "bot",
    };
    setMessages((messages) => [botDummyMessage, newMessage, ...messages]);
    setInput("");
    setShowSuggestions(false);

    setIsTyping(true);
    doPost("https://zah-7.123c.vn/api/v1/messages", {
      senderId: userId.current,
      content: msg,
    }).then((resp) => {
      console.log("resp message", resp);
      const { id, content } = resp.data;
      const newMes: Message = {
        id,
        text: content,
        type: "bot",
      };

      setMessages((messages) => {
        Object.assign(messages[0], newMes);
        return [...messages];
      });
      setIsTyping(false);
    });
  };

  const sendMessage = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    send(trimmed);
  };

  const handleSuggestionClick = (text: string) => {
    setShowSuggestions(false);
    send(text);
  };

  const fetchMessages = async () => {
    try {
      const { err, data }: { err: any; data: GetMessagesResponse } =
        await doGet(
          `https://zah-7.123c.vn/api/v1/messages?userId=${userId.current}&limit=10&after=`
        );

      console.log("err", err);
      if (err) {
        console.error("Failed to fetch messages:", err);
        return;
      }

      const newMessages: Message[] = data.messages.map((msg) => ({
        id: msg.id,
        type: msg.senderId === "zellobuddy" ? "bot" : "user",
        text: msg.content,
      }));
      setMessages(newMessages);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  return (
    <>
      <div className="w-full overflow-hidden bg-[#EFF6FF] h-full flex flex-col justify-between max-w-md mx-auto text-sm font-sans overscroll-none">
        {/* Header */}

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
        <div className="flex-1 overflow-y-auto">
          <div className="flex-1 flex flex-col-reverse h-full p-4 overflow-y-auto whitespace-pre-line">
            {[...messages].map((msg, i, arr) => {
              const prev = arr[i + 1];
              const isSameSender = prev?.type === msg.type;
              const spacingClass = isSameSender ? "mt-1" : "mt-4";

              const isBot = msg.type === "bot";
              const showAvatar = isBot && !isSameSender;

              return (
                <div
                  key={msg.id}
                  className={`flex items-start ${spacingClass}`}
                >
                  {isBot && (
                    <div className="w-8 mr-2 flex justify-center">
                      {showAvatar && (
                        <img src={base} alt="Smiley" className="" />
                      )}
                    </div>
                  )}
                  <div
                    className={`p-3 rounded-xl shadow-sm max-w-[80%] ${
                      msg.type === "user"
                        ? "ml-auto bg-blue-500 text-white"
                        : "bg-[#F8F9FB] text-gray-800"
                    }`}
                  >
                    {isBot && msg.text.length === 0 ? <TypingDots /> : msg.text}
                    {/* {<TypingDots />} */}
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
                  👋 {getWelcomeMoment()}, Nguyễn Văn A2
                </p>
                <p>
                  “Mách nhỏ bạn: Hãy là chính mình. Chỉ cần lịch sự, lắng nghe
                  và tò mò – là ổn rồi.”
                </p>
                <div className="flex flex-col items-start gap-2 mt-3">
                  {getRandomElements(SuggestPrompts, 3).map((prompt, idx) => (
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
        </div>

        {/* Suggestion row */}
        {showSuggestions && (
          <div className="px-4 py-4 flex-none">
            <div className="text-[#0D0D0D] mb-2 font-medium">
              Gợi ý Zello dành cho bạn
            </div>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {[
                "3 cách giới thiệu bản thân không bị ngại",
                "3 điều nên làm trong ngày đầu tiên",
                "Cách bắt chuyện khi bạn không quen ai",
                "Intro thế nào để gây thiện cảm?",
                "Nên hỏi gì trong buổi ăn trưa đầu tiên?",
                "Trang phục ngày đầu – sao cho chuẩn?",
                "Gặp sếp lần đầu → Nên nói gì?",
                "Làm sao để đỡ “lạc lõng” khi chưa thân ai?",
                "Tạo thiện cảm mà không cần gồng thế nào?",
                "3 cách ghi chú giúp bạn học việc nhanh hơn",
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
          className="py-[12px] px-[16px] bg-white flex items-center gap-2 flex-none"
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
              }, 100);
            }}
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
    </>
  );
}
