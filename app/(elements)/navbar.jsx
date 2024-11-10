/* Top Navbar Component */

export default function Navbar() {
  return (
    <>
      <div className="nav-bar">
        <div>
          <a href="/">
            <h1 className="navtitle text-xl font-bold mt-5 ml-4 bg-gradient-to-r from-primary to-danger bg-clip-text text-transparent from-slate-400 via-slate-200 to-slate-400 inline-block">
              Dream List
            </h1>
          </a>
        </div>
        <div className="nav-bar-buttons-grid">
          <a href="/">
            <div className="nav-bar-buttons text-xs">Home</div>
          </a>
          <a href="https://github.com/skellgreco">
            <div className="nav-bar-buttons text-xs">Github</div>
          </a>
        </div>
      </div>
    </>
  );
}
