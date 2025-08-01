import { Checkbox } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import base from "../../static/base.png";
import calendar from "../../static/calendar.svg";
import mascot from "../../static/mascot2EyeClosed.svg";
import company from "../../static/company.svg";
import sign from "../../static/sign.svg";
import people from "../../static/people.svg";
import lineManager from "../../static/line-manager.svg";
import chat from "../../static/chat.svg";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import TransitionLink from "@/components/transition-link";

const PreOnboardPage: React.FunctionComponent = () => {
  const initialChecklist = [
    { text: "Chuẩn bị bản sao CCCD", checked: false },
    { text: "Chụp ảnh 3x4, 4x6", checked: false },
    { text: "Khám sức khỏe định kỳ", checked: false },
  ];

  const [checkList, setCheckList] = useState(initialChecklist);

  // Compute progress (in percent)
  const completedCount = checkList.filter((item) => item.checked).length;
  const progressPercent = Math.round((completedCount / checkList.length) * 100);
  const navigate = useNavigate();

  const toggleCheck = (index: number) => {
    setCheckList((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, checked: !item.checked } : item
      )
    );
  };

  useEffect(() => {
    if (completedCount === checkList.length) {
      toast.success("Đã đến ngày onboard!");
      setTimeout(() => {
        navigate("/onboard");
      }, 1200);
    }
  }, [completedCount, checkList.length, navigate]);

  return (
    <div className="w-full min-h-screen px-4 py-2 text-sm font-sans max-w-sm mx-auto">
      {/* Onboarding Message */}
      <div className="bg-white rounded-2xl">
        <div
          style={{ backgroundColor: "#0068FF" }}
          className="text-white rounded-2xl p-4 mb-3 relative"
        >
          <div className="font-medium text-lg leading-[1.5rem]">
            Chuẩn bị onboarding
          </div>
          <div className="text-sm mt-[0.125rem]">
            5 ngày nữa đến ngày đầu tiên
          </div>

          <img
            src={mascot}
            alt="Smiley"
            className="absolute right-0 bottom-0"
          />
        </div>

        <div className="flex flex-col items-center pb-[1rem]">
          <div
            style={{ color: "#0068FF" }}
            className="font-black text-5xl mt-2"
          >
            5
          </div>
          <div style={{ color: "#3D3D3D" }} className="text-[15px] mt-2">
            ngày nữa đến ngày onboard
          </div>

          <div className="flex flex-col items-center w-full px-4 mt-2">
            <div className="text-xs text-[#3D3D3D] text-center mb-1">
              Tiến độ chuẩn bị:{" "}
              <span className="text-[15px] font-medium">{`${progressPercent}%`}</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* AI Greeting */}
      <div className="flex flex-col mt-6">
        <div className="flex items-start gap-2 mb-4">
          <img src={base} alt="Smiley" className="" />
          <div className="bg-white border rounded-lg p-3 shadow-sm">
            <div>
              Chào buổi sáng! 👋 Hôm nay là ngày đặc biệt. Tôi sẽ đồng hành cùng
              bạn từng bước nhé
            </div>
          </div>
        </div>
        <TransitionLink
          to="/chat"
          style={{ backgroundColor: "#DBEBFF" }}
          className="flex gap-2 items-center text-blue-600 text-[15px] font-medium mb-5 rounded-3xl py-[14px] px-[24px] self-end"
        >
          <img src={chat} alt="" />
          <div className="">Chat với AI Buddy</div>
        </TransitionLink>
      </div>

      {/* Schedule */}
      <div className="bg-white pt-4 rounded-xl">
        <div className="font-medium text-gray-800 mb-4 px-4 flex items-center gap-2">
          <img src={calendar} alt="Smiley" className="" /> Checklist chuẩn bị
        </div>
        <ul className="pl-4">
          {checkList.map((item, idx) => (
            <li key={idx}>
              <button
                className="flex justify-between items-start text-gray-700 w-full"
                onClick={() => toggleCheck(idx)}
              >
                <div className="w-full flex gap-4 items-center">
                  <Checkbox value="" checked={item.checked} />
                  <div className={`flex-1 py-4 ${idx !== checkList.length - 1 ? "border-b border-black/10" : "" }`}>
                    <div className="text-[#0D0D0D] text-start">{item.text}</div>
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom buttons */}
      <div className="grid grid-cols-2 gap-3 mt-6">
        <div className="flex flex-col items-center bg-white border rounded-xl py-3 gap-1 justify-center">
          <img src={company} alt="" />
          <button className="font-medium text-[#0068FF]">
            Tìm hiểu công ty
          </button>
        </div>
        <div className="flex flex-col items-center bg-white border rounded-xl py-3 gap-1 justify-center">
          <img src={sign} alt="" />
          <button className="font-medium text-[#0068FF]">
            Đường đến office
          </button>
        </div>
        <div className="flex flex-col items-center bg-white border rounded-xl py-3 gap-1 justify-center">
          <img src={people} alt="" />
          <button className="font-medium text-[#0068FF]">Thông tin team</button>
        </div>
        <div className="flex flex-col items-center bg-white border rounded-xl py-3 gap-1 justify-center">
          <img src={lineManager} alt="" />
          <button className="font-medium text-[#0068FF]">Line Manager</button>
        </div>
      </div>
    </div>
  );
};

export default PreOnboardPage;
