import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
export default function FlowButton({
  text = "View Collection",
  path = "/",
}: {
  text?: string;
  path?: string;
}) {
  return (
    <Link
      to={path}
      className="group relative mx-auto my-0 w-fit flex items-center gap-1 overflow-hidden rounded-[100px] border-[1.5px] border-[#333333]/40 bg-transparent px-6 sm:px-8  py-3 text-[12px] md:text-sm font-semibold text-[#111111] transition-all duration-600 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-transparent hover:text-white hover:rounded-[12px] active:scale-[0.95]"
    >
      {/* Left arrow (arr-2) */}
      <ArrowRight className="absolute w-4 h-4 left-[-25%] stroke-[#111111] fill-none z-9 group-hover:left-4 group-hover:stroke-white transition-all duration-800 ease-[cubic-bezier(0.34,1.56,0.64,1)]" />

      {/* Text */}
      <span className="relative z-1 -translate-x-3 group-hover:translate-x-3 transition-all duration-800 ease-out">
        {text}
      </span>

      {/* Circle */}
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#111111] rounded-[50%] opacity-0 group-hover:w-55 group-hover:h-55 group-hover:opacity-100 transition-all duration-800 ease-[cubic-bezier(0.19,1,0.22,1)]"></span>

      {/* Right arrow (arr-1) */}
      <ArrowRight className="absolute w-4 h-4 right-4 stroke-[#111111] fill-none z-9 group-hover:right-[-25%] group-hover:stroke-white transition-all duration-800 ease-[cubic-bezier(0.34,1.56,0.64,1)]" />
    </Link>
  );
}
export function MainButton({
  text = "View Collection",
  onClick = () => {},
}: {
  text?: string;
  onClick?: () => void;
}) {
  return (
    <button type="submit" className="main-btn text-white p-1" onClick={onClick}>
      <span className="button-content">
        <span className="text-wrapper">
          <span className="text-span first">{text}</span>
          <span className="text-span secound">{text}</span>
        </span>
        <span className="icon-wrapper">
          <span className="icon-first btn-icon">
            <svg
              className="btn-icon"
              width="10"
              height="10"
              viewBox="0 0 5 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.5 1L4.5 4L1.5 7"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </span>

          <span className="icon-secound btn-icon">
            <svg
              className="btn-icon sec-icon"
              width="10"
              height="10"
              viewBox="0 0 5 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.5 1L4.5 4L1.5 7"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </span>
        </span>
      </span>
    </button>
  );
}
export function SecondaryButton({ text }: { text: string }) {
  return (
    <button className="secondary">
      <span className="button-content flex items-center gap-2">
        <span className="text-wrapper">
          <span className="text-span first">{text}</span>
          <span className="text-span second">{text}</span>
        </span>
        <span className="icon-wrapper">
          <span className="icon-first btn-icon">
            <svg
              className="btn-icon"
              width="10"
              height="10"
              viewBox="0 0 5 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.5 1L4.5 4L1.5 7"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </span>

          <span className="icon-second btn-icon">
            <svg
              className="btn-icon sec-icon"
              width="10"
              height="10"
              viewBox="0 0 5 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.5 1L4.5 4L1.5 7"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </span>
        </span>
      </span>
    </button>
  );
}
export function FilterButton({
  onFilterClick,
  onSortClick,
}: {
  onFilterClick: () => void;
  onSortClick: () => void;
}) {
  return (
    <div className="py-4 px-4 mt-14 sticky bottom-8 rounded-2xl flex items-center gap-2 shadow w-fit mx-auto bg-white/90">
      <button onClick={onFilterClick} className="flex items-center gap-1">
        <span>
          <svg
            className="icon icon-filter"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.5 5H13.5"
              stroke="currentColor"
              stroke-width="1.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M2.5 5H9.5"
              stroke="currentColor"
              stroke-width="1.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M7.5 11H13.5"
              stroke="currentColor"
              stroke-width="1.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M2.5 11H5.5"
              stroke="currentColor"
              stroke-width="1.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M9.5 3.5V6.5"
              stroke="currentColor"
              stroke-width="1.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M5.5 9.5V12.5"
              stroke="currentColor"
              stroke-width="1.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </span>
        <span>Filter</span>
        {/* <span>Filter</span> */}
      </button>
      <span className="w-0.5 h-6 rounded-2xl bg-gray-400"></span>
      <button onClick={onSortClick} className="flex items-center gap-1">
        <span>
          <svg
            className="icon icon-sort"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 8H7.5"
              stroke="currentColor"
              stroke-width="1.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M3 4H11.5"
              stroke="currentColor"
              stroke-width="1.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M3 12H6.5"
              stroke="currentColor"
              stroke-width="1.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M9 10.5L11.5 13L14 10.5"
              stroke="currentColor"
              stroke-width="1.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M11.5 13V7"
              stroke="currentColor"
              stroke-width="1.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </span>
        <span>Sort</span>
      </button>
    </div>
  );
}
