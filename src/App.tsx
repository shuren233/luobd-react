
import router from "@/router";
import {useRoutes,Link} from "react-router-dom";

function App() {
    const outlet = useRoutes(router);
  return (
    <>
      <div>
        <Link to='/home'>Home</Link>
        <Link to='/user'>User</Link>
          {/* 路由渲染  */}
          {outlet}
      </div>
    </>
  )
}
export default App
