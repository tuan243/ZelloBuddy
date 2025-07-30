const PreOnboardPage: React.FunctionComponent = () => {
  return (
    <div className="min-h-full space-y-2 py-2">
      <div className="flex flex-col items-center">
        <div>Chào mừng đến với công ty</div>
        <div>Bắt đầu hành trình onboarding</div>
        <div>Xin chào Minh</div>
        <div>
          Tôi là AI Buddy, sẽ đồng hành cùng bạn trong hành trình onboarding
        </div>
        <button>Bắt đầu cùng AI Buddy</button>
        <button>Checklist hôm nay</button>
        <div className="checklist">
          <input type="checkbox" name="some input" id="some-input" />
          <label htmlFor="some-input">Some input 1</label>
        </div>
        <div className="checklist">
          <input type="checkbox" name="some input" id="some-input2" />
          <label htmlFor="some-input2">Some input 2</label>
        </div>
      </div>
    </div>
  );
};

export default PreOnboardPage;
