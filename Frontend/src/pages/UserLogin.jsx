import React from "react";
import { Battery, Wifi, Signal, BatteryCharging } from "lucide-react";

const UserLogin = () => {
  return (
    <div>
      <header>
        <div className="bg-black flex justify-between text-white p-1">
          <h6>12:00</h6>
          <ul className="flex space-x-2">
            <li>
              <Signal size={16} />
            </li>
            <li>
              <Wifi size={16} />
            </li>
            <li>
              <Battery size={16} />
            </li>
          </ul>
        </div>
      </header>
      <main>
        <div className="px-4">
          <h2 className=" text-lg font-bold py-4">What's your phone number or email?</h2>
          <form action="" className="flex flex-col">
            <div className="flex rounded outline-none overflow-hidden">
              <select className="border-none bg-gray-200 outline-none px-1">
                <option value="phone">Phone</option>
                <option value="email">Email</option>
              </select>
              <input className="outline-none px-2 h-15 bg-gray-200 flex-1" type="text" placeholder="Enter your phone number or email" />
            </div>
            <button className="my-3 bg-black w-full text-white py-3 px-4 rounded" type="submit">
              Continue
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default UserLogin;
