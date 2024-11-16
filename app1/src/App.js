import React, {Suspense} from "react";
const RemoteApp = React.lazy(() => import("app2/App"));
const RemoteApp2 = React.lazy(() => import("app3/App"));

const App = () => {
  return (
    <div>
       <Suspense fallback={"loading..."}>
        <RemoteApp2/>
      </Suspense>
      <div style={{
        margin:"10px",
        padding:"10px",
        textAlign:"center",
        backgroundColor:"greenyellow"
      }}>
        <h1>App1</h1>
      </div>
      <Suspense fallback={"loading..."}>
        <RemoteApp/>
      </Suspense>  
    </div>)
}


export default App;
