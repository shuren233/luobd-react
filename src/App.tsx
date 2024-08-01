
import router from "@/router";
import {useRoutes} from "react-router-dom";

function App() {
    const outlet = useRoutes(router);
  return (
    <>
      <div>
          {/* 路由渲染  */}
          {outlet}
      </div>
    </>
  )
}
export default App
