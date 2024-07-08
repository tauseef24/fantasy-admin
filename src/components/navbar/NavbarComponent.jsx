import React, { useState, useEffect } from "react";
import * as Popover from "@radix-ui/react-popover";
import { Link } from "react-router-dom";
import { getSports } from "../../services/sports";
import Logout from "./Logout";

function NavbarComponent() {
  const userObject = JSON.parse(localStorage.getItem("admin-details"));
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [sports, setSports] = useState([]);

  const fetchSports = () => {
    getSports()
      .then((res) => {
        setSports(res);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchSports();
  }, []);

  return (
    <div>
      <Popover.Root open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <Popover.Trigger asChild>
          <button
            className="rounded-full w-[35px] h-[35px] inline-flex items-center justify-center text-violet11 bg-white shadow-[0_2px_10px] shadow-blackA4 hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black cursor-default outline-none"
            aria-label="Update dimensions"
          >
            <img
              className="w-8 h-8 rounded-full"
              src="https://www.w3schools.com/howto/img_avatar.png"
              alt="user photo"
            />
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            className="rounded p-3 w-[260px] bg-gradient-to-tr from-purple-200 to-blue-200 shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade z-[100]"
            sideOffset={5}
          >
            <div className="flex flex-col gap-2.5">
              <ul>
                <li>
                  <div className="bg-white p-2 rounded-md mb-1">
                    <p className="text-md font-semibold">{userObject?.name}</p>
                  </div>
                </li>

                <div className="md:hidden flex flex-col gap-0.5">
                  <Link
                    to="/admin/sports"
                    className="p-2 text-sm rounded-md bg-white mb-1"
                  >
                    Home
                  </Link>
                  {/* {sports.map((sport, index) => (
                    <Link
                      key={index}
                      to={`admin/${sport.sport}/${sport._id}`}
                      className="p-2 text-sm rounded-md bg-white mb-1"
                    >
                      {sport.sport}
                    </Link>
                  ))} */}
                </div>

                <li>
                  <div className="bg-red-400 p-2 text-sm rounded-md mb-1 font-semibold text-center">
                    <Logout />
                  </div>
                </li>
              </ul>
            </div>
            <Popover.Arrow className="fill-white" />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}

export default NavbarComponent;
