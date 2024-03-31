import { useSelector } from "react-redux";
import Image from "../../../../assets/images/14barber.jpg";

export default function Header() {
  const { cart } = useSelector((state) => state);

  return (
    <div className="flex items-center justify-between mb-5 px-5 py-5">
      <img src={Image} alt="cLogo" className="w-50 h-15 -ml-8" />
      <div className="flex items-left text-right flex-col">
        <span className="text-gray-900">
          Date: {cart?.selected?.data?.updatedAt?.slice(0, 10)}
        </span>
        <span className="text-gray-900">
          Time: {cart?.selected?.data?.updatedAt?.slice(11, 16)}
        </span>
      </div>
    </div>
  );
}
