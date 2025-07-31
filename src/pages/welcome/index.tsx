import { Checkbox } from "zmp-ui";
import base from "../../static/base.png";
import calendar from "../../static/calendar.svg";
import checklist from "../../static/checklist.svg";
import findRoom from "../../static/find-room.svg";
import mascot from "../../static/mascot.svg";

const WelcomePage: React.FunctionComponent = () => {
  const schedule = [
    {
      time: "9:00",
      task: "Có mặt tại sảnh lễ tân",
      status: "Hoàn thành",
      color: "text-green-600",
    },
    {
      time: "9:00 - 10:00",
      task: "Giấy tờ",
      status: "Đang thực hiện",
      color: "text-blue-600",
    },
    {
      time: "9:10 - 9:45",
      task: "Onboarding với HR",
      status: "Sắp tới",
      color: "text-orange-500",
    },
    {
      time: "9:45 - 10:00",
      task: "Nhận thiết bị",
      status: "Chờ",
      color: "text-gray-400",
    },
    {
      time: "10:00 - 10:20",
      task: "Tham quan, về team",
      status: "Chờ",
      color: "text-gray-400",
    },
    {
      time: "12:00",
      task: "Team lunch",
      status: "Chờ",
      color: "text-gray-400",
    },
    {
      time: "13:30",
      task: "Meeting line manager",
      status: "Chờ",
      color: "text-gray-400",
    },
    { time: "15:00", task: "Training", status: "Chờ", color: "text-gray-400" },
    { time: "17:30", task: "Finish", status: "Chờ", color: "text-gray-400" },
  ];

  return (
    <div className="w-full min-h-screen px-4 py-2 text-sm font-sans max-w-sm mx-auto">
      {/* Onboarding Message */}
      <div style={{backgroundColor: '#0068FF'}} className="text-white rounded-2xl p-4 mb-3 relative overflow-hidden">
        <div className="font-medium text-lg leading-[1.5rem]">
          Ngày onboard đầu tiên 🎉
        </div>
        <div className="text-sm mt-[0.125rem]">Chúc bạn một ngày tuyệt vời</div>

        <img src={mascot} alt="Smiley" className="absolute right-0 bottom-0" />
      </div>

      {/* AI Greeting */}
      <div className="flex flex-col">
        <div className="flex items-start gap-2 mb-4">
          {/* <div className="w-7 h-7 text-xs flex items-center justify-center rounded-full">
        </div> */}
          <img src={base} alt="Smiley" className="" />
          <div className="bg-white border rounded-lg p-3 shadow-sm">
            <div>
              Chào buổi sáng! 👋 Hôm nay là ngày đặc biệt. Tôi sẽ đồng hành cùng
              bạn từng bước nhé
            </div>
          </div>
        </div>
        <button
          style={{ backgroundColor: "#DBEBFF" }}
          className="text-blue-600 text-[15px] font-medium mb-5 rounded-3xl py-[14px] px-[24px] self-end"
        >
          Chat với AI Buddy
        </button>
      </div>

      {/* Schedule */}
      <div className="bg-white p-3 rounded-xl">
        <div className="font-medium text-gray-800 mb-3 flex items-center gap-2">
          <img src={calendar} alt="Smiley" className="" /> Lịch trình hôm nay
        </div>
        <ul className="space-y-3">
          {schedule.map((item, idx) => (
            <li
              key={idx}
              className="flex justify-between items-start text-gray-700"
            >
              <div className="flex gap-4">
                {/* <input type="checkbox" className="mt-1" /> */}
                <Checkbox value={""} />
                <div>
                  <div style={{ color: "#0D0D0D" }}>{item.time}</div>
                  <div className="text-sm text-gray-600">{item.task}</div>
                </div>
              </div>
              <div className={`text-sm font-medium ${item.color}`}>
                {item.status}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom buttons */}
      <div className="grid grid-cols-2 gap-3 mt-6">
        <div className="flex flex-col items-center bg-white border rounded-xl py-3 gap-1 justify-center">
          <img src={checklist} alt="" />
          <button className="font-medium text-blue-600">
            Xem lại checklist <br /> pre-onboard
          </button>
        </div>
        <div className="flex flex-col items-center bg-white border rounded-xl py-3 gap-1 justify-center">
          <img src={findRoom} alt="" />
          <button className="font-medium text-blue-600">
            Tìm phòng
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
