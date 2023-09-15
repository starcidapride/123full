import logo from './logo.svg';
import './App.css';
// ghi bất cứ tên gì và không cần dấu {}
import TuCuong from './components/NavBar'
import { Cuong2 } from './components/Cuong';
import {Routes, Route} from 'react-router-dom'
import { Home } from './pages/Home'
import { Cuong } from './pages/Cuong';
import { Counter } from './components/Counter';
import { Storage} from './pages/Storage'
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

// có 3 th
// nếu đường dẫn là /cuong thì nó sẽ render ra <TuCuong /> và <Cuong/> ở dưới
// nếu đường dẫn là /home thì nó sẽ render ra <TuCuong /> và <Home/> ở dưới
// nếu đường dẫn khác thì nó sẽ render ra <TuCuong /> 

// 1 là số, 2 là chữ, 3 là null
export const Session = createContext(null)

function App() {
  const accessToken = localStorage.getItem("accessToken")
  console.log(accessToken)
  useEffect(() => {
    // Create a custom Axios instance with headers
    const axiosInstance = axios.create({
      // gắn token vào header để backend giải quyết
      headers: {
        Authorization: `Bearer ${accessToken}`, // Attach the access token as a Bearer token
      },
    });
  
    // Make the GET request using the custom Axios instance
    axiosInstance
      .get("https://localhost:7036/api/Accounts/Launch")
      .then((response) => {
        // Handle the response data here
        setUser(response.data);
      })
      .catch((error) => {
        // Handle errors here
        console.error(error);
      });
  }, []);
  



  // function App là bố của những cái component còn lại, nên là state nào lưu ở app
  // trong hàm app, anh sẽ khai bảo 1 state giá trị khởi điểm là null
  
  // anh set lại giá trị user ở App, và anh truyền hàm setUser cho những thằng con của App
  const [user, setUser] = useState(null)

  // anh sẽ cung cấp cho những thằng component nằm bên trong thằng
  // Session Provider có thể xài user và setUsee
  return (
    <Session.Provider value = {{user, setUser}}>
    <div className="App">
      {/* lý do là vì <TuCuong> nó không nằm trong routes */}
     <TuCuong />
      <Routes>
          <Route path="/cuong" element = {<Cuong />} />
          <Route path="/home" element = {<Home />} />
          <Route path="/storage" element = {<Storage />} />
      </Routes>
      <Counter/>
      {/* user.toString() */}
      {JSON.stringify(user)}
    </div>
    </Session.Provider>
  );
}

export default App;
