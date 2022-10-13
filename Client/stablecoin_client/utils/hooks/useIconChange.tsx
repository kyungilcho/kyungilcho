import React, { useEffect, useState } from "react";
import { AiFillCheckCircle, AiFillMinusCircle } from "react-icons/ai";
import { GiBackwardTime } from "react-icons/gi";

const useIconChange = (status: string) => {
  const [statusIcon, setStatusIcon] = useState<React.ReactNode>("");

  useEffect(() => {
    switch (status) {
      case "idle":
        setStatusIcon(
          <div className="idle">
            <AiFillMinusCircle />
          </div>
        );
        break;
      case "pending":
        setStatusIcon(
          <div className="pending">
            <GiBackwardTime />
          </div>
        );
        break;
      case "success":
        setStatusIcon(
          <div className="success">
            <AiFillCheckCircle />
          </div>
        );
        break;
      default:
        break;
    }
  }, [status]);

  return { statusIcon };
};

export default useIconChange;
