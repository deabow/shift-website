"use client";

type OpenChatButtonProps = {
  className?: string;
  children: React.ReactNode;
};

export function OpenChatButton({ className, children }: OpenChatButtonProps) {
  const openChat = () => {
    window.dispatchEvent(new Event("shift-open-chat"));
  };

  return (
    <button type="button" onClick={openChat} className={className}>
      {children}
    </button>
  );
}
