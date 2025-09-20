import { useEffect, useRef } from "react";

interface UseFocusManagementProps {
  isOpen: boolean;
  titleRef: React.RefObject<HTMLHeadingElement | null>;
}

export const useFocusManagement = ({
  isOpen,
  titleRef,
}: UseFocusManagementProps) => {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    if (titleRef.current) {
      titleRef.current.focus();
    }
  }, [isOpen, titleRef]);
};
