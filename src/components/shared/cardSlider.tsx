import { SecondaryButton } from "../ui/buttons";

export default function CardSlider() {
  const slider = [
    {
      id: 1,
      img: (
        <svg
          className="icon"
          width="40"
          height="40"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.6199 6.37964L6.37994 15.6196M9.01997 7.37012C9.01997 8.28138 8.28124 9.02011 7.36997 9.02011C6.4587 9.02011 5.71997 8.28138 5.71997 7.37012C5.71997 6.45885 6.4587 5.72012 7.36997 5.72012C8.28124 5.72012 9.01997 6.45885 9.01997 7.37012ZM16.28 14.6299C16.28 15.5411 15.5412 16.2799 14.63 16.2799C13.7187 16.2799 12.98 15.5411 12.98 14.6299C12.98 13.7186 13.7187 12.9799 14.63 12.9799C15.5412 12.9799 16.28 13.7186 16.28 14.6299Z"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      ),
      title: "Best Price Guarantee",
      color: "#518339",
    },
    {
      id: 2,
      img: (
        <svg
          className="icon"
          width="40"
          height="40"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.875 8.67069L7.125 4.09176M3.48249 6.51755L11 10.973L18.5175 6.51755M11 19.8571V10.964M18.75 14.4927V7.43462C18.7497 7.12518 18.67 6.82128 18.5188 6.55338C18.3677 6.28548 18.1504 6.06302 17.8889 5.9083L11.8611 2.37926C11.5993 2.22439 11.3023 2.14286 11 2.14286C10.6977 2.14286 10.4007 2.22439 10.1389 2.37926L4.11111 5.9083C3.84956 6.06302 3.63232 6.28548 3.48118 6.55338C3.33003 6.82128 3.25031 7.12518 3.25 7.43462V14.4927C3.25031 14.8021 3.33003 15.106 3.48118 15.3739C3.63232 15.6418 3.84956 15.8643 4.11111 16.019L10.1389 19.5481C10.4007 19.7029 10.6977 19.7845 11 19.7845C11.3023 19.7845 11.5993 19.7029 11.8611 19.5481L17.8889 16.019C18.1504 15.8643 18.3677 15.6418 18.5188 15.3739C18.67 15.106 18.7497 14.8021 18.75 14.4927Z"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      ),
      title: "Instant Access",

      color: "#e98449",
    },
    {
      id: 3,
      img: (
        <svg
          className="icon"
          width="40"
          height="40"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.3001 3.73987L16.9401 6.37987M16.9401 6.37987L14.3001 9.01987M16.9401 6.37987L7.70006 6.38038C6.99989 6.38038 6.32839 6.65853 5.8333 7.15362C5.3382 7.64872 5.06006 8.32021 5.06006 9.02038V10.3404M7.70006 18.2601L5.06006 15.6201M5.06006 15.6201L7.70006 12.9801M5.06006 15.6201L14.3001 15.6199C15.0002 15.6199 15.6717 15.3417 16.1668 14.8466C16.6619 14.3515 16.9401 13.68 16.9401 12.9799V11.6599"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      ),

      title: "Easy Refunds",
      color: "#8274c1",
    },
  ];
  return (
    <>
      <div className="container mb-8">
        <div className="w-full">
          <div className="no-scrollbar flex gap-4 overflow-x-auto md:overflow-x-auto lg:overflow-x-visible snap-x snap-mandatory lg:snap-none">
            {slider.map((item: any) => {
              return (
                <div
                  key={item.id}
                  className="card min-w-[85%] md:min-w-[48%] lg:min-w-0 lg:w-full flex flex-col gap-3 justify-center items-center bg-[#f2f7fe] p-8 rounded-2xl shrink-0 lg:shrink"
                >
                  <div style={{ color: item.color }}>{item.img}</div>
                  <h4 className="text-2xl font-semibold tracking-tight text-[#162135]">
                    {item.title}
                  </h4>
                  <div>
                    <SecondaryButton text="View More" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
