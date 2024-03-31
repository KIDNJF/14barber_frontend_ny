import { useSelector } from "react-redux";

export default function ClientDetails() {
  const { cart } = useSelector((state) => state);
  return (
    <>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-left text-left flex-col">
          <span className="text-gray-900"> 14Barber</span>
          <span className="text-gray-900">KN 5 Road, KABC</span>
          <span className="text-gray-900">Kigali - Rwanda, 14baber.com</span>
          <span className="text-gray-900">+250788517930</span>
          <span className="text-gray-900">
            Done By: {cart?.selected?.data?.user?.firstname}
          </span>
        </div>
        <div className="flex items-left text-right flex-col">
          <span className="text-gray-900">
            <strong>Client Name:</strong>
            {cart?.selected?.data?.client?.firstname}
          </span>
        </div>
      </div>
    </>
  );
}
