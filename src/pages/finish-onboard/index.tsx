import TransitionLink from "@/components/transition-link";
import { useState } from "react";
import { Checkbox, Header } from "zmp-ui";
import base from "../../static/base.png";
import zelloBuddy from "../../static/zellobuddy-avatar.jpg";
import calendar from "../../static/calendar.svg";
import chat from "../../static/chat.svg";
import checklist from "../../static/checklist.svg";
import note from "../../static/note.svg";
import mascot from "../../static/mascot2EyeClosedSmile.svg";

const FinishOnboardPage: React.FunctionComponent = () => {
  const schedule = [
    {
      time: "9:00",
      task: "Có mặt tại sảnh lễ tân",
      checked: true,
    },
    {
      time: "9:00 - 9:10",
      task: "Ký các giấy tờ cần thiết",
      checked: true,
    },
    {
      time: "9:10 - 9:45",
      task: "Onboarding với HR",
      checked: true,
    },
    {
      time: "9:45 - 10:00",
      task: "Nhận thiết bị",
      checked: true,
    },
    {
      time: "10:00 - 10:20",
      task: "Tham quan, về team",
      checked: true,
    },
    {
      time: "12:00",
      task: "Team lunch",
      checked: true,
    },
    {
      time: "13:30",
      task: "Meeting line manager",
      checked: true,
    },
    {
      time: "15:00",
      task: "Training",
      checked: true,
    },
    {
      time: "17:30",
      task: "Finish",
      checked: true,
    },
  ];
  const [checkList, setCheckList] = useState(schedule);

  const completedCount = checkList.filter((item) => item.checked).length;
  const progressPercent = Math.round((completedCount / checkList.length) * 100);

  const toggleCheck = (index: number) => {
    setCheckList((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, checked: !item.checked } : item
      )
    );
  };

  return (
    <>
      <Header title="Zello - ZHackathon" showBackIcon={false} />
      <div className="w-full px-4 py-2 text-sm font-sans max-w-sm mx-auto">
        {/* Onboarding Message */}
        <div className="bg-white rounded-2xl">
          <div
            style={{ backgroundColor: "#0068FF" }}
            className="text-white rounded-2xl p-4 mb-3 relative"
          >
            <div className="font-medium text-lg leading-[1.5rem]">
              Tuyệt vời 🎉
            </div>
            <div className="text-sm mt-[0.125rem]">
              Bạn đã hoàn thành xuất sắc ngày <br /> onboarding đầu tiên
            </div>

            <img
              src={mascot}
              alt="Smiley"
              className="absolute right-0 bottom-0"
            />
          </div>

          <div className="flex flex-col items-center pb-[1rem]">
            <div className="flex flex-col items-center w-full px-4">
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

        {/* Schedule */}
        <div className="bg-white pt-4 rounded-xl mt-6">
          <div className="font-medium px-4 text-gray-800 flex items-center gap-2">
            <img src={calendar} alt="Smiley" className="" /> Hoàn thành hôm nay
          </div>
          <ul className="pl-4">
            {checkList.map((item, idx) => {
              const isChecked = item.checked;
              const firstIncompleteIndex = checkList.findIndex(
                (i) => !i.checked
              );
              const isNextAfterCurrent = idx === firstIncompleteIndex + 1;

              let status = "";
              let color = "";
              if (isChecked) {
                status = "Hoàn thành";
                color = "text-green-600";
              } else if (idx === firstIncompleteIndex) {
                status = "Đang thực hiện";
                color = "text-blue-600";
              } else if (isNextAfterCurrent) {
                status = "Sắp tới";
                color = "text-orange-400";
              } else {
                status = "Chờ";
                color = "text-gray-400";
              }

              const canInteract = idx === firstIncompleteIndex;

              return (
                <li key={idx}>
                  <button
                    className={`w-full justify-between items-center text-gray-700`}
                    onClick={() => {
                      if (canInteract) toggleCheck(idx);
                    }}
                    disabled={!canInteract}
                  >
                    <div className="flex gap-4">
                      <Checkbox
                        value={""}
                        checked={item.checked}
                        disabled={!canInteract && !isChecked}
                      />
                      <div
                        className={`flex-1 py-4 flex justify-between items-center ${
                          idx !== checkList.length - 1
                            ? "border-b border-black/10"
                            : ""
                        }`}
                      >
                        <div className="flex flex-col gap-1">
                          <div className="text-sm text-[#0D0D0D] text-start">
                            {item.task}
                          </div>
                        </div>
                        <div className={`text-sm font-medium pr-4 ${color}`}>
                          {status}
                        </div>
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* AI Greeting */}
        <div className="flex flex-col mt-6">
          <div className="flex items-start gap-2 mb-4">
            <img src={zelloBuddy} alt="Smiley" className="w-8 rounded-full" />
            <div className="bg-white border rounded-lg p-3 shadow-sm">
              <div>
                Chúc mừng bạn! Tuần tới chúng ta sẽ tiếp tục hành trình với
                những mục tiêu mới. Hẹn gặp lại! 😊
              </div>
            </div>
          </div>
          <TransitionLink
            to="/chat"
            className="flex gap-2 items-center bg-[#0068FF] text-white text-[15px] font-medium rounded-3xl py-[14px] px-[24px] self-end"
          >
            <img src={chat} alt="" />
            <div className="">Chat với AI Buddy</div>
          </TransitionLink>
        </div>

        {/* Bottom buttons */}
        <div className="grid grid-cols-1 gap-3 mt-6">
          <div className="flex flex-col items-center bg-white border rounded-xl py-3 gap-1 justify-center">
            <img src={note} alt="" />
            <button className="font-medium text-blue-600">
              Xem kế hoạch tuần tới
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FinishOnboardPage;
