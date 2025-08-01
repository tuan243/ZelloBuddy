import { GetMessagesResponse } from "@/types";
import { doGet, doPost } from "@/utils/httpClient";
import { useEffect, useRef, useState } from "react";
import { getUserID } from "zmp-sdk";
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
  id: string | number;
  type: "user" | "bot";
  text: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
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

  useEffect(() => {
    const fetchLoop = async () => {
      await fetchMessages();
      fetchTimeoutRef.current = setTimeout(fetchLoop, 1000);
    };
    getUserID().then((id) => {
      console.log("User ID:", id);
      userId.current = id;
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

  const sendMessage = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      text: trimmed,
    };

    doPost("http://localhost:8080/api/v1/messages", {
      senderId: userId.current,
      content: trimmed,
    });

    setMessages([...messages, newMessage]);
    setInput("");
    setShowSuggestions(false);

    // setTimeout(() => {
    //   const fakeMessageResponse = [
    //     {
    //       id: "688c6e35f3af601cc0230e24",
    //       conversationId: "1",
    //       senderId: "1",
    //       receiverId: "chatgpt",
    //       content: "hello 3",
    //       timestamp: 1754033717616,
    //     },
    //     {
    //       id: "688c6e31f3af601cc0230e23",
    //       conversationId: "1",
    //       senderId: "zellobuddy",
    //       receiverId: "chatgpt",
    //       content: "hello 2",
    //       timestamp: 1754033713582,
    //     },

    //     {
    //       id: "688c6e31f3af601cc0230e24",
    //       conversationId: "1",
    //       senderId: "1",
    //       receiverId: "chatgpt",
    //       content: "hi",
    //       timestamp: 1754033713584,
    //     },
    //   ];

    //   setMessages(
    //     fakeMessageResponse.map((msg) => ({
    //       id: msg.id,
    //       type: msg.senderId === "zellobuddy" ? "bot" : "user",
    //       text: msg.content,
    //     }))
    //   );
    //   setIsInputFocused(false);
    // }, 100);
  };

  const handleSuggestionClick = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      text,
    };

    setMessages([...messages, newMessage]);
    setShowSuggestions(false);
  };

  const fetchMessages = async () => {
    try {
      const { err, data }: { err: any; data: GetMessagesResponse } =
        await doGet("http://localhost:8080/api/v1/messages?userId=1");

      if (err) {
        console.error("Failed to fetch messages:", err);
        return;
      }

      // const temp = [
      //   {
      //     id: "688c6e35f3af601cc0230e24",
      //     conversationId: "1",
      //     senderId: "zellobuddy",
      //     receiverId: "chatgpt",
      //     content: "hello 3",
      //     timestamp: 1754033717616,
      //   },
      //   {
      //     id: "688c6e31f3af601cc0230e23",
      //     conversationId: "1",
      //     senderId: "1",
      //     receiverId: "chatgpt",
      //     content: "hello 2",
      //     timestamp: 1754033713582,
      //   },
      // ];

      const newMessages: Message[] = data.messages
        .sort((a, b) => a.timestamp - b.timestamp)
        .map((msg) => ({
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
        <div className={`flex items-start mt-1`}>
          <div className="w-8 mr-2 flex justify-center">
            {<img src={base} alt="Smiley" className="" />}
          </div>
          <div
            className={`p-3 rounded-xl shadow-sm max-w-[80%] bg-[#F8F9FB] text-gray-800`}
          >
            Chào bạn, mình có thể giúp gì nè?
          </div>
        </div>
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
            }, 100);
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
