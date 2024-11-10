/* 
page.jsx
Main Website's Land Page for /
*/

import ListFunction from "@/app/(elements)/list";

export default function Page() {
  return (
    <>
      <center className="mt-20">
        <h1 className="text-4xl font-bold mt-4">
          <div className="bg-gradient-to-r from-primary to-danger bg-clip-text text-transparent from-pink-600 via-pink-500 to-pink-600 inline-block">
            Dream
          </div>{" "}
          List
        </h1>
      </center>
      <h4 className="text-center font-thin">
        Track your 🌙{" "}
        <div className="inline-block bg-gradient-to-r from-primary to-danger bg-clip-text text-transparent from-blue-500 via-blue-400 to-blue-500 font-semibold">
          {" "}
          Dreams{" "}
        </div>{" "}
        like never before!
      </h4>

      <div className="password-container mt-20">
        <a href="/local">
          <div className="password-item">
            <h2 className="text-l font-semibold text-center mt-4">
              Go to your Dream List
            </h2>
          </div>
        </a>
        {/* <div className="password-item mb-10 cursor-not-allowed">
            <h2 className="text-l font-semibold cursor-not- mt-5"><center>Private Dream List</center></h2>

            
          </div> */}
      </div>
    </>
  );
}
