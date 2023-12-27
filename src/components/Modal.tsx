import React, { useEffect, type FC, useState, type Dispatch } from "react";
import type { CommonActionType } from "../hooks/useGameLogic";

type ModalProps = {
  isOpen: boolean;
  userAName: string;
  userBName: string;
  dispatch: Dispatch<CommonActionType>;
};

const Modal: FC<ModalProps> = ({ userAName, userBName, isOpen, dispatch }) => {
  const disabled = !userAName && !userBName;
  const [overlay, setOverlay] = useState(() => isOpen);
  useEffect(() => {
    if (isOpen) setOverlay(true);
    if (!isOpen) setTimeout(() => setOverlay(false), 400);
  }, [isOpen]);
  return (
    <div
      className={`${
        overlay ? "z-10" : "-z-10"
      } fixed inset-0  w-screen overflow-y-auto ${
        isOpen ? "bg-opacity-50" : "bg-opacity-0 transition-colors duration-300"
      }  bg-black`}
    >
      <div className="flex min-h-full items-center  justify-center p-0 text-center">
        <div
          className={`${
            isOpen ? "left-0" : "left-full"
          } relative  my-8 w-full max-w-lg transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all`}
        >
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h2
                  className="text-xl font-semibold leading-6 text-gray-900"
                  id="modal-title"
                >
                  Choose username(s)
                </h2>
                <div className="mt-2">
                  <div className="mx-auto w-full py-2">
                    <label htmlFor="userA">User A:</label>
                    <div className="lb">
                      <input
                        type="text"
                        name="userA"
                        id="userA"
                        className="sm:max-w-300 block w-full rounded-md border-0 py-1.5 pl-3 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Name"
                        value={userAName}
                        onChange={({ target: { value } }) =>
                          dispatch({
                            type: "SET_USER_A_NAME",
                            payload: { userName: value },
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="mx-auto w-full py-2">
                    <label htmlFor="userB">User B:</label>
                    <div className="lb">
                      <input
                        type="text"
                        name="userB"
                        id="userB"
                        disabled={!userAName}
                        className={`${
                          !userAName && "bg-gray-200"
                        } sm:max-w-300 block w-full rounded-md border-0 py-1.5 pl-3 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                        placeholder="Name"
                        value={userBName}
                        onChange={({ target: { value } }) =>
                          dispatch({
                            type: "SET_USER_B_NAME",
                            payload: { userName: value },
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              disabled={disabled}
              className={`${
                disabled ? "bg-gray-300" : "bg-blue-600 hover:bg-blue-800"
              } inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm  sm:ml-3 sm:w-auto`}
              onClick={() => dispatch({ type: "START_NEW_GAME" })}
            >
              Play {!!userAName && !userBName && "alone"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
