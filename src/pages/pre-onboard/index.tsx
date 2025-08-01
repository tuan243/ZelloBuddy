import { Checkbox } from "zmp-ui";
import base from "../../static/base.png";
import calendar from "../../static/calendar.svg";
import checklist from "../../static/checklist.svg";
import findRoom from "../../static/find-room.svg";
import mascot from "../../static/mascot.svg";

const PreOnboardPage: React.FunctionComponent = () => {
  const checkList = [
    'Chuẩn bị bản sao CCCD',
    'Chụp ảnh 3x4, 4x6',
    'Khám sức khỏe định kỳ'
  ];

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
          <div style={{ color: "#0068FF" }} className="font-black text-5xl">
            5
          </div>
          <div style={{ color: "#3D3D3D" }} className="text-[15px]">
            ngày nữa đến ngày onboard
          </div>

          <div style={{ color: "#3D3D3D" }} className="text-xs">
            Tiến độ chuẩn bị: <span className="text-[15px] font-medium">60%</span>
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
          <img src={calendar} alt="Smiley" className="" /> Checklist chuẩn bị
        </div>
        <ul className="space-y-3">
          {checkList.map((item, idx) => (
            <li
              key={idx}
              className="flex justify-between items-start text-gray-700"
            >
              <div className="flex gap-4 items-center">
                {/* <input type="checkbox" className="mt-1" /> */}
                <Checkbox value={""} />
                <div>
                  <div style={{ color: "#0D0D0D" }}>{item}</div>
                  {/* <div className="text-sm text-gray-600">{item.task}</div> */}
                </div>
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
          <button className="font-medium text-blue-600">Tìm phòng</button>
        </div>
      </div>
    </div>
  );
};

export default PreOnboardPage;
