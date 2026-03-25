import VectorMark from "../../assets/icons/Vector.svg";
import { useState } from "react";
export default function SignBaner() {
  const [hidden, setHidden] = useState(false);
  return (
    <>
      <div className={`bg-black text-white ${hidden ? "hidden" : "block"}`}>
        <div className="flex justify-between container h-9.5 items-center">
          <p className="text-center w-full text-[14px]">
            Sign up and get 20% off to your first order.{" "}
            <a href="" className=" underline">
              Sign Up Now
            </a>
          </p>
          <button className="cursor-pointer" onClick={() => setHidden(true)}>
            <img src={VectorMark} alt="" />
          </button>
        </div>
      </div>
    </>
  );
}
