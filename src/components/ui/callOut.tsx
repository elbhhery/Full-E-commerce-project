import { SecondaryButton } from "@/components/ui/buttons";
import { Link } from "react-router-dom";
export default function CallOut() {
  return (
    <div className="container w-fit! px-6">
      <div className="callout flex gap-2 p-4 items-center rounded-2xl flex-col md:flex-row justify-center">
        <span>
          <svg
            className="icon"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.16725 14.4164V6.34128C4.16725 6.0118 4.29814 5.69581 4.53112 5.46283C4.7641 5.22984 5.08009 5.09896 5.40958 5.09896H16.5905C16.92 5.09896 17.236 5.22984 17.469 5.46283C17.7019 5.69581 17.8328 6.0118 17.8328 6.34128V14.4164M12.2424 7.58361H9.75771M2.92493 14.4164H19.0751V15.6587C19.0751 15.9882 18.9443 16.3042 18.7113 16.5372C18.4783 16.7702 18.1623 16.901 17.8328 16.901H4.16725C3.83777 16.901 3.52178 16.7702 3.2888 16.5372C3.05581 16.3042 2.92493 15.9882 2.92493 15.6587V14.4164Z"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </span>
        <span className="font-light text-[17px] text-center md:text-[14px]">
          Want to see more of what we currently offer?
        </span>
        <Link to={"/collections"}>
          <SecondaryButton text="Shop Collection" />
        </Link>
      </div>
    </div>
  );
}
