import logo from './logo.svg';
import './App.css';
// ghi bất cứ tên gì và không cần dấu {}
import TuCuong from './components/NavBar'
import { Cuong2 } from './components/Cuong';
import {Routes, Route} from 'react-router-dom'
import { Home } from './pages/Home'
import { Cuong } from './pages/Cuong';
import { Counter } from './components/Counter';
import { createContext, useState } from 'react';

// có 3 th
// nếu đường dẫn là /cuong thì nó sẽ render ra <TuCuong /> và <Cuong/> ở dưới
// nếu đường dẫn là /home thì nó sẽ render ra <TuCuong /> và <Home/> ở dưới
// nếu đường dẫn khác thì nó sẽ render ra <TuCuong /> 

// 1 là số, 2 là chữ, 3 là null
export const Session = createContext(null)

function App() {
  // function App là bố của những cái component còn lại, nên là state nào lưu ở app
  // trong hàm app, anh sẽ khai bảo 1 state giá trị khởi điểm là null
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
      </Routes>
      <Counter/>
      {/* user.toString() */}
      {JSON.stringify(user)}
    </div>
    </Session.Provider>
  );
}

export default App;
