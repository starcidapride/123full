import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { GoogleSignIn } from './GoogleSignIn';
import { SignInModal } from './SignInModal';
import { useContext } from 'react';
import { Session } from '../App';
import { Image } from 'react-bootstrap';
import { Link} from 'react-router-dom'

function OffcanvasExample() {

   // lấy ra user trong session
   const session = useContext(Session)
   const user = session.user

    // hàm này nó return về html, à có thể gọi hàm này để hiển thị ra html
  return (
    <>

      {[false].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
          <Container fluid>
            <Navbar.Brand href="#">Navbar Offcanvas</Navbar.Brand>
            
            <Nav className="me-auto">
             {/* link nó sẽ chuyển tới 1 cái URL mà không loai lại trang, khác với href */}
             <div className="d-flex">
          {/* link nó sẽ chuyển tới 1 cái URL mà không loại lại trang, khác với href */}
        <Link style={{ color: 'black' }} to="/Home">
      Home
    </Link>
    <Link style={{ color: 'black' }} to="/Cuong">
      Cuong
    </Link>

    <Link style={{ color: 'black' }} to="/Storage">
      Storage
    </Link>
  </div>
            </Nav>

            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                 
                 {
                   user == null 
                   ? <SignInModal />
                   : <div>
                    <Image src="images/EmptyImage.webp" thumbnail /> 
                    <h4> {user.firstName} {user.lastName} </h4>
                    <div> {user.email} </div>
                   </div>   

                        
                  }

              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

//export default nghĩa là xuất ra cho file khác xài, public bên java

// export default nghĩa  là nguyên file xuất ra 1 thứ
export default OffcanvasExample;