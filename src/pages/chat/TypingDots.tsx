export default function TypingDots() {
  return (
    <div className="flex items-end gap-1 h-5 -mt-3">
      <span className="w-[6px] h-[6px] bg-blue-500 rounded-full animate-bounce [animation-delay:0s]"></span>
      <span className="w-[6px] h-[6px] bg-blue-500 rounded-full animate-bounce [animation-delay:0.15s]"></span>
      <span className="w-[6px] h-[6px] bg-blue-500 rounded-full animate-bounce [animation-delay:0.3s]"></span>
    </div>
  );
}